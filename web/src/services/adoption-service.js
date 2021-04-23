import http from './base-api-service';

const create = (adoption) => http.post('/adoptions', adoption)

const update = (adoption) => http.patch(`/adoptions/${adoption.id}`, adoption)

const service = {
    create,
    update
}

export default service;