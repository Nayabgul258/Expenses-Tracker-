import axios from "axios";

const API = axios.create({
  baseURL: 'https://expenses-tracker-xv2j.onrender.com'
  const interval = 30000;
function reloadwebsite (){
  axiox
  .get(baseURL)
  .then((responce) =>{
    console.log("Website reloded");
  })
  .catch((error) =>{
    console.log(`Error :${error.message}`)
  })
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
