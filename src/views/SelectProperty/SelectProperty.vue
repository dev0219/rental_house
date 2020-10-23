
<template>
  <div class="background-select-parent">
    <div class="background-select-p">
      <v-container>
        <v-btn v-show="this.selectedStep !== 'successfully-added' " class="backarrows" @click="goBack">
          <v-img src="../../assets/arrow-back.png"></v-img>Back
        </v-btn>
        <v-img src="../../assets/Praisal-Logo.svg" class="logo-select"></v-img>
      </v-container>
    </div>
    <v-card class="select-all-property text-center">
      <v-container>
        <!---===== property type section start ====---->
        <property-type-component :on-next="changeStep" v-show="selectedStep ==='property-type'"></property-type-component>
        <!---===== property type section end ====---->

        <!---===== search section start ====---->
        <search-component :on-next="changeStep" v-show="selectedStep === 'search'"></search-component>
        <!---===== search section end ====---->
        <!---===== address section start ====---->
        <!-- <search-address-component :on-next="changeStep" v-show="selectedStep === 'search-address'"></search-address-component> -->
        <!---===== search2 section end ====---->
        <!---===== Yourhome section start ====---->
        <your-home-component :on-next="changeStep" v-show="selectedStep === 'your-home'"></your-home-component>
        <!---===== Yourhome end ====---->

        <!---===== purchase section start ====---->
        <purchase-component :on-next="changeStep" v-show="selectedStep === 'purchase'"></purchase-component>
        <!---===== purchase section end ====---->

        <!---===== footage section start ====---->
        <footage-component :on-next="changeStep" v-show="selectedStep === 'footage'"></footage-component>
        <!---===== footage section end ====---->

        <!---===== great almost section start ====---->
        <great-almost-done-component :on-next="changeStep" v-show="selectedStep === 'great-all-done'"></great-almost-done-component>
        <!---===== great almost section end ====---->

        <!---===== Basement section start ====---->
        <basement-component :on-next="changeStep" v-show="selectedStep === 'basement'"></basement-component>
        <!---===== Basement section end ====---->

        <!---===== Success section start ====---->
        <successfully-added-component :on-next="changeStep" v-show="selectedStep === 'successfully-added'" />
        <!---===== Success section end ====---->

      </v-container>
    </v-card>
  </div>
</template>        


<script>
import SuccessfullyAddedComponent from "../../components/SelectProperty/SuccessfullyAdded.vue";
import BasementComponent from "./../../components/SelectProperty/Basement";
import GreatAlmostDoneComponent from "../../components/SelectProperty/GreatAlmostDone";
import FootageComponent from "../../components/SelectProperty/Footage";
import PurchaseComponent from "../../components/SelectProperty/Purchase";
import PropertyTypeComponent from "./../../components/SelectProperty/PropertyType";
import YourHomeComponent from './../../components/SelectProperty/YourHome';
import SearchComponent from './../../components/SelectProperty/Search';
import router from '../../router';

export default {
  name: "SelectProperty",
  created:function(){
    
  },
  methods: {
    changeStep: function (option) {
      console.log('data---', option , "this", this);

      switch(this.selectedStep) {
        case 'search':         
            this.selectedStep = 'purchase';                 
          break;

        // case 'purchase':
        //   this.selectedStep = 'property-type';
        //   break;
        case 'property-type':
          this.selectedStep = 'your-home'
          break;
        case 'your-home':
          this.selectedStep = 'footage'
          break;

        case 'purchase':
          if(localStorage.getItem('AddPropertyId')){
            this.selectedStep = 'successfully-added';
          }else{
             this.selectedStep = 'property-type';
          }          
          break;
        case 'footage':
          this.selectedStep = 'great-all-done'
          break;

        case 'great-all-done':
          this.selectedStep = 'basement';
          break;

        case 'basement':
          this.selectedStep = 'successfully-added';
          break;

        default:
          // nothing to do.

      }
      // this.selectedStep = ''
    },
    goBack: function () {
      switch(this.selectedStep) {
        case 'search':
          router.push('/portfolio')
          break;

        case 'property-type':
          this.selectedStep = 'search';
          break;
        // case 'property-type':
        //   this.selectedStep = 'search-address'
        //   break;
        case 'your-home':
          this.selectedStep = 'property-type'
          break;

        case 'purchase':
          this.selectedStep = 'your-home'
          break;

        case 'footage':
          this.selectedStep = 'purchase'
          break;

        case 'great-all-done':
          this.selectedStep = 'footage';
          break;

        case 'basement':
          this.selectedStep = 'great-all-done';
          break;

        default:
          // nothing to do.

      }

    }
  },
  data: () => ({
    loading: false,
    items: [],
    search: "",
    select: "",
    row: [],
    date: new Date(),
    modal: "",
    age: null,
    selectedStep: 'search'
  }),
  components: {
    SuccessfullyAddedComponent,
    BasementComponent,
    GreatAlmostDoneComponent,
    FootageComponent,
    PropertyTypeComponent,
    PurchaseComponent,
    YourHomeComponent,
    SearchComponent
  }
};
</script>

<style scoped>
@import url("./select-property.scss");
</style>