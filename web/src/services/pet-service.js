import http from './base-api-service';

const list = (race) => {
    const options = {}

    if(race) {
        options.params = {
            race
        }
    }

    return http.get('/pets', options)
};

const detail = (id) => http.get(`/pets/${id}`);

const create = (pet) => http.post('/pets', pet)

const update = (pet) => http.put(`/pets/${pet.id}`, pet)

const service = {
    list,
    detail,
    create,
    update
}



export default service;