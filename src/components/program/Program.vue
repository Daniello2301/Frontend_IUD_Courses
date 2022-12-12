<script>
import Cookies from 'js-cookie'
import NavBar from "../Navbar.vue"
import Semesters from "../semester/ListSemester.vue"
import ProgramService from '../../services/ProgramService'
import Courses from '../course/Course.vue'

export default {
    name:"program-details",
    data() {
        return {
            token:Cookies.get("token"),
            user:JSON.parse(Cookies.get("user")),
            currentProgram: null,
            id_currentSemester: Number,
            msg:"",
        }
    },
    methods:{

        async getProgram(id){
            await ProgramService.get(id, this.token)
                .then(response => {
                    this.currentProgram = response.data?.data
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    components:{
        NavBar,
        Semesters,
        Courses
    },
    mounted(){
        this.getProgram(this.$route.params.id);
    }
}
</script>
<template>
    <NavBar />
    <div class="content-info-program">
        <div v-if="currentProgram" class="row text-center mt-5">
            <div class="col col-md-6">
                <div class="info-program p-5">
                    <h2 class="my-3" >{{currentProgram.name}}</h2>
                    <p class="my-3">{{currentProgram.description}}</p>
                    <div class="row">
                        <div class="col">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Duration</li>
                                <li class="list-group-item">{{currentProgram.duration}}</li>
                            </ul>
                        </div>
                        <div class="col">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Total Credits</li>
                                <li class="list-group-item">{{currentProgram.total_credits}}</li>
                            </ul>
                        </div>
                        <div class="col">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Value</li>
                                <li class="list-group-item">{{currentProgram.value}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-md-6">
                <div class="semesters">
                    <Semesters :id="currentProgram.id" :user_id="this.user?.role_id"/>
                </div>
            </div>
        </div>
        <div v-else class="col col-12 text-center mt-5">
            <h3> Program detail </h3>
        </div>
    </div>
</template>
<style>
    
</style>