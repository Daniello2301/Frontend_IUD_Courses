import http from '../config/common-http';

class ProgramService {

    getAll(token) {
        return http.get('/program/all', {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
    }

    get(id, token) {
        return http.get(`/program/${id}/show`, {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        } );
    }

    create(data, token) {
        return http.post("/program/create", data , {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
    }

    update(id, data, token) {
        return http.put(`/program/${id}/update`, data, {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
    }

    delete(id, token) {
        return http.delete(`/program/${id}/destroy`, {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
    }

}

export default new ProgramService();