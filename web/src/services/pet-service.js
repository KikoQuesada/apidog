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

const service = {
    list,
    detail
}

export default service;