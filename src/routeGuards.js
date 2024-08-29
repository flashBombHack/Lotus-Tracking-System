import axios from 'axios';

 const USER_PRIVILEGES_ENDPOINT = 'https://automationapi.lotuscapitallimited.com/api/user/getUserPrivileges';
 //const USER_PRIVILEGES_ENDPOINT = 'https://testautoapi.lotuscapitallimited.com/api/user/getUserPrivileges';
// const USER_PRIVILEGES_ENDPOINT = 'http://localhost:3033/api/user/getUserPrivileges';

async function fetchUserPrivileges() {
  try {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    const response = await axios.get(
      `${USER_PRIVILEGES_ENDPOINT}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    // Handle error here
    throw error;
  }
}

// Create a route guard function that checks for privileges
export default async function requirePrivilegeToRoute(to, from, next) {
  console.log('Route guard invoked');

  try {
      const userRole = sessionStorage.getItem('role'); 

      if (userRole === 'Admin') {
    
          next();
      } else {

       
          // Fetch user privileges and pass $config
          const userPrivileges = await fetchUserPrivileges();
          console.log('Fetching privillage');

          // Get the required privilege for the route from the route's meta
          const requiredPrivilege = to.meta.requiresPrivilege;

          // Check if the user has the required privilege
          const hasRequiredPrivilege = userPrivileges.some(privilege => privilege.route === requiredPrivilege);

          if (hasRequiredPrivilege) {
              console.log('has privilege');
              // User has the required privilege, allow access to the route
              next();
          } else {
              console.log('does not have privilege');
              // User doesn't have the required privilege, redirect to a different page or show an error
              next('/dashboard');
          }
      }
  } catch (error) {
      // Handle error here, you can redirect to an error page or show a message
      next('/dashboard');
  }
}
