import http from './base-api-service';

const list = () => http.get('/pets');

const service = {
    list
}

export default service;