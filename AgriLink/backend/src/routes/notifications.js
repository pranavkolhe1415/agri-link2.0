import {Router} from 'express';
import Notification from '../models/Notification.js';
import {protect} from '../middleware/auth.js';
const router=Router();router.use(protect);
router.get('/',async(req,res,next)=>{try{res.json({notifications:await Notification.find({user:req.user._id}).sort({createdAt:-1})})}catch(e){next(e)}});
router.patch('/read-all',async(req,res,next)=>{try{await Notification.updateMany({user:req.user._id},{$set:{read:true}});res.json({message:'Notifications marked as read'})}catch(e){next(e)}});
export default router;
