import axios from 'axios'

const AxiosHuggi = axios.create({
    baseURL: `https://api-inference.huggingface.co/models/finiteautomata/`,
    headers: {
        Authorization: `Bearer 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`
    }
})

export default AxiosHuggi