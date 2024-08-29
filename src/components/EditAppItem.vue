<template>
    <dashboard-layout>

      <template v-if="fetchDataLoading">
        <div class="big-card2">
        <center><div class="loader"></div></center>
      </div>
            </template>
            <template v-else>

      <div class="col-md-6">
                    <router-link to="/appitems" class="icon text-gray-600">
                    <i class="fas fa-arrow-left"></i> Back
                    </router-link>
                </div>

      <div class="big-card">
      <div class="card mb-4">
        <div class="card-header">
          <h6 class="m-0 font-weight-bold text-dark" style="font-size: 14px; font-weight: bold; color:  #000;">Edit App Item</h6>
        </div>
        <div class="card-body" style="font-size: 13px; color: #000;">
            <form @submit.prevent="submitForm" novalidate>
              <!-- Form fields -->
  
              <div class="form-group">
                  <div class="col-sm-6">
                    <label for="AppItemName">App Item Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="AppItemName"
                      placeholder="Enter App Item"
                      v-model="appitem.AppName"
                      style="font-size: 12px; background-color: #F8F9FC"
                      required
                      maxlength="20"
                    />
                  </div><br>
                  <div class="col-sm-6">
                  <label for="Category">App Category</label>
                  <select class="form-control" style="font-size: 12px; background-color: #F8F9FC" id="category" v-model="appitem.cardID">
                <option value="">Select Category</option>
                <option v-for="category in AppCategory" :key="category.ID" :value="category.ID.toString()">
                    {{ category.App_category }}
                </option>
                </select>
                </div>
              </div>

              <div class="form-group">
      <div class="col-sm-6">
        <label for="Usage">Usage</label>
        <select class="form-control" style="font-size: 12px; background-color: #F8F9FC" id="Usage" v-model="appitem.usage" required>
          <option value="Global">Global</option>
          <option value="Operations">Operations</option>
        </select>
      </div>
    </div>

   
    <div v-if="appitem.usage === 'Operations'" class="form-group">
      <div class="col-sm-6">
        <label for="Department">Department</label>
        <select class="form-control" style="font-size: 12px; background-color: #F8F9FC" id="Department" v-model="appitem.DeptID" required>
          <option value="">Select Department</option>
        
          <option v-for="department in departments" :key="department.ID" :value="department.ID">
            {{ department.Department }}
          </option>
        </select>
      </div>
    </div>
              <div class="form-group">
                
                <div class="col-sm-6">
                    <label for="Mount">Mount</label>
                    <div class="custom-control custom-switch">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        id="Mount"
                        name="Mount"
                        v-model="appitem.mounted"
                        style="font-size: 12px; background-color: #F8F9FC"
                        required
                    >
                    <label class="custom-control-label" for="Mount">
                        {{ appitem.mounted ? 'Yes' : 'No' }}
                    </label>
                    </div>
                </div>
                </div>

                <div class="col-sm-6">
                    <label for="Route">Route</label>
                    <input
                      type="text"
                      class="form-control"
                      id="Route"
                      placeholder="E.g  /route"
                      v-model="appitem.route"
                      style="font-size: 12px; background-color: #F8F9FC"
                      required
        
                    />
                  </div>


              <div class="col-sm-6">
                    <label for="Description">Description</label>
                    <input
                      type="text"
                      class="form-control"
                      id="Description"
                      placeholder="Enter Description"
                      v-model="appitem.Description"
                      style="font-size: 12px; background-color: #F8F9FC"
                      required
                      maxlength="35"
                    />
                  </div><br>
                  <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
  
            

  
              <button class="onboard-button2" type="submit">
                <span class="text">Update</span>
              </button><br><br>
             
            </form>
          </div>
      </div>
      </div>
      </template>
    </dashboard-layout>
  </template>

<script>
import axios from 'axios';
import DashboardLayout from './DashboardLayout.vue';
let logData; 

export default {
  name: 'EditAppItem-page',

  components: {
    DashboardLayout
  },

  data() {
    return {
      fetchDataLoading: true,
        showSuccessMessage: false,
        errorMessage: '',
        AppCategory: [],
        usage: '',
        departments: [],
        appitem: {
        ID: '',
        AppName: '',
        cardID: '',
        mounted: '',
        Description: '',
        route: '',
        isLoading: true,
      },
    };
  },

  async mounted() {
    try{
   await this.fetchAppCategory();
   await this.fetchDepartments();
   await this.fetchAppItem();
   this.fetchDataLoading = false;
    }catch (error) {
          console.error(error);
          this.isLoading = false; 
          this.$toast.open({
          message: error,
          type: 'error',
          duration: 3000,
          });
          }
    
  },


  methods: {
    async fetchAppItem() {
      try {
        
        const appID = this.$route.query.app;
        const url = `${this.$config.GETAPPITEMS_BYID_ENDPOINT}/${appID}`;
        const response = await axios.get(url);
        this.appitem = response.data; 

        const selectedCategory = this.AppCategory.find(category => category.ID === this.appitem.cardID);
        this.appitem.AppCategory = selectedCategory ? selectedCategory.App_category : '';
        this.appitem.mounted = Boolean(Number(this.appitem.mounted));
        } catch (error) {
        console.error(error);
      }
    },

    async fetchAppCategory() {
      try {
        const response = await axios.get(this.$config.GETCATEGORIES_ENDPOINT);
        this.AppCategory = response.data; 
      } catch (error) {
        console.error(error);
        this.$toast.open({
        message: error,
        type: 'error', 
        duration: 3000, 
      });
      }
    },

    async fetchDepartments() {
  axios
    .get(this.$config.GETDEPT_ENDPOINT)
    .then((response) => {
      console.log('Departments:', response.data); 
      this.departments = response.data;
    })
    .catch((error) => {
      console.error('Error fetching departments:', error);
      this.$toast.open({
        message: error.message || 'Error fetching departments',
        type: 'error',
        duration: 3000,
      });
          });
      },

    async submitForm() {
    try {
        console.log(this.appitem.ID);
      const appID = parseInt(this.appitem.ID);
      console.log(appID);

      const updateurl = `${this.$config.UPDATEAPPITEM_ENDPOINT}/${appID}`;

      const mountedValue = this.appitem.mounted ? "1" : "0";
      

      const payload = {
        AppName: this.appitem.AppName,
        cardID: this.appitem.cardID.toString(),
        mounted: mountedValue,
        route: this.appitem.route,
        Description: this.appitem.Description,
        usage: this.appitem.usage,
        DeptID: this.appitem.usage === 'Global' ? 0 : this.appitem.DeptID,
      };
      const token = sessionStorage.getItem('token');

      const headers = {
          'Authorization': `Bearer ${token}`,
          };
              
      await axios.post(updateurl, payload, { headers: headers });


      logData = {
  UserID: sessionStorage.getItem('userId'),
  FName: sessionStorage.getItem('firstName'),
  LName: sessionStorage.getItem('lastName'),
  Email: sessionStorage.getItem('email'),
  Role: sessionStorage.getItem('role'),
  Department: sessionStorage.getItem('department'),
  ActionType: 'Edit Appitem',
  Activity: `(${this.appitem.AppName}) has been Modified successfully`,
  Category: 'Appitems',
  Timestamp: new Date().toISOString()
};

// Make an API call to log the activity
axios.post(this.$config.ADDACTIVITYLOG_ENDPOINT, logData, { headers })
  .then(response => {
    // Handle the response
    console.log(response);
  })
  .catch(error => {
    console.error(error);
    this.$toast.open({
        message: error,
        type: 'error', 
        duration: 3000, 
      });
  });


  this.$toast.open({
        message: `${this.appitem.AppName} has been modified successfully`,
        type: 'success', 
        duration: 3000, 
      });
          this.$router.push('/appitems');

      
    
    } catch (error) {
      this.showSuccessMessage = false;
      this.$toast.open({
        message: error,
        type: 'error', 
        duration: 3000, 
      });
        
    }
  },
}

  
};
</script>


<style>



</style>