<script>
import NavBar from '../Navbar.vue'
import Cookies from 'js-cookie'
import SemesterService from '../../services/SemesterService';
import ProgramService from '../../services/ProgramService'

export default {
    name: "create-program",
    data() {
        return {
            token: Cookies.get("token"),
            msg: "",
            created: false,
            programs: [],
            semester: {
                name: "",
                duration: "",
                program_id: ""
            }
        }
    },
    methods: {
        async createProgram(e) {
            e.preventDefault();
            var data = {
                name: this.semester.name,
                duration: this.semester.duration,
                program_id: this.semester.program_id,
            }
            console.log(data);
            await SemesterService.create(data, this.token)
                .then(response => {
                    console.log(response);
                    if (response.data.code == 200) {
                        this.created = true;
                        this.msg = "The program was successfully created"
                        this.semester.name = "",
                        this.semester.duration = "",
                        this.semester.program_id = ""
                    } else {
                        this.created = false;
                        this.msg = "Internal Error"
                    }
                })
                .catch(error => {
                    alert(error.response.data?.message)
                    console.log(error);
                })
        },
        async getPrograms() {
            console.log(this.token);
            await ProgramService.getAll(this.token)
                .then(response => {
                    this.programs = response.data?.data
                    console.log(response);
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        this.$router.push("/")
                    }
                    console.log(error);
                })
        }
    },
    components: {
        NavBar
    },
    mounted() {
        this.getPrograms();
    }
}
</script>

<template >
    <NavBar />
    <div class="container my-5">
        <div class="row text-center my-5">
            <div class="col col-md-6">
                <h1> Create Semester </h1>
            </div>
            <div class="col col-md-6">
                <router-link to="/semesters" class="btn btn-secondary"> Back </router-link>
            </div>
        </div>
        <div class="row my-5">
            <div class="form-create">
                <form @submit.prevent="createProgram" class="form-create p-5 text-center bg-secondary"
                    style="width:30rem;">
                    <div class="input-group mb-3">
                        <input v-model="semester.name" type="text" class="form-control" id="name" placeholder="Name"
                            aria-label="name">
                    </div>
                    <div class="input-group mb-3">
                        <input v-model="semester.duration" type="text" class="form-control" id="duration"
                            placeholder="Duration" aria-label="duration" required>
                    </div>
                    <div class="input-group mb-3">
                        <select v-model="semester.program_id" class="form-select " id="program">
                            <option selected>- - -</option>
                            <option v-for="(program, index) in programs" :value="program.id" :key="index">
                                {{ program.name }}</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary mx-5">Create</button>
                </form>
            </div>
            <div v-if="created" class="col col-md-12 text-center my-3 msg-container">
                <p class="text-success">{{ msg }}</p>
            </div>
            <div v-else class="col col-md-12 text-center my-3 msg-container">
                <p class="text-danger">{{ msg }}</p>
            </div>
        </div>
    </div>
</template>

<style >
.form-create {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>