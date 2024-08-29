<template>
    <dashboard-layout>
      <template v-if="fetchDataLoading">
        <div class="big-card2">
        <center><div class="loader"></div></center>
      </div>
            </template>
            <template v-else>
      <div class="col-md-6" style="margin-left: 30px;">
                    <router-link to="/users" class="icon text-gray-600">
                    <i class="fas fa-arrow-left"></i> Back
                    </router-link>
                </div>
        <div class="big-card">
      <div class="card mb-4">
        <div class="card-header">
          <h6 class="m-0 font-weight-bold text-dark" style="font-size: 14px; font-weight: bold; color:  #000;">Add User</h6>
        </div>
        <div class="card-body" style="font-size: 13px; color: #000;">
          <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
            User created successfully!
          </div>
          <div v-else>
            <form @submit.prevent="submitForm" novalidate>
              <!-- Form fields -->
  
              <div class="form-group">
                <div class="row">
                  <div class="col-sm-6 mt-2">
                    <label for="firstName">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      placeholder="Enter first name"
                      name="firstName"
                      style="font-size: 12px; background-color: #F8F9FC"
                      required
                      maxlength="15"
                    />
                  </div>
                  <div class="col-sm-6 mt-2">
                    <label for="lastName">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      placeholder="Enter last name"
                      name="lastName"
                      style="font-size: 12px; background-color: #F8F9FC"
                      required
                      maxlength="15"
                    />
                  </div>
                </div>
              </div>
  
              <div class="form-group">
                <div class="row">
                  <div class="col-sm-6 mt-2">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="Enter email"
                      name="email"
                      style="font-size: 12px; background-color: #F8F9FC"
                      required
                      maxlength="100"
                    />
                  </div>
                  <div class="col-sm-6 mt-2">
                    <label for="department">Department</label>
                    <select class="form-control" id="department" style="font-size: 12px; background-color: #F8F9FC" name="department" required>
                      <option value="">Select Department</option>
                      <option v-for="department in departments" :key="department.ID" :value="department.Department">{{ department.Department }}</option>
                    </select>
                  </div>
                </div>
              </div>
  
              <div class="form-group">
      <div class="row">
        <div class="col-sm-6 mt-2">
            <label for="role">Role</label>
            <select class="form-control" id="role" style="font-size: 12px; background-color: #F8F9FC" name="role" required v-model="selectedRole" @change="toggleAppItemToggle">
                <option value="" disabled selected>Select Role</option>
                <option v-for="role in roles" :value="role.ID" :key="role.ID">{{ role.Role }}</option>
            </select>
            </div>
        <div class="col-sm-6 mt-2"  v-show="selectedRole !== 1 && selectedRole !== 4" >
                <label for="appItems">User Privileges:</label>
                <div class="user-privillages">
                <div v-for="appItem in appItems" :key="appItem.ID" class="custom-control custom-switch">
                    <input
                    type="checkbox"
                    class="custom-control-input"
                    :id="'appItemToggle-' + appItem.ID"
                    :value="appItem.ID"
                    v-model="selectedAppItems"
                    style="font-size: 12px; background-color: #F8F9FC"
                    />
                    <label class="custom-control-label" :for="'appItemToggle-' + appItem.ID">{{ appItem.AppName }}</label>
                </div>
              </div>
                </div>

      </div>
    </div><br>
              <button class="onboard-button2" type="submit">
                Submit
              </button>
            </form>
            <br>
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
          </div>
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
    name: 'AddUser-page',
    components: {
      DashboardLayout
    },
    data() {
      return {
        showSuccessMessage: false,
        errorMessage: '',
        departments: [],
        fetchDataLoading: true,
        roles: [],
        appItems: [],
        selectedAppItems: [],
        userId: '' ,
        userRole: '',
        selectedRole: '',
        showPassword: false,
        confirmshowPassword: false,
        isTeamLead: '',

      };
    },
    async mounted() {
      this.userRole = sessionStorage.getItem('role');
      this.isTeamLead = sessionStorage.getItem('isTeamLead')
      this.userId = sessionStorage.getItem('userId');
      

      try{
        await this.fetchDepartments();
        await this.fetchRoles();
        await this.fetchAppItems();
        this.fetchDataLoading = false;

      }catch(error){
        console.log(error);
      }
      
      
    },
    methods: {

      togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      const passwordInput = document.getElementById('password');

      if (this.showPassword) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    }, 
    toggleConfirmPasswordVisibility() {
      this.confirmshowPassword = !this.confirmshowPassword;
      const confirmpasswordInput = document.getElementById('confirmPassword');

      if (this.confirmshowPassword) {
        confirmpasswordInput.type = 'text';
      } else {
        confirmpasswordInput.type = 'password';
      }
    },

        toggleAppItemToggle() {
        if (this.selectedRole !== 1) { 
            this.selectedAppItems = []; 
        } else {
            this.selectedAppItems = this.appItems.map(appItem => appItem.ID);
        }
        },


        async fetchAppItems() {
  try {
    const response = await fetch(this.$config.APP_ITEMS_ENDPOINT);
    const data = await response.json();

    if (this.isTeamLead && this.userRole !== 'Admin') {
      try {
        const userDepartments = await this.fetchUserDepartment(sessionStorage.getItem('userId'));
        this.appItems = data.filter(appItem => {
          
          if (userDepartments.length > 0) {
            return appItem.DeptID === 0 || userDepartments.some(department => department.ID === appItem.DeptID);
          } else {
            
            return true;
          }
        });
      } catch (error) {
        console.error(error);
        this.$toast.open({
          message: error,
          type: 'error',
          duration: 3000,
        });
      }
    } else {
     
      this.appItems = data;
    }
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
        
  try {
    let response;

    if (this.userRole === 'Admin') {
    
      response = await axios.get(this.$config.GETDEPT_ENDPOINT);
       console.log('Fetching details for Admin: '+response.data);
    } else if (this.isTeamLead == 'true' && this.userRole !== 'Admin' ) {
   
      const userDepartments = await this.fetchUserDepartment(sessionStorage.getItem('userId'));
      console.log('Fetching details for Teamlead: ', userDepartments);

      response = {
        data: userDepartments,
      };
      console.log('Filtered departments: ', userDepartments);
    } else {
    
      response = await axios.get(this.$config.GETDEPT_ENDPOINT);
    }

    this.departments = response.data;
  } catch (error) {
    console.error(error);
    this.$toast.open({
      message: error,
      type: 'error',
      duration: 3000,
    });
  }
},




  async fetchUserDepartment(userId) {
      try {
        const response = await axios.get(`${this.$config.GETDEPTBYID_ENDPOINT}/${userId}`);
        return response.data; 
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    fetchRoles() {
  fetch(this.$config.GETUSERROLE_ENDPOINT)
    .then(response => response.json())
    .then(data => {

      if(this.userRole === 'Admin'){

        this.roles = data;
      }
    
      else if (this.isTeamLead && this.userRole !== 'Admin' || this.userRole !== 'Sales Executive') {
        this.roles = data.filter(role => role.Role !== 'Admin');
      } else {
        this.roles = data;
      }
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


      
      submitForm(event) {
  event.preventDefault();
  const form = event.target;


  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = {
    firstName: form.elements.firstName.value,
    lastName: form.elements.lastName.value,
    email: form.elements.email.value,
    department: form.elements.department.value,
    role: this.getRoleName(form.elements.role.value),
    remember: form.elements.remember ? form.elements.remember.checked : false,
  };

  const token = sessionStorage.getItem('token');

  fetch(this.$config.CREATEUSER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(formData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText); 
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
  


      logData = {
  UserID: sessionStorage.getItem('userId'),
  FName: sessionStorage.getItem('firstName'),
  LName: sessionStorage.getItem('lastName'),
  Email: sessionStorage.getItem('email'),
  Role: sessionStorage.getItem('role'),
  Department: sessionStorage.getItem('department'),
  ActionType: 'Add User',
  Activity: `New User(${form.elements.firstName.value} ${form.elements.lastName.value}) has been created successfully`,
  Category: 'Users',
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
        message: `New User (${form.elements.firstName.value} ${form.elements.lastName.value}) has been created successfully`,
        type: 'success', 
        duration: 3000, 
      });

      const newUserEmail = formData.email;
      this.fetchUserByEmail(newUserEmail); 
    })
    .catch(error => {
      console.error(error)
      if (error == 'Error') {
    this.$toast.open({
      message: 'Email already exists, Please try again.',
      type: 'warning',
      duration: 3000,
    });
  }
      else if (error.response && error.response.status === 400) {
    this.$toast.open({
      message: 'Email already exists',
      type: 'warning',
      duration: 3000,
    });
  } else if (error.response && error.response.data && error.response.data.message) {
    const errorMessage = error.response.data.message;
    this.$toast.open({
      message: errorMessage,
      type: 'warning',
      duration: 3000,
    });
  } else {
    console.error('API Error:', error); 
    this.$toast.open({
      message: 'An error occurred during registration. Please try again later.',
      type: 'error',
      duration: 3000,
    });
  }
});




},

fetchUserByEmail(email) {
  fetch(`${this.$config.GETUSERBYEMAIL_ENDPOINT}?email=${encodeURIComponent(email)}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const userId = data.UserId; 
      this.saveUserPrivileges(userId);
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

saveUserPrivileges(userId) {
  if (this.selectedRole !== 1) { 
    const payload = this.selectedAppItems.map(appItemID => ({
      UserID: `${userId}`, 
      APPID: `${appItemID}`,
    }));
    const token = sessionStorage.getItem('token');

    fetch(this.$config.ADDUSERPRIVILLAGES_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText); 
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.$router.push('/users');
          }, 1000);
        })
        .catch(error => {
          console.error(error);
          this.$toast.open({
        message: error,
        type: 'error', 
        duration: 3000, 
      });
        });
  } else {
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.$router.push('/users');
    }, 1000);
  }
},




getRoleName(roleID) {
  const role = this.roles.find(role => role.ID === parseInt(roleID));
  return role ? role.Role : '';
},

      saveSelection() {
        const selectedAppItems = this.appItems.filter(appItem => appItem.mounted === '1');

        const payload = selectedAppItems.map(appItem => ({
          UserID: this.userId,
          APPID: `${appItem}`,
        }));
        const token = sessionStorage.getItem('token');

        fetch(this.$config.ADDUSERPRIVILLAGES_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.showSuccessMessage = true;
            
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

.user-privillages {
  max-height: 115px;
  overflow-y: auto;
}

.user-privillages::-webkit-scrollbar {
  width: 6px; 
}

.user-privillages::-webkit-scrollbar-thumb {
  background-color: #c6c5cb; /* Set the color of the scrollbar thumb */
  border-radius: 3px; 
}



</style>