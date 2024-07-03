import axios from './interceptors'

export const login = (data) => {
    const url = '/api/user/login'
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
