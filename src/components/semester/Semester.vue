<script>
import NavBar from '../Navbar.vue'
import SemesterService from '../../services/SemesterService';
import ProgramService from '../../services/ProgramService';
import Cookies from 'js-cookie'

export default {
    name: "semester-details",
    data() {
        return {
            updated: false,
            currentSemester: null,
            program: null,
            msg: '',
            token: Cookies.get("token"),
            user: JSON.parse(Cookies.get("user")),
        }
    },
    methods: {

        async getSemester(id) {
            await SemesterService.get(id, this.token)
                .then(res => {
                    this.currentSemester = res.data?.data
                    this.getProgram(res.data?.data.program_id)
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        },

        async getProgram(id) {
            await ProgramService.get(id, this.token)
                .then(response => {
                    this.program = response.data?.data
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async updateSemester(e) {
            e.preventDefault();
            await SemesterService.update(this.currentSemester.id, this.currentSemester, this.token)
                .then(response => {
                    if (response.data?.code != 200) {
                        this.msg = "Internal Error"
                        this.updated = false
                    }
                    this.msg = "Semester updated successfully"
                    this.updated = true
                    this.currentSemester = null
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });

        },

    },
    components: {
        NavBar
    },
    mounted() {
        this.getSemester(this.$route.params.id)
    }
}
</script>

<template >
    <NavBar />
    <div class="container my-5">
        <div class="row text-center my-5">
            <div class="col col-md-6">
                <h1> Semester Details </h1>
            </div>
            <div class="col col-md-6">
                <router-link to="/semesters" class="btn btn-secondary"> Back </router-link>
            </div>
        </div>
        <div class="row my-5">
            <div v-if="currentSemester" class="form-update">
                <form class="form-create p-5 text-center bg-secondary" style="width:30rem;">
                    <div class="input-group mb-3">
                        <input v-model="currentSemester.name" type="text" class="form-control" id="name"
                            placeholder="Name" aria-label="name" disabled>
                    </div>
                    <div class="input-group mb-3">
                        <input v-model="currentSemester.duration" type="text" class="form-control" id="duration"
                            placeholder="Duration" aria-label="duration" required>
                    </div>
                    <div class="input-group mb-3">
                        <input v-if="this.program" v-model="program.name" type="text" class="form-control" id="Program"
                            placeholder="Program" aria-label="description" required disabled>
                    </div>
                    <button v-on:click="updateSemester" class="btn btn-primary mx-5">Update</button>
                </form>
            </div>
            <div v-if="updated" class="col col-md-12 text-center my-3 msg-container">
                <p class="text-success">{{ msg }}</p>
                <router-link to="/semesters" class="btn btn-secondary"> Back </router-link>
            </div>
            <div v-else class="col col-md-12 text-center my-3 msg-container">
                <p class="text-danger">{{ msg }}</p>
            </div>
        </div>
    </div>
</template>

<style >
.form-update {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>