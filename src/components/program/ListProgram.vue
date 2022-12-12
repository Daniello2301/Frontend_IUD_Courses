<script>
import NavBar from '../Navbar.vue'
import Cookies from 'js-cookie'
import ProgramService from '../../services/ProgramService'

export default {
    data() {
        return {
            user: JSON.parse(Cookies.get("user")),
            token: Cookies.get("token"),
            programs:[],
        }
    },
    methods:{
        async getPrograms(){
            console.log(this.token);
            await ProgramService.getAll(this.token)
                .then(response => {
                    this.programs = response.data?.data
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
    components:{
        NavBar
    },
    mounted(){
        this.getPrograms();
    }
}
</script>
<template lang="">
    <NavBar />
    <div class="container p-5">
        <h1 class="text-center my-3">List Programs</h1>
        <div class="content-programs">
            <div class="row">
                <div v-for="(program, index) in programs"  :key="program.id" class="col col-md-4 col-sm-12 mt-5">
                    <div  class="card">
                        <div class="card-body">
                            <h5 class="card-title text-center">{{program.name}}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{{program.duration}}</h6>
                            <p class="card-text">{{program.description}}</p>
                            <div class="d-flex">
                                <p class="card-text mx-3 text-center"><strong>Value: </strong>{{program.value}}</p>
                                <p class="card-text mx-3 text-center"><strong>Credits: </strong>{{program.total_credits}}</p>
                            </div>
                            <router-link :to="'/program/'+program.id" class="card-link">Read More</router-link>
                            <router-link v-if="this.user.role_id == 1 || this.user.role_id == 2" :to="'/update-pro/'+program.id" class="card-link">Edit</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

.card{
    width: 18rem;
    max-height: 22rem;
}
.card .card-text
{
    max-height: 6rem;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>