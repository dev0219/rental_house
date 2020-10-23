<template>
  <v-col cols="1" class="portfolio-left-menu">
    <router-link to="/portfolio">
      <v-img src="./../assets/Praisal-Logo.svg" class="v-logo-main"></v-img>
    </router-link>
    <v-navigation-drawer permanent class-="main-header">
      <v-list class="profile-header">
        <router-link to="/profile">
          <v-list-item class="px-2" >
            <v-list-item-avatar>           
                <v-img src="../assets/profile.png" style="width:20%"></v-img>          
            </v-list-item-avatar>
          </v-list-item>
        </router-link>
      </v-list>

      <v-list nav dense>
        <router-link to="/portfolio">
          <v-list-item link :class="{ 'menu-active': isActiveRoute('/portfolio') }">
            <v-list-item-icon>
              <v-img src="./../assets/home-icon.png" class="menu-imgs"></v-img>
              <v-img src="./../assets/home-active.png" class="menu-imgs"></v-img>
            </v-list-item-icon>
          </v-list-item>
        </router-link>
          <v-list-item @change="property()" link :class="{ 'menu-active': isActiveRoute('/property') }">
            <v-list-item-icon>
              <v-img src="./../assets/menu-2.png" class="menu-imgs"></v-img>
              <v-img src="./../assets/menu-2-active.png" class="menu-imgs"></v-img>
            </v-list-item-icon>
          </v-list-item>
        <router-link to="/portfolio">
          <v-list-item link>
            <v-list-item-icon>
              <v-img src="./../assets/menu-3.png" class="menu-imgs"></v-img>
              <v-img src="./../assets/menu-3-active.png" class="menu-imgs"></v-img>
            </v-list-item-icon>
          </v-list-item>
        </router-link>
        <router-link to="/portfolio">
          <v-list-item link>
            <v-list-item-icon>
              <v-img src="./../assets/menu-4.png" class="menu-imgs"></v-img>
              <v-img src="./../assets/menu-4-active.png" class="menu-imgs"></v-img>
            </v-list-item-icon>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </v-col>
</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge';
import router from './../router';
import {getdata} from "../modules/api_module";
export default {
  name: "SideBarComponent",
  data:function(){
    return{
      item:{}
    }    
  },
  created(){
    getdata('portfolio/get?user_id='+localStorage.getItem('useremail')+'')
      .then(res => {
      this.item = res.properties[0].propertyId
    })
  },
  methods: {
    property(){
      router.push("/property/"+this.item)
    },
    isActiveRoute: (url) => {
      return router && router.history.current.fullPath === url
    }
  },
};
</script>
