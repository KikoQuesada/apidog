import http from './base-api-service';
import UserDetail from './../components/users/user-detail/UserDetail';

export const login = (email, password) => http.post('/login', { email, password})

export const logout = () => http.post('/logout')

export const registerUser = (user) => {
    const data = new FormData()

    Object.keys(user).forEach(key => {
        if (key !== "city")
            data.append(key, user[key])
    })

    const [lng, lat] = user.city
    data.append('city[]', lng)
    data.append('city[]', lat)



    return http.post('/adopters', data)
}

export const detail = (id) => http.get(`/adopters/${id}`);
