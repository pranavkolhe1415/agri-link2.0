import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api, getToken, setToken } from '../../services/api'

const AppContext = createContext(null)
const idOf = x => x?.id || x?._id
const mapUser = u => u ? ({...u,id:idOf(u),type:u.role||u.type,registeredAt:u.registeredAt||u.createdAt}) : u
const mapProduct = p => p ? ({...p,id:idOf(p),farmerId:p.farmer?._id||p.farmer,farmerName:p.farmerName||p.farmer?.name,farmerLocation:p.farmerLocation||p.farmer?.address,date:p.harvestDate||p.createdAt}) : p
const mapOrder = o => o ? ({...o,id:idOf(o),industryId:o.industry?._id||o.industry,industryName:o.industry?.companyName||o.industry?.name,farmerId:o.farmer?._id||o.farmer,farmerName:o.farmer?.name,productId:o.product?._id||o.product,productName:o.product?.name,category:o.product?.category,photo:o.product?.photo,date:o.createdAt}) : o

export function AppProvider({ children }) {
  const [users,setUsers]=useState([])
  const [products,setProducts]=useState([])
  const [orders,setOrders]=useState([])
  const [cart,setCart]=useState([])
  const [notifications,setNotifications]=useState([])
  const [currentUser,setCurrentUser]=useState(null)
  const [ready,setReady]=useState(false)

  const refreshProducts=useCallback(async()=>{const d=await api('/products');setProducts((d.products||[]).map(mapProduct))},[])
  const refreshUsers=useCallback(async()=>{
    if(!getToken())return
    try{const d=await api('/admin/users');setUsers((d.users||[]).map(mapUser))}catch{}
  },[])
  const refreshOrders=useCallback(async()=>{
    if(!getToken())return
    try{const d=await api('/orders/mine');setOrders((d.orders||[]).map(mapOrder))}catch{}
  },[])
  const refreshNotifications=useCallback(async()=>{
    if(!getToken())return
    try{const d=await api('/notifications');setNotifications(d.notifications||[])}catch{}
  },[])

  useEffect(()=>{
    let alive=true
    Promise.all([
      refreshProducts(),
      getToken()?api('/auth/me').then(d=>{if(alive)setCurrentUser(mapUser(d.user))}).catch(()=>{setToken(null);if(alive)setCurrentUser(null)}):Promise.resolve()
    ]).finally(()=>{if(alive)setReady(true)})
    return()=>{alive=false}
  },[refreshProducts])

  useEffect(()=>{if(currentUser?.type==='admin')refreshUsers()},[currentUser,refreshUsers])
  useEffect(()=>{if(currentUser){refreshOrders();refreshNotifications()}},[currentUser,refreshOrders,refreshNotifications])

  const registerUser=useCallback(async(userData)=>{
    const role=userData.type
    const payload={...userData,role}
    delete payload.type;delete payload.confirmPassword
    return await api('/auth/register',{method:'POST',body:payload})
  },[])
  const loginUser=useCallback(async(email,password,type)=>{
    try{
      const d=await api('/auth/login',{method:'POST',body:{email,password,role:type}})
      setToken(d.token);const user=mapUser(d.user);setCurrentUser(user)
      await refreshProducts()
      return {user}
    }catch(e){return {error:e.code==='PENDING'?'pending':e.code==='REJECTED'?'rejected':e.message}}
  },[refreshProducts])
  const loginAdmin=useCallback(async(email,password)=>{
    try{const d=await api('/auth/login',{method:'POST',body:{email,password,role:'admin'}});setToken(d.token);const user=mapUser(d.user);setCurrentUser(user);return {user}}
    catch(e){return {error:e.message}}
  },[])
  const logout=useCallback(()=>{
    setToken(null);setCurrentUser(null);setCart([]);setUsers([]);setOrders([]);setNotifications([])
  },[])

  const approveUser=useCallback(async(userId)=>{
    await api(`/admin/users/${userId}/approve`,{method:'PATCH'});await refreshUsers()
  },[refreshUsers])
  const rejectUser=useCallback(async(userId)=>{
    await api(`/admin/users/${userId}/reject`,{method:'PATCH'});await refreshUsers()
  },[refreshUsers])
  const deleteUser=useCallback(async(userId)=>{
    await api(`/admin/users/${userId}`,{method:'DELETE'});await refreshUsers()
  },[refreshUsers])

  const addProduct=useCallback(async(productData)=>{
    const d=await api('/products',{method:'POST',body:productData});await refreshProducts();return d.product
  },[refreshProducts])
  const deleteProduct=useCallback(async(productId)=>{await api(`/products/${productId}`,{method:'DELETE'});await refreshProducts()},[refreshProducts])
  const updateProductQuantity=useCallback(async()=>{await refreshProducts()},[refreshProducts])

  const addToCart=useCallback((product,qty=1)=>{
    setCart(prev=>{const pid=idOf(product);const found=prev.find(x=>x.productId===pid);if(found)return prev.map(x=>x.productId===pid?{...x,quantity:Math.min(x.quantity+qty,product.quantity)}:x);return [...prev,{productId:pid,product,quantity:qty}]})
  },[])
  const updateCartQty=useCallback((productId,qty)=>setCart(prev=>qty<=0?prev.filter(x=>x.productId!==productId):prev.map(x=>x.productId===productId?{...x,quantity:qty}:x)),[])
  const removeFromCart=useCallback((productId)=>setCart(prev=>prev.filter(x=>x.productId!==productId)),[])
  const clearCart=useCallback(()=>setCart([]),[])
  const placeOrder=useCallback(async(industryUser,product,quantity)=>{
    const d=await api('/orders',{method:'POST',body:{productId:idOf(product),quantity}})
    await Promise.all([refreshProducts(),refreshOrders(),refreshNotifications()]);return d.order
  },[refreshProducts,refreshOrders,refreshNotifications])
  const addNotification=useCallback(()=>{},[])
  const markNotificationsRead=useCallback(async()=>{await api('/notifications/read-all',{method:'PATCH'});await refreshNotifications()},[refreshNotifications])
  const getUserNotifications=useCallback((userId)=>notifications.filter(n=>(n.user?.toString?.()||n.user)===userId),[notifications])

  const value={users,products,orders,cart,notifications,currentUser,ready,
    addNotification,registerUser,loginUser,loginAdmin,logout,approveUser,rejectUser,deleteUser,
    addProduct,deleteProduct,updateProductQuantity,addToCart,updateCartQty,removeFromCart,clearCart,
    placeOrder,markNotificationsRead,getUserNotifications,refreshProducts,refreshUsers,refreshOrders}
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export const useApp=()=>{const ctx=useContext(AppContext);if(!ctx)throw new Error('useApp must be used within AppProvider');return ctx}
