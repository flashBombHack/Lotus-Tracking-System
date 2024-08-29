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
        <h6 class="m-0 font-weight-bold text-dark" style="font-size: 14px; font-weight: bold; color:  #000;">Edit User</h6>
      </div>
      <div class="card-body" style="font-size: 13px; color: #000;">
        <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
          User Updated successfully!
        </div>
        <div v-if="showSuccessRPMessage" class="alert alert-success">
          {{ showSuccessRPMessage }}
        </div>
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>

    
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
                  v-model="user.FirstName"
                  style="font-size: 12px; background-color: #F8F9FC"
                  required
                />
              </div>
              <div class="col-sm-6 mt-2">
                <label for="lastName">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  placeholder="Enter last name"
                  v-model="user.LastName"
                  style="font-size: 12px; background-color: #F8F9FC"
                  required
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
                  v-model="user.Email"
                  style="font-size: 12px; background-color: #F8F9FC"
                  disabled
                  required
                />
              </div>

              <div class="col-sm-6 mt-2">
                <label for="department">Department</label>
                <select class="form-control" id="department"  style="font-size: 12px; background-color: #F8F9FC" v-model="user.Department" required>
                  <option value="">Select Department</option>
                  <option v-for="department in departments" :key="department.ID" :value="department.Department">
                    {{ department.Department }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col-sm-6">
                <label for="role">Role</label>
                <select class="form-control" id="role"  style="font-size: 12px; background-color: #F8F9FC" v-model="user.Role" required @change="toggleAppItem">
                  <option value="" disabled selected>Select Role</option>
                  <option v-for="role in roles" :value="role.Role" :key="role.ID">{{ role.Role }}</option>
                </select>
                <br>
                <div class="col-sm-6">
              <label for="IsActive">Is Active</label>
              <div class="custom-control custom-switch">
                <input
                type="checkbox"
                class="custom-control-input"
                id="IsActive"
                v-model="isActiveCheckbox"
                @change="updateIsActive"
              />
              <label class="custom-control-label" for="IsActive">
                {{ isActiveCheckbox ? 'Yes' : 'No' }}
              </label>

              </div>
            </div>

              </div>

              <div class="col-sm-6 mt-2" v-show="user.Role !== 'Admin' && user.Role !== 'Sales Executive'">
  <template v-if="userPrivilegesFetched && appItemsWithPrivileges.length">
    <label for="appItems">User Privileges</label>
    <div class="user-privillages">
    <div v-for="appItem in appItemsWithPrivileges" :key="appItem.ID" class="custom-control custom-switch">
      <input
        type="checkbox"
        class="custom-control-input"
        :id="'appItem' + appItem.ID"
        :value="appItem.ID"
        v-model="user.Privileges"
        @change="toggleAppItem(appItem)"
      />
      <label class="custom-control-label" :for="'appItem' + appItem.ID">{{ appItem.AppName }}</label>
    </div>
    </div>
  </template>
</div>



            </div>
          </div>
          <button type="submit" class="btn btn-success"  style="font-size: 13px; ">Update</button>
          <button type="button" class="btn btn-primary" style="margin-left: 10px; background-color: #452BA5; font-size: 13px;" @click="showPasswordResetDialog = true">
            Reset Password
          </button>

          <button type="button" class="btn btn-danger" style="margin-left: 10px; font-size: 13px; " @click="showDeleteModal = true">
          Delete User
          </button>


    <!-- <div class="modal-overlay" v-show="showDeleteModal">
      <Modal class="custom-modal" v-show="showDeleteModal" @input="onModalInput">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Deletion</h5>
            <button type="button" class="close" @click="showDeleteModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this user?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="showDeleteModal = false">No</button>
            <button type="button" class="btn btn-success" @click="deleteUser">Yes</button>
          </div>
        </div>
      </div>
    </Modal>
    </div> -->

    <div class="modal-overlay" v-show="showDeleteModal">
  <Modal class="custom-modal custom-modal-width" v-show="showDeleteModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-header-text">
            Confirm Deletion
          </div>
          <button type="button" class="close" @click="showDeleteModal = false">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body modal-text">
          Are you sure you want to delete this user?
        </div>

        <div class="modal-footer">
          <div class="logout-cancel" @click="showDeleteModal = false"><center>Cancel</center></div>
          <!-- <button type="button" class="btn btn-secondary" @click="showlogoutDialog = false">Cancel</button> -->
          <button class="logout-button" @click="deleteUser">Yes</button>
        </div>
      </div>
    </div>
  </Modal>
</div>


    <div class="modal-overlay" v-show="showPasswordResetDialog">
  <Modal class="custom-modal custom-modal-width" v-show="showPasswordResetDialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-header-text">
            Reset Password
          </div>
          <button type="button" class="close" @click="showPasswordResetDialog = false">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body modal-text">
          Are you sure you want to reset this user password?
        </div>

        <div class="modal-footer">
          <div class="logout-cancel" @click="showPasswordResetDialog = false"><center>Cancel</center></div>
          <!-- <button type="button" class="btn btn-secondary" @click="showlogoutDialog = false">Cancel</button> -->
          <div class="logout-button" @click="resetPassword"><center>Yes</center></div>
        </div>
      </div>
    </div>
  </Modal>
</div>


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
  name: 'EditUserPage',

  components: {
    DashboardLayout,
    
  },

  data() {
    return {
      showDeleteModal: false,
      fetchDataLoading: true,
      showPasswordResetDialog: false, 
      isDeleteModalVisible: false, 
      showSuccessMessage: false,
      showSuccessRPMessage: false,
      errorMessage: '',
      errorRPMessage: '',
      password: '',
      confirmPassword: '',
      previousRole: null,
      newPassword: '',
    confirmPassword2: '',
      user: {
        UserId: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Department: '',
        Role: '',
        Password: '',
        ConfirmPassword: '',
        Privileges: [],
        IsActive: 1,
      },
      departments: [],
      roles: [],
      appItems: [],
      userPrivileges: [],
      userPrivilegesFetched: false,
      isLoading: true,
      showPassword: false,
      confirmshowPassword: false,
      isTeamLead: '',
      userRole: '',
      UserId: '',
    };
  },

  async mounted() {
    this.userRole = sessionStorage.getItem('role');
      this.isTeamLead = sessionStorage.getItem('isTeamLead')
      this.UserId = sessionStorage.getItem('userId');
    try{
    await this.fetchUser();
    await this.updateCheckboxState();
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

  computed: {
    appItemsWithPrivileges() {
    if (!this.userPrivilegesFetched) {
      return []; 
    }

    return this.appItems.map((appItem) => {
      const hasPrivilege = this.user.Privileges.includes(appItem.ID);
      return { ...appItem, privilege: hasPrivilege };
    });
    },

    isActiveCheckbox: {
      get() {
        return this.user.IsActive === 1;
      },
      set(newValue) {
        this.user.IsActive = newValue ? 1 : 0;
      },
    },
  },

  watch: {
    appItems: {
      handler: 'updateAppItemsWithPrivileges',
      immediate: true,
    },
  },

  methods: {

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      const passwordInput = document.getElementById('newPassword');

      if (this.showPassword) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    },

    toggleConfirmPasswordVisibility() {
      this.confirmshowPassword = !this.confirmshowPassword;
      const confirmpasswordInput = document.getElementById('confirmPassword2');

      if (this.confirmshowPassword) {
        confirmpasswordInput.type = 'text';
      } else {
        confirmpasswordInput.type = 'password';
      }
    },

    updateCheckboxState() {
    
    this.appItemsWithPrivileges.forEach((appItem) => {
      appItem.privilege = this.user.Privileges.includes(appItem.ID);
    });
  },

    
  async resetPassword() {
  
   
    const payload = {
      email: this.user.Email,
    };
    const token = sessionStorage.getItem('token');

   
   await axios.post(this.$config.RESETUSERPASSWORD_ENDPOINT, payload,
         {
            headers: {
      
            Authorization: `Bearer ${token}`
          },
          },
      )
      .then(() => {
        logData = {
  UserID: sessionStorage.getItem('userId'),
  FName: sessionStorage.getItem('firstName'),
  LName: sessionStorage.getItem('lastName'),
  Email: sessionStorage.getItem('email'),
  Role: sessionStorage.getItem('role'),
  Department: sessionStorage.getItem('department'),
  ActionType: 'Reset Password',
  Activity: `Password has been successfully reset for User(${this.user.FirstName} ${this.user.LastName})`,
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
        message: `Password has been reset successfully, Default Credentials has been sent to User Email`,
        type: 'success', 
        duration: 5000, 
      });
      this.$router.push('/users');
     
  

      })
      .catch((error) => {
        
        this.errorMessage = "An error occured while reset password. Please try again later";
        console.log(error)
        setTimeout(() => {
          this.errorMessage = false;
        }, 2000);
      });
  },

    closeModal() {
      this.$emit('input', false); 
    },

    confirmDelete() {
      this.showDeleteModal = false;
  },


  onModalInput(value) {
    this.showDeleteModal = value;
   
  },

    async deleteUser() {
    try {
      const email = this.user.Email; 

      const deleteUrl = `${this.$config.DELETEUSER_ENDPOINT}?email=${email}`;
      const token3 = sessionStorage.getItem('token');

      await axios.post(deleteUrl,
      {
          headers: {
          Authorization: `Bearer ${token3}`
          },
          }
      );

      logData = {
  UserID: sessionStorage.getItem('userId'),
  FName: sessionStorage.getItem('firstName'),
  LName: sessionStorage.getItem('lastName'),
  Email: sessionStorage.getItem('email'),
  Role: sessionStorage.getItem('role'),
  Department: sessionStorage.getItem('department'),
  ActionType: 'Delete User',
  Activity: `Users(${this.user.FirstName} ${this.user.LastName}) has been deleted successfully`,
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
        message: `User(${this.user.FirstName} ${this.user.LastName}) has been Deleted successfully`,
        type: 'success', 
        duration: 3000,
      });
      
     
        this.$router.push('/users'); 
    

        this.onModalInput(false);

    } catch (error) {
   
      console.error('Error deleting user:', error);
    }
  },

    updateIsActive() {

      this.user.IsActive = this.isActiveCheckbox ? 1 : 0;
    },
    
    async fetchUser() {
      const token = sessionStorage.getItem('token');
      try {
       
        const email = this.$route.query.email;
        const url = `${this.$config.GETUSERBYEMAIL_ENDPOINT}?email=${email}`;
        const response = await axios.get(url);
        this.user = response.data; 
        

  
        const privilegesUrl = `${this.$config.USER_PRIVILEGES_ENDPOINT}/${this.user.UserId}`;
        const privilegesResponse = await axios.get(privilegesUrl,
        {
          headers: {
          Authorization: `Bearer ${token}`
          },
          }
        );
        this.user.Privileges = privilegesResponse.data.map((privilege) => privilege.APPID);

        this.userPrivilegesFetched = true;

      
        
        this.fetchDepartments();
        this.fetchRoles();
        this.fetchAppItems();
      

        
      } catch (error) {
        console.error(error);
      }
    },

    async fetchDepartments() {
      try {
        const response = await axios.get(this.$config.GETDEPT_ENDPOINT);
        this.departments = response.data; 
      } catch (error) {
        console.error(error);
      }
    },

    async fetchRoles() {
      try {
        const response = await axios.get(this.$config.GETUSERROLE_ENDPOINT);
        this.roles = response.data; 
      } catch (error) {
        console.error(error);
      }
    },

    async fetchAppItems() {
  try {
    const response = await axios.get(this.$config.APP_ITEMS_ENDPOINT);
    const data = response.data;

    if (this.isTeamLead && this.userRole !== 'Admin') {
      try {
        const userDepartments = await this.fetchUserDepartment(sessionStorage.getItem('userId'));
        this.appItems = data.filter(appItem => {
       
          if (userDepartments.length > 0) {
            return appItem.DeptID === 0 || userDepartments.some(department => department.ID === appItem.DeptID);
          } else {
          
            return true;
          }
        }).map((appItem) => ({
          ...appItem,
          privilege: false,
        }));
      } catch (error) {
        console.error(error);
        this.$toast.open({
          message: error,
          type: 'error',
          duration: 3000,
        });
      }
    } else {
   
      this.appItems = data.map((appItem) => ({
        ...appItem,
        privilege: false,
      }));
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

async fetchUserDepartment(userId) {
      try {
        const response = await axios.get(`${this.$config.GETDEPTBYID_ENDPOINT}/${userId}`);
        return response.data; 
      } catch (error) {
        console.error(error);
        throw error;
      }
    },


    updateAppItemsWithPrivileges() {
      if (!this.userPrivilegesFetched) {
        return; 
      }

      this.appItems.forEach((appItem) => {
        const hasPrivilege = this.user.Privileges.includes(appItem.ID);
        appItem.privilege = hasPrivilege;
      });
    },

    async toggleAppItem(appItem) {
  const changingToAdmin = this.previousRole === 'Support' && this.user.Role === 'Admin';
  const hasPrivilege = this.user.Privileges.includes(String(appItem.ID));

  console.log('Before toggle - user.Privileges:', this.user.Privileges);
  console.log('Before toggle - Checkbox Value:', appItem.privilege);

  if (!changingToAdmin) {
    if (!hasPrivilege) {
     
      const privilege = {
        UserID: this.user.UserId,
        APPID: String(appItem.ID),
      };
      const token = sessionStorage.getItem('token');
      try {
        const addPrivilegeUrl = this.$config.ADDUSERPRIVILLAGES_ENDPOINT;
        await axios.post(addPrivilegeUrl, [privilege],
        {
          headers: {
          Authorization: `Bearer ${token}`
          },
          }
        );
        this.user.Privileges.push(String(appItem.ID));
        appItem.privilege = true;
      } catch (error) {
        console.error(error);
      }
      console.log('Adding privilege...');
    } else {
      const token = sessionStorage.getItem('token');
      
      const deletePrivilegeUrl = `${this.$config.DELETEUSERPRIVILLAGE_ENDPOINT}/${this.user.UserId}/${appItem.ID}`;
      try {
        await axios.post(deletePrivilegeUrl,
        {
          headers: {
          Authorization: `Bearer ${token}`
          },
          }
        );
        const index = this.user.Privileges.findIndex((privilege) => privilege === String(appItem.ID));
        if (index > -1) {
          this.user.Privileges.splice(index, 1);
          appItem.privilege = false;
        }
      } catch (error) {
        console.error(error);
      }
      console.log('Removing privilege...');
    }
  }

  console.log('After toggle - user.Privileges:', this.user.Privileges);
  console.log('After toggle - Checkbox Value:', appItem.privilege);
},


    async submitForm() {
      try {
        const userId = this.user.UserId;
        const updateUrl = `${this.$config.UPDATEUSERINFO_ENDPOINT}/${userId}`;

      
       const IsActive = this.isActiveCheckbox ? 1 : 0;

        const payload = {
          firstName: this.user.FirstName,
          lastName: this.user.LastName,
          email: this.user.Email,
          department: this.user.Department,
          role: this.user.Role,
          isactive: IsActive, 
        };

        const token2 = sessionStorage.getItem('token');

      
        await axios.post(updateUrl, payload,
        {
          headers: {
          Authorization: `Bearer ${token2}`
          },
          }
        );

        logData = {
  UserID: sessionStorage.getItem('userId'),
  FName: sessionStorage.getItem('firstName'),
  LName: sessionStorage.getItem('lastName'),
  Email: sessionStorage.getItem('email'),
  Role: sessionStorage.getItem('role'),
  Department: sessionStorage.getItem('department'),
  ActionType: 'Edit User',
  Activity: `Users(${this.user.FirstName} ${this.user.LastName}) has been Modified successfully`,
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
        message: `User(${this.user.FirstName} ${this.user.LastName}) has been modified successfully`,
        type: 'success', 
        duration: 3000, 
      });

       
          this.$router.push('/users');
  
      } catch (error) {
        this.showSuccessMessage = false; 
        this.errorMessage = 'Error updating user';
        console.error('Error updating user:', error);
      }
      
    },
  },
  
};
</script>

<style>
.custom-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  transition: all 0.3s ease; 
}


.custom-modal input[type="password"] {
    width: 350px; 
  }

.modal-overlay {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1000; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.success-notification {
  background-color: green;
  color: white;
  padding: 10px;
}

.error-notification {
  background-color: red;
  color: white;
  padding: 10px;
}

.btn-space {
  margin-left: 10px;
}

.password-input {
  position: relative;
}

.resetpassword-toggle {
  position: absolute;
  top: 70%;
  right: 15px; 
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

</style>
