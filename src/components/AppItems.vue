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
        <input type="text" class="form-control ml-1 search-bar-main" v-model="searchTerm"   placeholder="  Search with AppItem Name...">
      </div>
        <!-- Onbaord Button-->
        <router-link to="/addappitems">
        <div class="button-container">
        
          <button class="onboard-button2">  
          <img src="@/components/img/Dashboard_Assests/plus-icon.svg" alt="Plus Icon" 
           style="height: 12px; width: auto; padding-right: 6px;">Add AppItem</button>
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
            <th>ID</th>
            <th>App Name</th>
            <th>CardID</th>
            <th>Mounted</th>
            <th>Route</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredRows.length === 0">
        <tr>
          <td colspan="7" style="text-align: center;">No records found</td>
        </tr>
      </template>
          <template v-else-if="searchTerm && filteredRows.length > 0">
          <tr v-for="appitem in filteredRows" :key="appitem.ID" class="table-row">
            <td>{{ appitem.ID }}</td>
            <td>{{ appitem.AppName }}</td>
            <td>{{ appitem.cardID }}</td>
            <td>{{ getMountedText(appitem.mounted) }}</td>
            <td>{{ appitem.route }}</td>
            <td>{{ appitem.Description }}</td>
            <td class="mobile-row">
              <div style="display: flex;">
              <router-link v-if="appitem.ID" :to="{ path: '/editappitem', query: { app: appitem.ID } }">
                <img src="@/components/img/Dashboard_Assests/edit-icon.svg" alt="Edit Icon" style="padding-right: 0px;">
              </router-link>
              <button @click="deleteAppitem(appitem.ID, appitem.AppName)" style="background-color: transparent; border: none;">
                <img src="@/components/img/Dashboard_Assests/delete-icon.svg" alt="Delete Icon" style="padding-right: 0px;">
              </button>
            </div>
            </td>
         </tr>
          </template>
          <template v-else>
           <tr v-for="appitem in visibleRows" :key="appitem.ID" class="table-row">
            <td>{{ appitem.ID }}</td>
            <td>{{ appitem.AppName }}</td>
            <td>{{ appitem.cardID }}</td>
            <td>{{ getMountedText(appitem.mounted) }}</td>
            <td>{{ appitem.route }}</td>
            <td>{{ appitem.Description }}</td>
            <td>
              <div style="display: flex;">
              <router-link v-if="appitem.ID" :to="{ path: '/editappitem', query: { app: appitem.ID } }" >
                <img src="@/components/img/Dashboard_Assests/edit-icon.svg" alt="Search Icon" style="padding-right: 10px;">
              </router-link>
              <button @click="deleteAppitem(appitem.ID, appitem.AppName)" style="background-color: transparent; border: none;">
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

      <div class="modal-overlay" v-show="showConfirmDeleteAppitem">
  <Modal class="custom-modal custom-modal-width" v-show="showConfirmDeleteAppitem">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-header-text">
            Delete AppItem
          </div>
          <button type="button" class="close" @click="showConfirmDeleteAppitem = false">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body modal-text">
          Are you sure you want to delete this AppItem?
        </div>

        <div class="modal-footer">
          <button class="logout-cancel" @click="showConfirmDeleteAppitem = false">Cancel</button>
          <!-- <button type="button" class="btn btn-secondary" @click="showlogoutDialog = false">Cancel</button> -->
          <button class="logout-button" @click="confirmdeleteAppitem(savedAppItemID, savedAppItemname)">Yes</button>
        </div>
      </div>
    </div>
  </Modal>
</div>

    </template>
  </dashboard-layout>
</template>

<script>
import axios from 'axios';
import DashboardLayout from './DashboardLayout.vue';

let logData; 


export default {
  name: 'appitems-page',

  components: {
    DashboardLayout,
  },

  data() {
    return {
      appitems: [],
      showSuccessMessage: false,
      errorMessage: '',
      isLoading: true,
      currentPage: 1,
      rowsPerPage: 5,
      totalRows: 0,
      searchTerm: '',
      hovered: false,
      tableData: [],
      fetchDataLoading: true,
      savedAppItemID: '',
      savedAppItemname: '',
      showConfirmDeleteAppitem: false,
      
    };
  },

  async mounted() {
    try{
    await this.fetchAppitems();
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

  deleteAppitem(AppitemID, AppitemName){

    this.showConfirmDeleteAppitem = true;
    this.savedAppItemID = AppitemID;
    this.savedAppItemname = AppitemName;
  },

    async confirmdeleteAppitem(AppitemID, AppitemName) { 

  try {
    const token = sessionStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

   
    const response = await axios.post(`${this.$config.DELETEAPPITEM_ENDPOINT}/${AppitemID}`, { headers });
   

    if (response.status === 200) {

          logData = {
          UserID: sessionStorage.getItem('userId'),
          FName: sessionStorage.getItem('firstName'),
          LName: sessionStorage.getItem('lastName'),
          Email: sessionStorage.getItem('email'),
          Role: sessionStorage.getItem('role'),
          Department: sessionStorage.getItem('department'),
          ActionType: 'Delete Appitem',
          Activity: `Appitem (${AppitemName}) has been Deleted successfully`,
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
        message: `${AppitemName} has been deleted from Appitems`,
        type: 'success', 
        duration: 3000, 
      });
     
    
      
      this.tableData = this.visibleRows.filter(appitem => appitem.ID !== AppitemID);
      this.showConfirmDeleteAppitem = false;
      
      

    } 
  } catch (error) {
    this.showConfirmDeleteAppitem = false;
    this.errorMessage = 'Appitem is mounted and cannot be deleted, please unmount and try again';
    setTimeout(() => {
      this.errorMessage = false;
    }, 3000);
  }
},


    async fetchAppitems() {
      try {
        const response = await axios.get(this.$config.APP_ITEMS_ENDPOINT);
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

    getMountedText(mounted) {
      return mounted == 1 ? 'True' : 'False';
    },
  },
};
</script>

<style scoped>
</style>
