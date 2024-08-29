<template>
    <dashboard-layout>
      <template v-if="fetchDataLoading">
        <div class="big-white-card2">
          <center><div class="loader"></div></center>
        </div>
            </template>
            <template v-else>
        <div class="big-card3">
            <div class="card mb-4">
      <div class="card-header">
        <h6 class="m-0 font-weight-bold text-dark" style="font-size: 14px; font-weight: bold; color:  #000;">Manage Users</h6>
      </div>
      <div class="card-body" style="font-size: 13px; color: #000;">


           <!-- Requester Section -->
          <div class="user-section" style="display: flex; justify-content: space-between; padding-bottom: 30px; padding-top: 20px; border-bottom: 1px solid #8E1611; border-top: 1px solid #8E1611;">
            <div>
            <div style="font-size: 14px; color: #000; margin-bottom: 15px;">Requesters</div>
            <div v-if="!selectedUsers.requester.length || selectedUsers.requester.length < 10" class="">

             <div class="dropdown-container">
              <select 
              ref="dropdown2"
              id="dropdown2"
              v-model="selectedUser.requester" 
              @change="addUser('requester')" 
              class="form-control"
              style="font-size: 12px; background-color: transparent;  cursor: pointer; z-index: 2; width: 350px; height: 35px;  color: #000; font-size: 13px; border: 1px solid #D1D5DB;">
                <option value="Select a user" disabled selected>Select a user</option>
                <option v-for="user in users" :key="user.UserId" :value="user">{{ user.FirstName }} {{ user.LastName }}</option>
              </select>
              <div class="dropdown-icon-container" >
                <img src="@/components/img/Main_Assests/dropdown.svg" alt="Dropdown Icon" @click="toggleDropdown">
              </div>
              <!-- <span v-if="selectedUser.requester && !selectedUsers.requester.some(u => u.UserId === selectedUser.requester.UserId)" @click="addUser('requester')" class="add-icon">+</span> -->
            </div>
            </div>
            </div>

            <div style="width: 450px; height: auto; max-height: 300px; overflow: auto; background-color: transparent;">
                <center><div style="font-size: 13px; color: #000; margin-bottom: 15px;">Note: All users profiled as Requesters will be listed here.</div></center>
            <div v-for="(user, index) in selectedUsers.requester" :key="index" class="user-item">
              <span>{{ getUserName(user) }}</span>
              <span @click="removeUser('requester', index, user)" class="remove-icon">-</span>
            </div>
        </div>

          </div>
         



  
          <!-- Level 1 Approvers Section -->
          <div class="user-section" style="display: flex; justify-content: space-between; padding-bottom: 30px; padding-top: 10px; border-bottom: 1px solid #8E1611;">
            <div>
            <div style="font-size: 14px; color: #000; margin-bottom: 15px;">Level 1 Approvers</div>

            <div v-if="!selectedUsers.level1Approvers.length || selectedUsers.level1Approvers.length < 5">
                <div class="dropdown-container">
              <select 
              ref="dropdown3"
              id="dropdown3"
              v-model="selectedUser.level1Approvers" 
              @change="addUser('level1Approvers')" 
              class="form-control"
              style="font-size: 12px; background-color: transparent;  cursor: pointer; z-index: 2; width: 350px; height: 35px;  color: #000; font-size: 13px; border: 1px solid #D1D5DB;">
                <option value="Select a user" disabled selected>Select a user</option>
                <option v-for="user in users" :key="user.UserId" :value="user">{{ user.FirstName }} {{ user.LastName }}</option>
              </select>
              <div class="dropdown-icon-container" >
                <img src="@/components/img/Main_Assests/dropdown.svg" alt="Dropdown Icon" @click="toggleDropdown">
              </div>
              <!-- <span v-if="selectedUser.level1Approvers && !selectedUsers.level1Approvers.some(u => u.UserId === selectedUser.level1Approvers.UserId)" @click="addUser('level1Approvers')" class="add-icon">+</span> -->
            </div>
            </div>
        </div>

            <div style="width: 450px; height: auto; max-height: 300px; overflow: auto; background-color: transparent;">
                <center><div style="font-size: 13px; color: #000; margin-bottom: 15px;">Note: All users profiled as Level (1) Approver will be listed here.</div></center>
            <div v-for="(user, index) in selectedUsers.level1Approvers" :key="index" class="user-item">
              <span>{{ getUserName(user) }}</span>
              <span  @click="removeUser('level1Approvers', index, user)" class="remove-icon">-</span>
            </div>
          </div>
          </div>
         
  
          <!-- Level 2 Approvers Section -->
          <div class="user-section" style="display: flex; justify-content: space-between; padding-bottom: 30px; padding-top: 10px; border-bottom: 1px solid #8E1611">
            <div>
            <div style="font-size: 14px; color: #000; margin-bottom: 15px;">Level 2 Approvers</div>

            <div v-if="!selectedUsers.level2Approvers.length || selectedUsers.level2Approvers.length < 5">
                <div class="dropdown-container">
              <select
              ref="dropdown3"
              id="dropdown3"
               v-model="selectedUser.level2Approvers" 
               @change="addUser('level2Approvers')" 
               class="form-control"
               style="font-size: 12px; background-color: transparent;  cursor: pointer; z-index: 2; width: 350px; height: 35px;  color: #000; font-size: 13px; border: 1px solid #D1D5DB;">
                <option value="" disabled selected>Select a user</option>
                <option v-for="user in users" :key="user.UserId" :value="user">{{ user.FirstName }} {{ user.LastName }}</option>
              </select>
              <div class="dropdown-icon-container" >
                <img src="@/components/img/Main_Assests/dropdown.svg" alt="Dropdown Icon" @click="toggleDropdown">
              </div>
              <!-- <span v-if="selectedUser.level2Approvers && !selectedUsers.level2Approvers.some(u => u.UserId === selectedUser.level2Approvers.UserId)" @click="addUser('level2Approvers')" class="add-icon">+</span> -->
            </div>
            </div>
            </div>

            <div style="width: 450px; height: auto; max-height: 300px; overflow: auto; background-color: transparent;">
                <center><div style="font-size: 13px; color: #000; margin-bottom: 15px;">Note: All users profiled as Level (2) Approver will be listed here.</div></center>
            <div v-for="(user, index) in selectedUsers.level2Approvers" :key="index" class="user-item">
              <span>{{ getUserName(user) }}</span>
              <span @click="removeUser('level2Approvers', index, user)" class="remove-icon">-</span>
            </div>
            </div>
          </div>
  
           <!-- Reviewer Section -->
           <div class="user-section" style="display: flex; justify-content: space-between; padding-bottom: 30px; padding-top: 10px; border-bottom: 1px solid #8E1611">
            <div>
            <div style="font-size: 14px; color: #000; margin-bottom: 15px;">Reviewer</div>
            
            <div v-if="!selectedUsers.reviewer.length || selectedUsers.reviewer.length < 5" >
                <div class="dropdown-container">
              <select 
              v-model="selectedUser.reviewer" 
              @change="addUser('reviewer')" 
              class="form-control"
              style="font-size: 12px; background-color: transparent;  cursor: pointer; z-index: 2; width: 350px; height: 35px;  color: #000; font-size: 13px; border: 1px solid #D1D5DB;">
                <option value="Select a user" disabled selected>Select a user</option>
                <option v-for="user in users" :key="user.UserId" :value="user">{{ user.FirstName }} {{ user.LastName }}</option>
              </select>
              <div class="dropdown-icon-container" >
                <img src="@/components/img/Main_Assests/dropdown.svg" alt="Dropdown Icon" @click="toggleDropdown">
              </div>
              <!-- <span v-if="selectedUser.reviewer && !selectedUsers.reviewer.some(u => u.UserId === selectedUser.reviewer.UserId)" @click="addUser('reviewer')" class="add-icon">+</span> -->
            </div>
        </div>
        </div>

        <div style="width: 450px; height: auto; max-height: 300px; overflow: auto; background-color: transparent;">
                <center><div style="font-size: 13px; color: #000; margin-bottom: 15px;">Note: All users profiled as Reviewer Approver will be listed here.</div></center>
            <div v-for="(user, index) in selectedUsers.reviewer" :key="index" class="user-item">
              <span>{{ getUserName(user) }}</span>
              <span @click="removeUser('reviewer', index, user)" class="remove-icon">-</span>
            </div>
          </div>
          </div>

          </div>
          </div>
  
  
  
         
          <div class="card-footer">
            <button type="subit" class="onboard-button2" @click="setUsers">Update</button>
            <!-- <button type="button" class="btn btn-danger" @click="cancel">Cancel</button> -->
          </div>
        </div>
       

      <div class="modal-overlay" v-show="showDeleteModal">
  <Modal class="custom-modal custom-modal-width" v-show="showDeleteModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-header-text">
            Remove User
          </div>
          <button type="button" class="close" @click="showlogoutDialog = false">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body modal-text">
          Are you sure you want to remove this user?
        </div>

        <div class="modal-footer">
          <button class="logout-cancel" @click="cancelDelete">Cancel</button>
          <!-- <button type="button" class="btn btn-secondary" @click="showlogoutDialog = false">Cancel</button> -->
          <button class="logout-button" @click="confirmDelete">Yes</button>
        </div>
      </div>
    </div>
  </Modal>
      </div>
      </template>
      
    </dashboard-layout>
  </template>
  
  <script>
  import DashboardLayout from '@/components/DashboardLayout.vue';
  import axios from 'axios';
  
  export default {
    name: 'ManageUsers',
    components: {
      DashboardLayout,
    },
    data() {
      return {
        selectedUsers: {
          requester: [],
          level1Approvers: [],
          level2Approvers: [],
          reviewer: [],
        },
        selectedUser: {
          requester: null,
          level1Approvers: null,
          level2Approvers: null,
          reviewer: null,
        },
        users: [],
        existingUsers: [],
        Isloading: false,
        isLoading: true,
        userAlreadyAddedWarning: '',
        showDeleteModal: false,
        userToDelete: null,
        fetchDataLoading: true,
      };
    },
    async mounted() {
      try{
      // Fetch users from the endpoint when the component is mounted
     await this.fetchExistingUsers();
     await this.fetchUsers();
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
  
        // Method to cancel the delete action
    cancelDelete() {
      this.showDeleteModal = false;
      this.userToDelete = null; // Reset userToDelete data
    },
  
    // Method to confirm and proceed with the delete action
    confirmDelete() {
      const { section, index, user } = this.userToDelete;
  
      const userId = user.UserId || user.UserID;
      
      // Call the API to delete the user
      this.deleteUser(userId)
        .then(() => {
          // If the deletion is successful, remove the user from the selectedUsers
          this.selectedUsers[section].splice(index, 1);
          this.$toast.open({
            message: 'User removed successfully',
            type: 'success',
            duration: 3000,
          });
  
          this.selectedUser = {
          requester: null,
          level1Approvers: null,
          level2Approvers: null,
          reviewer: null,
        };
        window.location.reload();
        })
        .catch(error => {
          console.error('Error removing user:', error);
          this.$toast.open({
            message: 'Error removing user. Please try again.',
            type: 'error',
            duration: 3000,
          });
        })
        .finally(() => {
          this.cancelDelete(); // Close the modal and reset userToDelete
        });
    },
  
  
      getUserName(user) {
    // Check if the user object has properties like FirstName and LastName
    if (user.FirstName && user.LastName) {
      console.log('Found FirstName and LastName:', user.FirstName, user.LastName);
      return `${user.FirstName} ${user.LastName}`;
    }
  
    // If not, it might be an existing user, try to find the corresponding user
    const correspondingUser = this.users.find(u => u.UserId === user.UserID);
    if (correspondingUser) {
      console.log('Found corresponding user:', correspondingUser.FirstName, correspondingUser.LastName);
      return `${correspondingUser.FirstName} ${correspondingUser.LastName}`;
    }
  
    // If no match is found, return a default value or an empty string
    console.log('Unknown User:', user);
    return 'Unknown User';
  },
  
  
  preparePayload() {
    const payload = [];
  
    // Helper function to log users without UserID
    const logUsersWithoutUserID = (users, section) => {
      const usersWithoutUserID = users.filter(user => !user.UserId);
      if (usersWithoutUserID.length > 0) {
        console.warn(`Users without UserID in ${section} section:`, usersWithoutUserID);
      }
    };
  
    // Add Requesters
    this.selectedUsers.requester.forEach(user => {
      if (user.UserId) {
        payload.push({
          UserID: user.UserId,
          Email: user.Email,
          FirstName: user.FirstName,
          LastName: user.LastName,
          IsRequester: 1,
        });
      } else {
        console.error('User without UserID in requester section:', user);
      }
    });
    logUsersWithoutUserID(this.selectedUsers.requester, 'requester');
  
    // Add Level 1 Approvers
    this.selectedUsers.level1Approvers.forEach(user => {
      if (user.UserId) {
        payload.push({
          UserID: user.UserId,
          Email: user.Email,
          FirstName: user.FirstName,
          LastName: user.LastName,
          IsApprover1: 1,
        });
      } else {
        console.error('User without UserID in level1Approvers section:', user);
      }
    });
    logUsersWithoutUserID(this.selectedUsers.level1Approvers, 'level1Approvers');
  
    // Add Level 2 Approvers
    this.selectedUsers.level2Approvers.forEach(user => {
      if (user.UserId) {
        payload.push({
          UserID: user.UserId,
          Email: user.Email,
          FirstName: user.FirstName,
          LastName: user.LastName,
          IsApprover2: 1,
        });
      } else {
        console.error('User without UserID in level2Approvers section:', user);
      }
    });
    logUsersWithoutUserID(this.selectedUsers.level2Approvers, 'level2Approvers');
  
     // Add reviewers
     this.selectedUsers.reviewer.forEach(user => {
      if (user.UserId) {
        payload.push({
          UserID: user.UserId,
          Email: user.Email,
          FirstName: user.FirstName,
          LastName: user.LastName,
          IsReviewer: 1,
        });
      } else {
        console.error('User without UserID in Reviewer section:', user);
      }
    });
    logUsersWithoutUserID(this.selectedUsers.reviewer, 'reviewer');
  
    return payload;
  },
  
  
  
  addUser(section) {
    if (!this.selectedUser[section]) return;
  
    const selectedUserId = this.selectedUser[section].UserId;
  
    const userExistsInSection = this.selectedUsers[section].some(u => {
      const userIdFromSection = parseInt(u.UserID, 10);
      const selectedUserIdAsNumber = parseInt(selectedUserId, 10);
      return userIdFromSection === selectedUserIdAsNumber;
    });
  
    const userExistsInExistingUsers = this.existingUsers.some(u => {
      const userIdFromExisting = parseInt(u.UserID, 10);
      const selectedUserIdAsNumber = parseInt(selectedUserId, 10);
      return userIdFromExisting === selectedUserIdAsNumber;
    });
  
    const allSelectedUsers = Object.values(this.selectedUsers).flat();
  const userAlreadySelected = allSelectedUsers.some(u => {
    const userIdFromSelected = u && parseInt(u.UserId, 10);
    const selectedUserIdAsNumber = parseInt(selectedUserId, 10);
    return userIdFromSelected === selectedUserIdAsNumber;
  });
  
  
  
  
    if (!userExistsInSection && !userExistsInExistingUsers && !userAlreadySelected) {
      this.selectedUsers[section].push(this.selectedUser[section]);
      this.selectedUser[section] = null;
      this.userAlreadyAddedWarning = ''; // Reset warning message
    } else if (userExistsInSection) {
      this.userAlreadyAddedWarning = 'User has already been added to this section.';
      this.$toast.open({
        message: 'User has already been added, Please select another user',
        type: 'warning',
        duration: 6000,
      });
    } else if (userExistsInExistingUsers) {
      this.userAlreadyAddedWarning = 'User already exists.';
      this.$toast.open({
        message: 'User already exists, Please select another user',
        type: 'warning',
        duration: 6000,
      });
    } else if (userAlreadySelected) {
      this.userAlreadyAddedWarning = 'User has already been added in another section.';
      this.$toast.open({
        message: 'User has already been added, Please select another user',
        type: 'warning',
        duration: 6000,
      });
    }
  },
  
  
  removeUser(section, index, user) {
    const userId = user.UserId || user.UserID; // Handle different property names
  
    // Check if the user is in the existingUsers array
    const userExistsInExistingUsers = this.existingUsers.some(u => {
      const userIdFromExisting = parseInt(u.UserID, 10);
      const selectedUserIdAsNumber = parseInt(userId, 10);
      return userIdFromExisting === selectedUserIdAsNumber;
    });
  
    if (userExistsInExistingUsers) {
      // If the user is in the existingUsers array, show the delete confirmation modal
      this.userToDelete = { section, index, user };
      this.showDeleteModal = true; // Show the delete confirmation modal
    } else {
      // If the user is not in the existingUsers array, remove it from the local state directly
      this.selectedUsers[section].splice(index, 1);
      this.$toast.open({
        message: 'User removed successfully',
        type: 'success',
        duration: 3000,
      });
    }
  },
  
  
  
  
    deleteUser(userId) {
      // Implement the logic to call your delete user API
      const token = sessionStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
  
      return axios.get(`${this.$config.DELETEAPPROVER_ENDPOINT}/${userId}`, { headers });
    },
  
      showWarning() {
        // Add logic to display a warning to the user
        console.warn('Warning: Users have already been added.');
        // You can use a modal, alert, or any other method to show the warning
      },
  
      async setUsers() {
    const payload = this.preparePayload();
  
    // Add logic to check if users have already been added
    if (this.selectedUsers.requester.length === 0 &&
        this.selectedUsers.level1Approvers.length === 0 &&
        this.selectedUsers.level2Approvers.length === 0 &&
        this.selectedUsers.reviewer.length === 0) {
      this.userAlreadyAddedWarning = 'Please add users before updating.';
      return;
    }
  
    try {
      const token = sessionStorage.getItem('token');
      const headers = {
            'Authorization': `Bearer ${token}`,
          };
      // Add logic to handle the case when users have already been added
      const response = await axios.post(this.$config.ADDAPPROVER_ENDPOINT, payload,{ headers });
      
      if (response.status === 200) {
        this.$toast.open({
          message: `Users has been updated successfully`,
          type: 'success', // You can use 'success', 'error', 'info', or 'warning'
          duration: 3000, // Duration in milliseconds (3 seconds in this case)
        });
  
         
        window.location.reload();
        this.selectedUsers = {
          requester: [],
          level1Approvers: [],
          level2Approvers: [],
          reviewer: [],
        };
        this.userAlreadyAddedWarning = ''; // Reset warning message
        // Optionally close the modal or perform other actions
      } else {
        console.error('Error adding users:', response.statusText);
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Error adding users:', error);
      // Handle error scenarios
    }
  },
  
  
      changePage(pageNumber) {
        this.currentPage = pageNumber;
        // Perform any other actions needed when changing the page
      },
  
  
  
      async fetchExistingUsers() {
    const token = sessionStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
  
    try {
      const response = await axios.get(this.$config.GETAPPROVER_ENDPOINT, { headers });
  
      if (response.status === 200) {
        // Populate selectedUsers based on user roles
        this.existingUsers = response.data.users;
  
        this.existingUsers.forEach(user => {
          if (user.IsRequester) {
            this.selectedUsers.requester.push(user);
          }
          if (user.IsApprover1) {
            this.selectedUsers.level1Approvers.push(user);
          }
          if (user.IsApprover2) {
            this.selectedUsers.level2Approvers.push(user);
          }
          if (user.IsReviewer) {
            this.selectedUsers.reviewer.push(user);
          }
        });
      } else {
        console.error('Error fetching existing users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching existing users:', error);
    }
    console.log('Existing Users:', this.existingUsers);
  },
  
  
  
  
  
      async fetchUsers() {
    try {
      // Use your HTTP client (axios, fetch, etc.) to fetch users from the endpoint
      const response = await axios.get(this.$config.GETUSERS_ENDPOINT);
      if (response.status === 200) {
        // Filter out users already selected in any section and already existing users
        const selectedUserIds = [
          ...this.selectedUsers.requester.map(user => user.UserId),
          ...this.selectedUsers.level1Approvers.map(user => user.UserId),
          ...this.selectedUsers.level2Approvers.map(user => user.UserId),
          ...this.selectedUsers.reviewer.map(user => user.UserId),
          ...this.existingUsers.map(user => user.UserId),
        ];
  
        this.users = response.data.filter(user => !selectedUserIds.includes(user.UserId));
      } else {
        console.error('Error fetching users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
  
  
  
    },
  };
  </script>
  
    
    <style scoped>
    .user-section {
      margin-bottom: 20px;
    }
    
    .user-section h6 {
      margin-bottom: 10px;
      font-size: 18px;
      color: #333;
    }
    
    .user-section .user-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border: 1px solid #ddd;
      margin-bottom: 10px;
      background-color: #f8f9fa;
    }
    
    .user-section .user-dropdown-container {
      display: flex;

    }
    
    .user-section .user-dropdown {
      flex: 1;
      margin-right: 10px;
    }
    
    .add-icon,
    .remove-icon {
      cursor: pointer;
      color: #28a745;
      font-weight: bold;
      font-size: 20px;
    }
    
    .custom-card {
      margin: 20px;
    }
    
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-top: 1px solid #ddd;
    }
    
    
    .btn-danger {
      background-color: #dc3545;
      color: #fff;
      border: none;
    }
    
    .btn-success {
      background-color: #28a745;
      color: #fff;
      border: none;
    }
    </style>
    