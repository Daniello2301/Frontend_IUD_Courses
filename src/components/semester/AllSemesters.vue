<script>

import SemesterService from '../../services/SemesterService';
import Cookies from 'js-cookie'
import NavBar from '../Navbar.vue'

export default {
    name:'semesters',
    data() {
        return {
            token: Cookies.get("token"),
            user: JSON.parse(Cookies.get("user")),
            semesters:[],
            msg:''
        }
    },
    methods:{
        async getSemesters(){
            console.log(this.token);
            await SemesterService.getAll(this.token)
                .then(response => {
                    this.semesters = response.data?.data
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
        this.getSemesters();
    }
}
</script>

<template>
    <NavBar />
    <div class="row">
        <div class="col">
            <div class="row text-center my-3">
                <div class="col">
                    <h1> All Semesters </h1>
                </div>
                <div v-if="this.user.role_id == 1 || this.user.role_id == 2"  class="col">
                    <router-link to="/create-semester" class="btn btn-secondary">Add Semester</router-link>
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
                                <th scope="col">Duration</th>
                                <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(semester, index) in semesters" :key="index">
                                    <th scope="row">{{index}}</th>
                                    <td>{{semester.name}}</td>
                                    <td>{{semester.duration}}</td>
                                    <td>
                                        <router-link :to="'/semester/'+semester.id" class="btn btn-warning">Edit</router-link>
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

<style>
.row{
    width: 100%;
    justify-content:center ;
}
</style>