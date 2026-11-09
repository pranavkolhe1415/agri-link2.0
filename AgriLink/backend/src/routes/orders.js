import { Router } from 'express';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Notification from '../models/Notification.js';
import { protect,allow } from '../middleware/auth.js';
const router=Router(); router.use(protect,allow('industry'));
router.post('/',async(req,res,next)=>{
 let reservedProduct=null;
 try {
  const {productId,quantity}=req.body; const qty=Number(quantity);
  if(!Number.isFinite(qty)||qty<=0)return res.status(400).json({message:'Enter a valid quantity'});
  // Atomic stock reservation prevents two buyers from purchasing the same remaining stock.
  reservedProduct=await Product.findOneAndUpdate(
   {_id:productId,isActive:true,quantity:{$gte:qty}},
   {$inc:{quantity:-qty}},
   {new:true}
  );
  if(!reservedProduct){
   const exists=await Product.exists({_id:productId,isActive:true});
   return res.status(exists?409:404).json({message:exists?'Requested quantity exceeds available stock':'Product not found'});
  }
  const order=await Order.create({
   industry:req.user._id,farmer:reservedProduct.farmer,product:reservedProduct._id,
   quantity:qty,unit:reservedProduct.unit,pricePerUnit:reservedProduct.price,
   totalAmount:reservedProduct.price*qty
  });
  await Notification.create([
   {user:reservedProduct.farmer,message:`${req.user.companyName||req.user.name} ordered ${qty} ${reservedProduct.unit} of ${reservedProduct.name}.`,type:'success'},
   {user:req.user._id,message:`Your order for ${reservedProduct.name} has been placed.`,type:'success'}
  ]);
  res.status(201).json({order});
 } catch(e) {
  // Restore inventory if order creation or notification persistence fails after reservation.
  if(reservedProduct?._id) await Product.updateOne({_id:reservedProduct._id},{$inc:{quantity:Number(req.body.quantity)||0}}).catch(()=>{});
  next(e);
 }
});
router.get('/mine',async(req,res,next)=>{try{
 const field=req.user.role==='farmer'?'farmer':'industry';
 const orders=await Order.find({[field]:req.user._id}).populate('farmer','name').populate('industry','companyName name').populate('product','name category photo').sort({createdAt:-1});
 res.json({orders});
}catch(e){next(e)}});
export default router;
