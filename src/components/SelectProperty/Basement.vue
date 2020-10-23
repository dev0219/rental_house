<template>
  <v-list>
    <v-card-actions class="select-img-p">
      <h1>Basement</h1>
      <v-row class="bs-section">
        <v-col class="col-md-6">
          <v-img
            src="../../assets/Screenshot_1.png"
            class="select-bs-img"
          ></v-img>
          <h3>Finished</h3>
          <div class="basment-yes-no">
            <label
              @click="changeFinished('yes')"
              :class="{ 'basment-active': finished === 'yes' }"
              >Yes</label
            >
            <label
              @click="changeFinished('no')"
              :class="{ 'basment-active': finished === 'no' }"
              >No</label
            >
          </div>
        </v-col>
        <v-col class="col-md-6">
          <v-img src="../../assets/doorway.svg" class="select-bs-img-1"></v-img>
          <h3>Walk Out</h3>
          <div class="basment-yes-no">
            <label
              @click="changeWalkout('yes')"
              :class="{ 'basment-active': walkout === 'yes' }"
              >Yes</label
            >
            <label
              @click="changeWalkout('no')"
              :class="{ 'basment-active': walkout === 'no' }"
              >No</label
            >
          </div>
        </v-col>
      </v-row>
      <v-btn @click="submit" class="select-view-button">Next</v-btn>
    </v-card-actions>
  </v-list>
</template>

<script>
import Vue from "vue";
import { postdata, getdata } from "../../modules/api_module";
import Toasted from "vue-toasted";
Vue.use(Toasted);
import router from "../../router";
export default {
  name: "BasementComponent",
  props: ["onNext"],
  methods: {
    changeWalkout: function (choice) {
      this.walkout = choice;
    },
    changeFinished: function (choice) {
      this.finished = choice;
    },
    submit() {
        localStorage.setItem("walkout", this.walkout);
        localStorage.setItem("finished", this.finished);
        if (localStorage.getItem("homeprice") && localStorage.getItem("purchasedate") && localStorage.getItem("properType")){
          var property_params = {
            address: {
              streetNumber: "16",
              streetName: "Red Rose Lane",
              city: "East Gwillimbury",
              postalCode: "L9N 0V1",
              province: "Ontario",
              country: "Canada",
              unit: null,
            },
            userProvidedPrice: {
              price: localStorage.getItem("homeprice"),
              purchaseDate: localStorage.getItem("purchasedate_epoch"),
            },
            propertyType: localStorage.getItem("properType"),
            additionalInfo: {
              sqFootage: localStorage.getItem("square"),
              buildDate: localStorage.getItem("buildDate"),
              bedrooms: localStorage.getItem("bedroom"),
              bathrooms: localStorage.getItem("bathroom"),
              lotSize: localStorage.getItem("lotsize"),
              parkingSpaces: localStorage.getItem("parkingSpace"),
              propertyCondition: localStorage.getItem("bedroom"),
              finishedBasement: localStorage.getItem("finished"),
              walkoutBasement: localStorage.getItem("walkout"),
            },
          };
          postdata("property/submit?user_id="+localStorage.getItem('useremail')+"", property_params)
          .then(res => {
              // 
              localStorage.setItem('AddnewProperty', res.property_key)
              if (res.property_key) {   
                 getdata('portfolio/add?user_id='+localStorage.getItem('useremail')+'&property_key='+localStorage.getItem('AddnewProperty')+'&purchase_date='+ localStorage.getItem('purchasedate')+'')
                 .then(res=>{                   
                   console.log(res)
                 })  
                this.RemoveLocalstorage()        
                this.onNext()
              }else{                
                Vue.toasted.show("Failed add the Property!", {
                  type: "error",
                  position: "top-center",
                  duration: "3000",
                  /* some option */
                });
                this.RemoveLocalstorage()
                router.push("/portfolio");
              }
            }).catch((err) => {
              console.log(err);
                Vue.toasted.show("Failed add the Property!", {
                  type: "error",
                  position: "top-center",
                  duration: "3000",
                  /* some option */
                });
              this.RemoveLocalstorage()
              router.push("/portfolio");
            });
        }else {
          return;
        }
    },
    RemoveLocalstorage(){
      localStorage.removeItem("square");
      localStorage.removeItem("buildDate");
      localStorage.removeItem("bedroom");
      localStorage.removeItem("bathroom");
      localStorage.removeItem("lotsize");
      localStorage.removeItem("parkingSpace");
      localStorage.removeItem("bedroom");
      localStorage.removeItem("finished");
      localStorage.removeItem("walkout");
      localStorage.removeItem("homeprice");
      localStorage.removeItem("purchasedate_epoch");
      localStorage.removeItem("purchasedate");
      localStorage.removeItem("properType");
      localStorage.removeItem("properCondition");
    }
  },
  data: () => ({
    finished: "no",
    walkout: "no",
  }),
};
</script>
