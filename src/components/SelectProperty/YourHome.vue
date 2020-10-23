<template>
  <v-list>
    <v-card-actions class="select-img-p yh-section">
      <v-alert
        class="red-alert"
        color="red lighten-2"
        text
      >Sorry! We need some more info about your property</v-alert>
      <h2>How much was your home?</h2>
      <div class="your-main-div">
        <v-img src="../../assets/Screenshot_2.png" class="select-yh-img-1"></v-img>
        <v-text-field solo class="your-input" v-model="homeprice"></v-text-field>
      </div>
      <v-btn @click="submit" class="select-view-button">Next</v-btn>
    </v-card-actions>
  </v-list>
</template>

<script>
export default {
  name: "YourHomeComponent",
  props: ['onNext'],
  data: () => ({
    homeprice:null
  }),
  methods:{
    submit(){
      if(this.homeprice){
        localStorage.setItem('homeprice', this.homeprice)
        this.onNext();
      }else{
        return
      }     
    }
  }
};
</script>
