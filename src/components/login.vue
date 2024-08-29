<template>
  <div class="login-page">
    <div class="login-background">
    </div>
    <div class="login-form">
      <div class="mini-logo">
        <center><img src="./img/lotusLogo.png" alt="Mini Logo"></center>
      </div>


      <div v-if="!showNewPasswordForm">
    <br><br><br><br>
      <div class="p-5">
        <div class="text-left">
          <h1 class="h4 text-black mb-4"><strong>Welcome back, Login</strong></h1>
        </div>
        <form class="user"  @submit.prevent="login">
          <div class="form-group">
            <label for="email" class="small-text">Email Address</label>
            <input type="email" class="form-control form-control-user" v-model="email" id="email" placeholder="Enter Email Address..." required>
          </div>
          <div class="form-group password-container">
            <label for="password" class="small-text">Password</label>
          <input
            type="password"
            class="form-control form-control-user"
            v-model="password"
            id="password"
            placeholder="Enter Password"
            required
          >
         
          <i class="fa password-toggle" @click="togglePasswordVisibility" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox small">
          <input type="checkbox" class="custom-control-input" id="customCheck" v-model="rememberMe">
          <label class="custom-control-label small-text" for="customCheck">Remember Me</label>
        </div>

          </div>
          <button type="submit" class="custombutton custombutton-user custombutton-block" :disabled="loading">
            <span v-if="loading">
          <i class="fa fa-spinner fa-spin"></i> Logging In...
        </span>
        <span v-else>Login</span>
          </button>
          <hr>

        </form>
      </div>
      </div>

      
       <div v-else>
        <br><br><br>
        <div class="p-5">
        <div class="text-left">
          <h5 class="h6 text-black mb-4"><strong>Please Reset Your Password</strong></h5>
        </div>
        <form class="user" @submit.prevent="resetPassword" style="font-size: 13px; color: #000;">
        
          <div class="form-group password-container">
            <label for="currentPassword">Enter current password</label>
            <input
              type="password"
              class="form-control form-control-user"
              v-model="currentPassword"
              id="currentPassword"
              placeholder="Enter Current Password"
              required
            />
            <i class="fa password-toggle" @click="togglePasswordVisibility1" :class="showPassword1 ? 'fa-eye-slash' : 'fa-eye'"></i>
          </div>

      

          <div class="form-group password-container">
      <label for="newPassword">New Password</label>
      <input
        type="password"
        class="form-control form-control-user"
        v-model="newPassword"
        id="newPassword"
        placeholder="Enter New Password"
        required
        @input="checkPasswordRequirements"
    
      />
      <i class="fa password-toggle" @click="togglePasswordVisibility2" :class="showPassword2 ? 'fa-eye-slash' : 'fa-eye'"></i>
    </div>

    <div v-if="!AllRequirementsMet" class="password-requirements" style="font-size: 10px; color: #000;">
      <div class="requirement">
        <span class="label" style="color: #000;">Uppercase:</span>
        <i :class="uppercaseFulfilled ? 'fa fa-check-circle text-success' : 'fa fa-times-circle text-danger'"></i>
      </div>
      <div class="requirement">
        <span class="label" style="color: #000;">Lowercase:</span>
        <i :class="lowercaseFulfilled ? 'fa fa-check-circle text-success' : 'fa fa-times-circle text-danger'"></i>
      </div>
      <div class="requirement">
        <span class="label" style="color: #000;">Number:</span>
        <i :class="numberFulfilled ? 'fa fa-check-circle text-success' : 'fa fa-times-circle text-danger'"></i>
      </div>
      <div class="requirement">
        <span class="label" style="color: #000;">Special Character:</span>
        <i :class="specialCharacterFulfilled ? 'fa fa-check-circle text-success' : 'fa fa-times-circle text-danger'"></i>
      </div>
      <div class="requirement">
        <span class="label" style="color: #000;">Minimum 8 Characters</span>
        <i :class="lengthFulfilled ? 'fa fa-check-circle text-success' : 'fa fa-times-circle text-danger'"></i>
      </div>
         </div><br>

          <div class="form-group password-container">
            <label for="confirmPassword">Confirm Password</label>
            <input
              type="password"
              class="form-control form-control-user"
              v-model="confirmPassword"
              id="confirmPassword"
              required
            />
            <i class="fa password-toggle" @click="togglePasswordVisibility3" :class="showPassword3 ? 'fa-eye-slash' : 'fa-eye'"></i>
          </div>
          <button type="submit" class="custombutton custombutton-user custombutton-block" :disabled="loading">
            <span v-if="loading">
              <i class="fa fa-spinner fa-spin"></i> Resetting Password...
            </span>
            <span v-else>Reset Password</span>
          </button>
        </form>
      </div>
       </div>


    </div>
  </div>
</template>

<script>
import axios from 'axios';
//import router from '../router';


let logData; 
  let headers;

export default {
  name: 'login-name',
  data() {
    return {
      email: '',
      password: '',
      notification: null,
      showSuccessMessage: false,
      errorMessage: '',
      successMessage: '',
      showPassword: false,
      showPassword1: false,
      showPassword2: false,
      showPassword3: false,
      rememberMe: false,
      loading: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      showNewPasswordForm: false,
      passwordPattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/,

        uppercaseFulfilled: false,
        lowercaseFulfilled: false,
        numberFulfilled: false,
        specialCharacterFulfilled: false,
        lengthFulfilled: false,
        AllRequirementsMet: false,

    };
  },

  watch: {
  newPassword() {
    // Reset the flag when the password changes
    this.AllRequirementsMet = false;
  }
},

  created() {
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  const rememberedPassword = localStorage.getItem('rememberedPassword');

  if (rememberedEmail && rememberedPassword) {
    this.email = rememberedEmail;
    this.password = rememberedPassword;
    this.rememberMe = true; 
  }
},

  methods: {

    checkPasswordRequirements() {
  

      this.lengthFulfilled = this.newPassword.length >= 8;
  this.uppercaseFulfilled = /[A-Z]/.test(this.newPassword);
  this.lowercaseFulfilled = /[a-z]/.test(this.newPassword);
  this.numberFulfilled = /\d/.test(this.newPassword);
  this.specialCharacterFulfilled = /[@#$%^&*!]/.test(this.newPassword);

  if(this.lengthFulfilled && this.uppercaseFulfilled && this.lowercaseFulfilled &&  this.numberFulfilled && this.specialCharacterFulfilled){
    this.AllRequirementsMet = true;
  }
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      const passwordInput = document.getElementById('password');

      if (this.showPassword) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    },

    togglePasswordVisibility1() {
      this.showPassword1 = !this.showPassword1;
      const passwordInput = document.getElementById('currentPassword');

      if (this.showPassword1) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    },

    togglePasswordVisibility2() {
      this.showPassword2 = !this.showPassword2;
      const passwordInput = document.getElementById('newPassword');

      if (this.showPassword2) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    },

    togglePasswordVisibility3() {
      this.showPassword3 = !this.showPassword3;
      const passwordInput = document.getElementById('confirmPassword'); 

      if (this.showPassword3) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    },
    
    async login(event) {
      event.preventDefault();
  const form = event.target;

 
  const EmailInput = document.getElementById('email');
  const PasswordInput = document.getElementById('password');


  if (!EmailInput || !PasswordInput) {
    EmailInput.setCustomValidity("Email or Password input elements are missing.");
    return;
  }

  if (EmailInput.value === "") {
    EmailInput.setCustomValidity("Email is required!");
    form.reportValidity();
    return;
  }

  if (PasswordInput.value === "") {
    PasswordInput.setCustomValidity("Password is required!");
    form.reportValidity();
    return;
  }

  this.loading = true;
  EmailInput.setCustomValidity("");
  PasswordInput.setCustomValidity("");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  EmailInput.setCustomValidity("");
  PasswordInput.setCustomValidity("");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  try {
    const response = await axios.post(this.$config.VALIDATEUSER_ENDPOINT, {
      email: this.email,
      password: this.password
    });
    if (response.data.onreset === 1 || response.data.FTLogin === 1) {
        
          this.showNewPasswordForm = true;
        } else {

    const message = response.data.message;

    switch (message) {
      case 'Email and password are valid.':
      
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('firstName', response.data.firstName);
        sessionStorage.setItem('lastName', response.data.lastName);
        sessionStorage.setItem('email', response.data.email);
        sessionStorage.setItem('department', response.data.department);
        sessionStorage.setItem('userId', response.data.userId);
        sessionStorage.setItem('role', response.data.role);
        sessionStorage.setItem('dnsa', response.data.SE_DNSA);

        this.$store.dispatch('startRefreshInterval');
        this.$store.dispatch('fetchPendingTransactions');

         logData = {
          UserID: response.data.userId,
          FName: response.data.firstName,
          LName: response.data.lastName,
          Email: response.data.email,
          Role: response.data.role,
          Department: response.data.department,
          ActionType: 'Login',
          Activity: 'Logged in Successfully',
          Category: 'User Login',
          Timestamp: new Date().toISOString()
        };

        headers = {
          'Authorization': `Bearer ${response.data.token}`,
          };

       
        await axios.post(this.$config.ADDACTIVITYLOG_ENDPOINT, logData,{headers});


    
      this.$toast.open({
        message: 'You have logged in Successfully!',
        type: 'success', 
        duration: 3000, 
      });
      if(response.data.role != 'Sales Executive'){
      this.$router.push('/dashboard');
      }else{
        this.$router.push('/sales/dashboard');
      }
      if (this.rememberMe) {
    localStorage.setItem('rememberedEmail', this.email);
    localStorage.setItem('rememberedPassword', this.password);
  }

        break;
        case 'Invalid password.':
            
            this.$toast.open({
              message: `Invalid credentials.`,
              type: 'warning', 
              duration: 3000, 
            });
            break;
          case 'User not found.':
           
            this.$toast.open({
              message: `User not found.`,
              type: 'warning', 
              duration: 3000, 
            });
            
            break;
          case 'User is disabled.':
         
            this.$toast.open({
              message: `User has been disabled, please contact the administrator`,
              type: 'warning', 
              duration: 3000, 
            });
            break;

            case 'User does not exist, please try again later.':
          
            this.$toast.open({
              message: `User does not exist, please try again later.`,
              type: 'warning', 
              duration: 3000,
            });
            break;
      default:
        
        break;
    } }
  } catch (error) {
  this.showSuccessMessage = false; 
  
  
 
  if (error.response && error.response.data && error.response.data.message) {
    this.$toast.open({
              message: error.response.data.message,
              type: 'warning', 
              duration: 3000, 
            });
  } else {
    this.$toast.open({
              message: `An error occurred during login. Please try again later.`,
              type: 'error', 
              duration: 3000, 
            });
  }

  setTimeout(() => {
    this.errorMessage = ''; 
  }, 3000);

  console.error(error);

}
this.loading = false;

    },
    showNotification(message, type) {
      this.notification = {
        message,
        type
      };
      alert(message);
    },


    async resetPassword(event) {
  event.preventDefault();


  if (this.newPassword !== this.confirmPassword) {
    this.$toast.open({
      message: 'Passwords do not match',
      type: 'warning',
      duration: 3000,
    });
  } else if (!this.isPasswordComplex(this.newPassword)) {
    this.$toast.open({
      message: 'At least One Uppercase,One Lowercase ,One Number and One Special character is required',
      type: 'warning',
      duration: 6000,
    });
  } else {
    this.loading = true;

    try {
   
      const response = await axios.post(this.$config.RESETPASSWORD_ENDPOINT, {
        email: this.email,
        previousPassword: this.currentPassword,
        newPassword: this.newPassword,
      });

      if (response.data.message === 'Password updated successfully.') {
        this.showNewPasswordForm = false;
        this.$toast.open({
          message: 'Password reset successful. You can now log in with your new password.',
          type: 'success',
          duration: 3000,
        });
        this.$router.push('/login'); 
      } else if (response.data.message === 'New password must be different from the previous password.') {
        this.$toast.open({
          message: 'New password must be different from the previous password.',
          type: 'warning',
          duration: 3000,
        });
      } 
      else {
        this.$toast.open({
          message: 'Password reset failed. Please check your current password.',
          type: 'error',
          duration: 3000,
        });
      }
    } catch (error) {
      this.$toast.open({
        message: 'An error occurred during password reset. Please try again later.',
        type: 'error',
        duration: 3000,
      });
      console.error(error);
    }

    this.loading = false;
  }
},

isPasswordComplex(password) {
 
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;
  return passwordPattern.test(password);
},


   
  }
};
</script>




<style>
.password-requirements {
  display: flex;
  flex-direction: column;
  align-items: flex-end; 
  color: #000;
}

.requirement {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.label {
  margin-right: 10px; 
}

.password-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  top: 70%;
  right: 20px; 
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}



.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
}

.notification.success {
  background-color: green;
}

.notification.error {
  background-color: red;
}


.login-page {
  display: flex;
  height: 100vh;
}

.login-background {
  flex: 2;
  background-image: url('./img/BG2.png');
  background-size: cover;
}

/* .overlay-image {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 42%; 
  height: 36%; 
  background-image: url('./img/vector2.png'); 
  background-size: cover;
  z-index: 1; 
} */

.login-form {
  flex: 1;
  background-color: white;
  padding: 20px;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}

.login-form-requirements::-webkit-scrollbar {
  width: 6px;
}

.login-form-requirements::-webkit-scrollbar-thumb {
  background-color: #c6c5cb; 
  border-radius: 3px;
}

.mini-logo {
  position: absolute;
  top: 30px;
  left: 60px;
  padding: 10px; 
}

.mini-logo img {
  width: 270px; 
  height: auto; 
}

strong {
  color: black; 
  font-weight: bold;
}

.small-text {
  font-size: 12px;
}

.form-control {
  height: 5px;
}

.custombutton:hover {
  background-color: #8E1611;
  color: #ffffff;
}

.custombutton {
  display: inline-block;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.35rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

form.user .custombutton-user {
  background-color: #8E1611;
  font-size: 0.8rem;
  border-radius: 10rem;
  padding: 0.75rem 1rem;
}





.custombutton:hover {
  color: #dfdadae7;
}


.custom-control-input:checked ~ .custom-control-label::before {
  background-color: #8E1611;
  border-color: #8E1611;
}

.custombutton-block {
  display: block;
  width: 100%;
}

.custombutton-block + .custombutton-block {
  margin-top: 0.5rem;
}

input[type="submit"].custombutton-block,
input[type="reset"].custombutton-block,
input[type="button"].custombutton-block {
  width: 100%;
}


@media (max-width: 767px) {

  .login-page {
    flex-direction: column-reverse; 
  }

  .login-background {
    display: none;
  }

  .overlay-image {
    display: none; 
  }

  .login-form {
    flex: 1;
    background-color: white;
    padding: 20px;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%; 
  }

  .mini-logo {
    position: static; 
    padding: 10px; 
    text-align: center; 
    margin-top: 20px; 
  }

  .mini-logo img {
    width: 120px;
    height: auto;
  }
  
  strong {
    color: black;
    font-weight: bold;
  }

  .small-text {
    font-size: 12px;
  }
}




</style>