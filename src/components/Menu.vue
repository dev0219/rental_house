<template>
  <Slide class="mobile-slide">
    <router-link to="/portfolio">
      <v-img src="../assets/Praisal-Logo.svg" class="v-logo-main"></v-img>
    </router-link>
    <v-divider></v-divider>

    <v-list nav dense class="header-list-main">
      <v-list-item>
        <router-link to="/portfolio">
          <v-list-item-icon class="header-main-m">
            <v-img src="../assets/home-icon.png" class="menu-imgs header-main-img"></v-img>
            <!-- <v-img src="../assets/home-active.png" class="menu-imgs header-main-img"></v-img> -->
            <span>
              Portfolio
            </span>
          </v-list-item-icon>
        </router-link>
      </v-list-item>
      <v-list-item @change="property()">
          <v-list-item-icon class="header-main-m">
            <v-img src="../assets/menu-2.png" class="menu-imgs header-main-img"></v-img>
            <v-img src="../assets/menu-2-active.png" class="menu-imgs header-main-img"></v-img>
            <span @click="changeRoute('property')">
              Property
            </span>
          </v-list-item-icon>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon class="header-main-m">
          <v-img src="../assets/menu-3.png" class="menu-imgs header-main-img"></v-img>
          <v-img src="../assets/menu-3-active.png" class="menu-imgs header-main-img"></v-img>
          <span>Blog</span>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon class="header-main-m">
          <v-img src="../assets/menu-4.png" class="menu-imgs header-main-img"></v-img>
          <v-img src="../assets/menu-4-active.png" class="menu-imgs header-main-img"></v-img>

          <span>About</span>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </Slide>
</template>

<script>
import router from '../router';
import { Slide } from "vue-burger-menu";
import {getdata} from "../modules/api_module";
export default {
  components: {
    Slide,
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
    changeRoute: function (url) {
      console.log(url, router)
    },
    isActiveRoute: (url) => {
      return router && router.history.current.fullPath === url
    }
  },
  data: () => ({
    item:{},
    router: router
  })
};
</script>
