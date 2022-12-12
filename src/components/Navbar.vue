<script>
import Cookies from 'js-cookie'
import AuthService from '../services/AuthService';

export default {
    name: 'navbar',
    data() {
        return {
            user: JSON.parse(Cookies.get("user")),
            token: Cookies.get("token")
        }
    },
    methods: {
        async logout() {
            await AuthService.logout(this.user, this.token)
                .then(response => {
                    if(response.data?.code == 200)
                    {
                        this.$router.push("/");
                    }
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

}
</script>
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/home">Home</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mx-5 me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link " to="/programs">Programs</router-link>
                    </li>
                    <li v-if="this.user.role_id == 1 || this.user.role_id == 2" class="nav-item">
                        <router-link class="nav-link" to="/crete-pro">Create Program</router-link>
                    </li>
                    <li v-if="this.user.role_id == 1 || this.user.role_id == 2" class="nav-item">
                        <router-link class="nav-link" to="/semesters">List All Semesters</router-link>
                    </li>
                    <li v-if="this.user.role_id == 1 || this.user.role_id == 2" class="nav-item">
                        <router-link class="nav-link" to="/courses">List All Courses</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link  disabled"  to="#">Contact</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link disabled" to="#">About</router-link>
                    </li>
                </ul>
                <div class="d-flex">
                    <p v-if="this.user" class="name-user text-light"> {{ user.name }} </p>
                    <a v-else href="/">Login</a>
                    <a @click="logout" class="nav-link text-light"><ion-icon
                            name="log-out-outline"></ion-icon></a>
                </div>
            </div>
        </div>
    </nav>
</template>

<style>
.router-link-active {
    font-size: 1rem;
    font-weight: 600;
    color: #000000;
}

.name-user {
    height: 100%;
    margin: auto;
}

ion-icon{
    height: 100%;
    font-size: 1.5rem;
    font-weight:bold;
    cursor: pointer;
}
</style>