<script>
import NavBar from '../Navbar.vue'
import Cookies from 'js-cookie'
import CourseService from '../../services/CourseService'
import SemesterService from '../../services/SemesterService'

export default {
    name: "update-program",
    data() {
        return {
            user: JSON.parse(Cookies.get("user")),
            token: Cookies.get("token"),
            msg: "",
            currentCourse: null,
            semesters:[],
            updated: false
        }
    },
    methods: {

        async getSemesters(){
            await SemesterService.getAll(this.token)
                .then(res => {
                    this.semesters = res.data?.data
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        },

        async getCourse(id) {
            await CourseService.get(id, this.token)
                .then(response => {
                    this.currentCourse = response.data?.data
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        
        async updateCourse(e) {
            e.preventDefault();
            await CourseService.update(this.currentCourse.id, this.currentCourse, this.token)
                .then(response => {
                    if (response.data?.code != 200) {
                        this.msg = "Internal Error"
                        this.updated = false
                    }
                    this.msg = "Semester updated successfully"
                    this.updated = true
                    this.currentCourse = null
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });

        },

        async deleteCourse(e) {
            e.preventDefault();
            await CourseService.delete(this.currentCourse.id, this.token)
                .then(response => {
                    console.log(response);
                    if (response.data?.code == 200) {
                        this.msg = "Program deleted successfully"
                        this.currentCourse = null
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    components: {
        NavBar
    },
    mounted() {
        this.getCourse(this.$route.params.id)
        this.getSemesters()
    }
}
</script>
<template lang="">
    <NavBar />
    <div class="row text-center my-3">
        <div class="col">
            <h3 class="text-center my-3">Edit Course</h3>
        </div>
        <div class="col">
            <router-link to="/courses" class="my-3 btn btn-secondary">Back</router-link>
        </div>
    </div>
    <div class="content-create-program d-grid justify-content-center">
        <div class="row">
            <div v-if="currentCourse" class="col col-md-10">
                <form  class="form-create p-5 bg-secondary" style="width:40rem;">
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="name" class="form-label mx-3">Name</label>
                                <input v-model="currentCourse.name" type="text" class="form-control" id="name" placeholder="Name" aria-label="name" required>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="name_teacher" class="form-label mx-3">Teacher Name</label>
                                <input v-model="currentCourse.name_teacher" type="text" class="form-control" id="name_teacher" placeholder="Teacher Name" aria-label="name_teacher" required>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label for="pre_course" class="form-label mx-3"> Prerequisite Course </label>
                                <input v-model="currentCourse.pre_course" type="text" class="form-control" id="pre_course" placeholder="Prerequisite Course" aria-label="pre_course" required>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label for="semester_id" class="form-label mx-3"> Semester </label>
                                <select v-show="this.semesters.length > 0" v-model="currentCourse.semester_id" class="form-select " id="semester_id">
                                    <option selected>- - -</option>
                                    <option  v-for="(semester, index) in semesters" :value="semester.id" :key="index">
                                        {{ semester.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3" style="width:7rem;">
                                <label for="totaL_credits" class="form-label mx-3"> Credits </label>
                                <input v-model="currentCourse.credits" type="number" class="form-control" id="totaL_credits" placeholder="Total Credits" aria-label="totaL_credits" required>
                            </div>
                        </div>
                        <div class="col">
                            <div class=" mb-3" style="width:12rem;">
                                <label for="time_auto_work" class="form-label mx-3"> Autonomous Work </label>
                                <input v-model="currentCourse.time_auto_work" type="number" class="form-control" id="time_auto_work" placeholder="Autonomous Work" aria-label="time_auto_work" required>
                            </div>
                        </div>
                        <div class="col">         
                            <div class="mb-3">
                                <label for="time_direct_work" class="form-label mx-3"> Directed Work </label>
                                <input v-model="currentCourse.time_direct_work" type="number" class="form-control" id="time_direct_work" placeholder="Time Directed Work" aria-label="time_direct_work" required>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex mt-3">
                        <button  v-on:click="updateCourse" class="btn btn-primary mx-5">Update</button>
                        <button v-if="this.user.role_id === 1 || this.user.role_id === 2" class="btn btn-danger mx-5 btn-delete" v-on:click="deleteCourse" >Delete</button>
                    </div>
                </form>
            </div>
            <div v-else class="col">
                <p>Please wait one moment...</p>
            </div>
            <div v-if="updated" class="col col-md-12 text-center my-3 msg-container">
                <p class="text-success">{{ msg }}</p>
                <router-link to="/courses" class="btn btn-secondary"> Back </router-link>
            </div>
            <div v-else class="col col-md-12 text-center my-3 msg-container">
                <p class="text-danger">{{ msg }}</p>
            </div>
        </div>
    </div>
</template>

<style>
    
</style>