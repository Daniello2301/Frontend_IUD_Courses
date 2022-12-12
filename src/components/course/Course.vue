<script>
import Cookies from 'js-cookie'
import CourseService from '../../services/CourseService'
import NavBar from "../Navbar.vue"

export default {
    name:"courses-semester",
    props:{
        id_semester: Number
    },
    data() {
        return {
            user: JSON.parse(Cookies.get("user")),
            token: Cookies.get("token"),
            courses:[],
            msg:'',
            founded: false
        }
    },
    methods: {
        async getCourseBySemester(id){
            await CourseService.getBySemester(id, this.token)
            .then(res =>  {
                this.courses = res.data?.data
                this.founded = true
                if(res.data?.data.length == 0){
                    this.msg = "Courses not found"
                    this.founded = false
                }
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    components:{
        NavBar
    },
    mounted() {
        this.getCourseBySemester(this.$route.params.id)
    }
}
</script>

<template lang="">
    <NavBar />
    <div>
        <div class="container mt-5">
            <div class="row text-center">
                <div class="col ">
                    <h1>Course Details</h1>
                </div>
                <div class="col ">
                    <router-link :to="'/home'" class="btn btn-secondary">Home</router-link>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div v-if="founded" class="courses-info p-5">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">name</th>
                                    <th scope="col">Teacher Name</th>
                                    <th scope="col">Pre Course</th>
                                    <th scope="col">Credits</th>
                                    <th scope="col">Auto Work</th>
                                    <th scope="col">Direct Work</th>
                                    <th v-if="this.user.role_id == 1 || this.user.role_id == 2 " scope="col">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(course, index) in courses" :key="index">
                                    <th scope="row">{{index}}</th>
                                    <td>{{course.name}}</td>
                                    <td>{{course.name_teacher}}</td>
                                    <td>{{course.pre_course}}</td>
                                    <td>{{course.credits}}</td>
                                    <td>{{course.time_auto_work}}</td>
                                    <td>{{course.time_direct_work}}</td>
                                    <td v-if="this.user.role_id == 1 || this.user.role_id == 2 "><router-link :to="'/course/'+course.id" class="link-warning">Edit</router-link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="text-center mt-5">
                        <h3 class="text-secondary">
                            {{this.msg}}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="">
    
</style>