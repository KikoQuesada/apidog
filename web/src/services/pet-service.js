import http from './base-api-service';

const list = () => http.get('/pets');

const detail = (id) => http.get(`/pets/${id}`);

const service = {
    list,
    detail
}

export default service;