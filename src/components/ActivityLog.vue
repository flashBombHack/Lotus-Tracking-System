<template>
    <dashboard-layout>
      <template v-if="fetchDataLoading">
        <div class="big-card2">
        <center><div class="loader"></div></center>
      </div>
            </template>
            <template v-else>

    <div class="big-card">
      <div class="row mb-3">
              <div class="col-md-6">
                <label for="startDate" style="color:#000; font-size: 13px;">Start Date</label>
                <vue-date-picker v-model="startDate"   style="font-size: 12px; background-color: #F8F9FC" id="startDate" placeholder="Select start date"></vue-date-picker>
              </div>
              <div class="col-md-6">
                <label for="endDate" style="color:#000; font-size: 13px;">End Date</label>
                <vue-date-picker v-model="endDate"   style="font-size: 10px; color: #000; background-color: #F8F9FC" id="endDate" placeholder="Select end date"></vue-date-picker>
              </div>
    
            <br>

              <div class="col-md-12 mt-2">
                 
              <button @click="fetchRecords" class="onboard-button2">
                Fetch
              </button>
              </div>
            </div><br>


      <div class="horizontal-container">
               <!-- Search bar -->
        <div class="search-bar" style="margin-left: 0px;  max-width: 500px;">
        <div class="search-icon ">
          <img src="@/components/img/Main_Assests/Search.svg" alt="Search Icon" style="padding-right: 10px;">
        </div>
        <input type="text" class="form-control ml-1" v-model="searchTerm"  style="width: 370px; height: 35px; color:#000; font-size: 13px; border: 1px solid #D1D5DB;" placeholder="  Search with Any Value...">
      </div>
    
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
            <th>UserID</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>ActionType</th>
            <th>Activity</th>
            <th>Category</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredRows.length === 0">
        <tr>
          <td colspan="7" style="text-align: center;">No records found</td>
        </tr>
      </template>
          <template v-else-if="searchTerm && filteredRows.length > 0">
          <tr v-for="logs in filteredRows" :key="logs.UserID" class="table-row">
            <td>{{ logs.UserID }}</td>
            <td>{{ logs.FName }}</td>
            <td>{{ logs.LName }}</td>
            <td>{{ logs.Email }}</td>
            <td>{{ logs.Role }}</td>
            <td>{{ logs.Department }}</td>
            <td>{{ logs.ActionType }}</td>
            <td>{{ logs.Activity }}</td>
            <td>{{ logs.Category }}</td>
            <td>{{ logs.FormattedTimestamp }}</td>
         </tr>
          </template>
          <template v-else>
           <tr v-for="logs in visibleRows" :key="logs.UserID" class="table-row">
            <td>{{ logs.UserID }}</td>
            <td>{{ logs.FName }}</td>
            <td>{{ logs.LName }}</td>
            <td>{{ logs.Email }}</td>
            <td>{{ logs.Role }}</td>
            <td>{{ logs.Department }}</td>
            <td>{{ logs.ActionType }}</td>
            <td>{{ logs.Activity }}</td>
            <td>{{ logs.Category }}</td>
            <td>{{ logs.FormattedTimestamp }}</td>
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
  import DashboardLayout from '@/components/DashboardLayout.vue';
  import axios from 'axios';



  
  export default {
    name: 'view-activity-logs',
  
    components: {
      DashboardLayout,
    },
  
    data() {
      return {
        showSuccessMessage: false,
        errorMessage: '',
        activityLogRecords: [], 
        startDate: null, 
        endDate: null,
        currentPage: 1,
      rowsPerPage: 3,
      totalRows: 0,
      searchTerm: '',
      hovered: false,
      tableData: [],
      fetchDataLoading: true,
      };
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

  
    async mounted() {

      try{
  
      await this.fetchDefaultRecords();
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
        async fetchDefaultRecords() {
  const token = sessionStorage.getItem('token');
const userid = sessionStorage.getItem('userId');
  try {

    this.errorMessage = ''; 
    const headers = {
    'Authorization': `Bearer ${token}`,
  };

    
    const response = await axios.get(`${this.$config.GETACTIVITYLOG_ENDPOINT}/${userid}`,{headers});

    if (response.status === 200) {
      
      this.tableData = response.data;

    } else {
      this.errorMessage = 'Error occured while fetching record. Please contact the system administrator.';
    }
  } catch (error) {
    console.error('Error fetching default records:', error);
    this.$toast.open({
      message: error,
      type: 'error',
      duration: 3000,
    });
  }
},


    async fetchRecords() {
  try {
    const token = sessionStorage.getItem('token');
    const userid = sessionStorage.getItem('userId');
    this.fetchDataLoading = true;
    this.errorMessage = ''; 
    let url = '';
    const headers = {
    'Authorization': `Bearer ${token}`,
     };

   
    if (!this.startDate && !this.endDate) {
    
      this.$toast.open({
              message: 'Please enter a date range (e.g., 2023-09-05 to 2023-09-06)',
              type: 'warning', 
              duration: 3000, 
            });
      return;
    }

  
    if (this.startDate && this.endDate) {
 
      const startDateStr = this.startDate.toISOString().split('T')[0];
      const endDateStr = this.endDate.toISOString().split('T')[0];

      url = `${this.$config.GETACTIVITYLOG_ENDPOINT}/${userid}/${startDateStr}/${endDateStr}`;
    }

    const response = await axios.get(url,{headers});

    if (response.status === 200) {
     
      this.fetchDataLoading = false;
      this.tableData = response.data;
    }
  } catch (error) {
    console.error('Error fetching reprocessed records:', error);
    this.errorMessage = 'Failed to fetch reprocessed records. Please contact the system administrator.';
  }
},

    },
  };
  </script>
  
  <style>

.custom-table-container::-webkit-scrollbar {
  height: 6px;
  width: 6px; 
}

.custom-table-container::-webkit-scrollbar-thumb {
  background-color: #c6c5cb; 
  border-radius: 3px;
  cursor: pointer;
}

.big-card {
  overflow: auto;
}

.big-card::-webkit-scrollbar {
  height: 2px; 
  width: 6px;
}

.big-card::-webkit-scrollbar-thumb {
  background-color: #c6c5cb; /* Set the color of the scrollbar thumb */
  border-radius: 3px; 
}

   .page-number {
    margin: 0 5px;
   
    padding: 0 5px; 
    color: black;
  }


  .active-page {
    background-color: lightgray !important;    
    color: white !important; 
    border-radius: 10px; 
   
  }
  .custom-card {
    margin: 10px;
  }
  
  .custom-card-width {
    max-width: 900px;
    margin: 30px auto;
  }
  </style>
  