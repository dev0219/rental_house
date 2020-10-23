
<template>
  <v-row class="portfolio-row profile-row-parent">
    <v-col cols="9" class="portfolio-left profile-main">
      <v-card class="ml-auto" max-width="790" tile>
        <router-link to="/portfolio">
          <v-btn class="backarrows">
            <v-img src="../../assets/arrow-back.png"></v-img>Back
          </v-btn>
        </router-link>

        <router-link to="/profile/edit">
          <v-btn class="edit-btn-p edit-profile-btns">Edit</v-btn>
        </router-link>
        <v-form>
          <v-row class="fill-profile-form">
            <v-col cols="12" class="col-xs-12">
              <v-card-actions class="profile-img">
                <v-img height="220" width="220" src="../../assets/profile.png"></v-img>
              </v-card-actions>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="items.firstName" label="First Name" readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="items.lastName" label="Last Name" readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="items.phoneNumber" label="Phone Number" readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="items.email" label="Email Address" readonly></v-text-field>
            </v-col>
          </v-row>
          <v-row class="subscr-profile">
            <v-col cols="12" sm="12" xs="12">
              <h3>Subscriptions</h3>
            </v-col>
            <v-col class="col-xs-12 col-md-3 col-sm-6">
              <v-list-item-content>
                <h4>Basic</h4>
              </v-list-item-content>
            </v-col>
            <v-col class="col-xs-12 col-md-3 col-sm-6">
              <v-list-item-content class="pd-left-s">
                <v-img src="../../assets/money(2).svg"></v-img>
                <span>$6.00</span>
              </v-list-item-content>
            </v-col>
            <v-col class="col-xs-12 col-md-3 col-sm-6">
              <v-list-item-content class="pd-left-s2">
                <v-img src="../../assets/calendar(2).svg"></v-img>
                <span>Month</span>
              </v-list-item-content>
            </v-col>
            <v-col class="col-xs-12 col-md-3 col-sm-6">
              <v-list-item-content class="last-pd-0">
                <v-btn class="edit-btn-p">Edit</v-btn>
              </v-list-item-content>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="3" class="portfolio-right profile-since">
      <h4>Member Since</h4>
      <v-list-item-content class="member-sibce-p">
        <v-img src="../../assets/calendar(1).svg"></v-img>
        <v-text-field value="20/07/2020" readonly></v-text-field>
      </v-list-item-content>
      <v-list-item-content class="member-sibce-p">
        <v-img src="../../assets/tax.svg"></v-img>
        <v-text-field value="Properties Total" readonly></v-text-field>
      </v-list-item-content>
      <div class="space-mini"></div>
      <h4>Member Since</h4>
      <v-list-item-content class="member-sibce-p">
        <v-img src="../../assets/tax.svg"></v-img>
        <v-text-field value="4" readonly></v-text-field>
      </v-list-item-content>
    </v-col>
  </v-row>
</template>

<script>
import {getdata} from "../../modules/api_module";
export default {
  name: "Profile",
  data: function() {
    return{
      firstName:"",
      items:{},
    }    
  },
  created(){
    this.fetchdata()
  },
  methods:{
    fetchdata(){
      getdata('user/get?email='+localStorage.getItem('useremail')+'&password='+localStorage.getItem('userpassword')+'')
      .then(res=>{
        this.items = res
      })
    }
  }
};
</script>
<style scoped>
@import url("./profile.scss");
</style>