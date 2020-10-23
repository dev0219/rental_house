<template>
  <v-row class="portfolio-row">
    <div class="my-mobile-menu">
      <router-link to="/profile">
        <div
          class="moblie-logo-img"
          style="background:url(https://www.bavarealtors.in/wp-content/uploads/2019/11/dummy-man-570x570.png);"
        ></div>
      </router-link>
      <menu-component></menu-component>
    </div>
    <side-bar-component></side-bar-component>

    <v-col cols="8" class="portfolio-left">
      <v-col cols="12" md="12" class="input-img wa-prt-srch">
        <v-img src="../../assets/magnifying-glass.svg" class="prt-srch-logo"></v-img>
        <v-text-field label="Search" solo></v-text-field>
      </v-col>
	<v-row>
        <v-col cols="12" xs="12" class="text-right">
          <v-list id="dropdown-example" class="last-btns-p">
            <v-overflow-btn
              class="my-2"
              :items="properties"
              label="Portfolio"
              target="#dropdown-example"
            ></v-overflow-btn>
          </v-list>
        </v-col>
      </v-row>
      <h2 class="portfoliop-title">Portfolio</h2>

      <chart-component />

      <!-- <v-col cols="3" class="portfolio-right only-mobile-show">
        <v-row class="align-center port-right-colom">
          <v-col cols="6" xs="12" class="text-xs-center">
            <h2>Properties</h2>
          </v-col>
          <v-col cols="6" xs="12" class="text-right text-xs-center">
            <v-btn class="mx-2" fab dark color="black">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-list class="property-lists">
          <v-list-item class="light-b-property">
            <v-list-item-action>
              <v-img src="../../assets/portfolio-p.png" class="list-img-g"></v-img>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>$8,365,000</v-list-item-title>
              <v-list-item-subtitle>10 York Street - PH10 Toronto</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="light-g-property">
            <v-list-item-action>
              <v-img src="../../assets/portfolio-p.png" class="list-img-g"></v-img>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>$2,225,378</v-list-item-title>
              <v-list-item-subtitle>97 Roslin Ave Toronto</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="blue-property">
            <v-list-item-action>
              <v-img src="../../assets/portfolio-p.png" class="list-img-g"></v-img>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>$2,650,000</v-list-item-title>
              <v-list-item-subtitle>68 Peter Street Markham</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col> -->

      <v-card class="activity-cards">
        <v-row>
          <v-col cols="6" xs="12" class="text-xs-center">
            <h2>Activity</h2>
          </v-col>
          <v-col cols="6" xs="12" class="text-right text-xs-center">
            <v-btn class="btn-details">Details</v-btn>
          </v-col>
        </v-row>

        <v-list class="portfolio-lists">
          <v-list-item>
            <v-list-item-content>
              <v-img src="../../assets/growth.svg" class="list-img-g"></v-img>
              <p>
                3 homes like 10 York Street have sold over asking in the past 14
                days.
              </p>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-img src="../../assets/open.svg" class="list-img-g"></v-img>
              <p>A new community centre has opened up in the MarkhamVillage area.</p>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="3" class="portfolio-right">
      <v-row class="align-center port-right-colom">
        <v-col cols="6" xs="12" class="text-xs-center">
          <h2>Properties</h2>
        </v-col>
        <v-col cols="6" xs="12" class="text-right text-xs-center">
          <router-link to="/select-property">
            <v-btn class="mx-2" fab dark color="black">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </router-link>
        </v-col>
      </v-row>

      <v-list class="property-lists">
        <v-list-item v-for="item in items" :key="item.propertyId" class="blue-property" @change="property(item.propertyId)">
          <!-- <router-link to="/property"> -->
            <v-list-item-action >
              <v-img :src=item.propertyPicture class="list-img-g"></v-img>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>${{item.propertyValue}}</v-list-item-title>
              <v-list-item-subtitle>{{item.propertyId.split(";")[0].split("=")[1]}} {{item.propertyId.split(";")[1].split("=")[1]}} <br>{{item.propertyId.split(";")[2].split("=")[1]}}</v-list-item-subtitle>
            </v-list-item-content>
          <!-- </router-link> -->
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>
<script>
import ChartComponent from "../../components/charts/ChartComponent";
import MenuComponent from "./../../components/Menu";
import SideBarComponent from "./../../components/SideBar";
import {getdata} from "../../modules/api_module";
import router from "../../router";
export default {
  name: "Portfolio",
  components: {
    ChartComponent,
    MenuComponent,
    SideBarComponent,
  },
  data: function() {
    return{
      items:[],
      properties: ["property 1", "property 2", "property 3", "property 4"],
    }    
  },
  created(){
    this.fetchData()
  },
  methods:{
    fetchData(){
      getdata('portfolio/get?user_id='+localStorage.getItem('useremail')+'')
      .then(res=>{
        this.items = res.properties
        // console.log("property length", Object.entries(this.items).length)
      })
    },
    property(val){     
      router.push("property/"+val)
    }
  }  
};
</script>
<style scoped>
@import url("./portfolio.scss");
</style>
