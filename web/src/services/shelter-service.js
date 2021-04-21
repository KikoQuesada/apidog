import http from './base-api-service';

const list = () => http.get('/shelters')

const detail = (id) => http.get(`/shelters/${id}`);

const register = (shelter) => {
    const data = new FormData()

    Object.keys(shelter).forEach(key => {
        if (key !== "city")
            data.append(key, shelter[key])
    })

    const [lng, lat] = shelter.city
    data.append('city[]', lng)
    data.append('city[]', lat)



    return http.post('/shelters', data)
    
}

const service = {
    list,
    detail,
    register
}

export default service;