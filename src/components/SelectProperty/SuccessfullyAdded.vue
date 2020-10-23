<template>
  <v-list>
    <v-card-actions class="select-img-p">
      <v-img src="../../assets/tick (1).svg" class="select-tick-img"></v-img>
      <h2>Success</h2>
      <p>Address has been successfully added to your portfolio</p>
      <v-btn class="select-view-button" @click="gotoPortfoio">View Portfolio</v-btn>
    </v-card-actions>
  </v-list>
</template>

<script>
import router from "./../../router";

export default {
  name: "SuccessfullyAddedComponent",
  methods: {
    gotoPortfoio: () => {      
      if(localStorage.getItem('AddPropertyId')){
        var propertyid = localStorage.getItem('AddPropertyId')
        localStorage.removeItem('AddPropertyId')
        router.push("property/"+propertyid)
      }else if(localStorage.getItem('AddnewProperty')){
        var Newpropertyid = localStorage.getItem('AddnewProperty')
        localStorage.removeItem('AddnewProperty')
        router.push("property/"+Newpropertyid)       
      }else{
         router.push("/portfolio")
      }
    }
  },
  data: () => ({})
};
</script>
