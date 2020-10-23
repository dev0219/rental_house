<template>
  <v-container class="chart-wa-cn">
    <div id="chart" class="card">
      <p id="chart-val" class="price"></p>
      <p class="sub-price">
        <v-img src="../../assets/arrow-up.svg" class="chart-arrow-logo" id="up-arrow"></v-img>
        <v-img src="../../assets/down-arrow.svg" class="down-arrow" id="down-arrow"></v-img>
        <span id="chart-xt"></span>
      </p>
      <apexcharts type="line" width="100%" height="250" ref="chart" :options="chartOptions" :series="series"></apexcharts>
    </div>
    
    <v-col class="x-axis">
      <span
        @click="(e) => { changeDuration('1M') }"
        v-bind:class="(duration ==='-1mo') ? 'active' : ''"
      >1 M</span>
      <span
        @click="(e) => { changeDuration('6M') }"
        v-bind:class="(duration ==='-6mo') ? 'active' : ''"
      >6 M</span>
      <span
        @click="(e) => { changeDuration('1Y') }"
        v-bind:class="(duration ==='-1y') ? 'active' : ''"
      >1 Y</span>

      <span
        @click="(e) => { changeDuration('5Y') }"
        v-bind:class="(duration ==='-5y') ? 'active' : ''"
      >5 Y</span>

      <span
        @click="(e) => { changeDuration('All') }"
        v-bind:class="(duration ==='All') ? 'active' : ''"
      >All</span>
    </v-col>
  </v-container>
</template>

<script>
import {getdata} from '../../modules/api_module'
// import {getPraizlDots} from '../../modules/dots_api_module'
function convertToDollarFormat(input) {
    return Math.abs(input.toFixed(0)).toLocaleString();
}

function convertToPercentage(input) {
    return Math.abs((input * 100).toFixed(2));
}

function chartDetails(val, xtd, xtv){
  var element_val = document.getElementById("chart-val");
  element_val.innerHTML = "$" + convertToDollarFormat(val);
  var element_xt = document.getElementById("chart-xt");
  element_xt.innerHTML = "$" + convertToDollarFormat(xtv) + " (" + convertToPercentage(xtd) + "%)";
  if(parseInt(xtv)<0){
    document.getElementById("chart-xt").classList.add("yellowColor");
    document.getElementById("up-arrow").classList.add("hide");
    document.getElementById("down-arrow").classList.add("show");
  }
  if(parseInt(xtv)>0){
    document.getElementById("chart-xt").classList.remove("yellowColor");
    document.getElementById("up-arrow").classList.remove("hide");
    document.getElementById("down-arrow").classList.remove("show");
  }
}

import VueApexCharts from 'vue-apexcharts'
var dataPointList = [{"value":1106187.7126797326,"xTd":0.0,"timestamp":1569888000000,"xtdVal":0.0},
        {"value":1106112.052820972,"xTd":6.840162221144475E-5,"timestamp":1569974400000,"xtdVal":-75.65985876065679},{"value":1104371.8760694794,"xTd":0.0016442256902773345,"timestamp":1571961600000,"xtdVal":-1815.8366102532018},{"value":1104296.2162107187,"xTd":0.001712852440538315,"timestamp":1572048000000,"xtdVal":-1891.4964690138586},{"value":1104220.5563519583,"xTd":0.0017814885952434079,"timestamp":1572134400000,"xtdVal":-1967.1563277742825},{"value":1104144.896493198,"xTd":0.0018501341563257334,"timestamp":1572220800000,"xtdVal":-2042.8161865347065},{"value":1104069.236634437,"xTd":0.0019187891257195222,"timestamp":1572307200000,"xtdVal":-2118.476045295596},{"value":1103993.5767756766,"xTd":0.0019874535053583386,"timestamp":1572393600000,"xtdVal":-2194.13590405602},{"value":1103917.9169169161,"xTd":0.0020561272971777456,"timestamp":1572480000000,"xtdVal":-2269.795762816444},{"value":1103842.2570581555,"xTd":0.0021248105031130837,"timestamp":1572566400000,"xtdVal":-2345.455621577101},{"value":1103696.1952052256,"xTd":0.0022574305187703647,"timestamp":1572652800000,"xtdVal":-2491.5174745069817}];

export default {
  name: "ChartComponent",
   components: {
    apexcharts:VueApexCharts,
  },
  props:['Propertykey'],
  data: function() {
    return {
      questions: [],
      endpoint:"",
      apirealdata:[],
      duration: "",
      selduration:"",
      yellowColor: false,
      chartOptions:{},
      series: [{
        data:[]
      }],        
               
    }
  },
  created(){
     this.fetchdata();
  },
  methods: {
    fetchdata(){
        if(this.duration == ""){
        this.duration = '-1y'
      }
      if(this.Propertykey == null){
        this.endpoint = 'appraisal/portfolio?email_id='+localStorage.getItem('useremail')+'&lookback='+this.duration
      }else{
        this.endpoint = 'appraisal/get?address_id='+JSON.parse(this.Propertykey)+'&lookback='+this.duration
      }
      getdata(this.endpoint)
      .then(
        res=>{
          dataPointList = res.dataPointList;
          var linedataPoints = [];

          dataPointList.forEach(function(item){
            var dataItem = {};
            const months = ["January", "Febrary", "March","April", "May", "Jun", "July", "August", "September", "Octorber", "November", "December"];
            let datetime = new Date(item.timestamp)
            let formatted_date = months[datetime.getMonth()] + " " + datetime.getDate() + ", " + datetime.getFullYear()          
            dataItem.x = formatted_date;
            dataItem.y = item.value;
            chartDetails(item.value, item.xTd, item.xtdVal);
            linedataPoints.push(dataItem);
          });

        
           this.chartOptions = {
                      xaxis: {
                        show: false,
                        labels: {
                          show: false
                        },
                      },
                      yaxis: {
                        labels: {
                          show: false
                        },
                        show: false,
                      },
                      chart: {
                        height: 250,
                        type: 'line',
                        events: {
                          mouseMove: function(event, chartContext, config){
                            var index = config.dataPointIndex;
                            if(typeof(dataPointList[index]) != "undefined"){                            
                              chartDetails(dataPointList[index].value,dataPointList[index].xTd,dataPointList[index].xtdVal)
                            }
                          }
                        }
                      },
                      stroke: {
                        show: true,
                        curve: 'smooth',
                        width: 2,
                      },
                    
                      fill: {
                        type:'solid',
                      }, 
              }
              this.series = [{
                type: 'line',
                data: linedataPoints
              }];         
        }
      )         
    },    
    changeDuration: function(duration) {
      if(duration == '1M'){
        this.duration = '-1mo'
        this.fetchdata()
      }else if(duration == '6M'){
        this.duration = '-6mo'
        this.fetchdata()
      }else if(duration == '1Y'){
        this.duration = '-1y'
        this.fetchdata()
      }else if(duration == '5Y'){
        this.duration = '-5y'
        this.fetchdata()
      }
    }
  },
};
</script>
 
  
<style scoped>
@import url("./charts.scss");
</style>