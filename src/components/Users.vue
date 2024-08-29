<template>
  <dashboard-layout>

    <template v-if="fetchDataLoading">
      <div class="big-card2">
        <center><div class="loader"></div></center>
      </div>
            </template>
            <template v-else>

    <div class="big-card">
      <div class="horizontal-container">

        <!-- Search bar -->
        <div class="search-bar">
        <div class="search-icon ">
          <img src="@/components/img/Main_Assests/Search.svg" alt="Search Icon" style="padding-right: 10px;">
        </div>
        <input type="text" class="form-control ml-1 search-bar-main" v-model="searchTerm" placeholder="  Search with Name, Email...">
      </div>
        <!-- Onbaord Button-->
        <router-link to="/adduser">
        <div class="button-container">
        
          <button v-if="userRole === 'Admin' || isTeamLead" class="onboard-button2">  
          <img src="@/components/img/Dashboard_Assests/plus-icon.svg" alt="Plus Icon" 
           style="height: 12px; width: auto; padding-right: 6px;">Add User</button>
        </div>
      </router-link>
      </div><hr>


      <div class="custom-table-container" :key="currentPage">
        
      <table class="custom-table">
        <thead>
          <tr>
            <th>UserID</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>IsActive</th>
            <th v-if="userRole === 'Admin' || isTeamLead">Action</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredRows.length === 0">
        <tr>
          <td colspan="7" style="text-align: center;">No records found</td>
        </tr>
      </template>
          <template v-else-if="searchTerm && filteredRows.length > 0">
          <tr v-for="user in filteredRows" :key="user.UserId" class="table-row">
            <td>{{ user.UserId }}</td>
            <td>{{ user.FirstName }}</td>
            <td>{{ user.LastName }}</td>
            <td>{{ user.Email }}</td>
            <td>{{ user.Role }}</td>
            <td>{{ user.Department }}</td>
            <td>{{ getIsActiveText(user.IsActive) }}</td>
            <td v-if="userRole === 'Admin' || isTeamLead">
              <router-link
                v-if="user.Email && (!isTeamLead || (isTeamLead && user.Email !== teamLeadEmail))"
                :to="{ path: '/edituser', query: { email: user.Email } }"
                :disabled="isTeamLead && user.Email === teamLeadEmail"
              >
              <img src="@/components/img/Dashboard_Assests/edit-icon.svg" alt="Search Icon" style="padding-right: 10px;">
              </router-link>
            </td>
  </tr>
          </template>
          <template v-else>
           <tr v-for="user in visibleRows" :key="user.UserId" class="table-row">
            <td>{{ user.UserId }}</td>
            <td>{{ user.FirstName }}</td>
            <td>{{ user.LastName }}</td>
            <td>{{ user.Email }}</td>
            <td>{{ user.Role }}</td>
            <td>{{ user.Department }}</td>
            <td>{{ getIsActiveText(user.IsActive) }}</td>
            <td v-if="userRole === 'Admin' || isTeamLead">
            <router-link
              v-if="user.Email && (!isTeamLead || (isTeamLead && user.Email !== teamLeadEmail))"
              :to="{ path: '/edituser', query: { email: user.Email } }"
              :disabled="isTeamLead && user.Email === teamLeadEmail"
            >
            <img src="@/components/img/Dashboard_Assests/edit-icon.svg" alt="Search Icon" style="padding-right: 10px;">
            </router-link>
          </td>
          </tr>
        </template>

        </tbody>
      </table>
      <div class="pagination">
      <span>{{ currentPageStart }} - {{ currentPageEnd }} of {{ totalRows }}</span>
      <img src="@/components/img/Main_Assests/previousbutton.svg" 
      class="pagination-icon1"
      alt="Prev Icon" 
      @click="prevPage">
      <img src="@/components/img/Main_Assests/nextbutton.svg" 
      class="pagination-icon2"
      alt="Next Icon" 
      @click="nextPage">
    </div>
    <hr>
    </div>
      </div>
      </template>

  </dashboard-layout>
</template>

<script>
import axios from 'axios';
import DashboardLayout from './DashboardLayout.vue';

export default {
  name: 'table-page',

  components: {
    DashboardLayout,

  },

  data() {
    return {
      users: [],
      userRole: '',
      isTeamLead: false,
      teamLeadEmail: '', 
      isLoading: true,
      currentPage: 1,
      rowsPerPage: 5,
      totalRows: 0,
      searchTerm: '',
      hovered: false,
      tableData: [],
      fetchDataLoading: true,
    };
  },

  async mounted() {

    try{ 
      this.userRole = sessionStorage.getItem('role');
      this.teamLeadEmail = sessionStorage.getItem('email');
      
     
      const userId = sessionStorage.getItem('userId');
      const userDepartment = await this.fetchUserDepartment(userId);


      this.isTeamLead = userDepartment.length > 0;
    console.log('Value of this.isTeamLead:', this.isTeamLead);

if (this.isTeamLead) {
  sessionStorage.setItem('isTeamLead', 'true');
} else {
  sessionStorage.setItem('isTeamLead', 'false');
}

console.log('Value on session is: ' + sessionStorage.getItem('isTeamLead'));


    await this.fetchUsers();
    this.totalRows = this.tableData.length;
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

    filteredRows() {
      let filteredData = [];
      let startIndex = 0;
      let endIndex = 0;
        const term = this.searchTerm.toLowerCase().trim();
        if (!term) return this.tableData;

        // Filter rows based on search term
        filteredData = this.tableData.filter(row =>
          Object.values(row).some(value =>
            value && value.toString().toLowerCase().includes(term)
          )
        );

        // Apply pagination to filtered rows
        startIndex = (this.currentPage - 1) * this.rowsPerPage;
        endIndex = startIndex + this.rowsPerPage;

      return filteredData.slice(startIndex, endIndex);
    },


    visibleRows() {
        const startIndex = (this.currentPage - 1) * this.rowsPerPage;
        const endIndex = startIndex + this.rowsPerPage;
        
        // Filter rows based on search term
        const filteredRows = this.filteredRows;
        
        // Slice the filtered rows based on pagination
        return filteredRows.slice(startIndex, endIndex);
      },
      currentPageStart() {
        if (this.searchTerm) {
          return Math.min((this.currentPage - 1) * this.rowsPerPage + 1, this.filteredRows.length);
        } else {
          return Math.min((this.currentPage - 1) * this.rowsPerPage + 1, this.totalRows);
        }
      },

      currentPageEnd() {
        if (this.searchTerm) {
          return Math.min(this.currentPage * this.rowsPerPage, this.filteredRows.length);
        } else {
          return Math.min(this.currentPage * this.rowsPerPage, this.totalRows);
        }
      }


  },

  methods: {
    nextPage() {
    const totalPages = Math.ceil(this.totalRows / this.rowsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  },
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  },

    changePage(pageNumber) {
    this.currentPage = pageNumber;
   
  },

    getIsActiveText(IsActive) {
      return IsActive == 1 ? 'True' : 'False';
    },

    async fetchUsers() {
  try {
    const response = await axios.get(this.$config.GETUSERS_ENDPOINT);
    let allUsers = response.data;
    this.tableData = response.data;

   
    if (this.userRole !== 'Admin') {
      const userDepartment = sessionStorage.getItem('department');


      if (this.isTeamLead) {
        const userDepartments = await this.fetchUserDepartment(sessionStorage.getItem('userId'));
        allUsers = allUsers.filter(user => userDepartments.some(department => department.Department === user.Department));
      } else {
    
        allUsers = allUsers.filter(user => user.Department === userDepartment);
      }

      allUsers = allUsers.filter(user => user.Role !== 'Admin');
    }

    this.users = allUsers;
    this.tableData = this.users;
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

  },

  
};
</script>

<style>

.Toptable-Space{
  margin-left: 330px; 
  height: 35px;

}

.search-bar{
  margin-left: 0px; 
  max-width: 500px;
}

.search-bar-main{
  width: 370px; 
  height: 35px; 
  color:#000; 
  font-size: 13px; 
  border: 1px solid #D1D5DB;
}

@media (max-width: 900px) {
  .Toptable-Space{
  margin-left: 100px; 
  height: 35px;
}
.search-bar{
  margin-left: 0px; 
  max-width: 150px;
}
.search-bar-main{
  width: 200px; 
  height: 35px; 
  color:#000; 
  font-size: 13px; 
  border: 1px solid #D1D5DB;
}

.onboard-button2 {
  background-color: #8E1611;
  color: #FFF;
  border: none;
  padding: 8px 0px;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  width: 150px;
  height: 35px;
}

}

</style>

