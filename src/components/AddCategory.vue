<template>
  <dashboard-layout>
    <template v-if="fetchDataLoading">
      <div class="big-card2">
        <center><div class="loader"></div></center>
      </div>
            </template>
            <template v-else>
    <div class="col-md-6" style="margin-left: 30px;">
                    <router-link to="/categories" class="icon text-gray-600">
                    <i class="fas fa-arrow-left"></i> Back
                    </router-link>
                </div>
        <div class="big-card">
    <div class="card mb-4">
      <div class="card-header">
        <h6 class="m-0 font-weight-bold text-dark" style="font-size: 14px; font-weight: bold; color:  #000;">Add Category</h6>
      </div>
      <div class="card-body"  style="font-size: 13px; color: #000;">
        <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
          Category added successfully!
        </div>
        <div v-else>
          <form @submit.prevent="submitForm" novalidate>
            <!-- Form fields -->

            <div class="row mb-3">

              

            <div class="form-group">
              <div class="col-sm-6">
            <label for="App_category">Category</label>
            <input
            type="text"
            class="form-control"
            id="App_category"
            placeholder="Enter Category Name"
            v-model="newCategory.App_category"
            style="font-size: 12px; background-color: #F8F9FC"
            required
            maxlength="20"
            ref="categoryInput"
          />

          </div>

              <br>
              <div class="col-sm-6">
                <label for="ColorTag">Color_Tag</label>
                <select class="form-control" style="font-size: 12px; background-color: #F8F9FC" id="colortag" v-model="newCategory.style_name" required>
                  <option value="" disabled selected>Select ColorTag</option>
                  <option
                    v-for="colors in colorTags"
                    :key="colors.ID"
                    :value="colors.Name"
                    required
                  >
                    {{ colors.Name }}
                  </option>
                </select>
              </div>
            
          </div>

          <div class="col-md-8">           
      <div class="mt-4 text-left small" style="font-size: 12px; background-color: #F8F9FC; border: 1px solid #000; padding: 15px">
        <h6>List of Color Tags</h6>
                <span class="mr-3">
                    <i class="fas fa-circle text-success"></i> success
                </span><br>
                <span class="mr-3">
                    <i class="fas fa-circle text-danger"></i> danger
                </span><br>
                <span class="mr-4">
                    <i class="fas fa-circle text-warning"></i> warning
                </span><br>
                <span class="mr-3">
                    <i class="fas fa-circle text-info"></i> info
                </span><br>
                <span class="mr-3">
                    <i class="fas fa-circle text-dark"></i> dark
                </span><br>
                <span class="mr-3">
                    <i class="fas fa-circle text-primary"></i> primary
                </span>
            </div>
          </div>
          
        </div>


            <br>
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>

            <button class="onboard-button2" type="submit">
              Add Category
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
  name: 'AddCategory-page',

  components: {
    DashboardLayout
  },

  data() {
    return {
      showSuccessMessage: false,
      fetchDataLoading: true,
      errorMessage: '',
      colorTags: [],
      newCategory: {
        style_name: '',
        App_category: ''
      }
    };
  },

  async mounted() {
    try{
      await this.fetchColorTags();
      this.fetchDataLoading = false;
    }catch(error){
      console.log(error);
    }
    
  },

  methods: {
    async fetchColorTags() {
      try {
        const response = await axios.get(this.$config.GETCOLORTAG_ENDPOINT);
        this.colorTags = response.data.filter((colorTag) => !colorTag.isset);
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
        message: 'Category name should not contain special characters.',
        type: 'warning', 
        duration: 3000, 
      });
    return;
  }

      const token = sessionStorage.getItem('token');
      try {
       
        const addCategoryResponse = await axios.post(
          this.$config.ADDCATEGORY_ENDPOINT,
          this.newCategory,
          {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );

       
        const updateColorTagResponse = await axios.post(
          this.$config.UPDATECOLORTAG_ENDPOINT,
          {
            UpdateTo1: this.newCategory.style_name
          },
          {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );

       
        if (addCategoryResponse.status === 200 && updateColorTagResponse.status === 200) {
                    
              logData = {
          UserID: sessionStorage.getItem('userId'),
          FName: sessionStorage.getItem('firstName'),
          LName: sessionStorage.getItem('lastName'),
          Email: sessionStorage.getItem('email'),
          Role: sessionStorage.getItem('role'),
          Department: sessionStorage.getItem('department'),
          ActionType: 'Add Category',
          Activity: `New Category(${this.newCategory.App_category}) has been added successfully`,
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
        message: `${this.newCategory.App_category} has been added successfully to categories`,
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
       
      this.$router.push('/categories');
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
