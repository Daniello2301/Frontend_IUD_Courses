<script>
import AuthService from '../services/AuthService';
import Cookies from 'js-cookie';

export default {
    name:"login",
    data() {
        return {
            msg: "",
            code: '',
            user:{
                email:"",
                password:"",
            }
        }
    },
    methods: {
        async login(e){
            e.preventDefault();
            var user = {
                email: this.user.email,
                password: this.user.password,
            }
            await AuthService.login(user)
                .then(response => {
                    Cookies.set("user", JSON.stringify(response.data?.user));
                    Cookies.set("token", response.data?.token);
                    this.msg = response.data?.message
                    this.code = response.data?.code
                    if(this.code == 200) {
                        this.$router.push('/home')
                    }
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                    this.msg = error.data?.message
                })
        }
    },

};
</script>
<template >
    <div class="content-login">
        <div class="row login">
            <div class="col col-md-6">
                <div class="image">
                    <img src="https://play-lh.googleusercontent.com/qFjeWp-S61ATmAkZmTIQOgka75b1NY2oXU5x3BpkxNjBEYR-WHD3n8B-l4a5pfsYNTc" alt="">
                </div>
            </div>
            <div class="col col-md-6 p-5">
                <h2 class="text-center" >Login</h2>
                <div class="login-form">
                    <form @submit.prevent="login">
                        <div>
                            <label for="email" class="form-label">Email address</label>
                            <input
                            type="email"
                            class="form-control"
                            id="email"
                            v-model="user.email"
                            required
                            />
                            <div class="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                        <div>
                            <label for="password" class="form-label">Password</label>
                            <input
                            type="password"
                            class="form-control"
                            id="password"
                            v-model="user.password"
                            required
                            />
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    <router-link to="/register">Register</router-link>
                    <div v-if="code == 401">
                        <p class="link-danger" >
                            {{ msg}}
                        </p>
                    </div>
                    <div v-else class="link-success">
                        {{msg}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.content-login{
    width: 100%;
    height: 100vh;
    display: grid;
    place-items: center;
}

.login{
    background-color: #EFEFEF;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 12px 19px 20px rgba(0,0,0, 0.2);
}

.login .image{
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.image img{
    width: 100%;
    object-fit: cover;
}

.login .login-form{
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
}

.login .login-form form{
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
