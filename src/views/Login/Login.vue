
<template>
  <v-container class="container">
    <v-row>
      <v-container class="form-container">
        <v-row>
          <v-col cols="12" class="right-signup">
            <v-img src="../../assets/logo-img.png" class="logo-img"></v-img>

            <v-form v-model="valid">
              <v-row>
                <v-col cols="12" md="12" class="input-img wa-input-email">
                  <v-img src="../../assets/mail.svg" class="logo"></v-img>
                  <v-text-field v-model="data.email" label="E-mail" solo></v-text-field>
                </v-col>
                <v-col cols="12" md="12" class="input-img">
                  <v-img src="../../assets/lock.svg" class="logo"></v-img>
                  <v-text-field v-model="data.password" type="password" label="Password" solo></v-text-field>
                </v-col>
                <v-col cols="12" md="12" class="input-img">
                  <v-btn class="btn-default-all" text @click="submit">Log In</v-btn>
                </v-col>
                <v-col cols="12" md="12" class="input-img">
                  <p>
                    <router-link to="/sign-up">New user?</router-link>
                  </p>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>
<style scoped>
@import url("./login.scss");
</style>
<script>
import Vue from 'vue';

import Toasted from 'vue-toasted';
Vue.use(Toasted)
import router from "../../router";
import {get_parmadata} from "../../modules/api_module";
export default {
  name: "Login",
   data: function(){
     return{
       data:{
         email:"",
         password:""
       },
       valid: false,
       }
  },
  methods: {
    submit(){
      localStorage.setItem('useremail', this.data.email)
      localStorage.setItem('userpassword', this.data.password)
      get_parmadata('user/login', this.data)
      .then(res=>{
        if(res.auth){
          router.push("portfolio");
        }
      }).catch(err=> {
        console.log(err)
        Vue.toasted.show( 'Invalild User', { 
          type : 'error',
          position : 'top-center',
          duration : '3000'
          /* some option */ })
      })
      
    },
  },
 
};
</script>
