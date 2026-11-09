import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import {connectDB} from './config/db.js';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import notificationRoutes from './routes/notifications.js';

const app=express();
app.use(helmet());
app.use(cors({origin:(process.env.CLIENT_URL||'http://localhost:5173').split(',').map(x=>x.trim()),credentials:true}));
app.use(express.json({limit:'8mb'}));
app.use(express.urlencoded({extended:true,limit:'8mb'}));
if(process.env.NODE_ENV!=='production')app.use(morgan('dev'));
app.use('/api',rateLimit({windowMs:15*60*1000,limit:300,standardHeaders:true,legacyHeaders:false}));
app.get('/api/health',(req,res)=>res.json({status:'ok',service:'AgriLink API'}));
app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/notifications',notificationRoutes);
app.use((req,res)=>res.status(404).json({message:'API route not found'}));
app.use((err,req,res,next)=>{console.error(err);res.status(err.status||500).json({message:err.message||'Server error'})});

async function start(){
 await connectDB();
 const email=(process.env.ADMIN_EMAIL||'admin@agriconnect.in').toLowerCase();
 if(!await User.exists({email})){
  const password=process.env.ADMIN_PASSWORD;
  if(!password)console.warn('ADMIN_PASSWORD not set; admin account not seeded.');
  else await User.create({role:'admin',name:process.env.ADMIN_NAME||'AgriLink Admin',email,passwordHash:await bcrypt.hash(password,12),status:'approved'});
 }
 const port=Number(process.env.PORT||5000);
 app.listen(port,()=>console.log(`AgriLink API listening on ${port}`));
}
start().catch(err=>{console.error('Startup failed:',err);process.exit(1)});
