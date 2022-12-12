<script>
import NavBar from '../Navbar.vue'
import Cookies from 'js-cookie'
import ProgramService from '../../services/ProgramService'

export default {
    name: "update-program",
    data() {
        return {
            user: JSON.parse(Cookies.get("user")),
            token: Cookies.get("token"),
            msg: "",
            currentProgram: null,
            updated: false
        }
    },
    methods: {

        async getProgram(id) {
            await ProgramService.get(id, this.token)
                .then(response => {
                    this.currentProgram = response.data?.data
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        async updateProgram(e) {
            e.preventDefault();
            await ProgramService.update(this.currentProgram.id, this.currentProgram, this.token)
                .then(response => {
                    if(response.status == 200)
                    {
                        this.updated = true;
                        this.currentProgram = null
                        this.msg = "Program updated successfully"
                    }else{
                        this.updated = false;
                    }
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });

        },

        async deleteProgram(e){
            e.preventDefault();
            await ProgramService.delete(this.currentProgram.id, this.token)
                .then(response => {
                    console.log(response);
                    if(response.data?.code == 200){
                        this.msg="Program deleted successfully"
                        this.currentProgram = null
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
        this.getProgram(this.$route.params.id)
    }
}
</script>
<template lang="">
    <NavBar />
    <div class="row text-center">
        <div class="col">
            <h1 class="text-center my-3">Edit Program</h1>
        </div>
        <div class="col">
            <router-link to="/programs" class="my-3 btn btn-secondary">Back</router-link>
        </div>
    </div>
    <div class="content-create-program d-grid justify-content-center">
        <div class="row">
            <div v-if="currentProgram" class="col col-md-8">
                <form  class="form-create p-5 text-center bg-secondary" style="width:30rem;">
                    <div class="input-group mb-3">
                        <input v-model="currentProgram.name" type="text" class="form-control" id="name" placeholder="Name" aria-label="name" required>
                    </div>
                    <div class="input-group mb-3">
                        <input v-model="currentProgram.description" type="text" class="form-control" id="description" placeholder="Description" aria-label="description" required>
                    </div>
                    <div class="input-group mb-3">
                        <input v-model="currentProgram.duration" type="text" class="form-control" id="duration" placeholder="Duration" aria-label="duration" required>
                    </div>
                    <div class="input-group mb-3">
                        <input v-model="currentProgram.value" type="number" class="form-control" id="value" placeholder="Value" aria-label="value" required>
                    </div>
                    <div class="input-group mb-3">
                        <input v-model="currentProgram.total_credits" type="number" class="form-control" id="totaL_credits" placeholder="Total Credits" aria-label="totaL_credits" required>
                    </div>
                    <button  v-on:click="updateProgram" class="btn btn-primary mx-5">Update</button>
                    <button v-if="this.user.role_id === 1" class="btn btn-danger mx-5 btn-delete" v-on:click="deleteProgram" >Delete</button>
                </form>
            </div>
            <div v-else class="col">
                <p>Please wait one moment...</p>
            </div>
            <div v-if="updated" class="col col-md-12 text-center my-3 msg-container">
                <p class="text-success">{{ msg }}</p>
                <router-link to="/programs" class="btn btn-secondary"> Back </router-link>
            </div>
            <div v-else class="col col-md-12 text-center my-3 msg-container">
                <p class="text-danger">{{ msg }}</p>
            </div>
        </div>
    </div>
</template>

<style>
.btn-delete{
    cursor: pointer;
}
</style>