<script>
import NavBar from '../Navbar.vue'
import Cookies from 'js-cookie'
import ProgramService from '../../services/ProgramService'

export default {
    name: "create-program",
    data() {
        return {
            token: Cookies.get("token"),
            msg: "",
            program: {
                name: "",
                description: "",
                duration: "",
                value: "",
                total_credits: ""
            }
        }
    },
    methods: {
        async createProgram(e) {
            e.preventDefault();
            var data = {
                name:this.program.name,
                description:this.program.description,
                duration:this.program.duration,
                value:this.program.value,
                total_credits: this.program.total_credits,
            }
            console.log(data);
            await ProgramService.create(data, this.token)
                .then(response =>{
                    console.log(response);
                    if(response.data.code == 200)
                    {
                        this.msg="The program was successfully created"
                        this.program.name = "",
                        this.program.description = "",
                        this.program.duration = "",
                        this.program.value = "",
                        this.program.total_credits = ""
                    }
                })
                .catch(error =>{
                    console.log(error);
                })
        }
    },
    components: {
        NavBar
    }
}
</script>
<template lang="">
    <NavBar />
    <div class="row text-center">
        <div class="col">
            <h1 class="text-center my-3">Create Program</h1>
        </div>
        <div class="col">
            <router-link to="/programs" class="my-3 btn btn-secondary">Back</router-link>
        </div>
    </div>
    <div class="content-create-program d-grid justify-content-center">
        <div class="row">
            <div class="col col-md-8">
                <form @submit.prevent="createProgram" class="form-create p-5 text-center bg-secondary" style="width:30rem;">
                    <div class="input-group mb-3">
                        <input v-model="program.name" type="text" class="form-control" id="name" placeholder="Name" aria-label="name" required>
                    </div>
                    <div class="input-group mb-3">
                        <input v-model="program.description" type="text" class="form-control" id="description" placeholder="Description" aria-label="description" required>
                    </div>
                    <div class="input-group mb-3">
                        <input v-model="program.duration" type="text" class="form-control" id="duration" placeholder="Duration" aria-label="duration" required>
                    </div>
                    <div class="input-group mb-3">
                        <input v-model="program.value" type="number" class="form-control" id="value" placeholder="Value" aria-label="value" required>
                    </div>
                    <div class="input-group mb-3">
                        <input v-model="program.total_credits" type="number" class="form-control" id="totaL_credits" placeholder="Total Credits" aria-label="totaL_credits" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Create</button>
                </form>
                <p class="text-success text-center my-2">
                    {{this.msg}}
                </p>
            </div>
        </div>
    </div>
</template>
<style >
.content-create-program .form-create {
    background-color: #D0D0D0;
    border-radius: 10px;
}
</style>