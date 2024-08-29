import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import store from './store';

import Login from './components/login.vue';
import Dashboard from './components/Dashboard.vue';
import Users from './components/Users.vue';
import AddUser from './components/AddUser.vue';
import AppItems from './components/AppItems.vue';
import AddAppItem from './components/AddAppItem.vue';
import EditUserPage from './components/EditUserPage.vue';
import EditAppItem from './components/EditAppItem.vue';
import Categories from './components/Categories.vue';
import EditCategory from './components/EditCategories.vue';
import AddCategory from './components/AddCategory.vue';
import ActivityLog from './components/ActivityLog.vue';
import AuditLogs from './components/AuditLogs.vue';
import  requirePrivilegeToRoute from './routeGuards.js'; 
import ComingSoon from './components/ComingSoon.vue';
import Teams from './components/Teams.vue';
import Departments from './components/Departments.vue';
import AddDepartment from './components/AddDepartment.vue';
import EditDepartment from './components/EditDepartment.vue'; 


//-----------------  Tracking System Router ------------------------------------//

import TrackingDashboard from './modules/Tracking-System/Dashboard.vue';
import ManageUsers from './modules/Tracking-System/ManageUsers.vue';
import Transactions from './modules/Tracking-System/Transactions.vue';
import TransactionsLV1 from './modules/Tracking-System/TransactionsLV1.vue';
import Settings from './modules/Tracking-System/Settings.vue';


//--------------------------------------------------------------------//



const app = createApp({});
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/dashboard',  name: 'dashboard', component: Dashboard, meta: { requiresAuth: true  } },
    { path: '/mobile',  name: 'mobile', component: Dashboard }, 
    { path: '/users',  name: 'users', component: Users, meta: { requiresAuth: true  } },
    { path: '/adduser',  name: 'addusers', component: AddUser, meta: { requiresAuth: true  } },
    { path: '/categories', name: 'categories', component: Categories, meta: { requiresAuth: true  } },
    { path: '/appitems', name: 'appitems', component: AppItems, meta: { requiresAuth: true  } },
    { path: '/addappitems', name: 'addappitems', component: AddAppItem, meta: { requiresAuth: true  } },
    { path: '/addcategory', name: 'addcategories', component: AddCategory, meta: { requiresAuth: true  } },
    { path: '/activities', name: 'activities', component: ActivityLog, meta: { requiresAuth: true  } },
    { path: '/auditlogs', name: 'auditlogs', component: AuditLogs, meta: { requiresAuth: true  } },
    { path: '/comingsoon', name: 'comingsoon', component: ComingSoon, meta: { requiresAuth: true  } },
    { path: '/teams', name: 'teams', component: Teams, meta: { requiresAuth: true  } },
    { path: '/departments', name: 'departments', component: Departments, meta: { requiresAuth: true  } },
    { path: '/departments/add-dept', name: 'adddepartments', component: AddDepartment, meta: { requiresAuth: true  } },
    { path: '/departments/edit-dept',
    name: 'editdepartments', 
    component: EditDepartment, 
    meta: { requiresAuth: true  },
    props: (route) => ({ DID: route.query.DID })
  },
    { 
      path: '/edituser',
      name: 'editusers',
      component: EditUserPage,
      meta: { requiresAuth: true  },
      props: (route) => ({ email: route.query.email })
    },
    { 
      path: '/editappitem',
      name: 'editappitem',
      component: EditAppItem,
      meta: { requiresAuth: true  },
      props: (route) => ({ app: route.query.app })
    },
    { 
      path: '/editcategory',
      name: 'editcategories',
      component: EditCategory,
      meta: { requiresAuth: true  },
      props: (route) => ({ CID: route.query.CID })
    },

    //------------ Tracking System Router ----------------//

    { path: '/tracking-system', name: 'tracking-system', component: TrackingDashboard, meta: { requiresAuth: true, requiresPrivilege: '/tracking-system' }, beforeEnter: requirePrivilegeToRoute },
    { path: '/tracking-system/manage-users', name: 'manage-users', component: ManageUsers, meta: { requiresAuth: true, requiresPrivilege: '/tracking-system' }, beforeEnter: requirePrivilegeToRoute },
    { path: '/tracking-system/transactions', name: 'transactions', component: Transactions, meta: { requiresAuth: true, requiresPrivilege: '/tracking-system' }, beforeEnter: requirePrivilegeToRoute },
    { path: '/tracking-system/view', name: 'transactionsLV1', component: TransactionsLV1, meta: { requiresAuth: true, requiresPrivilege: '/tracking-system' }, beforeEnter: requirePrivilegeToRoute },
    { path: '/tracking-system/settings', name: 'settings', component: Settings, meta: { requiresAuth: true, requiresPrivilege: '/tracking-system' }, beforeEnter: requirePrivilegeToRoute },
    

    


  ],
  app: {
    config: app.config,
  },
});


const restrictedRoutesForSupport = ['/adduser', '/addappitems', '/addcategory', 
                                    '/editcategory', '/editappitem', '/categories', 
                                    '/appitems', '/auditlogs', '/departments', 
                                    '/departments/add-dept','/departments/edit-dept', '/tracking-system/manage-users'];

router.beforeEach((to, from, next) => {
    const isAuthenticated = () => {
       
        const token = sessionStorage.getItem('token');
        return !!token;
    };

    const getUserRole = () => {
       
        return sessionStorage.getItem('role');
    };
    const getIsTeamLead = () => {
   
     
      return sessionStorage.getItem('isTeamLead');
  };

    if (to.meta.requiresAuth && !isAuthenticated()) {
      console.log('User not permitted');
        next('/login');
    } else if (to.name === 'mobile' && to.query.token && to.query.firstName && to.query.lastName  && to.query.email && to.query.userId && to.query.role  && to.query.department ) {

      sessionStorage.setItem('token', to.query.token);
      sessionStorage.setItem('firstName', to.query.firstName);
      sessionStorage.setItem('lastName', to.query.lastName);
      sessionStorage.setItem('email', to.query.email);
      sessionStorage.setItem('userId', to.query.userId);
      sessionStorage.setItem('role', to.query.role);
      sessionStorage.setItem('department', to.query.department);
      sessionStorage.setItem('platform', 'mobile');

      console.log('calling mobile route');

      store.dispatch('startRefreshInterval');
    store.dispatch('fetchPendingTransactions');

      next('/dashboard');
    } else if (!to.meta.requiresAuth && isAuthenticated()) {
      next('/dashboard');
  } else if (restrictedRoutesForSupport.includes(to.path) && getUserRole() === 'Support' && getUserRole() === 'Staff' && getIsTeamLead() == 'false') {
      console.log('Teamlead value is: '+getIsTeamLead());
        next('/dashboard'); 
    } else {
        
        next();
    }
});




window.addEventListener('popstate', () => {
  const currentRoute = router.currentRoute.value;

  if (currentRoute.path == '/dashboard' && currentRoute.matched.some(record => record.meta.requiresAuth)) {
  
    const confirmation = window.confirm('Your session has expired. You will be logged out.');
    if (confirmation) {
      sessionStorage.removeItem('token');
      router.push('/login');
    }
  }
});


export default router;
