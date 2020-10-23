<template>
  <v-list>
    <v-card-actions class="select-img-p footage-section">
      <h2>Square footage?</h2>

      <div class="your-main-div">
        <v-img src="../../assets/category.svg" class="select-yh-img-1"></v-img>
        <input v-model.number="square" type="number" />
        <span class="sq-ft">sq ft.</span>
      </div>
      <h2>When was the house built?</h2>     
         <v-card-actions class="select-img-p purchase-section">              
              <div class="purchase-date">
                <v-img src="../../assets/calendar(1).svg" class="purchase-img"></v-img>
                <v-dialog ref="dialog"  :return-value.sync="date" persistent width="290px">
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
          </v-card-actions>      
      <v-btn @click="submit" class="select-view-button">Next</v-btn>
      <div @click="onNext" class="skip-button">
        <span>Skip</span>
      </div>
    </v-card-actions>
  </v-list>
</template>

<script>
export default {
  name: "FootageComponent",
  props: ['onNext'],
  data: () => ({
    square: null,
    date: null
  }),
  methods:{
    submit(){
        localStorage.setItem('square', this.square)
        localStorage.setItem('buildDate', this.date)      
        this.onNext();
    }
  }
 
};
</script>
