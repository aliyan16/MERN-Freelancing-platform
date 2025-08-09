import axios from 'axios'
const api=axios.create({baseURL:process.env.REACT_APP_API_URL + '/api'})
export const setAuthToken=(token:string|null)=>{
    if(token){
        api.defaults.headers.common['Authorization']
    }
    else{
        delete api.defaults.headers.common['Authorization']
    }
}

export default api