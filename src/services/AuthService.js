import http from '../config/common-http';

class AuthService {

    login(data){
        return http.post('auth/login', data)
    }

    register(data){
        return http.post('auth/register', data)
    }

    logout(data, token){
        return http.post('auth/logout', data, {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
    }

}

export default new AuthService();