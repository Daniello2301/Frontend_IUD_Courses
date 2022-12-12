<script>
import AuthService from '../services/AuthService'
import Cookies from 'js-cookie' 
export default {

    name:"register",
    data() {
        return {
            msg:"",
            code: "",
            user: {
                name:"",
                email:"",
                password:"",
                password_confirmation:""
            }
        }
    },
    methods: {
        
        async register(e){
            e.preventDefault();
            var data = {
                name:this.user.name,
                email:this.user.email,
                password:this.user.password,
                password_confirmation:this.user.password_confirmation,
            }
            await AuthService.register(data)
                .then(response  => {
                    Cookies.set("user", JSON.stringify(response.data?.user))
                    Cookies.set("token", response.data?.token)

                    if(response.data?.code == 200)
                    {
                        this.$router.push("/home")
                    }
                    this.msg = "Register successfully"
                    console.log(response);
                })
                .catch(error => {
                    this.msg = error.response?.data.message
                    console.log(error);
                });
        }

    },
}
</script>   
<template>
    <div class="content-register">
        <div class="row register">
            <div class="col col-md-6">
                <div class="image">
                    <img src="https://play-lh.googleusercontent.com/qFjeWp-S61ATmAkZmTIQOgka75b1NY2oXU5x3BpkxNjBEYR-WHD3n8B-l4a5pfsYNTc" alt="">
                </div>
            </div>
            <div class="col col-md-6 col-register">
                <h2 class="text-center">Register</h2>
                <div class="register-form">
                    <form @submit.prevent="register">
                        <div class="mt-3">
                            <label for="name" class="form-label">Name</label>
                            <input
                            type="name"
                            class="form-control"
                            id="name"
                            v-model="user.name"
                            required
                            />
                        </div>
                        <div class="mt-3">
                            <label for="email" class="form-label">Email address</label>
                            <input
                            type="email"
                            class="form-control"
                            id="email"
                            v-model="user.email"
                            required
                            />
                        </div>
                        <div class="mt-3">
                            <label for="password" class="form-label">Password</label>
                            <input
                            type="password"
                            class="form-control"
                            id="password"
                            v-model="user.password"
                            required
                            />
                        </div>
                        <div class="mt-3">
                            <label for="conf_Password" class="form-label">Confirm Password</label>
                            <input
                            type="password"
                            class="form-control"
                            id="conf_Password"
                            v-model="user.password_confirmation"
                            required
                            />
                        </div>
                        <div class="col mt-3 text-center">
                            <button type="submit" class="btn btn-primary mx-3">Register</button>
                            <router-link to="/">login</router-link>
                        </div>
                    </form>
                    <div v-if="code != 200">
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
.content-register{
    width: 100%;
    height: 100vh;
    display:grid;
    place-items: center;
}
.content-register .register{
    background-color: #EFEFEF;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 12px 19px 20px rgba(0,0,0, 0.2);
}
.register .image{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.register .image img{
    widows: 100%;
    height: 100%;
    object-fit: contain;
}
.col-register{
    padding: 30px;
}

.register .register-form{
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center
}
</style>