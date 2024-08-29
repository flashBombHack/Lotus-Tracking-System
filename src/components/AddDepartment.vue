<template>
    <dashboard-layout>
      <template v-if="fetchDataLoading">
        <div class="big-card2">
        <center><div class="loader"></div></center>
      </div>
            </template>
            <template v-else>
      <div class="col-md-6" style="margin-left: 30px;">
                      <router-link to="/departments" class="icon text-gray-600">
                      <i class="fas fa-arrow-left"></i> Back
                      </router-link>
                  </div>
          <div class="big-card">
      <div class="card mb-4">
        <div class="card-header">
          <h6 class="m-0 font-weight-bold text-dark" style="font-size: 14px; font-weight: bold; color:  #000;">Add Department</h6>
        </div>
        <div class="card-body" style="font-size: 13px; color: #000;">
          <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
            Department added successfully!
          </div>
          <div v-else>
            <form @submit.prevent="submitForm" novalidate>
              <!-- Form fields -->
  
              <div class="row mb-3">
  
                
  
              <div class="form-group">
                <div class="col-sm-6">
              <label for="Department">Department</label>
              <input
              type="text"
              class="form-control"
              id="Department"
              placeholder="Enter Department Name"
              v-model="newDepartment.department"
              required
              style="font-size: 12px; background-color: #F8F9FC"
              maxlength="20"
              ref="categoryInput"
            />
  
            </div>
  
                <br>
                <div class="col-sm-6">
                  <label for="Team-Lead">Team-Lead</label>
                  <select class="form-control"  style="font-size: 12px; background-color: #F8F9FC" id="Team-Lead" v-model="newDepartment.deptHead" required>
                    <option value="" disabled selected>Select Team-Lead</option>
                    <option
                      v-for="user in users"
                      :key="user.UserId"
                      :value="user.UserId"
                      required
                    >
                    {{ user.FirstName }} {{ user.LastName }}
                    </option>
                  </select>
                </div>
              
            </div>
  
            
          </div>
  
  
              <br>
  
              <button class="onboard-button2" type="submit">
                Add Department
              </button><br><br>
              <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
              </div>
            </form>
          </div>
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
    name: 'AddDepartment-page',
  
    components: {
      DashboardLayout
    },
  
    data() {
      return {
        showSuccessMessage: false,
        errorMessage: '',
        users: [],
        newDepartment: {
          department: '',
          deptHead: ''
        }
      };
    },
  
    mounted() {
      this.fetchUser();
    },
  
    methods: {
      async fetchUser() {
        try {
          const response = await axios.get(this.$config.GETUSERS_ENDPOINT);
          this.users = response.data;
        } catch (error) {
          console.error(error);
          this.$toast.open({
          message: error,
          type: 'error', 
          duration: 3000, 
        });
        }
      },
  
      async submitForm(event) {
        event.preventDefault();
  
        const form = event.target;
  
  
      if (!form.checkValidity()) {
        form.reportValidity(); 
        return;
      }
  
        const categoryInput = this.$refs.categoryInput; 
  
  
    const specialChars = /[^A-Za-z0-9\s]/;
    
    if (specialChars.test(categoryInput.value)) {
      this.$toast.open({
          message: 'Department name should not contain special characters.',
          type: 'warning', 
          duration: 3000, 
        });
      return;
    }
  
        const token = sessionStorage.getItem('token');
        try {
       
          const addDepartmentResponse = await axios.post(
            this.$config.ADDDEPT_ENDPOINT,
            this.newDepartment,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
          );
  
        
          if (addDepartmentResponse.status === 200) {
                      
                logData = {
            UserID: sessionStorage.getItem('userId'),
            FName: sessionStorage.getItem('firstName'),
            LName: sessionStorage.getItem('lastName'),
            Email: sessionStorage.getItem('email'),
            Role: sessionStorage.getItem('role'),
            Department: sessionStorage.getItem('department'),
            ActionType: 'Add Department',
            Activity: `New Department(${this.newDepartment.department}) has been added successfully`,
            Category: 'App Categories',
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
          message: `${this.newDepartment.department} has been added successfully to categories`,
          type: 'success', 
          duration: 3000, 
        });
  
          } else {
            this.$toast.open({
          message: 'An error occured while Adding category',
          type: 'error', 
          duration: 3000, 
        });
          }
         
        this.$router.push('/departments');
        } catch (error) {
          console.error(error);
          this.$toast.open({
          message: error,
          type: 'error', 
          duration: 3000, 
        });
        }
      }
    }
  };
  </script>
  
  <style>
  
  </style>
  