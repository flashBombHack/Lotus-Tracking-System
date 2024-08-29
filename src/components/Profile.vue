<template>
    <div class="profile-dialog">
  
      <div class="profile-header">
        <img class="avatar" src="./img/undraw_profile.svg" alt="User Avatar" />
        <div>{{ userFirstName }} {{ userLastName }}</div>
      </div>
      <div class="dropdown-divider"></div>
      <div class="profile-content">
        <div class="profile-info">
          <div class="profile-info-label">Email:</div>
          <div class="profile-info-value">{{ userEmail }}</div>
        </div>
        <div class="profile-info">
          <div class="profile-info-label">Department:</div>
          <div class="profile-info-value">{{ userDepartment }}</div>
        </div>
        <div class="profile-info">
          <div class="profile-info-label">Role:</div>
          <div class="profile-info-value">{{ userRole }}</div>
        </div>
      </div>
      <br>
      <a class="profile-info-label2 text-red dropdown-item" style="cursor: pointer;" @click="openPasswordResetDialog">
        <center>
          <i class="fas fa-cogs fa-sm fa-fw mr-0 text-danger-400" ></i>
          Change Password
        </center>
      </a>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Profile-dialog',
    props: {
      showCard: Boolean,
      userEmail: String,
      userFirstName: String,
      userLastName: String,
      userDepartment: String,
      userRole: String,
    },
    methods: {
      hideCard() {
        this.$emit('close-card'); 
      },
      
      openPasswordResetDialog() {
        console.log("Opening Reset Modal");
        this.$emit('open-password-reset-dialog');
    
      },
    },
  };
  </script>
  
  
  <style scoped>
  .profile-dialog {
    position: absolute;
    top: 50px;
    right: 10px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px;
    z-index: 1000;
    border-radius: 8px;
    width: 250px;
  }
  
  .profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5px;
    font-size: 12px;
    color: #000;
  }
  
  .avatar {
    width: auto;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 5px;
  }

  
  .profile-content {
    display: flex;
    flex-direction: column;
  }
  
  .profile-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .profile-info-label {
    font-weight: bold;
    color: #333;
    font-size: 12px;
  }

  .profile-info-label2 {
    font-weight: bold;
    color: #e74c3c;
    font-size: 12px;
  }
  
  .profile-info-value {
    color: #000;
    font-size: 12px;
  }
  
  .close-button {
    background-color: #e74c3c;
    color: #fff;
    border: none;
    padding: 3px 5px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .close-button:hover {
    background-color: #c0392b;
  }
  </style>