<template>
    <dashboard-layout>
      <template v-if="fetchDataLoading">
          <center><div class="loader"></div></center>
            </template>
            <template v-else>
        <div class="big-card">
      <div class="card mb-4">
        <div class="card-header">
          <h6 class="m-0 font-weight-bold text-dark" style="font-size: 14px; font-weight: bold; color:  #000;">Settings</h6>
        </div>
        <div class="card-body" style="font-size: 13px; color: #000;">
            <form @submit.prevent="submitForm" novalidate>
              <!-- Form fields -->
  
              <div class="form-group">
                  <div class="col-sm-6">
                    <label for="AppItemName">Profiled Email to Receive Notification</label>
                    <input
                      type="text"
                      class="form-control"
                      id="Email"
                      placeholder="Email"
                      name="Email"
                      v-model="userEmail"
                      disabled
                      style="font-size: 12px; background-color: #F8F9FC"
                    />
                  </div><br>
              </div>



              <div class="form-group">
                
                <div class="col-sm-6">
                    <label for="ReceiveEmail">Recieve Email Notification</label>
                    <div class="custom-control custom-switch">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        id="ReceiveEmail"
                        name="ReceiveEmail"
                        v-model="ReceiveEmail" 
                       
                    >
                    <label style="font-size: 12px; background-color: #F8F9FC" class="custom-control-label" for="ReceiveEmail">
                        {{ ReceiveEmail ? 'Yes' : 'No' }}
                    </label>
                    </div>
                </div>
                </div>

                <div class="form-group">

                <div class="col-sm-6">
              <label for="ReceiveInAppNotification">Recieve Push Notification for Mobile</label>
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="ReceiveInAppNotification"
                  name="ReceiveInAppNotification"
                  v-model="ReceiveInAppNotification"
                  
                >
                <label style="font-size: 12px; background-color: #F8F9FC" class="custom-control-label" for="ReceiveInAppNotification">
                  {{ ReceiveInAppNotification ? 'Yes' : 'No' }}
                </label>
              </div>
            </div>
          </div>
                  <br>
              <button class="onboard-button2" type="submit">
               Update
              </button>
            </form>
        </div>
      </div>
    </div>
    </template>
    </dashboard-layout>
  </template>

<script>
import DashboardLayout from '@/components/DashboardLayout.vue';
import axios from 'axios';

export default {
  name: 'AddAppItem-page',

  components: {
    DashboardLayout
  },
  data() {
    return {
      showSuccessMessage: false,
      UserSettings: '',
      departments: [], 
      usage: '',
      ReceiveEmail: false,
      ReceiveInAppNotification: false,
      mountToggle: '0',
      userEmail: '', 
      isLoading: true,
      fetchDataLoading: true,
    };
  },

  async mounted() {

    this.userEmail = sessionStorage.getItem('email');

    try{
    await this.fetchUserSettings();
    this.fetchDataLoading = false;
        }catch (error) {
    console.error(error);
    this.isLoading = false; // Ensure isLoading is set to false on error
    this.$toast.open({
      message: error,
      type: 'error',
      duration: 3000,
    });
  }

  },
  
  methods: {

    toggleMount(event) {
    this.ReceiveEmail = event.target.checked ? true : false;
  },


    async fetchUserSettings() {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
  axios
    .get(`${this.$config.GETUSERSETTINGS_ENDPOINT}/${userId}`, {
            headers: {
      
            Authorization: `Bearer ${token}`
          },
          },)
    .then((response) => {
      this.ReceiveEmail = response.data.ReceiveEmail;
      this.ReceiveInAppNotification = response.data.ReceiveInAppNotification;
    })
    .catch((error) => {
      console.error('Error fetching Settings:', error);
      this.$toast.open({
        message: error.message || 'Error fetching Settings',
        type: 'error',
        duration: 3000,
      });
    });
},

async submitForm() {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      const updatedSettings = {
        UserID: userId,
        ReceiveEmail: this.ReceiveEmail,
        ReceiveInAppNotification: this.ReceiveInAppNotification,
      };

      axios
        .post(`${this.$config.UPDATEUSERSETTINGS_ENDPOINT}/${userId}`, updatedSettings, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log('Settings updated:', response.data);
          this.$toast.open({
            message: 'Settings updated successfully',
            type: 'success',
            duration: 3000,
          });
        })
        .catch((error) => {
          console.error('Error updating settings:', error);
          this.$toast.open({
            message: error.message || 'Error updating settings',
            type: 'error',
            duration: 3000,
          });
        });
    },




  },
};
</script>


<style>



</style>