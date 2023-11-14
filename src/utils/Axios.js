import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://216.107.136.206:4000/',
});

// prod - http://216.107.136.206:4000
// stag - https://e-commerce-d01f.onrender.com/
// dev- http://192.168.1.9:4000
export default axiosInstance;
