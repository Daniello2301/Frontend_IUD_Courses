import http from '../config/common-http';

class CourseService {

    getAll(token) {
        return http.get('/course/all', {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
    }

    get(id, token) {
        return http.get(`/course/${id}/show`, {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        } );
    }

    getBySemester(id, token) {
        return http.get(`/course/${id}/semester`, {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        } );
    }

    create(data, token) {
        return http.post("/course/create", data , {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
    }

    update(id, data, token) {
        return http.put(`/course/${id}/update`, data, {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
    }

    delete(id, token) {
        return http.delete(`/course/${id}/destroy`, {
            headers: { 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
    }

}

export default new CourseService();