<template>
        <div class="modal-overlay" v-show="showPasswordResetDialog">
    <Modal class="custom-modal" v-show="showPasswordResetDialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div v-if="errorRPMessage" class="alert alert-danger">
          {{ errorRPMessage }}
        </div>
        <div class="modal-header">
          <h5 class="modal-title">Reset Password</h5>
          <button type="button" class="close" @click="showPasswordResetDialog = false">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
  <form @submit.prevent="resetPassword">
    <div class="form-group password-input">
      <label for="newPassword">New Password</label>
      <input
        type="password"
        class="form-control"
        id="newPassword"
        v-model="newPassword"
       
        required
      />
      <i class="fa resetpassword-toggle" @click="togglePasswordVisibility" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
    </div>
    <div class="form-group password-input">
      <label for="confirmPassword2">Confirm Password</label>
      <input
        type="password"
        class="form-control"
        id="confirmPassword2"
        v-model="confirmPassword2"
        required
      />
      <i class="fa resetpassword-toggle" @click="toggleConfirmPasswordVisibility" :class="confirmshowPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" @click="closeDialog = false">Cancel</button>
      <button type="submit" class="btn btn-success">Reset</button>
    </div>
  </form>
</div>
      </div>
    </div>
    </Modal>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      closeDialog() {
        this.$emit('close-dialog');
      },
      openDialog() {
      this.showPasswordResetDialog = true;
    },
    },
  };
  </script>
  
  <style scoped>

.custom-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  transition: all 0.3s ease; 
}


.custom-modal input[type="password"] {
    width: 350px; 
  }

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1000; 
  display: flex;
  justify-content: center;
  align-items: center;
}
  .password-reset-dialog {
    position: absolute;
    top: 50px;
    right: 10px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px;
    z-index: 1000;
    border-radius: 8px;
    width: 300px;
  }
  </style>
  