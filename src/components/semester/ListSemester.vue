<template lang="">
    <div>
        <div class="row text-center">
            <div class="col">
                <h1>Semesters</h1>
            </div>
            <div v-if="user_id == 1 || user_id == 2 " class="col">
                <router-link to="/create-semester" class="btn btn-secondary"> Add New Semester</router-link>
            </div>
        </div>
        <div v-for="(semester, index) in semesters" ::key="index">
            <router-link :to="'/courses/'+semester.id+'/semester'" class="btn btn-info my-3"> {{ semester.name }}</router-link>
        </div>
        <div class="col col-md-12 text-center my-3 msg-container">
                <p class="text-danger">{{ this.msg }}</p>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie'
import SemesterService from '../../services/SemesterService';

export default {
    name: "semesters-program",
    props: {
        id: Number,
        user_id: Number
    },
    data() {
        return {
            semesters: [],
            msg: '',
            token: Cookies.get("token"),
            user: JSON.parse(Cookies.get("user")),
        }
    }, 
    methods: {
        async getSemesters(id, token) {
            console.log(id);
            await SemesterService.getByProgram(id, token)
                .then(res => {
                    this.semesters = res.data?.data
                    console.log(res);
                    if (res.data?.data.length == 0) {
                        this.msg = "Semesters not found"
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    mounted() {
        this.getSemesters(this.id, this.token)
    }
}
</script>
<style lang="">
    
</style>