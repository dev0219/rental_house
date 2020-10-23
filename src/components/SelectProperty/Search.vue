<template>
  <v-list>
    <v-card-actions class="select-img-p yh-section search-section">
        <v-alert
        class="red-alert"
        color="red lighten-2"
        text
        v-show="!isSuccessful"
      >Can't find your home?</v-alert><br>

      <div class="your-main-div">
        <v-img src="../../assets/search.png" class="select-yh-img-1"></v-img>

        <v-text-field solo class="your-input" @input="isTyping = true" v-model="str_search"  placeholder="Search by address"></v-text-field>
        <loading :active.sync="visible" :can-cancel="true"></loading>
        <ul v-if="show">
          <li v-for="item in items" :key="item.title" @click="Search_item(item.title,item.searchResultId)">
            <div style="display:block"><span>{{item.title}}</span><v-img src="../../assets/arrow-right.png" class="arrow-right"></v-img></div>
          </li>
        </ul>
      </div>
      <v-btn @click="submit" class="select-view-button">Next</v-btn><br><br>
      <h4 v-show="!isSuccessful">skip</h4>
    </v-card-actions>
  </v-list>
</template>

<script>
import Vue from 'vue'
// import Toasted from 'vue-toasted';
// Vue.use(Toasted)
import {getdata} from '../../modules/api_module'
import { debounce } from "debounce";
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(VueLoading);
export default {
  name: "SearchComponent",
  props: ['onNext'],
  components: {
      Loading:VueLoading
  },
  data: function(){
    return{
      isSuccessful:true,
      isLoading:false,
      str_search:"",
      items:[],
      show:true,
      searchResult:'',
      isTyping:false,
      fullPage: true,
      visible: false,
      selectedhome:""
    }
  },
  watch: {
    str_search: debounce(function() {
      this.isTyping = false;
    }, 1000),
    isTyping: function(value) {
      if (!value) {
        this.add_search(this.str_search);
      }
    }
  },
  methods:{
    Search_item(arg1,arg2){
      this.str_search = arg1
      this.selectedhome = arg2
      this.show = false      
    },
    add_search: function(str_search){
      this.selectedhome = ''
      if(this.str_search == ''){
        this.isSuccessful = true
        return
      }
      let loader = this.$loading.show({
                loader: 'dots'
      });    
      getdata('search/?search_string='+str_search+'')
      .then(res => {
        loader.hide()
        this.items = res        
        console.log(this.items)
        if(this.items){
          this.isSuccessful = true
          this.show = true
        }
        if(this.items == ''){
          this.isSuccessful = false
        }  
      })      
    },
    submit(){
      if(this.selectedhome){
        localStorage.setItem('searchResultId', this.selectedhome)
      }
      this.onNext();
    }
  }
};
</script>
<style scoped>
ul {
  position: absolute;
  padding: 0;
  margin-top: 60px;
  background-color: #fff;
  list-style: none;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0,0,0, 0.25);
  z-index: 1000;
}

li {
  padding: 10px 16px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
.arrow-right {
width: 10px;
height: 10px;
padding: 10px;
float: right;
}
</style>