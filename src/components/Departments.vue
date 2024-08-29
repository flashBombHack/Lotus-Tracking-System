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
        <input type="text" class="form-control ml-1 search-bar-main" v-model="searchTerm" placeholder="  Search with Department Name...">
      </div>
        <!-- Onbaord Button-->
        <router-link to="/departments/add-dept">
        <div class="button-container">
        
          <button class="onboard-button2">  
          <img src="@/components/img/Dashboard_Assests/plus-icon.svg" alt="Plus Icon" 
           style="height: 12px; width: auto; padding-right: 6px;">Add Department</button>
        </div>
      </router-link>
      </div><hr>
      <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
            {{ showSuccessMessage }}
          </div>
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>


      <div class="custom-table-container" :key="currentPage">
        
      <table class="custom-table">
        <thead>
          <tr>
            <th>DeptID</th>
            <th>Department</th>
            <th>Team-Leads</th>
            <th v-if="userRole === 'Admin'">Action</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredRows.length === 0">
        <tr>
          <td colspan="7" style="text-align: center;">No records found</td>
        </tr>
      </template>
          <template v-else-if="searchTerm && filteredRows.length > 0">
          <tr v-for="dept in filteredRows" :key="dept.ID" class="table-row">
            <td>{{ dept.ID }}</td>
            <td>{{ dept.Department }}</td>
            <td>{{ getTeamLeadNames(dept.DeptHead) }}</td>
            <td v-if="userRole === 'Admin'">
              <div style="display: flex;">
              <router-link v-if="dept.ID" :to="{ path: '/departments/edit-dept', query: { DID: dept.ID } }">
                <img src="@/components/img/Dashboard_Assests/edit-icon.svg" alt="Edit Icon" style="padding-right: 10px;">
              </router-link>
              <button @click="deleteCategory(dept.ID)" style="background-color: transparent; border: none;">
                <img src="@/components/img/Dashboard_Assests/delete-icon.svg" alt="Delete Icon" style="padding-right: 10px;">
              </button>
            </div>
            </td>
         </tr>
          </template>
          <template v-else>
           <tr v-for="dept in visibleRows" :key="dept.ID" class="table-row">
            <td>{{ dept.ID }}</td>
            <td>{{ dept.Department }}</td>
            <td>{{ getTeamLeadNames(dept.DeptHead) }}</td>
            <td v-if="userRole === 'Admin'">
              <div style="display: flex;">
              <router-link v-if="dept.ID" :to="{ path: '/departments/edit-dept', query: { DID: dept.ID } }">
                <img src="@/components/img/Dashboard_Assests/edit-icon.svg" alt="Edit Icon" style="padding-right: 10px;">
              </router-link>
              <button @click="deleteCategory(dept.ID)" style="background-color: transparent; border: none;">
                <img src="@/components/img/Dashboard_Assests/delete-icon.svg" alt="Delete Icon" style="padding-right: 10px;">
              </button>
            </div>
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
  import DashboardLayout from './DashboardLayout.vue';
  import axios from 'axios';
  
  export default {
    name: 'departments-page',
  
    components: {
      DashboardLayout
    },

    data() {
    return {
      depts: [],
      userRole: '',
      users: [],
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
    this.userRole = sessionStorage.getItem('role');
    try{ 
    await this.fetchDepts();
    await this.fetchUsers(); 
    this.totalRows = this.tableData.length;
    this.fetchDataLoading = false;
    }catch (error) {
    console.error(error);
    this.fetchDataLoading = false;
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



    async fetchDepts() {
      try {
        const response = await axios.get(this.$config.GETDEPT_ENDPOINT);
        this.tableData = response.data; 
      } catch (error) {
        console.error(error);
        this.$toast.open({
      message: error,
      type: 'error',
      duration: 3000,
    });
      }
    },

    async fetchUsers() {
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

    getTeamLeadNames(userId) {
      const user = this.users.find(user => user.UserId === userId);
      if (user) {
        return `${user.FirstName} ${user.LastName}`;
      }
      return ''; 
    },

    async deleteCategory(DepartmentID) { 
  const confirmation = window.confirm('Are you sure you want to delete this department?');

  if (!confirmation) {
    return;
  }
  

  try {
    const token = sessionStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

   
    const response = await axios.post(`${this.$config.DELETEDEPT_ENDPOINT}/${DepartmentID}`, { headers });
   

    if (response.status === 200) {
      this.$toast.open({
          message: 'Department has been deleted successfully',
          type: 'success',
          duration: 3000,
        });
   
      
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);

      
      this.depts = this.depts.filter(dept => dept.ID !== DepartmentID);
      
      

    } else if (response.status === 400) {
      this.errorMessage = 'Department is tied to an App item and cannot be deleted';
      setTimeout(() => {
        this.errorMessage = false;
      }, 2000);
    }
  } catch (error) {
    this.errorMessage = 'Department is tied to an App item and cannot be deleted';
    setTimeout(() => {
      this.errorMessage = false;
    }, 3000);
  }
},

  },

  };
  </script>
  
  
  
  <style>
  
  
  </style>
  