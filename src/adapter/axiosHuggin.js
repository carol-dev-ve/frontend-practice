import axios from 'axios'


const token = process.env.REACT_APP_HUGGIN_TOKEN
const AxiosHuggi = axios.create({
    baseURL: `https://api-inference.huggingface.co/models/finiteautomata/`,
    headers: {
        Authorization: `Bearer ${token}`
    }
})
 
export default AxiosHuggi