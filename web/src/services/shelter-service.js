import http from './base-api-service';

const list = () => http.get('/shelters')

const detail = (id) => http.get(`/shelters/${id}`);

const register = (user) => {
    const data = new FormData()

    Object.keys(user).forEach(key => {
        data.append(key, user[key])
    })

    return http.post('/shelters', data)
    
}

const service = {
    list,
    detail,
    register
}

export default service;