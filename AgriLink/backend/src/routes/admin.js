import { Router } from 'express';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { protect,allow } from '../middleware/auth.js';
const router=Router(); router.use(protect,allow('admin'));
router.get('/overview',async(req,res,next)=>{try{
 const [farmers,industries,pendingFarmers,pendingIndustries,orders]=await Promise.all([
 User.countDocuments({role:'farmer',status:'approved'}),User.countDocuments({role:'industry',status:'approved'}),
 User.countDocuments({role:'farmer',status:'pending',otpVerifiedAt:{$ne:null}}),User.countDocuments({role:'industry',status:'pending',otpVerifiedAt:{$ne:null}}),
 (await import('../models/Order.js')).default.countDocuments()
 ]); res.json({farmers,industries,pendingFarmers,pendingIndustries,orders});
}catch(e){next(e)}});
router.get('/pending',async(req,res,next)=>{try{
 const users=await User.find({role:{$in:['farmer','industry']},status:'pending',otpVerifiedAt:{$ne:null}}).sort({createdAt:1});
 res.json({users:users.map(u=>u.toSafeJSON())});
}catch(e){next(e)}});
router.get('/users',async(req,res,next)=>{try{
 const filter={role:req.query.role||{$in:['farmer','industry']}};
 if(req.query.status)filter.status=req.query.status;
 const users=await User.find(filter).sort({createdAt:-1});
 res.json({users:users.map(u=>u.toSafeJSON())});
}catch(e){next(e)}});
router.patch('/users/:id/approve',async(req,res,next)=>{try{
 const user=await User.findOneAndUpdate({_id:req.params.id,role:{$in:['farmer','industry']},status:'pending',otpVerifiedAt:{$ne:null}},
 {$set:{status:'approved',approvedAt:new Date()}},{new:true});
 if(!user)return res.status(404).json({message:'Verified pending account not found'});
 await Notification.create({user:user._id,message:'Your AgriLink account has been approved. You can now log in.',type:'success'});
 res.json({user:user.toSafeJSON(),message:'Account approved'});
}catch(e){next(e)}});
router.patch('/users/:id/reject',async(req,res,next)=>{try{
 const user=await User.findOneAndUpdate({_id:req.params.id,status:'pending'},{$set:{status:'rejected',rejectedAt:new Date()}},{new:true});
 if(!user)return res.status(404).json({message:'Pending account not found'});
 await Notification.create({user:user._id,message:'Your AgriLink registration was rejected.',type:'warning'});
 res.json({user:user.toSafeJSON(),message:'Account rejected'});
}catch(e){next(e)}});
router.delete('/users/:id',async(req,res,next)=>{try{
 const user=await User.findOneAndDelete({_id:req.params.id,role:{$in:['farmer','industry']}});
 if(!user)return res.status(404).json({message:'Account not found'});
 res.json({message:'Account deleted'});
}catch(e){next(e)}});
export default router;
