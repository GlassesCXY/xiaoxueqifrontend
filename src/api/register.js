import axios from './interceptors'

export const register = (data) => {
    const url = '/api/user/register'
    const config = {
        method: 'post',
        url: url,
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return axios(config)
}