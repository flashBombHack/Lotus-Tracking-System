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
          <h6 class="m-0 font-weight-bold text-dark" style="font-size: 14px; font-weight: bold; color:  #000;">Edit Department</h6>
        </div>
        <div class="card-body" style="font-size: 13px; color: #000;">
          <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
            Department Update successfully!
          </div>
          <div v-else>
            <form @submit.prevent="submitForm" novalidate>
              <!-- Form fields -->

              <div class="row mb-3">
                <div class="col-md-6">
              <div class="form-group">
                  <div class="col-sm-6">
                    <label for="Department">Department</label>
                    <input
                      type="text"
                      class="form-control"
                      id="Department"
                      placeholder="Enter Department Name"
                      v-model="Departments.Department"
                      style="font-size: 12px; background-color: #F8F9FC"
                      required
                      maxlength="15"
                    />
                  </div><br>
                  <div class="col-sm-6">
        <label for="Team-Lead">Team-Lead</label>
        <select class="form-control" style="font-size: 12px; background-color: #F8F9FC" id="Team-Lead" v-model="Departments.TeamLead">
          <option
            v-for="user in users"
            :key="user.UserId"
            :value="user.UserId"
          >
            {{ user.FirstName }} {{ user.LastName }}
          </option>
        </select>
      </div>
        </div>
      </div>
        </div>
        <br>
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
  
              <button class="onboard-button2" type="submit">
              Update
              </button>
            
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
  name: 'EditCategory-page',

  components: {
    DashboardLayout
  },

  data() {
    return {
        showSuccessMessage: false,
        fetchDataLoading: true,
        errorMessage: '',
        users: [],
        DepartmentID: '',
        Departments: {
        ID: '',
        Department: '',
        DeptHead: '',
        
      },
    };
  },

  async mounted() {
    try{
     await this.fetchDepartment();
     await this.fetchUsers();

     this.fetchDataLoading = false;

    }catch(error){
      console.log(error);
    }
    
    
  },


  methods: {
    async fetchDepartment() {
  try {

    this.DepartmentID = this.$route.query.DID;
    const url = `${this.$config.GETDEPT_ENDPOINT}/${this.DepartmentID}`;
    const response = await axios.get(url);

  
    const departmentData = response.data[0];
    this.Departments = {
      ID: departmentData.ID,
      Department: departmentData.Department,
      TeamLead: departmentData.DeptHead, 
    };

  } catch (error) {
    console.error(error);
  }
},


    async fetchUsers() {
      try {
        const response = await axios.get(this.$config.GETUSERS_ENDPOINT);
        this.users = response.data;
      } catch (error) {
        console.error(error);
        this.$toast.open({
        message:error,
        type: 'error', 
        duration: 3000, 
      });
      }
    },

    
    async submitForm() {
  try {
 
    const DepartmentPayload = {
      department: this.Departments.Department,
      deptHead: this.Departments.TeamLead
    };

    const token = sessionStorage.getItem('token');
    const DepartmentUpdateResponse = await axios.post(
      `${this.$config.UPDATEDEPT_ENDPOINT}/${this.DepartmentID}`,
      DepartmentPayload,
      {
        headers: {
        Authorization: `Bearer ${token}`
          },
      }
    );


  
    if (DepartmentUpdateResponse.status == 200) {

      logData = {
  UserID: sessionStorage.getItem('userId'),
  FName: sessionStorage.getItem('firstName'),
  LName: sessionStorage.getItem('lastName'),
  Email: sessionStorage.getItem('email'),
  Role: sessionStorage.getItem('role'),
  Department: sessionStorage.getItem('department'),
  ActionType: 'Edit Department',
  Activity: `${this.Departments.Department} has been Modified successfully`,
  Category: 'Departments',
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
        message: `${this.Departments.Department} has been Modified successfully`,
        type: 'success', 
        duration: 3000, 
      });



    } else {
      this.$toast.open({
        message:'Update failed',
        type: 'error', 
        duration: 3000, 
      });
    }

  
      this.$router.push('/departments');

  } catch (error) {
    console.error(error);
  
    this.$toast.open({
        message:'An error occurred while updating',
        type: 'error', 
        duration: 3000, 
      });
  }
}



}

  
};
</script>


<style>
.color-circle {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
}

.btn-circle {
  border: none;
  border-radius: 50%;
  padding: 6px 12px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}


</style>