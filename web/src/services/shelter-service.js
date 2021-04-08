import http from './base-api-service';

const list = () => http.get('/shelters')

const service = {
    list
}

export default service;