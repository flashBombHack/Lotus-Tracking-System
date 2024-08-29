<template>
  <dashboard-layout>
    <div class="container-fluid">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        
      </div>

      <!-- Content Row -->
      <div v-if="isLoading" class="text-center">
        <div class="big-card2">
        <center><div class="loader"></div></center>
      </div>
      </div>

      <div v-else>  
        <div class="head-text2" style="font-size: 17px;">Dashboard</div>
      <div class="subhead-text2">All mounted appitems will be listed here.</div><br>
        <div class="big-card2">
      <div class="row">
        <div v-if="filteredAppitems.length === 0" class="col-12">
          <center><div class="app-indicator">No App Item Available</div></center>
        </div>

        <div
          v-for="appitem in filteredAppitems"
          :key="appitem.ID"
          class="col-xl-3 col-md-6 mb-4"
        >
          <router-link :to="appitem.route" class="card-link">
            <div :class="getCardClass(appitem.mounted, appitem.cardID)">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div :class="getTextClass(appitem.mounted, appitem.cardID)">
                      {{ getCategoryName(appitem.cardID) }}
                    </div>
                    <div class="appitemName">
                      {{ appitem.AppName }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      </div>
    </div>
    </div>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from './DashboardLayout.vue';
import axios from 'axios';

export default {
  name: 'dashboard-page',

  components: {
    DashboardLayout
  },
  data() {
    return {
      appitems: [],
      categories: [],
      userRole: '',
      userPrivileges: [],
      isLoading: true,
    };
  },

  computed: {
  filteredAppitems() {
    console.log('User Privileges:', this.userPrivileges);
    console.log('User Role:', this.userRole);

    if (this.userRole === 'Admin') {
      return this.appitems.filter(item => item.mounted === '1');
    } else if (this.userRole === 'Support' || this.userRole === 'Staff') {
      if (this.userPrivileges.length === 0) {
        return [];
      }

      const allowedAppIds = this.userPrivileges.map(privilege => privilege.APPID);
console.log('Allowed App IDs:', allowedAppIds);

const filteredItems = this.appitems.filter(item => {
  const match = item.mounted === '1' && allowedAppIds.includes(item.ID);
  console.log(`Item ID: ${item.ID}, Item Mounted: ${item.mounted}, Match: ${match}`);
  return match;
});

console.log('Filtered App Items:', filteredItems);
return filteredItems;


    } else {
      return [];
    }
  }
},


  async mounted() {
    try {
    await this.fetchAppitems();
    await this.fetchCategories();
    this.userRole = sessionStorage.getItem('role');
    if (this.userRole === 'Support' || this.userRole === 'Staff' ) {
      await this.fetchUserPrivileges();
    }
    this.isLoading = false;
   } catch (error) {
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
    async fetchAppitems() {
      try {
        const response = await axios.get(this.$config.APP_ITEMS_ENDPOINT);
        this.appitems = response.data;

        console.log('Fetched App Items:', this.appitems);
      } catch (error) {
        console.error(error);
        
        this.$toast.open({
        message: error,
        type: 'error', 
        duration: 3000, 
      });
      }
    },

    async fetchCategories() {
      try {
        const response = await axios.get(this.$config.GETCATEGORIES_ENDPOINT );
        this.categories = response.data;
      } catch (error) {
        console.error(error);
        this.$toast.open({
        message: error,
        type: 'error', 
        duration: 3000, 
      });
      }
    },

    async fetchUserPrivileges() {
      try {
        const userId = sessionStorage.getItem('userId');
        const token = sessionStorage.getItem('token');
        const response = await axios.get(
          `${this.$config.USER_PRIVILEGES_ENDPOINT}/${userId}`,
          {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      }

        );
        this.userPrivileges = response.data;
      } catch (error) {
        console.error(error);
        this.$toast.open({
        message: error,
        type: 'error', 
        duration: 3000, 
      });
      }
    },

    getCategoryName(cardID) {
      const category = this.categories.find(cat => cat.ID === cardID);
      return category ? category.App_category : '';
    },

    getCardClass(mounted, cardID) {
      const category = this.categories.find(category => category.ID === cardID);
      if (category) {
        const styleName = category.style_name;
        return `card cardtrans border-left-${styleName} shadow h-100 py-2`;
      }
      return 'card';
    },

    getTextClass(mounted, cardID) {
      const category = this.categories.find(category => category.ID === cardID);
      if (category) {
        const styleName = category.style_name;
        return `text-xs font-weight-bold text-${styleName} text-uppercase mb-1`;
      }
      return 'text-xs font-weight-bold text-uppercase mb-1';
    }
  }
};
</script>



<style>

.appitemName{
  color: #000;
  font-size: 17px;
  font-weight: bold;
}

.cardtrans {
  overflow: hidden;
  transition: transform 0.3s;
}

.cardtrans:hover {
  transform: scale(1.1);
}

</style>
