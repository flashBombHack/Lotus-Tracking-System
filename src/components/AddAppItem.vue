<template>
    <dashboard-layout>
      <template v-if="fetchDataLoading">
          <center><div class="loader"></div></center>
            </template>
            <template v-else>

      <div class="col-md-6" style="margin-left: 30px;">
                    <router-link to="/appitems" class="icon text-gray-600">
                    <i class="fas fa-arrow-left"></i> Back
                    </router-link>
                </div>
        <div class="big-card">
      <div class="card mb-4">
        <div class="card-header">
          <h6 class="m-0 font-weight-bold text-dark" style="font-size: 14px; font-weight: bold; color:  #000;">Add App Item</h6>
        </div>
        <div class="card-body" style="font-size: 13px; color: #000;">
            <form @submit="submitForm" novalidate>
              <!-- Form fields -->
  
              <div class="form-group">
                  <div class="col-sm-6">
                    <label for="AppItemName">App Item Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="AppItemName"
                      placeholder="Enter App Item"
                      name="AppItemName"
                      required
                      style="font-size: 12px; background-color: #F8F9FC"
                      maxlength="17"
                    />
                  </div><br>
                  <div class="col-sm-6">
                  <label for="Category">App Category</label>
                  <select class="form-control" style="font-size: 12px; background-color: #F8F9FC" id="Category" name="Category" required>
                    <option value="">Select Category</option>
                    <option v-for="category in App_categories" :key="category.ID" :value="category.App_category">{{ category.App_category }}</option>
                  </select>
                </div>
              </div>

              <div class="col-sm-6">
              <label for="Usage">Usage</label>
              <select class="form-control" style="font-size: 12px; background-color: #F8F9FC" id="Usage" name="Usage" v-model="usage" required>
                <option value="">Select Usage</option>
                <option value="Global">Global</option>
                <option value="Operations">Operations</option>
              </select>
            </div><br>

            <!-- Add the Department field with v-if condition -->
            <div v-if="usage === 'Operations'" class="col-sm-6">
              <label for="Department">Department</label>
              <select class="form-control" style="font-size: 12px; background-color: #F8F9FC" id="Department" name="Department" required>
                <option value="">Select Department</option>
                <!-- Loop through departments -->
                <option v-for="department in departments" :key="department.ID" :value="department.ID">
                  {{ department.Department }}
                </option>
              </select>
            </div><br>



              <div class="form-group">
                
                <div class="col-sm-6">
                    <label for="Mount">Mount</label>
                    <div class="custom-control custom-switch">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        id="Mount"
                        name="Mount"
                        :checked="mountToggle === '1'"
                        @change="toggleMount"
                    >
                    <label style="font-size: 12px; background-color: #F8F9FC" class="custom-control-label" for="Mount">
                        {{ mountToggle === '1' ? 'Yes' : 'No' }}
                    </label>
                    </div>
                </div>
                </div>

                <div class="form-group">

                <div class="col-sm-6">
              <label for="Mount">Under Construction</label>
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="UnderConstruction"
                  name="UnderConstruction"
                  v-model="underConstruction"
                  
                >
                <label style="font-size: 12px; background-color: #F8F9FC" class="custom-control-label" for="UnderConstruction">
                  {{ underConstruction ? 'Yes' : 'No' }}
                </label>
              </div>
            </div>
          </div>

            <div class="form-group">
          <div class="col-sm-6" v-if="!underConstruction">
            <label for="Route">Route</label>
            <input
              type="text"
              class="form-control"
              id="Route"
              placeholder="E.g  /route"
              name="Route"
              style="font-size: 12px; background-color: #F8F9FC"
            />
          </div>
        </div>



              <div class="col-sm-6">
                    <label for="Description">Description</label>
                    <input
                      type="text"
                      class="form-control"
                      id="Description"
                      placeholder="Enter Description"
                      name="Description"
                      required
                      maxlength="35"
                      style="font-size: 12px; background-color: #F8F9FC"
                    />
                  </div>
  
            

                  <br>
              <button class="onboard-button2" type="submit">
               Add Appitem
              </button>
            </form>
        </div>
      </div>
    </div>
    </template>
    </dashboard-layout>
  </template>

<script>
import DashboardLayout from './DashboardLayout.vue';
import axios from 'axios';

let logData; 

export default {
  name: 'AddAppItem-page',

  components: {
    DashboardLayout
  },
  data() {
    return {
      showSuccessMessage: false,
      App_categories: [],
      departments: [], 
      usage: '',
      mountToggle: '0',
      underConstruction: false, 
      isLoading: true,
      fetchDataLoading: true,
    };
  },
  computed: {
    mountToggleValue: {
      get() {
        return this.mountToggle ? '1' : '0';
      },
      set(value) {
        this.mountToggle = value === '1';
      },
    },
    mountToggleText() {
      return this.mountToggle ? 'Yes' : 'No';
    },
  },

  async mounted() {

    try{
    await this.fetchDepartments();
    await this.fetchCategories();
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
    this.mountToggle = event.target.checked ? '1' : '0';
  },

    async fetchCategories() {
      fetch(this.$config.GETCATEGORIES_ENDPOINT)
        .then(response => response.json())
        .then(data => {
          this.App_categories = data;
        })
        .catch(error => {
          console.error(error);
          this.$toast.open({
        message: error,
        type: 'error', 
        duration: 3000, 
      });
        });
    },

    async fetchDepartments() {
  axios
    .get(this.$config.GETDEPT_ENDPOINT)
    .then((response) => {
      console.log('Departments:', response.data); // Log the response data
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

    submitForm(event) {
  event.preventDefault();
  const form = event.target;

  if (!form.checkValidity()) {
    
    form.reportValidity();
    return;
  }

  
  const formData = {
    AppName: form.elements.AppItemName.value,
    AppCategory: form.elements.Category.value,
    mounted: this.mountToggle,
    route: this.underConstruction ? '/comingsoon' : form.elements.Route.value || '/comingsoon', 
    Description: form.elements.Description.value,
    usage: this.usage,
    DeptID: this.usage === 'Global' ? 0 : form.elements.Department.value,
  };

  const token = sessionStorage.getItem('token');

  
  fetch(this.$config.ADDAPPITEMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(formData),
    
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
      logData = {
  UserID: sessionStorage.getItem('userId'),
  FName: sessionStorage.getItem('firstName'),
  LName: sessionStorage.getItem('lastName'),
  Email: sessionStorage.getItem('email'),
  Role: sessionStorage.getItem('role'),
  Department: sessionStorage.getItem('department'),
  ActionType: 'Add Appitem',
  Activity: `New Appitem (${form.elements.AppItemName.value}) has been added successfully`,
  Category: 'Appitems',
  Timestamp: new Date().toISOString()
};

const token = sessionStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`,
};


axios.post(this.$config.ADDACTIVITYLOG_ENDPOINT, logData, { headers })
  .then(response => {
  
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
        message: `${form.elements.AppItemName.value} has been added successfully on Appitems`,
        type: 'success', 
        duration: 3000, 
      });
        this.$router.push('/appitems');
    })
    .catch(error => {
      
      console.error(error);
      this.$toast.open({
        message: error,
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