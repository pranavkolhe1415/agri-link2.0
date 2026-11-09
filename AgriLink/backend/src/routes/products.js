import { Router } from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { protect,allow } from '../middleware/auth.js';
const router=Router();
router.get('/',async(req,res,next)=>{try{
 const filter={isActive:true}; if(req.query.category && req.query.category!=='all')filter.category=req.query.category;
 if(req.query.search)filter.name={$regex:req.query.search,$options:'i'};
 const products=await Product.find(filter).populate('farmer','name companyName address');
 res.json({products});
}catch(e){next(e)}});
router.post('/',protect,allow('farmer'),async(req,res,next)=>{try{
 const {category,name,price,unit='kg',quantity,photo,harvestDate,description}=req.body;
 if(!['vegetables','fruits','grains','dairy','spices'].includes(category))return res.status(400).json({message:'Invalid category'});
 if(!name || Number(price)<0 || Number(quantity)<=0)return res.status(400).json({message:'Enter valid product details and bulk quantity'});
 const p=await Product.create({farmer:req.user._id,farmerName:req.user.name,farmerLocation:req.user.address,category,name,price:Number(price),unit,quantity:Number(quantity),photo,harvestDate:harvestDate||new Date(),description});
 res.status(201).json({product:p});
}catch(e){next(e)}});
router.get('/mine',protect,allow('farmer'),async(req,res,next)=>{try{res.json({products:await Product.find({farmer:req.user._id}).sort({createdAt:-1})})}catch(e){next(e)}});
router.delete('/:id',protect,allow('farmer','admin'),async(req,res,next)=>{try{
 const filter={_id:req.params.id}; if(req.user.role==='farmer')filter.farmer=req.user._id;
 const p=await Product.findOneAndUpdate(filter,{isActive:false},{new:true}); if(!p)return res.status(404).json({message:'Product not found'});
 res.json({message:'Product removed'});
}catch(e){next(e)}});
export default router;
