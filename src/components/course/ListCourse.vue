<script>
import NavBar from '../Navbar.vue'
import Cookies from 'js-cookie'
import CourseService from '../../services/CourseService'

export default {
    data() {
        return {
            user: JSON.parse(Cookies.get("user")),
            token: Cookies.get("token"),
            courses:[],
        }
    },
    methods:{
        async getCourses(){
            console.log(this.token);
            await CourseService.getAll(this.token)
                .then(response => {
                    this.courses = response.data?.data
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
        this.getCourses();
    }
}
</script>
<template>
    <div>
        <h1>List Course</h1>
    </div>
</template>
<style >
    
</style>