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
        <input type="text" class="form-control ml-1 search-bar-main" v-model="searchTerm"  placeholder="  Search with Category Name...">
      </div>
        <!-- Onbaord Button-->
        <router-link to="/addcategory">
        <div class="button-container">
        
          <button class="onboard-button2">  
          <img src="@/components/img/Dashboard_Assests/plus-icon.svg" alt="Plus Icon" 
           style="height: 12px; width: auto; padding-right: 6px;">Add Category</button>
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
            <th>Name</th>
            <th>Color_Tag</th>
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
          <tr v-for="category in filteredRows" :key="category.ID" class="table-row">
            <td>{{ category.ID }}</td>
            <td>{{ category.App_category }}</td>
            <td>{{ category.style_name }}</td>
            <td>
              <router-link v-if="category.ID" :to="{ path: '/editcategory', query: { CID: category.ID } }" >
                <img src="@/components/img/Dashboard_Assests/edit-icon.svg" alt="Edit Icon" style="padding-right: 10px;">
              </router-link>
              <button @click="deleteCategory(category.ID, category.style_name)" style="background-color: transparent; border: none;">
                <img src="@/components/img/Dashboard_Assests/delete-icon.svg" alt="Delete Icon" style="padding-right: 10px;">
              </button>
            </td>
         </tr>
          </template>
          <template v-else>
           <tr v-for="category in visibleRows" :key="category.ID" class="table-row">
            <td>{{ category.ID }}</td>
            <td>{{ category.App_category }}</td>
            <td>{{ category.style_name }}</td>
            <td>
              <router-link v-if="category.ID" :to="{ path: '/editcategory', query: { CID: category.ID } }">
                <img src="@/components/img/Dashboard_Assests/edit-icon.svg" alt="Edit Icon" style="padding-right: 10px;">
              </router-link>
              <button @click="deleteCategory(category.ID, category.style_name)" style="background-color: transparent; border: none;">
                <img src="@/components/img/Dashboard_Assests/delete-icon.svg" alt="Delete Icon" style="padding-right: 10px;">
              </button>
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


      <div class="modal-overlay" v-show="showConfirmCategory">
  <Modal class="custom-modal custom-modal-width" v-show="showConfirmCategory">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-header-text">
            Delete Category
          </div>
          <button type="button" class="close" @click="showConfirmCategory = false">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body modal-text">
          Are you sure you want to delete this Category?
        </div>

        <div class="modal-footer">
          <button class="logout-cancel" @click="showConfirmCategory = false">Cancel</button>
          <!-- <button type="button" class="btn btn-secondary" @click="showlogoutDialog = false">Cancel</button> -->
          <button class="logout-button" @click="confirmdeleteCategory(savedCategoryID, savedStylename)">Yes</button>
        </div>
      </div>
    </div>
  </Modal>
</div>
    
    
    </dashboard-layout>
    </template>
    
    <script>
    import axios from 'axios';
    import DashboardLayout from './DashboardLayout.vue';

    
    export default {
      name: 'categories-page',
    
      components: {
        DashboardLayout
      },
    
      data() {
        return {
          categories: [],
          showSuccessMessage: false,
          showConfirmCategory: false,
          errorMessage: '',
          currentPage: 1,
          rowsPerPage: 5,
          totalRows: 0,
          searchTerm: '',
          hovered: false,
          tableData: [],
          fetchDataLoading: true,
          savedCategoryID: '',
          savedStylename: '',
        };
      },
    
      async mounted() {
        try{
        await this.fetchCategories();
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

  deleteCategory(categoryID, styleName){
    this.showConfirmCategory = true;
    this.savedCategoryID = categoryID;
    this.savedStylename - styleName

  },
        async confirmdeleteCategory(categoryID, styleName) { 
  try {
    const token = sessionStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

   
    const response = await axios.post(`${this.$config.DELETECATEGORY_ENDPOINT}/${categoryID}`, { headers });
   

    if (response.status === 200) {
     
      this.showSuccessMessage = 'Category has been deleted successfully';
     
      
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);

      
      this.tableData = this.tableData.filter(category => category.ID !== categoryID);
      this.showConfirmCategory = false;

      
      await axios.post(this.$config.UPDATECOLORTAG_ENDPOINT, {
        UpdateTo0: styleName
      }, { headers });

      console.log('Color tag is: ' + styleName); 
      
      

    } else if (response.status === 400) {
      this.showConfirmCategory = false;
      this.errorMessage = 'Category is tied to an App item and cannot be deleted';
      setTimeout(() => {
        this.errorMessage = false;
      }, 2000);
    }
  } catch (error) {
    this.showConfirmCategory = false;
    this.errorMessage = 'Category is tied to an App item and cannot be deleted';
    setTimeout(() => {
      this.errorMessage = false;
    }, 3000);
  }
},



    
        async fetchCategories() {
          try {
            const response = await axios.get(this.$config.GETCATEGORIES_ENDPOINT);
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
      }
    };
    </script>
    
    
    
    <style>
  
    </style>