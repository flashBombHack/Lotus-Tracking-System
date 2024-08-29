// tokenExpirationMixin.js
export default {
  methods: {
    checkTokenExpiration() {
      const token = sessionStorage.getItem('token');
      const expirationTimestamp = sessionStorage.getItem('tokenExpiration');
      const platform = sessionStorage.getItem('platform');
  
      if (token && expirationTimestamp) {
        const currentTime = Date.now() / 1000; // Convert to seconds
  
        if (currentTime > expirationTimestamp) {

          if(platform == 'mobile'){
            this.logoutMobile();

          }else{
            this.logout();

          }
         
        }
      }
    },

    logoutMobile() {
  
        window.FlutterBridge.postMessage('Requesting logout from Webview');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('tokenExpiration');
        this.$router.push('/login');
        this.$store.dispatch('stopRefreshInterval');
    },
  
    logout() {
  
      const confirmation = window.confirm('Your session has expired. You will be logged out.');
    
      
      if (confirmation) {
      
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('tokenExpiration');
        this.$store.dispatch('stopRefreshInterval');
        
       
        this.$router.push('/login');
      }
    },
    

      setupTokenExpirationCheck() {
      
        const expirationTimestamp = Math.floor(Date.now() / 1000) + 1800; // 60 seconds = 1 minute
        sessionStorage.setItem('tokenExpiration', expirationTimestamp);
        
        setInterval(this.checkTokenExpiration, 60000);
      },
    },
  
    created() {
      this.setupTokenExpirationCheck();
    },
  };

