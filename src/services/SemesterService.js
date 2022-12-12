import http from '../config/common-http';

class SemesterService {

    getAll(token) {
        return http.get('/semester/all', {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
    }

    get(id, token) {
        return http.get(`/semester/${id}/show`, {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        } );
    }

    getByProgram(id, token) {
        return http.get(`/semester/${id}/program`, {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        } );
    }

    create(data, token) {
        return http.post("/semester/create", data , {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
    }

    update(id, data, token) {
        return http.put(`/semester/${id}/update`, data, {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
    }

    delete(id, token) {
        return http.delete(`/semester/${id}/destroy`, {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
    }

}

export default new SemesterService();