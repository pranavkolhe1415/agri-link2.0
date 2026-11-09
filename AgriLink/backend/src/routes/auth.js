import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import rateLimit from 'express-rate-limit';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { sendOtpEmail } from '../utils/mailer.js';
const router = Router();
const otpLimiter = rateLimit({ windowMs: 15*60*1000, limit: 5, standardHeaders: true, legacyHeaders: false });
const makeToken = user => jwt.sign({ sub:user._id, role:user.role }, process.env.JWT_SECRET, { expiresIn:process.env.JWT_EXPIRES_IN || '7d' });
const hashOtp = value => crypto.createHash('sha256').update(value).digest('hex');

router.post('/register', async (req,res,next) => {
 try {
  const { role,email,password,mobile,name,companyName,contactPerson,address,farmPhoto,idProofType,idProofPhoto,businessType,registrationNumber,gstNumber } = req.body;
  if (!['farmer','industry'].includes(role)) return res.status(400).json({message:'Choose farmer or industry'});
  if (!email || !password || password.length < 8 || !mobile || !/^\d{10}$/.test(mobile)) return res.status(400).json({message:'Enter valid email, 10-digit mobile and password (minimum 8 characters)'});
  if (role==='farmer' && (!name || !address || !farmPhoto || !idProofType || !idProofPhoto)) return res.status(400).json({message:'Complete all farmer registration fields'});
  if (role==='industry' && (!companyName || !contactPerson || !businessType || !address)) return res.status(400).json({message:'Complete all industry registration fields'});
  if (await User.exists({email:email.toLowerCase()})) return res.status(409).json({message:'Email is already registered'});
  const passwordHash = await bcrypt.hash(password,12);
  const user = await User.create({role,email,passwordHash,mobile,name,companyName,contactPerson,address,farmPhoto,idProofType,idProofPhoto,businessType,registrationNumber,gstNumber,status:'pending'});
  const otp = String(crypto.randomInt(1000,10000));
  user.otpHash = hashOtp(otp); user.otpExpiresAt = new Date(Date.now()+Number(process.env.OTP_EXPIRES_MINUTES || 5)*60000);
  await user.save();
  await sendOtpEmail(user.email,otp);
  res.status(201).json({ userId:user.id, email:user.email, message:'Registration saved. Verify the OTP sent to your email.' });
 } catch(e){ next(e); }
});
router.post('/resend-otp', otpLimiter, async (req,res,next) => {
 try {
  const user=await User.findOne({email:req.body.email?.toLowerCase()}).select('+otpHash');
  if(!user || user.status!=='pending' || user.otpVerifiedAt) return res.status(404).json({message:'Pending unverified registration not found'});
  const otp=String(crypto.randomInt(1000,10000));
  user.otpHash=hashOtp(otp); user.otpExpiresAt=new Date(Date.now()+Number(process.env.OTP_EXPIRES_MINUTES||5)*60000);
  await user.save(); await sendOtpEmail(user.email,otp);
  res.json({message:'A new OTP has been sent'});
 }catch(e){next(e);}
});
router.post('/verify-otp', otpLimiter, async (req,res,next) => {
 try {
  const user=await User.findById(req.body.userId).select('+otpHash');
  if(!user || !user.otpHash) return res.status(404).json({message:'Registration not found'});
  if(!user.otpExpiresAt || user.otpExpiresAt < new Date()) return res.status(400).json({message:'OTP expired. Request a new OTP.'});
  if(hashOtp(String(req.body.otp||''))!==user.otpHash) return res.status(400).json({message:'Invalid OTP'});
  user.otpVerifiedAt=new Date(); user.otpHash=undefined; user.otpExpiresAt=undefined; await user.save();
  res.json({status:'pending',message:'Email verified. Your account is awaiting admin approval.'});
 }catch(e){next(e);}
});
router.post('/login', async (req,res,next) => {
 try {
  const {email,password,role}=req.body;
  const user=await User.findOne({email:email?.toLowerCase(),role}).select('+passwordHash');
  if(!user || !await bcrypt.compare(password||'',user.passwordHash)) return res.status(401).json({message:'Invalid email or password'});
  if(role!=='admin' && !user.otpVerifiedAt) return res.status(403).json({code:'OTP_REQUIRED',message:'Please verify your email first'});
  if(user.status==='pending') return res.status(403).json({code:'PENDING',message:'Your account is pending admin approval'});
  if(user.status==='rejected') return res.status(403).json({code:'REJECTED',message:'Your registration was rejected'});
  const token=makeToken(user);
  res.json({token,user:user.toSafeJSON()});
 }catch(e){next(e);}
});
router.get('/me',protect,(req,res)=>res.json({user:req.user.toSafeJSON()}));
router.post('/logout',protect,(req,res)=>res.json({message:'Logged out. Remove the client token.'}));
export default router;
