<template>
  <v-list>
    <v-card-actions class="select-img-p purchase-section">
      <h2>When did you purchase your home?</h2>
      <div class="purchase-date">
        <v-img src="../../assets/calendar(1).svg" class="purchase-img"></v-img>
        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              prepend-icon="event"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </div>
      <v-btn @click="submit()" class="select-view-button">Done</v-btn>
    </v-card-actions>
  </v-list>
</template>
<script>
import {getdata} from '../../modules/api_module'
export default {
  name: "PurchaseComponent",
  props: ['onNext'],
  data: () => ({
    // date: new Date(),
    date: '2019-09-10',
    modal: false
  }),
  methods:{
    submit(){      
      var epoch_datepicker = new Date(this.date.split("-")).getTime();
      var datepicker = this.date.split("-");
      localStorage.setItem('purchasedate_epoch', epoch_datepicker);
      localStorage.setItem('purchasedate', datepicker[2]+datepicker[1]+datepicker[0]);
      console.log(datepicker)
      if(localStorage.getItem('searchResultId') && localStorage.getItem('purchasedate')){
          getdata('portfolio/add?user_id='+localStorage.getItem('useremail')+'&searchResultId='+localStorage.getItem('searchResultId')+'&purchase_date='+ localStorage.getItem('purchasedate')+'')
          .then(res => {
            localStorage.setItem('AddPropertyId', res.propertyKey)      
            localStorage.removeItem('searchResultId')
            localStorage.removeItem('purchasedate')
            this.onNext(); 
          }).catch(err=> {
            console.log(err)
            this.onNext(); 
          })
      }else{
        this.onNext();
      }    
    }
  }

};
</script>
