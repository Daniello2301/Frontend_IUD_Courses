<script>
import CourseService from '../../services/CourseService';
import Cookies from 'js-cookie'
import NavBar from '../Navbar.vue'

export default {
    name:'semesters',
    data() {
        return {
            token: Cookies.get("token"),
            user: JSON.parse(Cookies.get("user")),
            courses:[],
            msg:''
        }
    },
    methods:{
        async getCourses(){
            console.log(this.token);
            await CourseService.getAll(this.token)
                .then(response => {
                    this.courses = response.data?.data
                    console.log(response);
                })
                .catch(error => {
                    if(error.response.status == 401)
                    {
                        this.$router.push("/")
                    }
                    console.log(error);
                })
        }
    },
    components: {
    NavBar
    },
    mounted(){
        this.getCourses();
    }
}
</script>
<template>
    <NavBar />
    <div class="row">
        <div class="col">
            <div class="row text-center my-3">
                <div class="col">
                    <h1> All Courses </h1>
                </div>
                <div v-if="this.user.role_id == 1 || this.user.role_id == 2"  class="col">
                    <router-link to="/create-course" class="btn btn-secondary">Add Course</router-link>
                </div>
            </div>
            <div class="row text-center">
                <div class="col col-md-8 p-5">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Teacher Name</th>
                                <th scope="col">Prerequisite Curse</th>
                                <th scope="col">Semester</th>
                                <th scope="col">Credits</th>
                                <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(course, index) in courses" :key="index">
                                    <th scope="row">{{index}}</th>
                                    <td>{{course.name}}</td>
                                    <td>{{course.name_teacher}}</td>
                                    <td>{{course.pre_course}}</td>
                                    <td>{{course.semester?.name}}</td>
                                    <td>{{course.credits}}</td>
                                    <td>
                                        <router-link :to="'/course/'+course.id" class="btn btn-warning">Edit</router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="">
    
</style>