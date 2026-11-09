const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'agrilink_token';
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = token => token ? localStorage.setItem(TOKEN_KEY, token) : localStorage.removeItem(TOKEN_KEY);
export async function api(path, options={}) {
  const headers = { ...(options.body instanceof FormData ? {} : {'Content-Type':'application/json'}), ...(options.headers||{}) };
  const token=getToken(); if(token) headers.Authorization=`Bearer ${token}`;
  const response=await fetch(`${API_URL}${path}`,{...options,headers,body:options.body && !(options.body instanceof FormData) ? JSON.stringify(options.body) : options.body});
  const data=await response.json().catch(()=>({message:'Unexpected server response'}));
  if(!response.ok){const error=new Error(data.message||'Request failed');error.status=response.status;error.code=data.code;throw error;}
  return data;
}
