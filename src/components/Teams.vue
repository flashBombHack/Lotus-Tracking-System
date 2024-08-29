<template>
  <dashboard-layout>
    <div class="container-fluid">
      <div class="row">
        <div v-for="department in departments" :key="department.ID"  class="col-lg-4 mb-4">
          <div class="card text-dark shadow">
            <div class="card-body">
              <h5 class="card-title">{{ department.Department }}</h5>
              <div style="font-size: 14px; color: #000;"><strong class="text-orange mb-3">Team Lead:</strong> {{ getUserName(department.DeptHead) }}</div>
              <h6 class="card-subtitle mb-2">Members:</h6>
              <ul class="list-group">
          
                <li v-for="user in getUsersByDepartment(department.Department)" :key="user.UserId" class="list-group-item text-white">
                  {{ getUserName(user.UserId) }}
                </li>
              </ul>
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
  name: 'teams-page',

  components: {
    DashboardLayout
  },

  data() {
    return {
      departments: [],
      users: []
    };
  },

  methods: {
    getUserName(userId) {
      const user = this.users.find(user => user.UserId === userId);
      if (user) {
        return `${user.FirstName} ${user.LastName}`;
      }
      return 'N/A';
    },

    getUsersByDepartment(departmentName) {
      return this.users.filter(user => user.Department === departmentName);
    }
  },

  mounted() {
  
    axios.get(this.$config.GETDEPT_ENDPOINT)
      .then(response => this.departments = response.data)
      .catch(error => console.error(error));

    // Fetch users
    axios.get(this.$config.GETUSERS_ENDPOINT)
      .then(response => this.users = response.data)
      .catch(error => console.error(error));
  }
};
</script>

<style scoped>
.container-fluid {
  padding: 20px;
}

.card {
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.02);
  background-color: #F1EDFF;
}

.card-title {
  font-size: 16px;
  margin-bottom: 10px;
  color: #000;
}

.text-black-50 {
  font-size: 0.9rem;
}

.card-subtitle {
  font-size: 13px;
  margin-top: 15px;
}

.list-group-item {
  border: none;
  transition: background-color 0.3s;
  height: 30px; 
  line-height: 10px; 
  margin-bottom: 1px; 
  font-size: 13px;
  background-color: #452BA5;
}

.list-group-item:hover {
  background-color: #343a40;
}

.text-orange {
  color: #452BA5; 
}
</style>
