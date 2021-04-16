import http from './base-api-service';

const list = () => http.get('/shelters')

const detail = (id) => http.get(`/shelters/${id}`);

const service = {
    list,
    detail
}

export default service;