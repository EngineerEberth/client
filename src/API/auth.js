import axios from "axios";
const API='https://fly-airlines-backend-2.onrender.com/api'
export const registerRequest= user => axios.post(`${API}/register`,user)