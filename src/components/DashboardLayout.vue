<template>

  <body id="page-top">
  
  <div id="wrapper">
  <!-- Sidebar for main Dashboard -->
   <div v-if="!isRouteActive('tracking-system') && !isRouteActive('manage-users') && !isRouteActive('transactions') && !isRouteActive('settings') && !isRouteActive('transactionsLV1')">
  
  <div class="sidebarToggled" v-if="!sidebarCollapsed" >
  <ul class="navbar-nav bg-white sidebar sidebar-light accordion shadow-right stroke-right" 
          id="accordionSidebar">
  
      <!-- Sidebar - Brand -->
      <a class="d-flex " >
      
      <img
        class="resized-img"
        src="./img/lotusLogo.png"
        alt="Swwipe Logo"
      >  
      </a>
     
  
      <!-- Divider -->
      <hr class="sidebar-divider my-0">
  
  
  
      <!-- Divider -->
      <hr class="sidebar-divider">
      <hr class="sidebar-divider">
  
  
      <div class="centered-container">
        <!-- Nav Item - Sales Dashboard as Card -->
        <router-link v-if="isRouteActive('dashboard') || isRouteActive('comingsoon')" class="nav-link" to="/dashboard">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Main_Assests/dashboardiconwhite.svg" alt="Custom Icon">
      <span class="card-text">Dashboard</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/dashboard">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Main_Assests/dashboardicon.svg" alt="Custom Icon">
      <span class="card-text">Dashboard</span>
    </div>
  </router-link>
  
  <router-link v-if="isRouteActive('users') || isRouteActive('addusers') || isRouteActive('editusers')" class="nav-link" to="/users">
    <div class="card-container custom-active">
      <img class="custom-icon" src="./img/Dashboard_Assests/user-white.svg" alt="Custom Icon">
      <span class="card-text">Users</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/users">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Dashboard_Assests/user-color.svg" alt="Custom Icon">
      <span class="card-text">Users</span>
    </div>
  </router-link>
  
  <div v-if="userRole === 'Admin'">
  <router-link v-if="isRouteActive('appitems') || isRouteActive('addappitems') || isRouteActive('editappitem')" class="nav-link" to="/appitems">
    <div class="card-container custom-active" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/appitem-white.svg" alt="Custom Icon">
      <span class="card-text">App Items</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/appitems">
    <div class="card-container" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/appitem-color.svg" alt="Custom Icon">
      <span class="card-text">App Items</span>
    </div>
  </router-link>
  
  <router-link v-if="isRouteActive('categories') || isRouteActive('addcategories') || isRouteActive('editcategories')" class="nav-link" to="/categories">
    <div class="card-container custom-active" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/category-white.svg" alt="Custom Icon">
      <span class="card-text">Categories</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/categories">
    <div class="card-container" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/category-color.svg" alt="Custom Icon">
      <span class="card-text">Categories</span>
    </div>
  </router-link>
  </div>
  
    <!-- Divider -->
    <hr class="sidebar-divider" v-if="userRole === 'Admin'">
  
    <div class="sidebar-heading" style="margin-right: 97px;" v-if="userRole === 'Admin'">
    ORGANIZATION
    </div>
  
  
    <router-link v-if="isRouteActive('teams')" class="nav-link" to="/teams">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Dashboard_Assests/team-white.svg" alt="Custom Icon">
      <span class="card-text">Teams</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/teams">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Dashboard_Assests/team-color.svg" alt="Custom Icon">
      <span class="card-text">Teams</span>
    </div>
  </router-link>
  
  <router-link v-if="isRouteActive('departments') || isRouteActive('adddepartments') || isRouteActive('editdepartments')" class="nav-link" to="/departments">
    <div class="card-container custom-active" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/department-white.svg" alt="Custom Icon">
      <span class="card-text">Departments</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/departments" >
    <div class="card-container" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/department-color.svg" alt="Custom Icon">
      <span class="card-text">Departments</span>
    </div>
  </router-link>
  
  <!-- Divider -->
  <hr class="sidebar-divider">
  
  <!-- Heading -->
  <div class="sidebar-heading"  style="margin-right: 90px;">
      System Report
  </div>
  
  <router-link v-if="isRouteActive('activities')" class="nav-link" to="/activities">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Dashboard_Assests/activities-white.svg" alt="Custom Icon">
      <span class="card-text">User Activities</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/activities">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Dashboard_Assests/activities-color.svg" alt="Custom Icon">
      <span class="card-text">User Activities</span>
    </div>
  </router-link>
  
  <router-link v-if="isRouteActive('auditlogs')" class="nav-link" to="/auditlogs">
    <div class="card-container custom-active" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/audit-white.svg" alt="Custom Icon">
      <span class="card-text">Audit Logs</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/auditlogs">
    <div class="card-container" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/audit-color.svg" alt="Custom Icon">
      <span class="card-text">Audit Logs</span>
    </div>
  </router-link>
  
  <hr class="sidebar-divider d-none d-md-block">
  
  
  <div class="user-profile-card2">
        <!-- Circular Image -->
        <div class="profile-image-container">
          <img class="profile-image" src="./img/undraw_profile.svg" alt="Profile Image">
          <div class="status-indicator">
            <img class="custom-icon2" src="./img/Main_Assests/checkicon.svg" alt="Custom Icon 2">
          </div>
        </div>
        <!-- User Information -->
        <div class="user-info">
          <div class="user-name">
              <span>{{ firstName }} {{ userLastName }}</span>
            </div>
            <div class="user-email">
              <span>{{ truncatedEmail }}</span>
            </div>
  
          <!-- Logout Card -->
          <div class="logout-card" @click="openlogoutModal">
            <span class="logout-text mr-5">Logout</span>
            <img class="custom-icon ml-3" src="./img/Main_Assests/logout_icon.svg" alt="Custom Icon">
            
          </div>
        </div>
      </div>
  
  </div>
  
  
  
  </ul>
  </div>
  <div v-else>
  <div class="overlay">
    <ul class="navbar-nav bg-white sidebar sidebar-light accordion shadow-right stroke-right" 
          id="accordionSidebar">
  
      <!-- Sidebar - Brand -->
    
      <a class=" d-flex ">
      
      <img
        class="resized-img"
        src="./img/lotusLogo.png"
        alt="Swwipe Logo"
      > 
      <button @click="toggleSidebar" class="btn btn-link d-md-none rounded-circle" style="color: #8E1611">
              <i class="fa fa-bars"></i>
            </button> 
      </a>
  
      
     
  
      <!-- Divider -->
      <hr class="sidebar-divider my-0">
  
  
  
      <!-- Divider -->
      <hr class="sidebar-divider">
      <hr class="sidebar-divider">
  
  
      <div class="centered-container">
        <!-- Nav Item - Sales Dashboard as Card -->
        <router-link v-if="isRouteActive('dashboard') || isRouteActive('comingsoon')" class="nav-link" to="/dashboard">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Main_Assests/dashboardiconwhite.svg" alt="Custom Icon">
      <span class="card-text">Dashboard</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/dashboard">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Main_Assests/dashboardicon.svg" alt="Custom Icon">
      <span class="card-text">Dashboard</span>
    </div>
  </router-link>
  
  <router-link v-if="isRouteActive('users') || isRouteActive('addusers') || isRouteActive('editusers')" class="nav-link" to="/users">
    <div class="card-container custom-active">
      <img class="custom-icon" src="./img/Dashboard_Assests/user-white.svg" alt="Custom Icon">
      <span class="card-text">Users</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/users">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Dashboard_Assests/user-color.svg" alt="Custom Icon">
      <span class="card-text">Users</span>
    </div>
  </router-link>
  
  <div v-if="userRole === 'Admin'">
  <router-link v-if="isRouteActive('appitems') || isRouteActive('addappitems') || isRouteActive('editappitem')" class="nav-link" to="/appitems">
    <div class="card-container custom-active" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/appitem-white.svg" alt="Custom Icon">
      <span class="card-text">App Items</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/appitems">
    <div class="card-container" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/appitem-color.svg" alt="Custom Icon">
      <span class="card-text">App Items</span>
    </div>
  </router-link>
  
  <router-link v-if="isRouteActive('categories') || isRouteActive('addcategories') || isRouteActive('editcategories')" class="nav-link" to="/categories">
    <div class="card-container custom-active" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/category-white.svg" alt="Custom Icon">
      <span class="card-text">Categories</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/categories">
    <div class="card-container" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/category-color.svg" alt="Custom Icon">
      <span class="card-text">Categories</span>
    </div>
  </router-link>
  </div>
  
    <!-- Divider -->
    <hr class="sidebar-divider" v-if="userRole === 'Admin'">
  
    <div class="sidebar-heading" style="margin-right: 97px;" v-if="userRole === 'Admin'">
    ORGANIZATION
    </div>
  
  
    <router-link v-if="isRouteActive('teams')" class="nav-link" to="/teams">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Dashboard_Assests/team-white.svg" alt="Custom Icon">
      <span class="card-text">Teams</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/teams">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Dashboard_Assests/team-color.svg" alt="Custom Icon">
      <span class="card-text">Teams</span>
    </div>
  </router-link>
  
  <router-link v-if="isRouteActive('departments') || isRouteActive('adddepartments') || isRouteActive('editdepartments')" class="nav-link" to="/departments">
    <div class="card-container custom-active" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/department-white.svg" alt="Custom Icon">
      <span class="card-text">Departments</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/departments" >
    <div class="card-container" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/department-color.svg" alt="Custom Icon">
      <span class="card-text">Departments</span>
    </div>
  </router-link>
  
  <!-- Divider -->
  <hr class="sidebar-divider">
  
  <!-- Heading -->
  <div class="sidebar-heading"  style="margin-right: 90px;">
      System Report
  </div>
  
  <router-link v-if="isRouteActive('activities')" class="nav-link" to="/activities">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Dashboard_Assests/activities-white.svg" alt="Custom Icon">
      <span class="card-text">User Activities</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/activities">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Dashboard_Assests/activities-color.svg" alt="Custom Icon">
      <span class="card-text">User Activities</span>
    </div>
  </router-link>
  
  <router-link v-if="isRouteActive('auditlogs')" class="nav-link" to="/auditlogs">
    <div class="card-container custom-active" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/audit-white.svg" alt="Custom Icon">
      <span class="card-text">Audit Logs</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/auditlogs">
    <div class="card-container" v-if="userRole === 'Admin'">
      <img class="custom-icon3" src="./img/Dashboard_Assests/audit-color.svg" alt="Custom Icon">
      <span class="card-text">Audit Logs</span>
    </div>
  </router-link>
  
  <hr class="sidebar-divider d-none d-md-block">
  <hr class="sidebar-divider" v-if="userRole != 'Admin' && userRole != 'Sales Executive'">
  <hr class="sidebar-divider" v-if="userRole != 'Admin' && userRole != 'Sales Executive'">
  <hr class="sidebar-divider" v-if="userRole != 'Admin' && userRole != 'Sales Executive'">
  
  <div class="user-profile-card2">
        <!-- Circular Image -->
        <div class="profile-image-container">
          <img class="profile-image" src="./img/undraw_profile.svg" alt="Profile Image">
          <div class="status-indicator">
            <img class="custom-icon2" src="./img/Main_Assests/checkicon.svg" alt="Custom Icon 2">
          </div>
        </div>
  
        <div v-if="platform == 'mobile'">
          <hr>
        </div>
  
        <!-- User Information -->
        <div class="user-info">
          <div class="user-name">
              <span>{{ firstName }} {{ userLastName }}</span>
            </div>
            <div class="user-email">
              <span>{{ truncatedEmail }}</span>
            </div>
  
          <!-- Logout Card -->
          <div class="logout-card" @click="openlogoutModal">
            <span class="logout-text mr-5">Logout</span>
            <img class="custom-icon ml-3" src="./img/Main_Assests/logout_icon.svg" alt="Custom Icon">
            
          </div>
        </div>
      </div>
  
  </div>
  
  
  
  </ul>
  </div></div>
  
  </div>
  
  <!-- End of Sidebar for main Dashboard -->
  
  <!-- start of Sidebar for tracking system Dashboard -->
  
  <div v-else-if="isRouteActive('tracking-system') || isRouteActive('manage-users') || isRouteActive('transactions') || isRouteActive('settings') || isRouteActive('transactionsLV1')">
    <div class="sidebarToggled" v-if="!sidebarCollapsed" >
      <ul class="navbar-nav bg-white sidebar sidebar-light accordion shadow-right stroke-right" id="accordionSidebar">
          <!-- Sidebar - Brand -->
      <a class="d-flex">
      
        <center>
        <img
        class="resized-img"
        src="./img/lotusLogo.png"
        alt="Swwipe Logo"
      >
        </center>
  
        
      </a>
      <hr class="sidebar-divider my-0">
  
  
  
  <!-- Divider -->
  <hr class="sidebar-divider">
  <hr class="sidebar-divider">
  
  <!-- Nav Item - Utilities Collapse Menu -->
  <div class="centered-container">
        <!-- Nav Item - Sales Dashboard as Card -->
        <router-link v-if="isRouteActive('tracking-system')" class="nav-link" to="/tracking-system">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Main_Assests/dashboardiconwhite.svg" alt="Custom Icon">
      <span class="card-text">Dashboard</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/tracking-system">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Main_Assests/dashboardicon.svg" alt="Custom Icon">
      <span class="card-text">Dashboard</span>
    </div>
  </router-link>
  
  <!-- Nav Item - Manage User by Admin-->
  <div v-if="userRole == 'Admin'">
  <router-link v-if="isRouteActive('manage-users')" class="nav-link" to="/tracking-system/manage-users">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Dashboard_Assests/team-white.svg" alt="Custom Icon">
      <span class="card-text">Manage Users</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/tracking-system/manage-users">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Dashboard_Assests/team-color.svg" alt="Custom Icon">
      <span class="card-text">Manage Users</span>
    </div>
  </router-link>
  </div>

  <!-- <div v-if="moduleuserRole == 'Approver2'">
  <router-link v-if="isRouteActive('transactionsLV1')" class="nav-link" to="/tracking-system/view">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Dashboard_Assests/Lv1-icon-white.svg" alt="Custom Icon">
      <span class="card-text" style="display: flex"><span>Awaiting Level(1)</span><div class="APV1-Nav-indicator"><center>{{LV1Data.length}}</center></div> </span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/tracking-system/view">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Dashboard_Assests/Lv1-icon-color.svg" alt="Custom Icon">
      <span class="card-text" style="display: flex"><span>Awaiting Level(1)</span><div class="APV1-Nav-indicator2"><center>{{LV1Data.length}}</center></div> </span>
    </div>
  </router-link>
</div> -->
  
  <router-link v-if="isRouteActive('transactions')" class="nav-link" to="/tracking-system/transactions">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Dashboard_Assests/transactions-white.svg" alt="Custom Icon">
      <span class="card-text">Transactions</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/tracking-system/transactions">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Dashboard_Assests/transactions-color.svg" alt="Custom Icon">
      <span class="card-text">Transactions</span>
    </div>
  </router-link>


  <router-link v-if="isRouteActive('settings')" class="nav-link" to="/tracking-system/settings">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Dashboard_Assests/setting-white.svg" alt="Custom Icon">
      <span class="card-text">Settings</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/tracking-system/settings">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Dashboard_Assests/setting-color.svg" alt="Custom Icon">
      <span class="card-text">Settings</span>
    </div>
  </router-link>
  
  
     
  
       <!-- User Profile Card -->
       <div class="user-profile-card">
        <!-- Circular Image -->
        <div class="profile-image-container">
          <img class="profile-image" src="./img/undraw_profile.svg" alt="Profile Image">
          <div class="status-indicator">
            <img class="custom-icon2" src="./img/Main_Assests/checkicon.svg" alt="Custom Icon 2">
          </div>
        </div>
  
        <!-- User Information -->
        <div class="user-info">
          <div class="user-name">
              <span>{{ firstName }} {{ userLastName }}</span>
            </div>
            <div class="user-email">
              <span>{{ truncatedEmail }}</span>
            </div>
  
          <!-- Logout Card -->
          <div class="logout-card" @click="openlogoutModal">
            <span class="logout-text mr-5">Logout</span>
            <img class="custom-icon ml-3" src="./img/Main_Assests/logout_icon.svg" alt="Custom Icon">
            
          </div>
        </div>
      </div>
    </div>
  
      
  
      </ul>
    </div>
    <div v-else>
  <div class="overlay">
    <ul class="navbar-nav bg-white sidebar sidebar-light accordion shadow-right stroke-right" id="accordionSidebar" >
          <!-- Sidebar - Brand -->
      <a class=" d-flex " >
      
        <img
        class="resized-img"
        src="./img/lotusLogo.png"
        alt="Swwipe Logo"
      >
      <button @click="toggleSidebar" class="btn btn-link d-md-none rounded-circle" style="color: #8E1611">
              <i class="fa fa-bars"></i>
            </button> 
      </a>
      <hr class="sidebar-divider my-0">
  
  
  
  <!-- Divider -->
  <hr class="sidebar-divider">
  <hr class="sidebar-divider">
  
  <!-- Nav Item - Utilities Collapse Menu -->
  <div class="centered-container">
        <!-- Nav Item - Sales Dashboard as Card -->
        <router-link v-if="isRouteActive('tracking-system')" class="nav-link" to="/tracking-system">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Main_Assests/dashboardiconwhite.svg" alt="Custom Icon">
      <span class="card-text">Dashboard</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/tracking-system">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Main_Assests/dashboardicon.svg" alt="Custom Icon">
      <span class="card-text">Dashboard</span>
    </div>
  </router-link>
  
  <!-- Nav Item - Manage User by Admin-->
  <div v-if="userRole == 'Admin' && !isMobile">
  <router-link v-if="isRouteActive('manage-users')" class="nav-link" to="/tracking-system/manage-users">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Dashboard_Assests/team-white.svg" alt="Custom Icon">
      <span class="card-text">Manage Users</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/tracking-system/manage-users">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Dashboard_Assests/team-color.svg" alt="Custom Icon">
      <span class="card-text">Manage Users</span>
    </div>
  </router-link>
  </div>

  <!-- <div v-if="moduleuserRole == 'Approver2'">
  <router-link v-if="isRouteActive('transactionsLV1')" class="nav-link" to="/tracking-system/view">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Dashboard_Assests/Lv1-icon-white.svg" alt="Custom Icon">
      <span class="card-text" style="display: flex"><span>Awaiting Level(1)</span><div class="APV1-Nav-indicator"><center>{{LV1Data.length}}</center></div> </span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/tracking-system/view">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Dashboard_Assests/Lv1-icon-color.svg" alt="Custom Icon">
      <span class="card-text" style="display: flex"><span>Awaiting Level(1)</span><div class="APV1-Nav-indicator2"><center>{{LV1Data.length}}</center></div> </span>
    </div>
  </router-link>
</div> -->
  
  <router-link v-if="isRouteActive('transactions')" class="nav-link" to="/tracking-system/transactions">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Dashboard_Assests/transactions-white.svg" alt="Custom Icon">
      <span class="card-text">Transactions</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/tracking-system/transactions">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Dashboard_Assests/transactions-color.svg" alt="Custom Icon">
      <span class="card-text">Transactions</span>
    </div>
  </router-link>
  <router-link v-if="isRouteActive('settings')" class="nav-link" to="/tracking-system/settings">
    <div class="card-container custom-active">
      <img class="custom-icon3" src="./img/Dashboard_Assests/setting-white.svg" alt="Custom Icon">
      <span class="card-text">Settings</span>
    </div>
  </router-link>
  <router-link v-else class="nav-link" to="/tracking-system/settings">
    <div class="card-container">
      <img class="custom-icon3" src="./img/Dashboard_Assests/setting-color.svg" alt="Custom Icon">
      <span class="card-text">Settings</span>
    </div>
  </router-link>
  <br><br><br><br>
  
  
     
  
       <!-- User Profile Card -->
       <div class="user-profile-card2">
        <!-- Circular Image -->
        <div class="profile-image-container">
          <img class="profile-image" src="./img/undraw_profile.svg" alt="Profile Image">
          <div class="status-indicator">
            <img class="custom-icon2" src="./img/Main_Assests/checkicon.svg" alt="Custom Icon 2">
          </div>
        </div>
  
        <!-- User Information -->
        <div class="user-info">
          <div class="user-name">
              <span>{{ firstName }} {{ userLastName }}</span>
            </div>
            <div class="user-email">
              <span>{{ truncatedEmail }}</span>
            </div>
  
          <!-- Logout Card -->
          <div class="logout-card" @click="openlogoutModal">
            <span class="logout-text mr-5">Logout</span>
            <img class="custom-icon ml-3" src="./img/Main_Assests/logout_icon.svg" alt="Custom Icon">
            
          </div>
        </div>
      </div>
    </div>
  
      
  
      </ul>
    </div>
      </div>
    </div>
  <!-- End of Sidebar -->
  
  
  
  <!-- Content Wrapper -->
  <div id="content-wrapper" class="d-flex flex-column">
  
      <!-- Main header Content -->
      <div id="content">
  
          <!-- Topbar -->
          <nav class="navbar navbar-expand navbar-light stroke bg-light topbar mb-4 static-top">
  
            <button @click="toggleSidebar" class="btn btn-link d-md-none rounded-circle" style="margin-right: 20px; color: #8E1611;">
              <i class="fa fa-bars"></i>
            </button>
  
  
  
  
              <div v-if="!isRouteActive('tracking-system') && !isRouteActive('manage-users') && !isRouteActive('transactions') && !isRouteActive('settings') && !isRouteActive('transactionsLV1')">
                <div v-if="isRouteActive('dashboard')">
              <span class="card-text2">Home</span>
            </div>
            <div v-else-if="isRouteActive('users')">
              <span class="card-text2">All Users</span>
            </div>
            <div v-else-if="isRouteActive('addusers')">
              <span class="card-text2">Users</span>
            </div>
            <div v-else-if="isRouteActive('editusers')">
              <span class="card-text2">Users</span>
            </div>
            <div v-else-if="isRouteActive('categories')">
              <span class="card-text2">Categories</span>
            </div>
            <div v-else-if="isRouteActive('addcategories')">
              <span class="card-text2">Categories</span>
            </div>
            <div v-else-if="isRouteActive('editcategories')">
              <span class="card-text2">Categories</span>
            </div>
            <div v-else-if="isRouteActive('appitems')">
              <span class="card-text2">App Items</span>
            </div>
            <div v-else-if="isRouteActive('addappitems')">
              <span class="card-text2">App Items</span>
            </div>
            <div v-else-if="isRouteActive('editappitem')">
              <span class="card-text2">App Items</span>
            </div>
            <div v-else-if="isRouteActive('activities')">
              <span class="card-text2">User Activities</span>
            </div>
            <div v-else-if="isRouteActive('auditlogs')">
              <span class="card-text2">Audit Logs</span>
            </div>
            <div v-else-if="isRouteActive('teams')">
              <span class="card-text2">Teams</span>
            </div>
            <div v-else-if="isRouteActive('departments')">
              <span class="card-text2">All Departments</span>
            </div>
            <div v-else-if="isRouteActive('adddepartments')">
              <span class="card-text2">Add Departments</span>
            </div>
            <div v-else-if="isRouteActive('editdepartments')">
              <span class="card-text2">Departments</span>
            </div>
            <div v-else-if="isRouteActive('comingsoon')">
              <span class="card-text2">Under Construction</span>
            </div>
              
            </div>
  
            <div v-else-if="isRouteActive('tracking-system') || isRouteActive('manage-users') || isRouteActive('transactions') || isRouteActive('settings') || isRouteActive('transactionsLV1')">
  
          <div v-if="!isMobile" style="display: flex;"> 
            
            <div class="head-text" style="font-size: 13px;">Tracking System</div>
          </div>
          </div>
  
          <!-- <div v-else-if="isRouteActive('manage-users')">
  
            <div style="display: flex;">
              <router-link to="/dashboard" class="back-container mr-2"> <center>Back to Main Dashboard</center></router-link>
            <span class="card-text2 mt-1">Users</span>
            </div>
            </div>
  
            <div v-else-if="isRouteActive('transactions')">
  
                <div style="display: flex;">
                  <router-link to="/dashboard" class="back-container mr-2"> <center>Back to Main Dashboard</center></router-link>
                <span class="card-text2 mt-1">All Transactions</span>
                </div>
                </div>
  
                <div v-else-if="isRouteActive('settings')">
  
  <div style="display: flex;">
    <router-link to="/dashboard" class="back-container mr-2"> <center>Back to Main Dashboard</center></router-link>
  <span class="card-text2 mt-1"></span>
  </div>
  </div> -->
  
              <ul class="navbar-nav ml-auto">
  
                
                  <!-- Nav Item - User Information -->
                  <!-- <li v-if="userRole != 'Sales Executive'" class="nav-item">
                  <a class="nav-link">
                    <a class="nav-link" @click="openProfile">
                      <div class="user-profile">
                      <img class="img-profile rounded-circle" src="./img/undraw_profile.svg" alt="User Profile">
                      <div class="text-gray-600 small">Swwipe {{ userRole }} - {{ firstName }}</div>
                      </div>
                      </a>
                  </a>
                  </li> -->
  
                    <!-- Profile dialog -->
                    <Profile
                    v-if="showProfile"
                    :userEmail="userEmail"
                    :userFirstName="firstName"
                    :userLastName="userLastName"
                    :userDepartment="userDepartment"
                    :userRole="userRole"
                    @close-card="closeProfile"
                    @open-password-reset-dialog ="openPasswordResetDialogFromProfile"
                  />
  
      
                  <div v-if="isRouteActive('tracking-system') || isRouteActive('manage-users') || isRouteActive('transactions') || isRouteActive('settings') || isRouteActive('transactionsLV1')">
                  <router-link to="/dashboard"> 
                    <div class="main-dashboard-card mr-2">
                    <img class="custom-icon" src="./img/Main_Assests/main-dasahboard.svg" alt="Custom Icon">
                      <span class="profile-text">Go to Main Dashboard</span>
                  </div>
                  </router-link>
                </div>
  
                  <div class="topbar-divider d-none d-sm-block"></div> 
  
                  
                 
                  <div class="profile-card"
                   @click.stop="openProfile">
                    <img class="custom-icon" src="./img/Main_Assests/profileicon.svg" alt="Custom Icon">
                      <span class="profile-text"><strong>My Profile</strong></span>
                  </div>
  
                  
  
  
  
  
              </ul>
       
  
          </nav>
  
      <div v-if="isRouteActive('dashboard') && !isMobile" class="background-image">
           <slot></slot>
          </div>
          <div v-else>
            <slot></slot>
          </div>
          
  
      </div>
          <!-- End of Topbar -->
  
          <!-- End of Dashboard Global-->
     <!-- Footer -->
    <footer  class="sticky-footer bg-light" style="margin-top: 50px;">
          <div class="container my-auto">
              <div class="copyright text-center my-auto">
                  <span v-if="!isMobile">Copyright &copy; Property of Lotus Capital Limited</span>
              </div>
          </div>
      </footer>
      <!-- End of Footer -->
  
  </div>
  <!-- End of Content Wrapper -->
  </div>
  
  </body>
  
      <div class="modal-overlay" v-show="showPasswordResetDialog">
        <div v-if="!isMobile">
      <Modal class="custom-modal custom-modal-width2" v-show="showPasswordResetDialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              </div>
              <div class="modal-header">
              <div class="modal-header-container">
                  <div class="modal-header-text2">
                    Change Password <br>
                      <div class="modal-text3">Here you can change your login password.</div>
                  </div>
                  </div>
                  <button type="button" class="close" @click="showPasswordResetDialog = false">
                <span aria-hidden="true">&times;</span>
              </button>
              </div>
  
              <form @submit.prevent="resetPassword">
  
            <div class="modal-body modal-body9 modal-text">
             
                    <div class="form-group password-container">
              <label for="currentPassword">Current Password</label>
              <input
                type="password"
                class="form-control  form-control-user"
                id="currentPassword"
                v-model="currentPassword"
                style="font-size: 12px; background-color: #F8F9FC"
                required
              />
              <i class="fa resetpassword-toggle" @click="togglePasswordVisibility" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
            </div>
            <div class="form-group ">
              <label for="newPassword">New Password</label>
              <input
                type="password"
                class="form-control"
                id="newPassword"
                v-model="newPassword"
                style="font-size: 12px; background-color: #F8F9FC"
                required
              />
              <i class="fa resetpassword-toggle" @click="togglePasswordVisibility2" :class="showPassword2 ? 'fa-eye-slash' : 'fa-eye'"></i>
            </div>
            <div class="form-group">
              <label for="confirmPassword2">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirmPassword2"
                v-model="confirmPassword2"
                style="font-size: 12px; background-color: #F8F9FC"
                required
              />
              <i class="fa resetpassword-toggle" @click="toggleConfirmPasswordVisibility" :class="confirmshowPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
            </div>
  
            </div>
  
            <div class="modal-footer">
              <div class="previous-button"  @click="showPasswordResetDialog = false">Cancel</div>
              <button class="logout-button" type="submit">Submit</button>
            </div>
          </form>
          </div>
        </div>
      </Modal>
      </div>
      <div v-else>
        <div class="generic-modal">
          <div class="modal-content">
            <div class="modal-header">
              </div>
              <div class="modal-header">
              <div class="modal-header-container">
                  <div class="modal-header-text2">
                    Change Password <br>
                      <div class="modal-text3">Here you can change your login password.</div>
                  </div>
                  </div>
                  <button type="button" class="close" @click="showPasswordResetDialog = false">
                <span aria-hidden="true">&times;</span>
              </button>
              </div>
  
              <form @submit.prevent="resetPassword">
  
            <div class="modal-body modal-body9 modal-text">
             
                    <div class="form-group password-container">
              <label for="currentPassword">Current Password</label>
              <input
                type="password"
                class="form-control  form-control-user"
                id="currentPassword"
                v-model="currentPassword"
                style="font-size: 12px; background-color: #F8F9FC"
                required
              />
              <i class="fa resetpassword-toggle" @click="togglePasswordVisibility" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
            </div>
            <div class="form-group ">
              <label for="newPassword">New Password</label>
              <input
                type="password"
                class="form-control"
                id="newPassword"
                v-model="newPassword"
                style="font-size: 12px; background-color: #F8F9FC"
                required
              />
              <i class="fa resetpassword-toggle" @click="togglePasswordVisibility2" :class="showPassword2 ? 'fa-eye-slash' : 'fa-eye'"></i>
            </div>
            <div class="form-group">
              <label for="confirmPassword2">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirmPassword2"
                v-model="confirmPassword2"
                style="font-size: 12px; background-color: #F8F9FC"
                required
              />
              <i class="fa resetpassword-toggle" @click="toggleConfirmPasswordVisibility" :class="confirmshowPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
            </div>
  
            </div>
  
            <div class="modal-footer">
              <div class="previous-button"  @click="showPasswordResetDialog = false">Cancel</div>
              <button class="logout-button" type="submit">Submit</button>
            </div>
          </form>
          </div>
          </div>
          </div>
    </div>
  
      <div class="modal-overlay" v-show="showProfileDialog">
    <Modal class="custom-modal custom-modal-width" v-show="showProfileDialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-header-text">
              My Profile <br>
              <div class="modal-text2">All your details will be displayed here.</div>
            </div>
            <button type="button" class="close" @click="showProfileDialog = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
  
          <div v-if="isLoading" class="text-center">
          <i class="fas fa-spinner fa-spin fa-3x"></i> 
          <p>Loading...</p>
        </div>
          
           <div v-else>
          <div class="modal-body modal-text">
          <div v-if="userDetails">
  
      <div class="form-group">
        <label for="userId">User ID:</label>
        <input type="text" class="form-control" id="userId" v-model="userDetails.UserId" readonly style="font-size: 12px;"/>
      </div>
  
  
  
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" class="form-control" v-model="userDetails.FirstName" readonly style="font-size: 12px;">
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" class="form-control" v-model="userDetails.LastName" readonly style="font-size: 12px;">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" id="email" class="form-control" v-model="userDetails.Email" readonly style="font-size: 12px;">
      </div>
      <div class="form-group">
        <label for="department">Department:</label>
        <input type="text" id="department" class="form-control" v-model="userDetails.Department" readonly style="font-size: 12px;">
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <input type="text" id="role" class="form-control" v-model="userDetails.Role" readonly style="font-size: 12px;">
      </div>
    </div>
          </div>
        </div>
        </div>
      </div>
      </Modal>
      </div>
  
  <div class="modal-overlay" v-show="showlogoutDialog">
    <div v-if="!isMobile">
    <Modal class="custom-modal custom-modal-width" v-show="showlogoutDialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-header-text">
              Logout Confirmation
            </div>
            <button type="button" class="close" @click="showlogoutDialog = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
  
          <div class="modal-body modal-text">
            Are you sure you want to logout?
          </div>
  
          <div class="modal-footer">
            <button class="logout-cancel" @click="showlogoutDialog = false">Cancel</button>
            <!-- <button type="button" class="btn btn-secondary" @click="showlogoutDialog = false">Cancel</button> -->
            <button class="logout-button" @click="logout">Yes</button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
<div v-else>
  <div class="generic-modal">
    <div class="modal-content">
          <div class="modal-header">
            <div class="modal-header-text">
              Logout Confirmation
            </div>
            <button type="button" class="close" @click="showlogoutDialog = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
  
          <div class="modal-body modal-text">
            Are you sure you want to logout?
          </div>
  
          <div class="modal-footer">
            <button class="logout-cancel" @click="showlogoutDialog = false">Cancel</button>
            <!-- <button type="button" class="btn btn-secondary" @click="showlogoutDialog = false">Cancel</button> -->
            <button class="logout-button" @click="logout">Yes</button>
          </div>
        </div>
    </div>
    </div>
  </div>
  
  
  </template>
  
  <script>
  import commonScript from './common.js';
  import Profile from './Profile.vue';
  import axios from 'axios';
  // import { mapActions, mapGetters } from 'vuex';
  
  export default {
    name: 'DashboardLayout',
    components: {
      Profile,
      
    },
    mixins: [commonScript],
    data() {
      return {
        windowWidth: window.innerWidth,
        showPasswordResetDialog: false,
        sidebarOpen: false,
        sidebarCollapsed: false,
        showProfile: false,
        userRole: '',
        userEmail: '',
        userLastName: '',
        userDepartment: '',
        platform: '',
        props: {
          userRole: String,
          firstName: String,
        },
        showPassword: false,
        showPassword2: false,
        confirmshowPassword: false,
        newPassword: '',
      confirmPassword2: '',
      currentPassword: '',
      userDetails: null,
      showProfileDialog: false,
      showlogoutDialog: false,
      isLoading: true,
      moduleuserRole: '',
      UserId: '',
      allTransactions: [],
      refreshInterval: null,
      LV1Data: '',
      };
    },
    async mounted() {

      window.addEventListener('resize', this.handleResize);
      this.userRole = sessionStorage.getItem('role');
      this.userEmail = sessionStorage.getItem('email');
      this.userLastName = sessionStorage.getItem('lastName');
      this.userDepartment = sessionStorage.getItem('department');
      this.platform = sessionStorage.getItem('platform');
      this.loadStyles();
      document.addEventListener('click', this.closeProfile);
     this.UserId = sessionStorage.getItem('userId');

      // try{
      // await this.setUserRoleInSession();
      // this.moduleuserRole = sessionStorage.getItem('moduleuserRole');
      // console.log(`User role before initilizing: ${this.moduleuserRole}`);
      // await this.$store.dispatch('fetchAllTransactions');
      // this.filterTransactions();
      // }catch(error){
      //   console.log(error);
      // }

  //     this.refreshInterval = setInterval(() => {
  //       this.$store.dispatch('fetchAllTransactions');
  //       this.filterTransactions();
  // }, 1000);
     
      
    },
//     beforeUnmount() {
//   // Clear the interval when the component is destroyed
//   if (this.refreshInterval) {
//     clearInterval(this.refreshInterval);
//   }
    
// },
    computed: {
      // ...mapGetters(['PendingTransactions','CompletedTransactions']),

      isMobile() {
        return this.windowWidth < 768;
      },
  
    isRouteActive() {
      return (routeName) => {
        return this.$route.name === routeName;
      };
    },
    isActiveRoute(menuPath) {
   
    return this.$route.path.startsWith(menuPath);
  },
  
  truncatedEmail() {
        if (this.userEmail.length > 30) {
          return this.userEmail.slice(0, 30) + '...';
        }
        return this.userEmail;
      }
  
  },
  
    methods: {

      // ...mapActions(['fetchPendingTransactions','fetchAllTransactions']),

//       filterTransactions() {

// this.allTransactions = this.PendingTransactions;

// this.LV1Data = this.allTransactions.filter(transaction => transaction.ApprovalLevel1Status == 0);
// sessionStorage.setItem('LV1Data', this.LV1Data);
// },

      // async setUserRoleInSession() {
      //   try {
      //     const users = await this.getUsers();
      //     const loggedInUserId = this.UserId;
      //     console.log('Approval Users are: ', users);
      //     console.log('Logged in UserID is: ', loggedInUserId);

      //     // Find the user in the list
      //     const loggedInUser = users.find((user) => user.UserID == loggedInUserId);
      //     console.log('Logged in User is: ', loggedInUser);

      //     if (loggedInUser) {
      //       if (loggedInUser.IsRequester == 1) {
      //         this.moduleuserRole = 'Requester';
      //       } else if (loggedInUser.IsApprover1 == 1) {
      //         this.moduleuserRole = 'Approver1';
      //       } else if (loggedInUser.IsApprover2 == 1) {
      //         this.moduleuserRole = 'Approver2';
      //       } else if (loggedInUser.IsReviewer == 1) {
      //         this.moduleuserRole = 'Reviewer';
      //       } else {
      //         this.moduleuserRole = 'NotPermitted';
      //       }

      //       sessionStorage.setItem('moduleuserRole', this.moduleuserRole);
      //       console.log(`User role: ${this.moduleuserRole}`);
      //     } else {
      //       console.error('Logged-in user not found in the list.');
      //       // Set a default role for users not found
      //       this.moduleuserRole = 'Admin';
      //       sessionStorage.setItem('moduleuserRole', this.moduleuserRole);
      //     }
      //   } catch (error) {
      //     console.error('Error fetching or processing user data:', error);
      //     // this.$toast.open({
      //     //   message: error.message || 'Failed to fetch or process user data.',
      //     //   type: 'error',
      //     //   duration: 3000,
      //     // });
      //   }
      //   },
          
      handleResize() {
        this.windowWidth = window.innerWidth;
      },
  
      
  
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
        this.sidebarCollapsed = !this.sidebarCollapsed;
      },
  
      async fetchUserDetails(email) {
      try {
        const response = await fetch(`${this.$config.GETUSERBYEMAIL_ENDPOINT}?email=${email}`);
        const userData = await response.json();
  
        
        this.userDetails = userData;
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    },
  
   
    openProfileModal() {
      this.fetchUserDetails(sessionStorage.getItem('email')); 
      this.showProfileDialog = true; 
    },
  
    openlogoutModal() {
      this.showlogoutDialog = true; 
    },
  
  
      openDialog() {
        this.showPasswordResetDialog = true;
      },
  
      openPasswordResetDialog() {
        this.showPasswordResetDialog = true;
      },
      closePasswordResetDialog() {
        this.showPasswordResetDialog = false;
      },
      openPasswordResetDialogFromProfile() {
        this.showPasswordResetDialog = true;
        
      },
  
  
      openProfile() {
        this.showProfile = true;
      },
  
      closeProfile() {
        this.showProfile = false;
      },
  
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
        const passwordInput = document.getElementById('currentPassword');
  
        if (this.showPassword) {
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
  
      toggleConfirmPasswordVisibility() {
        this.confirmshowPassword = !this.confirmshowPassword;
        const passwordInput = document.getElementById('confirmPassword2');
  
        if (this.confirmshowPassword) {
          passwordInput.type = 'text';
        } else {
          passwordInput.type = 'password';
        }
      },
  
  
  
      logout() {
    if (this.platform == 'mobile') {
      window.FlutterBridge.postMessage('Requesting logout from Webview');
    }
  
    this.$toast.open({
      message: 'You have logged out Successfully!',
      type: 'success',
      duration: 3000,
    });
  
    this.$store.dispatch('stopRefreshInterval');
  
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenExpiration');
  
    this.$router.push('/login');
  },
  
  
  async resetPassword(event) {
    event.preventDefault();
  
  
    if (this.newPassword !== this.confirmPassword2) {
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
  
        const useremail = sessionStorage.getItem('email');
      
        const response = await axios.post(this.$config.RESETPASSWORD_ENDPOINT, {
          email: useremail,
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
          this.showPasswordResetDialog = false;
          
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('tokenExpiration');
  
        
          this.$router.push('/login');
        } else if (response.data.message === 'New password must be different from the previous password.') {
          this.$toast.open({
            message: 'New password must be different from the previous password.',
            type: 'warning',
            duration: 3000,
          });
        } else if (response.data.message === 'New password does not meet complexity requirements.') {
          this.$toast.open({
            message: 'Password must not contain part of your email or numeric value at the Begginning and at the End',
            type: 'warning',
            duration: 5000,
          });
        } else if (response.data.message === 'New password is in the password history.') {
          this.$toast.open({
            message: 'You cannot use a Password you have used before, Please try another password',
            type: 'warning',
            duration: 5000,
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
  
     
    },
  };
  
  </script>
  
  <style>
  
  
  @import 'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i';
  @import './css/sb-admin-2.css';
  @import './vendor/fontawesome-free/css/all.min.css';
  
  .loader2 {
    height: 4px;
    width: 130px;
    --c:no-repeat linear-gradient(#8E1611 0 0);
    background: var(--c),var(--c),#f8f4f3;
    background-size: 60% 100%;
    animation: l16 3s infinite;
  }
  @keyframes l16 {
    0%   {background-position:-150% 0,-150% 0}
    66%  {background-position: 250% 0,-150% 0}
    100% {background-position: 250% 0, 250% 0}
  }
  
  
  .loader {
    width: auto;
    height: 30px;
    margin-top: 220px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 3px solid #8E1611;
    animation:
      l20-1 0.8s infinite linear alternate,
      l20-2 1.6s infinite linear;
  }
  
  .loader3 {
    width: auto;
    height: 30px;
    aspect-ratio: 1;
    border-radius: 50%;
    align-items: center;
    border: 3px solid #8E1611;
    animation:
      l20-1 0.8s infinite linear alternate,
      l20-2 1.6s infinite linear;
  }
  @keyframes l20-1{
     0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
     12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
     25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
     50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
     62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
     75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
     100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
  }
  @keyframes l20-2{ 
    0%    {transform:scaleY(1)  rotate(0deg)}
    49.99%{transform:scaleY(1)  rotate(135deg)}
    50%   {transform:scaleY(-1) rotate(0deg)}
    100%  {transform:scaleY(-1) rotate(-135deg)}
  }
  
  
  
  
  .sidebar.collapsable {
    left: -14rem; 
  }
  
  /* Overlay */
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 1000; 
  }  
  
  .sidebar-container {
      width: 250px; /* Adjust width as per your design */
      height: 100%; /* Adjust height as per your design */
      background-color: #ffffff; /* Adjust background color */
      position: fixed;
      top: 0;
      left: 0;
      transition: transform 0.3s ease-in-out;
      z-index: 1000;
      overflow-y: auto; /* Enable vertical scrolling if content exceeds height */
  }
  
  .sidebar-toggle {
      position: fixed;
      top: 10px;
      left: 10px;
      z-index: 1001;
      cursor: pointer;
  }
  
  
  .back-container {
    font-weight: bold;
    font-size: 10px;
    color: #fff;
    border-radius: 20px;
    width: 140px;
    height: 20px;
    background-color: #8E1611;
    cursor: pointer;
    padding-top: 3px;
  
  }
  
  .back-container:hover{
    background-color: #8E1611;
    color: #fff;
  }
  
  .logout-button {
    background-color: #8E1611;
    color: #FFF;
    border: none;
    text-align: center;
    padding: 10px 10px;
    font-size: 14px;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 20px;
    width: 100px;
    height: 40px;
  }
  
  .resetpassword-toggle {
    position: absolute;
    top: 70%;
    right: 0px; 
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  
  .logout-cancel {
    background-color: #929196;
    color: #FFF;
    border: none;
    padding: 10px 10px;
    font-size: 12px;
    border-radius: 3px;
    cursor: pointer;
    margin-top: 20px;
    width: 100px;
    height: 40px;
  }
  
  .modal-text{
    font-size: 12px;
    color: #000;
  }
  
  .modal-text2{
    font-size: 10px;
    font-weight: lighter;
  
  }
  
  .custom-modal-width{
    width: 430px;
  }
  
  .modal-header-text {
    margin-left: 2px;
    font-size: 15px;
    transition: color 0.3s;
    font-weight: bold;
    color: #000;
  }
  
  .profile-card {
    display: flex;
    align-items: center;
    padding: 8px 15px;
    background-color: #F1F3F9;
    color: #000;
    border-radius: 10px;
    font-size: 12px;
    width: 120px;
    height: 30px;
    cursor: pointer;
    margin-top: 0px; /* Adjust margin as needed */
    transition: background-color 0.3s;
    margin-bottom: 0px; 
  }
  
  @media (max-width: 900px) {
  
    .main-dashboard-card {
    display: flex;
    align-items: center;
    padding: 8px 15px;
    background-color: #8E1611;
    color: #fff;
    border-radius: 10px;
    font-size: 8px;
    width: 130px;
    height: 30px;
    cursor: pointer;
    margin-top: 0px; /* Adjust margin as needed */
    transition: background-color 0.3s;
    margin-bottom: 0px; 
  }
  
  }
  
  @media (min-width: 900px) {
  
  .main-dashboard-card {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  background-color: #8E1611;
  color: #fff;
  border-radius: 10px;
  font-size: 10px;
  width: 170px;
  height: 30px;
  cursor: pointer;
  margin-top: 0px; /* Adjust margin as needed */
  transition: background-color 0.3s;
  margin-bottom: 0px; 
  }
  
  }
  
  
  
  .main-dashboard-card:hover{
    background-color: #5F1310 ;
  }
  
  .profile-card:hover{
    background-color: #dfe0e5 ;
  }
  
  .user-profile-card {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 600px; /* Adjust margin as needed */
    background-color: #F8F9FC;
    width: 180px;
    border-radius: 3%;
  }
  
  .user-profile-card2 {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F8F9FC;
    width: 180px;
    border-radius: 3%;
  }
  
  .profile-image-container {
    position: relative;
    border-radius: 20%;
    overflow: hidden;
    margin-bottom: 10px; 
    margin-top: 20px; 
    z-index: 1;
  }
  
  .profile-image {
    width: 35px; /* Adjust size as needed */
    height: 35px; /* Adjust size as needed */
    object-fit: cover;
  }
  
  .status-indicator {
    position: absolute;
    bottom: 0;
    right: 2px;
    width: 10px; /* Adjust size as needed */
    height: 10px; /* Adjust size as needed */
    background-color: #4CAF50; /* Green color */
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 2px; /* Adjust font size as needed */
    z-index: 2;
  }
  
  .user-info {
    text-align: center;
    white-space: nowrap; /* Prevent text from breaking into a new line */
    overflow: hidden; /* Hide overflow text */
    text-overflow: ellipsis; /* Display ellipsis (...) when text overflows */
  }
  
  .user-name {
    font-size: 12px;
    font-weight: bold;
    color:#000;
  }
  
  .user-email {
    font-size: 10px;
    color: #777;
    margin-bottom: 20px; 
  }
  
  .logout-card {
    display: flex;
    align-items: center;
    padding: 8px 15px;
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    font-size: 12px;
    width: 150px;
    height: 30px;
    cursor: pointer;
    margin-top: 10px; /* Adjust margin as needed */
    transition: background-color 0.3s;
    margin-bottom: 20px; 
  }
  
  .custom-icon2 {
    width: 6px; /* Set the width of your custom icon */
    height: 6px; /* Set the height of your custom icon */
    margin-right: 0px; /* Add margin if needed */
  }
  
  .logout-card:hover {
    background-color: #333; /* Change background color on hover */
  }
  
  .logout-card i {
    margin-right: 8px;
  }
  
  .centered-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%; /* Make the container take the full height of the sidebar */
  }
  
  
  .custom-icon {
    width: 20px; 
    height: 20px; 
    margin-right: 10px; 
  }
  
  .custom-icon3 {
    width: 15px;
    height: 15px; 
    margin-right: 10px;
  }
  
  .card-container {
    display: flex;
    align-items: center;
    width: 180px;
    height: 30px;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .card-text {
    margin-left: 2px;
    font-size: 12px;
    transition: color 0.3s;
  }
  
  .stroke {
    border-bottom: 1px solid #d8d6d6; /* Add a bottom border only */
  }
  
  .stroke-right {
    border-right: 1px solid #f1f0f0; /* Add a bottom border only */
  }
  
  
  .card-text2 {
    margin-left: 30px;
    font-size: 12px;
    transition: color 0.3s;
  }
  
  .custom-active {
    background-color: #8E1611; /* Change the background color for the active state */
  }
  
  .custom-active .card-text {
    color: #fff; /* Change the text color for the active state */
  }
  
  .resized2-img {
   position: relative;
   right: 0px;
   bottom: 0px;
    width: auto;
    height: 25px; 
  
  }
  
  
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
  
  .resized-img {
   position: relative;
   right: 0px;
   bottom: 0px;
    width: auto;
    height: 70px; 
  
  }
  
  .bold-white-text {
    font-weight: bold;
    color: white;
    font-size: 12px;
    margin-top: 10px;
  }
  
  .user-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .img-profile {
    width: 60px;
    height: 60px;
    
  }
  
  .text-gray-600 {
    font-size: 12px;
    color: gray;
  
  }
  
  .background-image {
    background-image: url(./img/lotusLogo2.png);
    background-size: cover;
    background-position: center;
    max-height: 60vh;
  }
  
  @media (max-width: 767px) {
   
    .background-image {
      background-size: contain;
      min-height: 30vh;
    }
  
  
  }
  
  @media (max-width: 575px) {
  
    .resized-img {
  
      width: auto;
      height: 50px;
      }
  
  
  }
  
  </style>