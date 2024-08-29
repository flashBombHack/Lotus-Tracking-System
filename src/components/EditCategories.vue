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
          <h6 class="m-0 font-weight-bold text-dark" style="font-size: 14px; font-weight: bold; color:  #000;">Edit Category</h6>
        </div>
        <div class="card-body" style="font-size: 13px; color: #000;">
          <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
            Category Update successfully!
          </div>
          <div v-else>
            <form @submit.prevent="submitForm" novalidate>
              <!-- Form fields -->

              <div class="row mb-3">
                <div class="col-md-6">
              <div class="form-group">
                  <div class="col-sm-6">
                    <label for="App_category">Category</label>
                    <input
                      type="text"
                      class="form-control"
                      id="App_category"
                      placeholder="Enter Category Name"
                      v-model="categories.App_category"
                      style="font-size: 12px; background-color: #F8F9FC"
                      required
                      maxlength="15"
                    />
                  </div><br>
                  <div class="col-sm-6">
        <label for="ColorTag">Color_Tag</label>
        <select class="form-control" style="font-size: 12px; background-color: #F8F9FC" id="colortag" v-model="categories.style_name">
         
          <option
            v-for="colors in colorTagsWithIssetFalse"
            :key="colors.Name"
            :value="colors.Name.toString()"
          >
            {{ colors.Name }}
          </option>
          <option
            v-for="colors in colorTagsWithIssetTrue"
            :key="colors.Name"
            :value="colors.Name.toString()"
            disabled
          >
          <span :style="{ backgroundColor: colors.Name }" class="color-circle btn-circle"></span>
            {{ colors.Name }}
          </option>
        </select>
      </div>
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
        errorMessage: '',
        colorTagsWithIssetTrue: [],
      colorTagsWithIssetFalse: [],
      previousColorTagID: '',
      fetchDataLoading: true,
      categories: {
        ID: '',
        style_name: '',
        App_category: '',
        
      },
    };
  },

  async mounted() {
    try{
     await this.fetchAppCategory();
    await this.fetchColorTags();
    this.fetchDataLoading = false;
    }catch(error){
      console.log(error);
    }
   
    
  },


  methods: {
    async fetchAppCategory() {
      try {
  
        const CategoryID = this.$route.query.CID;
        const url = `${this.$config.GETCATEGORYBYID_ENDPOINT}/${CategoryID}`;
        this.currentCategoryID = CategoryID;
        const response = await axios.get(url);
        this.categories = response.data; 
        this.previousColorTagID = this.categories.style_name;

        const selectedCategory = this.AppCategory.find(category => category.ID === this.appitem.cardID);
        this.appitem.AppCategory = selectedCategory ? selectedCategory.App_category : '';
        this.appitem.mounted = Boolean(Number(this.appitem.mounted));
        
        } catch (error) {
        console.error(error);
       
      }
    },

    async fetchColorTags() {
      try {
        const response = await axios.get(this.$config.GETCOLORTAG_ENDPOINT);
        this.colorTagsWithIssetTrue = response.data.filter((colorTag) => colorTag.isset);
        this.colorTagsWithIssetFalse = response.data.filter((colorTag) => !colorTag.isset);
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

    const appCategoryPayload = {
      AppCategory: this.categories.App_category,
      StyleName: this.categories.style_name
    };

  
    const token = sessionStorage.getItem('token');
    const appCategoryUpdateResponse = await axios.post(
      `${this.$config.UPDATECATEGORY_ENDPOINT}/${this.currentCategoryID}`,
      appCategoryPayload,
      {
        headers: {
        Authorization: `Bearer ${token}`
          },
      }
    );

  
       await axios.post(
        this.$config.UPDATECOLORTAG_ENDPOINT,
          {
            UpdateTo1: this.categories.style_name,
            UpdateTo0: this.previousColorTagID
          },
          {
            headers: {
            Authorization: `Bearer ${token}`
              },
          }
        );


    if (appCategoryUpdateResponse.status == 200) {

      logData = {
  UserID: sessionStorage.getItem('userId'),
  FName: sessionStorage.getItem('firstName'),
  LName: sessionStorage.getItem('lastName'),
  Email: sessionStorage.getItem('email'),
  Role: sessionStorage.getItem('role'),
  Department: sessionStorage.getItem('department'),
  ActionType: 'Edit Category',
  Activity: `${this.categories.App_category} has been Modified successfully`,
  Category: 'App Category',
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
        message: `${this.categories.App_category} has been Modified successfully`,
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

  
      this.$router.push('/categories');

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