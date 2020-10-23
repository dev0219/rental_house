<template>
  <v-row class="portfolio-row profile-row-parent">
    <v-col cols="9" class="portfolio-left profile-main">
      <v-card class="ml-auto" max-width="790" tile>
        <router-link to="/profile">
          <v-btn class="backarrows">
            <v-img src="../../assets/arrow-back.png"></v-img>Back
          </v-btn>
        </router-link>
        <router-link to="/portfolio">
          <v-btn class="edit-btn-p edit-profile-btns">Save</v-btn>
        </router-link>
        <v-form>
          <v-row class="fill-profile-form edit-profile-form">
            <v-col cols="12" class="col-xs-12">
              <v-card-actions class="profile-img">
                <v-img height="220" width="220" src="../../assets/profile.png"></v-img>
              </v-card-actions>
            </v-col>
            <v-col cols="6">
              <v-text-field value label="First Name" placeholder="Jhon"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field value label="Last Name" placeholder="Doe"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field value label="Phone Number" placeholder="619-802-0125"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field value label="Email Address" placeholder="Jhon@gmail.com"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="subscr-profile">
            <v-col cols="12" sm="12" xs="12">
              <h3>Subscriptions</h3>
            </v-col>
            <v-col class="col-xs-12 col-md-3 col-sm-6">
              <v-list-item-content>
                <h4>Basic</h4>
              </v-list-item-content>
            </v-col>
            <v-col class="col-xs-12 col-md-3 col-sm-6">
              <v-list-item-content class="pd-left-s">
                <v-img src="../../assets/money(2).svg"></v-img>
                <span>$6.00</span>
              </v-list-item-content>
            </v-col>
            <v-col class="col-xs-12 col-md-3 col-sm-6">
              <v-list-item-content class="pd-left-s2">
                <v-img src="../../assets/calendar(2).svg"></v-img>
                <span>Month</span>
              </v-list-item-content>
            </v-col>
            <v-col class="col-xs-12 col-md-3 col-sm-6">
              <v-list-item-content class="last-pd-0">
                <v-btn class="edit-btn-p">Edit</v-btn>
              </v-list-item-content>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="3" class="portfolio-right profile-since">
      <h4>Member Since</h4>
      <v-list-item-content class="member-sibce-p edit-date-since">
        <v-img src="../../assets/calendar(1).svg"></v-img>
        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="2020-08-18"
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
      </v-list-item-content>
      <v-list-item-content class="member-sibce-p">
        <v-img src="../../assets/tax.svg"></v-img>
        <v-text-field value="Properties Total" readonly></v-text-field>
      </v-list-item-content>
      <div class="space-mini"></div>
      <h4>Member Since</h4>
      <v-list-item-content class="member-sibce-p">
        <v-img src="../../assets/tax.svg"></v-img>
        <v-text-field value="4" readonly></v-text-field>
      </v-list-item-content>
    </v-col>
  </v-row>
</template>


<script>
export default {
  name: "ProfileEdit",
  data: () => ({}),
};
</script>
<style scoped>
@import url("./profile-edit.scss");
</style>