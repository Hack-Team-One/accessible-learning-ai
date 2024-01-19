import axios from "axios";
import { toast } from 'react-toastify';

axios.interceptors.response.use(null, error => {
  const expectedError = 
  error.response &&
  error.response >= 400 &&
  error.response < 500;

  if(!expectedError){
    //console.log('Logging the error', error);
    toast.error(`Error: ${error.response}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })
  }

  return Promise.reject(error)
})

export const http = {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete
}