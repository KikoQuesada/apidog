import http from './base-api-service';

const create = (adoption) => http.post('/adoptions', adoption)

const service = {
    create
}

export default service;