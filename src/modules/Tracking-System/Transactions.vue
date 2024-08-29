<template>
  <dashboard-layout>

    <template v-if="fetchDataLoading">
      <div class="big-white-card2">
        <center><div class="loader"></div></center>
      </div>
          </template>
          <template v-else>
    <!-- <div class="head-text" style="font-size: 17px;">Transactions</div>
    <div class="subhead-text">Here you can view the list of all transactions</div>

     -->
    <div class="big-white-card-main">
      <div class="table-divider">
        <div style="display: flex; justify-content: space-between">
          
      <div class="tab-buttons-container" style="display: flex; justify-content: space-between">

      <div class="tab-buttons">
        <button
          :class="{ activeTab: selectedTab === 'pending' }"
          @click="selectTab('pending')"
        >
          <div style="display: flex; white-space: nowrap;"> All Transactions
          
          </div>
        </button>


        <button v-for="product in products" :key="product.ProductID" @click="selectTab(product.ProductID, product.ProductName)" :class="{ activeTab: selectedTab === product.ProductID }">
      {{ product.ProductID }}
    </button>

      </div>
    </div>


      <div v-if="!isMobile" class="calendar-dropdown">
  <select v-model="selectedDay" @change="updateCalendar" class="dropdown-select">
    <option v-for="day in daysInMonth(selectedYear, selectedMonth)" :key="day" :value="day" class="dropdown-select">
      {{ day }}
    </option>
  </select>
  <select v-model="selectedMonth" @change="updateCalendar" class="dropdown-select">
    <option v-for="(month, index) in months" :key="index" :value="index + 1" class="dropdown-select">
      {{ month }}
    </option>
  </select>
  <select v-model="selectedYear" @change="updateCalendar" class="dropdown-select">
    <option v-for="year in years" :key="year" :value="year" class="dropdown-select">
      {{ year }}
    </option>
  </select>

  <div v-if="!showDateRange" @click="toggleDateRange" class="select-date-range">Select Date Range</div>

  <div v-if="showDateRange" style="display: flex;">
    <span class="to-text" style="color: #000; margin-right: 5px; font-size: 14px;">to</span>
    <select v-model="endDay" class="dropdown-select">
      <option v-for="day in daysInMonth(endYear, endMonth)" :key="day" :value="day" class="dropdown-select">
        {{ day }}
      </option>
    </select>
    <select v-model="endMonth" class="dropdown-select">
      <option v-for="(month, index) in months" :key="index" :value="index + 1" class="dropdown-select">
        {{ month }}
      </option>
    </select>
    <select v-model="endYear" class="dropdown-select">
      <option v-for="year in years" :key="year" :value="year" class="dropdown-select">
        {{ year }}
      </option>
    </select>
    <div @click="filterTransactionByDateRange" class="apply-button">Apply</div>
  </div>
</div>

    </div>
  </div>

  <div v-if="errorDateRange" class="alert alert-danger" 
style="font-size: 12px; height: 40px;" role="alert">
        {{ errorDateRange }}
          </div>

    
      <div v-if="selectedTab === 'pending'">
        <div class="horizontal-container">
      <div style="display: flex;">
      <!-- Dropdown -->

      <div  class="dropdown-container">
        
            <select
              id="cardSwitch"
              class="form-control"
              v-model="cardSwitch"
              ref="dropdown1"
              @change="handleCardSwitch"
              style="font-size: 12px; background-color: transparent;  cursor: pointer; z-index: 2; width: 130px; height: 35px;  color: #000; font-size: 13px; border: 1px solid #D1D5DB;"
            >
            
              <option value="Filter by" selected disabled> Filter by</option>
              <option value="View All">View All</option>
              <option value="Approved">Approved</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div class="dropdown-icon-container" >
              <img src="@/components/img/Main_Assests/filter.svg" alt="Dropdown Icon" @click="toggleDropdown">
            </div>
          </div>

      <!-- Search bar -->
      <div class="search-bar" style="margin-left: 10px;  max-width: 300px;">
      <div class="search-icon ">
        <img src="@/components/img/Main_Assests/Search.svg" alt="Search Icon" style="padding-right: 15px;">
      </div>
      <input type="text" class="form-control ml-1" v-model="searchTerm"  style="margin-right: 10px; width: 280px; height: 36px; color:#000; font-size: 13px; border: 1px solid #D1D5DB;" placeholder="  Search with any value...">
    </div>
  </div>



       <!-- Refresh Button-->
       <div style="display: flex">
        <div v-if="viewingByData" class="button-container mr-2" style="height: 35px; background-color: #8E1611; color: #fff">
        <button style="color: #fff" class="onboard-button4" @click="resetTable">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i>
              </span>
          Reset</button>
      </div>

       <div class="button-container" style="height: 35px; ">
        <button class="onboard-button4" @click="refreshTable">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i>
              </span>
              <span v-else> <img src="@/components/img/Main_Assests/refresh.svg" alt="Refresh Icon"></span>
          Refresh</button>
      </div>
      </div>
   


    </div>
    <hr>


    

    <div class="custom-table-container" :key="currentPage">
      
      <table class="custom-table2">
        <thead>
          <tr v-if="!isMobile">
            <th>Date</th>
            <th>InstructionNo</th>
            <th>Product</th>
            <th>ClientName</th>
            <th>Amount</th>
            <th>Status</th>
            <th style="white-space: nowrap;">Sent By</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="fetchingDateData">
            <tr>
            <td colspan="8" style="text-align: center;"><center><div class="loader3"></div></center></td>
          </tr>
          </template>
          <template v-else>
          
          <template v-if="filteredRows.length === 0">
        <tr>
          <td colspan="8" style="text-align: center;">No Transactions Found</td>
        </tr>
      </template>
          <template v-else-if="searchTerm && filteredRows.length > 0">
          <tr v-for="transactions in filteredRows" :key="transactions.instructionNo" @click="ViewTransaction(transactions)" class="table-row">
            <td v-if="!isMobile" style="white-space: nowrap;">{{ formatDate(transactions.DocumentDate) }}</td>
            <td v-if="!isMobile" style="color: green; font-weight: bold; white-space: nowrap;">{{ transactions.RequestNo }}</td>
            <td v-if="!isMobile">{{ transactions.InvestmentProduct }}</td>
            <td style="white-space: nowrap;"><div v-if="isMobile" style="font-weight: bold;">
                Client Name</div>{{ transactions.ClientName }}
                <div v-if="isMobile" style="font-weight: bold; color: green; font-size: 10px;">
                InstructionNo: {{ transactions.RequestNo }}</div>
                <div v-if="isMobile" style="font-weight: bold; display: flex;">
                Status: 
                <div v-if="transactions.ApprovalLevel1Status == 0 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2 ml-1"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 0">
              <div class="approved-indicator ml-1"><center>Approved</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 2 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2 ml-1"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 2 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2 ml-1"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 1">
              <div class="approved-indicator ml-1"><center>Completed</center></div>
            </div>
              </div>
              </td>

            <td><div v-if="isMobile" style="font-weight: bold;">Amount</div>₦{{ formatAmount(transactions.Amount) }}
              <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
                Date: {{ formatDate(transactions.RequestDate) }}</div>
                <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
                Product: {{ transactions.InvestmentProduct }}</div>
            </td>

            <td v-if="!isMobile">
              <div v-if="transactions.ApprovalLevel1Status == 0 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 0">
              <div class="approved-indicator"><center>Approved</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 2 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 2 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 1">
              <div class="approved-indicator"><center>Completed</center></div>
            </div>
            </td>
            <td v-if="!isMobile" style="white-space: nowrap;">{{ transactions.PostedBy }}</td>
            <td v-if="!isMobile"><div class="attachment-button" @click.stop="openDocument(transactions.RequestNo)" style="white-space: nowrap;">View Attachment</div> </td>
            
         </tr>
          </template>
          <template v-else>
           <tr v-for="transactions in visibleRows" :key="transactions.instructionNo" @click="ViewTransaction(transactions)" class="table-row">
            <td v-if="!isMobile" style="white-space: nowrap;">{{ formatDate(transactions.DocumentDate) }}</td>
            <td v-if="!isMobile" style="color: green; font-weight: bold; white-space: nowrap;">{{ transactions.RequestNo }}</td>
            <td v-if="!isMobile">{{ transactions.InvestmentProduct }}</td>
            <td style="white-space: nowrap;"><div v-if="isMobile" style="font-weight: bold;">
                Client Name</div>{{ transactions.ClientName }}
                <div v-if="isMobile" style="font-weight: bold; color: green; font-size: 10px;">
                InstructionNo: {{ transactions.RequestNo }}</div>
                <div v-if="isMobile" style="font-weight: bold; display: flex;">
                Status: 
                <div v-if="transactions.ApprovalLevel1Status == 0 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2 ml-1"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 0">
              <div class="approved-indicator ml-1"><center>Approved</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 2 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2 ml-1"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 2 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2 ml-1"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 1">
              <div class="approved-indicator ml-1"><center>Completed</center></div>
            </div>
              </div>
              </td>

            <td><div v-if="isMobile" style="font-weight: bold;">Amount</div>₦{{ formatAmount(transactions.Amount) }}
              <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
                Date: {{ formatDate(transactions.RequestDate) }}</div>
                <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
                Product: {{ transactions.InvestmentProduct }}</div>
            </td>

            <td v-if="!isMobile">
              <div v-if="transactions.ApprovalLevel1Status == 0 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 0">
              <div class="approved-indicator"><center>Approved</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 2 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 2 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 1">
              <div class="approved-indicator"><center>Completed</center></div>
            </div>
            </td>
            <td v-if="!isMobile" style="white-space: nowrap;">{{ transactions.PostedBy }}</td>
            <td v-if="!isMobile"><div class="attachment-button" @click.stop="openDocument(transactions.RequestNo)" style="white-space: nowrap;">View Attachment</div> </td>
            

          </tr>
        </template>

      </template>

        </tbody>
      </table>
      <div class="pagination">
      <span>{{ currentPageStart }} - {{ currentPageEnd }} of {{ totalRows }}</span>
      <img src="@/components/img/Main_Assests/previousbutton.svg" 
      class="pagination-icon1"
      alt="Prev Icon" 
      @click="prevPage">
      <img src="@/components/img/Main_Assests/nextbutton.svg" 
      class="pagination-icon2"
      alt="Next Icon" 
      @click="nextPage">
    </div>
    <hr>
    </div>

      </div>


       <div v-for="product in products" :key="product.ProductID">
      <div v-if="selectedTab === product.ProductID">
        <div class="horizontal-container">
      <div style="display: flex;">
      <!-- Dropdown -->

      <div  class="dropdown-container">
        
            <select
              id="cardSwitch"
              class="form-control"
              v-model="cardSwitch"
              ref="dropdown1"
              @change="handleCardSwitch2(product.ProductID)"
              style="font-size: 12px; background-color: transparent;  cursor: pointer; z-index: 2; width: 130px; height: 35px;  color: #000; font-size: 13px; border: 1px solid #D1D5DB;"
            >
            
              <option value="Filter by" selected disabled> Filter by</option>
              <option value="View All">View All</option>
              <option value="Approved">Approved</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div class="dropdown-icon-container" >
              <img src="@/components/img/Main_Assests/filter.svg" alt="Dropdown Icon" @click="toggleDropdown">
            </div>
          </div>

      <!-- Search bar -->
      <div class="search-bar" style="margin-left: 10px;  max-width: 300px;">
      <div class="search-icon ">
        <img src="@/components/img/Main_Assests/Search.svg" alt="Search Icon" style="padding-right: 15px;">
      </div>
      <input type="text" class="form-control ml-1" v-model="searchTerm"  style="margin-right: 10px; width: 280px; height: 36px; color:#000; font-size: 13px; border: 1px solid #D1D5DB;" placeholder="  Search with any value...">
    </div>
  </div>

       <!-- Refresh Button-->
       <div style="display: flex">
        <div v-if="viewingByData" class="button-container mr-2" style="height: 35px; background-color: #8E1611; color: #fff">
        <button style="color: #fff" class="onboard-button4" @click="resetTable">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i>
              </span>
          Reset</button>
      </div>

       <div class="button-container" style="height: 35px; ">
        <button class="onboard-button4" @click="refreshTable">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i>
              </span>
              <span v-else> <img src="@/components/img/Main_Assests/refresh.svg" alt="Refresh Icon"></span>
          Refresh</button>
      </div>
      </div>
   


    </div>
    <hr>

    <div class="custom-table-container" :key="currentPage">
      
      <table class="custom-table2">
        <thead>
          <tr v-if="!isMobile">
            <th>Date</th>
            <th>InstructionNo</th>
            <th>Product</th>
            <th>ClientName</th>
            <th>Amount</th>
            <th>Status</th>
            <th style="white-space: nowrap;">Sent By</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="fetchingDateData">
            <tr>
            <td colspan="8" style="text-align: center;"><center><div class="loader3"></div></center></td>
          </tr>
          </template>
          <template v-else>
          <template v-if="filteredRows.length === 0">
        <tr>
          <td colspan="8" style="text-align: center;">No Transactions Found</td>
        </tr>
      </template>
          <template v-else-if="searchTerm && filteredRows.length > 0">
          <tr v-for="transactions in filteredRows" :key="transactions.instructionNo" class="table-row">
            <td v-if="!isMobile" style="white-space: nowrap;">{{ formatDate(transactions.DocumentDate) }}</td>
            <td v-if="!isMobile" style="color: green; font-weight: bold; white-space: nowrap;">{{ transactions.RequestNo }}</td>
            <td v-if="!isMobile">{{ transactions.InvestmentProduct }}</td>
            <td style="white-space: nowrap;"><div v-if="isMobile" style="font-weight: bold;">
                Client Name</div>{{ transactions.ClientName }}
                <div v-if="isMobile" style="font-weight: bold; color: green; font-size: 10px;">
                InstructionNo: {{ transactions.RequestNo }}</div>
                <div v-if="isMobile" style="font-weight: bold; display: flex;">
                Status: 
                <div v-if="transactions.ApprovalLevel1Status == 0 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2 ml-1"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 0">
              <div class="approved-indicator ml-1"><center>Approved</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 2 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2 ml-1"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 2 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2 ml-1"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 1">
              <div class="approved-indicator ml-1"><center>Completed</center></div>
            </div>
              </div>
              </td>

            <td><div v-if="isMobile" style="font-weight: bold;">Amount</div>₦{{ formatAmount(transactions.Amount) }}
              <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
                Date: {{ formatDate(transactions.RequestDate) }}</div>
                <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
                Product: {{ transactions.InvestmentProduct }}</div>
            </td>

            <td v-if="!isMobile">
              <div v-if="transactions.ApprovalLevel1Status == 0 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 0">
              <div class="approved-indicator"><center>Approved</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 2 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 2 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 1">
              <div class="approved-indicator"><center>Completed</center></div>
            </div>
            </td>
            <td v-if="!isMobile" style="white-space: nowrap;">{{ transactions.PostedBy }}</td>
            <td v-if="!isMobile"><div class="attachment-button" @click.stop="openDocument(transactions.RequestNo)">View Attachment</div> </td>
            
         </tr>
          </template>
          <template v-else>
           <tr v-for="transactions in visibleRows" :key="transactions.instructionNo" @click="ViewTransaction(transactions)" class="table-row">
            <td v-if="!isMobile" style="white-space: nowrap;">{{ formatDate(transactions.DocumentDate) }}</td>
            <td v-if="!isMobile" style="color: green; font-weight: bold; white-space: nowrap;">{{ transactions.RequestNo }}</td>
            <td v-if="!isMobile">{{ transactions.InvestmentProduct }}</td>
            <td style="white-space: nowrap;"><div v-if="isMobile" style="font-weight: bold;">
                Client Name</div>{{ transactions.ClientName }}
                <div v-if="isMobile" style="font-weight: bold; color: green; font-size: 10px;">
                InstructionNo: {{ transactions.RequestNo }}</div>
                <div v-if="isMobile" style="font-weight: bold; display: flex;">
                Status: 
                <div v-if="transactions.ApprovalLevel1Status == 0 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2 ml-1"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 0">
              <div class="approved-indicator ml-1"><center>Approved</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 2 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2 ml-1"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 2 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2 ml-1"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 1">
              <div class="approved-indicator ml-1"><center>Completed</center></div>
            </div>
              </div>
              </td>

            <td><div v-if="isMobile" style="font-weight: bold;">Amount</div>₦{{ formatAmount(transactions.Amount) }}
              <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
                Date: {{ formatDate(transactions.RequestDate) }}</div>
                <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
                Product: {{ transactions.InvestmentProduct }}</div>
            </td>

            <td v-if="!isMobile">
              <div v-if="transactions.ApprovalLevel1Status == 0 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 0">
              <div class="approved-indicator"><center>Approved</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 2 && transactions.ApprovalLevel2Status == 0 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 2 && transactions.ReviewerLevelStatus == 0">
              <div class="pending-indicator"><center>Rejected</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1 && transactions.ApprovalLevel2Status == 1 && transactions.ReviewerLevelStatus == 1">
              <div class="approved-indicator"><center>Completed</center></div>
            </div>
            </td>
            <td v-if="!isMobile" style="white-space: nowrap;">{{ transactions.PostedBy }}</td>
            <td v-if="!isMobile"><div class="attachment-button" @click.stop="openDocument(transactions.RequestNo)">View Attachment</div> </td>
            

          </tr>
        </template>
        </template>

        </tbody>
      </table>
      <div class="pagination">
      <span>{{ currentPageStart }} - {{ currentPageEnd }} of {{ totalRows }}</span>
      <img src="@/components/img/Main_Assests/previousbutton.svg" 
      class="pagination-icon1"
      alt="Prev Icon" 
      @click="prevPage">
      <img src="@/components/img/Main_Assests/nextbutton.svg" 
      class="pagination-icon2"
      alt="Next Icon" 
      @click="nextPage">
    </div>
    <hr>
    </div>
  </div>
</div>
 
  </div>

  <div v-if="showDocument" class="pdf-viewer-overlay">
  <div class="pdf-viewer">
    <!-- Inside your template -->
    <iframe :src="pdfBlobUrl" class="pdf-viewer-iframe" controls="0"></iframe>
    <button @click="closeDocumentModal" class="btn btn-danger">Close</button>
  </div>
</div>

<div v-if="showDocument2" class="pdf-viewer-overlay">
        <div class="pdf-viewer1">
        <div ref="pdfContainer" class="pdf-container"></div>
      
      <div style="display: flex" class="mt-2">
      <!-- <button @click="downloadPDF" style="font-size: 12px" class="btn btn-primary fa fa-download"> Download</button> -->
      <button @click="closeDocumentModal" style="font-size: 12px" class="btn btn-danger ml-2">Close</button>
    </div>
  </div>
</div>




<div class="modal-overlay" v-show="showPaidCard">
<Modal class="custom-modal custom-modal-width" v-show="showPaidCard">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header-text">
          Complete Transaction
        </div>
        <button type="button" class="close" @click="showPaidCard = false">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body modal-text">
        Are you sure you want to complete this transaction?<br>
        Note: You wont be able to undo this action.
      </div>

      <div class="modal-footer">
        <button class="logout-cancel" @click="showPaidCard = false">Cancel</button>
        <!-- <button type="button" class="btn btn-secondary" @click="showlogoutDialog = false">Cancel</button> -->
        <button class="logout-button" @click="CompleteTransaction">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i>
              </span>
              <span v-else>Yes</span>
          
        </button>
      </div>
    </div>
  </div>
</Modal>
    </div>

    <div class="modal-overlay" v-show="showFailCard">
<Modal class="custom-modal custom-modal-width" v-show="showFailCard">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header-text">
          Fail Transaction
        </div>
        <button type="button" class="close" @click="showFailCard = false">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body modal-text">
        Please upload evidence of failed transaction<br>
        <strong>Note: </strong>This document will be merged with the existing attachment<br> and the transaction will be reintiated for approval.<br>

        <div class="file-upload-section"  style="font-size: 12px; background-color: #F8F9FC">
          <label for="govtIdUpload" class="upload-label">
            <div class="upload-icon">
              <!-- Upload Icon (You can replace this with your SVG or icon) -->
              <img src="@/components/img/Main_Assests/uploadicon.svg" alt="Upload Icon">
            </div>
            <div class="upload-text">
              <div v-if="uploadedFile">{{ uploadedFile.name }}  <span class="ml-3" aria-hidden="true" @click="removeFile" style=" color: #da3734; font-size: 14px;">&times;</span>
              </div>
              <div v-else>
              <div>Upload your document</div>
              <div class="small-text">Supports JPG, JPEG, PNG, PDF files only. Max size - 5mb</div>
            </div>
          </div>
          </label>
          <input type="file" id="govtIdUpload" required accept=".pdf,.jpeg,.jpg,.png" multiple class="file-input" @change="handleFileChange($event)" v-if="!uploadedFile">
        </div>
      </div>

      <center><div v-if="erroruploadMessage" style="font-size: 12px; width: 400px" class="alert alert-danger" role="alert">
          {{ erroruploadMessage }}
        </div></center>

      <div class="modal-footer">
        <button class="logout-cancel" @click="showFailCard = false">Cancel</button>
        <!-- <button type="button" class="btn btn-secondary" @click="showlogoutDialog = false">Cancel</button> -->
        <button class="logout-button" @click="handleAttachmentUpload">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i>
              </span>
              <span v-else>Submit</span>
          
        </button>
      </div>
    </div>
  </div>
</Modal>
    </div>

    <div class="modal-overlay" v-show="showApproveModal">
<Modal class="custom-modal custom-modal-width" v-show="showApproveModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header-text">
          Would you like to leave a comment for this approval?
        </div>
        <button type="button" class="close"  @click="closeAppprove">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body modal-text">
        <div class="mb-3">
            <label for="reason" class="text-black" style="margin-bottom: 1px;">Comment (Optional)<label class="text-danger">*</label></label>
            <textarea
              class="form-control"
              id="reason"
              style="height: 100px; width: 400px; font-size: 12px; color: #000;"
              placeholder="Type Here....."
              v-model="reason"
              required
              maxlength="100"
              @input="updateCharacterCount"
            ></textarea>
            <small class="text-muted text-right">{{ characterCount }}/100</small>
          </div>
      </div>

      <div class="modal-footer">
        <button class="logout-cancel" @click="closeAppprove">Cancel</button>
        <!-- <button type="button" class="btn btn-secondary" @click="showlogoutDialog = false">Cancel</button> -->
        <button class="logout-button2" @click="approveTransaction">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i> loading
              </span>
              <span v-else>No, Thanks!</span>
        </button>
      </div>
    </div>
  </div>
</Modal>
    </div>

    <div class="modal-overlay" v-show="showReasonModal">
<Modal class="custom-modal custom-modal-width" v-show="showReasonModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header-text">
          Please Provide Reason For Rejecting
        </div>
        <button type="button" class="close"  @click="closeReason">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body modal-text">
        <div class="mb-3">
            <label for="reason" class="text-black" style="margin-bottom: 1px;">Reason<label class="text-danger">*</label></label>
            <textarea
              class="form-control"
              id="reason"
              style="height: 100px; width: 400px; font-size: 12px; color: #000;"
              placeholder="Type Here....."
              v-model="reason"
              required
              maxlength="100"
              @input="updateCharacterCount"
            ></textarea>
            <small class="text-muted text-right">{{ characterCount }}/100</small>
          </div>
      </div>
      <center><div v-if="errorReasonMessage" style="font-size: 12px; width: 400px" class="alert alert-danger" role="alert">
          {{ errorReasonMessage }}
        </div></center>

      <div class="modal-footer">
        <button class="logout-cancel" @click="closeReason">Cancel</button>
        <!-- <button type="button" class="btn btn-secondary" @click="showlogoutDialog = false">Cancel</button> -->
        <button class="logout-button" @click="bulkRejectTransactions">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i> loading
              </span>
              <span v-else>Submit</span>
        </button>
      </div>
    </div>
  </div>
</Modal>
    </div>

  <view-transaction
  :showTransactionCard="showTransactionCard" 
  :TransactionData="TransactionData" 
  @close-card="closeTransactionCard"
  @open-card="openTransactionCard"
  @update-transaction="updateTransaction"
  ></view-transaction>


  </template>

  </dashboard-layout>
</template>
  
  <script>
  import DashboardLayout from '@/components/DashboardLayout.vue';
  import ViewTransaction from './ViewTransaction.vue'
  import Chart from 'chart.js/auto';
  import axios from 'axios'; 
  import { mapActions, mapGetters } from 'vuex';

  
  export default {
    name: 'Tracker-dashboard',

  
    components: {
      DashboardLayout,
      ViewTransaction,
    },
  
    data() {
    return {
      windowWidth: window.innerWidth,
      fetchingDateData: false,
      myChart: null,
      showDocument: false,
      showDocument2: false,
      pdfsrc: null,
      pdfBlobUrl: '',
      selectedTab: 'pending',
      showChart: true,
      cardSwitch: 'Filter by',
      tableData: [],
      fetchDataLoading: true,
      currentPage: 1,
      rowsPerPage: 8,
      totalRows: 0,
      searchTerm: '',
      showPopup: Array(3).fill(false),
      hovered: false,
      selectAll: false,
      showTransactionCard: false,
      TransactionData: null,

      isModalOpen: false,
      selectedTransaction: null,
      transactions: [],
      showUsersDialog: false,
      showSuccessMessage: false,
      errorMessage: '',
      getRecords: [],   
      isLoading: true,
      isLoadingCard: true,
      users: [], 
      userRole: '',
      UserId: '',
      finalStatus: '',
      moduleuserRole: '',
      transactionCounts: '',
      products: [],
      selectedTabName: '',
      Apv1tableData: '',
      Apv2tableData: '',
      showPaidCard: false,
      showFailCard: false,
      uploadedFile: null,
      finalCheckPaid: '',
      finalCheckFailed: '',
      showReasonModal: false,
      showApproveModal: false,
      errorReasonMessage: false,
      erroruploadMessage: false,
      reason: '',
      selectedData: '',
      spinnerloading: false,
      refreshInterval: null,
      showDateRange: false,
      errorDateRange: false,
      selectedDay: new Date().getDate(),
      selectedMonth: new Date().getMonth() + 1, 
      selectedYear: new Date().getFullYear(),
      endDay: new Date().getDate(),
      endMonth: new Date().getMonth() + 1, 
      endYear: new Date().getFullYear(),
      months: [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ],
      years: [],
      viewingByData: false,
    };
  },
  async mounted() {

    window.addEventListener('resize', this.handleResize);
    
    document.addEventListener('click', this.closePopups);

    this.userRole = sessionStorage.getItem('role');
    this.UserId = sessionStorage.getItem('userId');

    try{
      await this.fetchProducts();
      await this.$store.dispatch('fetchAllTransactions');
      
       await this.filterTransactions();
    this.totalRows = this.tableData.length;
   
    this.fetchDataLoading = false;
 
  }catch (error) {
        console.error(error);
        this.isLoading = false; // Ensure isLoading is set to false on error
        this.$toast.open({
        message: error,
        type: 'error',
        duration: 3000,
        });
        }

   
    const currentYear = new Date().getFullYear();
    for (let year = 2000; year <= 2050; year++) {
      this.years.push(year);
    }
    console.log(currentYear);

    this.refreshInterval = setInterval(() => {
      if ((this.cardSwitch == 'Filter by' || this.cardSwitch == 'View All') && !this.viewingByData) {
           this.$store.dispatch('fetchAllTransactions');
           this.filterTransactions();
      }
    }, 10000);

  },

  beforeUnmount() {
    // Clear the interval when the component is destroyed
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  },


  computed: {

 

    isMobile() {
      return this.windowWidth < 768;
    },

    ...mapGetters(['allTransactions']),
      filteredRows() {
      let filteredData = [];
      let startIndex = 0;
      let endIndex = 0;
      const term = this.searchTerm.toLowerCase().trim();
      if (!term) return this.tableData;

      // Filter rows based on search term
      filteredData = this.tableData.filter(row =>
        Object.values(row).some(value =>
          value && value.toString().toLowerCase().includes(term)
        )
      );

      // Apply pagination to filtered rows
      startIndex = (this.currentPage - 1) * this.rowsPerPage;
      endIndex = startIndex + this.rowsPerPage;

      return filteredData.slice(startIndex, endIndex);
      },


      visibleRows() {
      const startIndex = (this.currentPage - 1) * this.rowsPerPage;
      const endIndex = startIndex + this.rowsPerPage;

      // Filter rows based on search term
      const filteredRows = this.filteredRows;

      // Slice the filtered rows based on pagination
      return filteredRows.slice(startIndex, endIndex);
      },
      
      currentPageStart() {
      if (this.searchTerm) {
        return Math.min((this.currentPage - 1) * this.rowsPerPage + 1, this.filteredRows.length);
      } else {
        return Math.min((this.currentPage - 1) * this.rowsPerPage + 1, this.totalRows);
      }
      },

      currentPageEnd() {
      if (this.searchTerm) {
        return Math.min(this.currentPage * this.rowsPerPage, this.filteredRows.length);
      } else {
        return Math.min(this.currentPage * this.rowsPerPage, this.totalRows);
      }
      }


      },

      watch: {

        cardSwitch() {
      this.filteredTransactions();
    },

        selectedTab() {
    this.filterTransactions();
  },

  selectAll(newVal) {
    console.log('selectAll changed:', newVal);
    this.tableData.forEach((row, index) => {
      row.selected = newVal;
      console.log(`Row ${index} selected:`, row.selected);
    });
  }
     },

  methods: {

    resetTable(){
      this.viewingByData = false;
      if(this.selectedTab == 'pending')
      {
        this.filteredTransactions();

      }else{
        this.filteredTransactions2(this.selectedTabName);
      }
      this.selectedDay = new Date().getDate(),
      this.selectedMonth = new Date().getMonth() + 1, 
      this.selectedYear = new Date().getFullYear(),
      this.endDay = new Date().getDate(),
      this.endMonth = new Date().getMonth() + 1, 
      this.endYear = new Date().getFullYear(),
      this.showDateRange = false;
    },

    handleResize() {
      this.windowWidth = window.innerWidth;
    },

    ...mapActions(['fetchAllTransactions']),

    filterTransactions() {
    if(this.moduleuserRole == 'Approver1'){
      const tableData = this.allTransactions.filter(transaction => transaction.ApprovalLevel1Status == 0);
      if (this.selectedTab === 'pending') {
      this.tableData = tableData;
      this.Apv1tableData = tableData;
    } else {
      this.tableData = tableData.filter(transaction => transaction.InvestmentProduct === this.selectedTabName);
    }
    }else if(this.moduleuserRole == 'Approver2'){
      const tableData = this.allTransactions.filter(transaction => transaction.ApprovalLevel1Status == 1);
      if (this.selectedTab === 'pending') {
      this.tableData = tableData;
      this.Apv2tableData = tableData;
    } else {
      this.tableData = tableData.filter(transaction => transaction.InvestmentProduct === this.selectedTabName);
    }
    }
    else{
    if (this.selectedTab === 'pending') {
      this.tableData = this.allTransactions;
    } else {
      this.tableData = this.allTransactions.filter(transaction => transaction.InvestmentProduct === this.selectedTabName);
    }
  }
  },

    async filterTransactionByDateRange2() {

      this.viewingByData = true;

      const startDate = new Date(this.selectedYear, this.selectedMonth - 1, this.selectedDay);
  const endDate = new Date(this.endYear, this.endMonth - 1, this.endDay, 23, 59, 59);

    console.log(`Start Date: ${startDate.toISOString()}`);
    console.log(`End Date: ${endDate.toISOString()}`);
 
      if (startDate > endDate) {
   
   this.errorDateRange = 'Start date cannot be greater than End date';
   setTimeout(() => {
       this.errorDateRange = false;
     }, 3000);
   console.error('Start date cannot be greater than End date');
   return; 
 }else {
      if(this.selectedTab == 'pending')
      {
        this.filteredTransactions();

      }else{
        this.filteredTransactions2(this.selectedTabName);
      }

      this.tableData = this.tableData.filter(transaction => {
      const DocumentDate = new Date(transaction.DocumentDate);
      console.log(`RequestDate: ${DocumentDate.toISOString()}`);
      return DocumentDate >= startDate && DocumentDate <= endDate;
    });
  }
},

async filterTransactionByDateRange() {

this.viewingByData = true;

const startDate = new Date(this.selectedYear, this.selectedMonth - 1, this.selectedDay);
const endDate = new Date(this.endYear, this.endMonth - 1, this.endDay, 23, 59, 59);

console.log(`Start Date: ${startDate.toISOString()}`);
console.log(`End Date: ${endDate.toISOString()}`);

if (startDate > endDate) {

this.errorDateRange = 'Start date cannot be greater than End date';
setTimeout(() => {
 this.errorDateRange = false;
}, 3000);
console.error('Start date cannot be greater than End date');
return; 
}else {
  let DateRangeDate = [];
  this.fetchingDateData = true;
  try{

  const response = await axios.get(`${this.$config.GETTRANSACTIONBYDATE_ENDPOINT}?startDay=${this.selectedDay}&startMonth=${this.selectedMonth}&startYear=${this.selectedYear}&endDay=${this.endDay}&endMonth=${this.endMonth}&endYear=${this.endYear}`);

if (response.status === 200) {
  
  DateRangeDate = response.data.transactions;
}
} catch (error) {
console.error('Error fetching records:', error);
this.$toast.open({
message: 'Failed to fetching records. Please contact the system administrator.',
type: 'error',
duration: 3000,
});

}

if(this.selectedTab == 'pending')
{
  if (this.cardSwitch === 'Pending') {
        this.tableData = DateRangeDate.filter(transaction =>
          (transaction.ApprovalLevel1Status == 0 && transaction.ApprovalLevel2Status == 0 && transaction.ReviewerLevelStatus == 0) ||
          (transaction.ApprovalLevel1Status == 1 && transaction.ApprovalLevel2Status == 0 && transaction.ReviewerLevelStatus == 0)
        );
      } else if (this.cardSwitch === 'Approved') {
        this.tableData = DateRangeDate.filter(transaction =>
          transaction.ApprovalLevel1Status == 1 && transaction.ApprovalLevel2Status == 1 && transaction.ReviewerLevelStatus == 0
        );
      } else if (this.cardSwitch === 'Completed') {
        this.tableData = DateRangeDate.filter(transaction =>
          transaction.ApprovalLevel1Status == 1 && transaction.ApprovalLevel2Status == 1 && transaction.ReviewerLevelStatus == 1
        );
      } else if (this.cardSwitch === 'Rejected') {
        this.tableData = DateRangeDate.filter(transaction =>
          (transaction.ApprovalLevel1Status == 2 && transaction.ApprovalLevel2Status == 0 && transaction.ReviewerLevelStatus == 0) ||
          (transaction.ApprovalLevel1Status == 1 && transaction.ApprovalLevel2Status == 2 && transaction.ReviewerLevelStatus == 0)
        );
      } else {
        this.tableData = DateRangeDate;
      }

}else{
  if (this.cardSwitch === 'View All') {
        this.tableData = DateRangeDate.filter(transaction => transaction.InvestmentProduct == this.selectedTab);
      } else if (this.cardSwitch === 'Approved') {
        this.tableData = DateRangeDate.filter(transaction =>
          transaction.ApprovalLevel1Status == 1 && transaction.ApprovalLevel2Status == 1 && transaction.ReviewerLevelStatus == 0 && transaction.InvestmentProduct == this.selectedTab
        );
      } else if (this.cardSwitch === 'Completed') {
        this.tableData = DateRangeDate.filter(transaction =>
          transaction.ApprovalLevel1Status == 1 && transaction.ApprovalLevel2Status == 1 && transaction.ReviewerLevelStatus == 1 && transaction.InvestmentProduct == this.selectedTab
        );
      } else if (this.cardSwitch === 'Rejected') {
        this.tableData = DateRangeDate.filter(transaction =>
          (transaction.ApprovalLevel1Status == 2 && transaction.ApprovalLevel2Status == 0 && transaction.ReviewerLevelStatus == 0 && transaction.InvestmentProduct == this.selectedTab) ||
          (transaction.ApprovalLevel1Status == 1 && transaction.ApprovalLevel2Status == 2 && transaction.ReviewerLevelStatus == 0 && transaction.InvestmentProduct == this.selectedTab)
        );
      } else {
        this.tableData = DateRangeDate.filter(transaction => transaction.InvestmentProduct == this.selectedTab);
      }
}
this.fetchingDateData = false;
}
},

    daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  },

    toggleDateRange() {
      this.showDateRange = !this.showDateRange;
    },

    handleCardSwitch() {
      this.filteredTransactions();
    },

    handleCardSwitch2(product) {
      this.filteredTransactions2(product);
    },

    filteredTransactions2(product) {
      if (this.cardSwitch === 'View All') {
        this.tableData = this.allTransactions.filter(transaction => transaction.InvestmentProduct == product);
      } else if (this.cardSwitch === 'Approved') {
        this.tableData = this.allTransactions.filter(transaction =>
          transaction.ApprovalLevel1Status == 1 && transaction.ApprovalLevel2Status == 1 && transaction.ReviewerLevelStatus == 0 && transaction.InvestmentProduct == product
        );
      } else if (this.cardSwitch === 'Completed') {
        this.tableData = this.allTransactions.filter(transaction =>
          transaction.ApprovalLevel1Status == 1 && transaction.ApprovalLevel2Status == 1 && transaction.ReviewerLevelStatus == 1 && transaction.InvestmentProduct == product
        );
      } else if (this.cardSwitch === 'Rejected') {
        this.tableData = this.allTransactions.filter(transaction =>
          (transaction.ApprovalLevel1Status == 2 && transaction.ApprovalLevel2Status == 0 && transaction.ReviewerLevelStatus == 0 && transaction.InvestmentProduct == product) ||
          (transaction.ApprovalLevel1Status == 1 && transaction.ApprovalLevel2Status == 2 && transaction.ReviewerLevelStatus == 0 && transaction.InvestmentProduct == product)
        );
      } else {
        this.tableData = this.allTransactions.filter(transaction => transaction.InvestmentProduct == product);
      }
    },

    filteredTransactions() {
      if (this.cardSwitch === 'Pending') {
        this.tableData = this.allTransactions.filter(transaction =>
          (transaction.ApprovalLevel1Status == 0 && transaction.ApprovalLevel2Status == 0 && transaction.ReviewerLevelStatus == 0) ||
          (transaction.ApprovalLevel1Status == 1 && transaction.ApprovalLevel2Status == 0 && transaction.ReviewerLevelStatus == 0)
        );
      } else if (this.cardSwitch === 'Approved') {
        this.tableData = this.allTransactions.filter(transaction =>
          transaction.ApprovalLevel1Status == 1 && transaction.ApprovalLevel2Status == 1 && transaction.ReviewerLevelStatus == 0
        );
      } else if (this.cardSwitch === 'Completed') {
        this.tableData = this.allTransactions.filter(transaction =>
          transaction.ApprovalLevel1Status == 1 && transaction.ApprovalLevel2Status == 1 && transaction.ReviewerLevelStatus == 1
        );
      } else if (this.cardSwitch === 'Rejected') {
        this.tableData = this.allTransactions.filter(transaction =>
          (transaction.ApprovalLevel1Status == 2 && transaction.ApprovalLevel2Status == 0 && transaction.ReviewerLevelStatus == 0) ||
          (transaction.ApprovalLevel1Status == 1 && transaction.ApprovalLevel2Status == 2 && transaction.ReviewerLevelStatus == 0)
        );
      } else {
        this.tableData = this.allTransactions;
      }
    },

    async refreshTable(){

      try{

        this.spinnerloading = true;
        await this.$store.dispatch('fetchAllTransactions');
   
    this.spinnerloading = false;
 
  }catch (error) {
        console.error(error);
        this.spinnerloading = false;

        }

    },


    approveTransaction() {
      this.spinnerloading = true;
    const FName = sessionStorage.getItem('firstName');
    const LName = sessionStorage.getItem('lastName');

    const approverName = FName+" "+LName;
  const approvalData = {
    approverRole: this.moduleuserRole,
    status: 1,
    reason: this.reason || 'Approved',
    approvedby: approverName,
  };

  this.updateApprovalStatus(approvalData);
},


  rejectTransaction() {
    this.spinnerloading = true;
    const FName = sessionStorage.getItem('firstName');
    const LName = sessionStorage.getItem('lastName');

    const approverName = FName+" "+LName;

    if(!this.reason){
      this.errorReasonMessage = 'Please provide a reason for rejecting the transaction.';
    setTimeout(() => {
      this.errorReasonMessage = false;
    }, 3000);
    return;
    }

  const approvalData = {
    approverRole: this.moduleuserRole,
    status: 2,
    reason: this.reason,
    approvedby: approverName,
  };

  this.updateApprovalStatus(approvalData);
},

async updateApprovalStatus(approvalData) {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  const endpoint = `${this.$config.UPDATEAPPROVALSTATUS_ENDPOINT}/${this.selectedData.RequestNo}`;

  axios.post(endpoint, approvalData, { headers })
    .then(response => {
      console.log('Transaction status updated successfully', response.data);
      this.$toast.open({
        message: 'Transaction updated successfully',
        type: 'success',
        duration: 3000,
      });
      this.spinnerloading = false;
      this.tableData = this.tableData.filter(transaction => transaction.RequestNo !== this.selectedData.RequestNo);
      this.showReasonModal = false;
      this.showApproveModal = false;
      try{
        this.fetchTransactionCounts();
      } catch(error){
        console.log(error);
      }
      
      
    })
    .catch(error => {
      this.spinnerloading = false;
      console.error('Error updating transaction status', error);
      this.$toast.open({
        message: `Error updating transaction status: ${error}`,
        type: 'error',
        duration: 3000,
      });
      // Handle error if needed
    });
},

    updateCharacterCount() {
    this.characterCount = this.reason.length;
  },

  closeAppprove(){
      this.showApproveModal = false;

    },

    showApprove(TransactionData){
      this.showApproveModal = true;
      this.selectedData = TransactionData;
    },


    closeReason(){
      this.showReasonModal = false;

    },

    showReason(TransactionData){
      this.showReasonModal = true;
      this.selectedData = TransactionData;


    },

    collectSelectedTransactions(status, reason) {
    const FName = sessionStorage.getItem('firstName');
    const LName = sessionStorage.getItem('lastName');
    const approverName = `${FName} ${LName}`;

    return this.tableData.filter(transaction => transaction.selected).map(transaction => ({
      requestNo: transaction.RequestNo,
      approverRole: this.moduleuserRole,
      status: status,
      reason: reason,
      approvedby: approverName
    }));
  },


  async bulkApproveTransactions() {
    const selectedTransactions = this.collectSelectedTransactions(1, 'Approved');
    if (selectedTransactions.length > 0) {
      await this.sendBulkApprovalRequest(selectedTransactions);
    } else {
      console.warn('No transactions selected for approval');
    }
  },



  async bulkRejectTransactions() {
    if(!this.reason){
      this.errorReasonMessage = 'Please provide a reason for rejecting the transaction.';
    setTimeout(() => {
      this.errorReasonMessage = false;
    }, 3000);
    return;
    }

    const selectedTransactions = this.collectSelectedTransactions(2, this.reason);
    if (selectedTransactions.length > 0) {
      await this.sendBulkApprovalRequest(selectedTransactions);
    } else {
      console.warn('No transactions selected for rejection');
    }
  },


  async sendBulkApprovalRequest(payload) {
    const token = sessionStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    const endpoint = this.$config.BULKAPPROVAL_ENDPOINT;

    try {
      const response = await axios.post(endpoint, { requests: payload }, { headers });
      if (response.status === 200) {
        console.log('Bulk approval request submitted successfully', response.data);
        this.$toast.open({
          message: 'Bulk approval request submitted successfully',
          type: 'success',
          duration: 3000,
        });
        this.fetchTransactions(); 
      } else {
        console.error('Error submitting bulk approval request:', response.statusText);
        this.$toast.open({
          message: `Error submitting bulk approval request: ${response.statusText}`,
          type: 'error',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error submitting bulk approval request', error);
      this.$toast.open({
        message: `Error submitting bulk approval request: ${error}`,
        type: 'error',
        duration: 3000,
      });
    }
  },

    CheckPaid(TransactionData){
      this.showPaidCard = true;
      this.finalCheckPaid = TransactionData;
    },

    CheckFalied(TransactionData){
      this.showFailCard = true;
      this.finalCheckFailed = TransactionData;
    },

    async CompleteTransaction() {
      this.spinnerloading = true;
      const token = sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
    try {
      // Use your HTTP client to fetch transactions from the endpoint
      const response = await axios.get(`${this.$config.COMPLETETRANSACTION_ENDPOINT}/${this.finalCheckPaid.RequestNo}`,{ headers });
      if (response.status === 200) {
        console.log('Transaction completed successfully', response.data);
      this.$toast.open({
        message: 'Transaction completed successfully',
        type: 'success',
        duration: 3000,
      });
      this.spinnerloading = false;
      this.tableData = this.tableData.filter(transaction => transaction.RequestNo !== this.finalCheckPaid.RequestNo);
      this.showPaidCard = false;
      try{
        this.fetchTransactionCounts();
      } catch(error){
        console.log(error);
      }
      } else {
        this.spinnerloading = false;
        console.error('Error completing transaction:');
      }
    } catch (error) {
      this.spinnerloading = false;
      console.error('Error completing transaction:', error);
      this.$toast.open({
        message: 'Error completing transaction',
        type: 'error',
        duration: 3000,
      });
    }
  },

    removeFile() {
    this.uploadedFile = null;
    const fileInput = this.$refs.fileInput;
    if (fileInput) {
      fileInput.value = '';
    }
  },

    handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.uploadedFile = selectedFile;
    }
  },

  handleAttachmentUpload() {
    const token = sessionStorage.getItem('token');
    this.spinnerloading = true;
  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  if(!this.uploadedFile){
      this.erroruploadMessage = 'Please upload evidence of failed transaction ';
    setTimeout(() => {
      this.erroruploadMessage = false;
    }, 3000);
    this.spinnerloading = false;
    return;
    }
    if (this.uploadedFile) {
      const formData = new FormData();
      formData.append('file', this.uploadedFile);
      
      // Assuming you are using some HTTP client library for making requests
      // Replace the following with your HTTP client logic
      axios.post(`${this.$config.FAILTRANSACTION_ENDPOINT}/${this.finalCheckFailed.RequestNo}`, formData,{ headers })
        .then(response => {
          console.log('Transaction updated successfully', response.data);
          this.$toast.open({
        message: 'Transaction updated successfully',
        type: 'success',
        duration: 3000,
      });
      this.spinnerloading = true;
      this.tableData = this.tableData.filter(transaction => transaction.RequestNo !== this.finalCheckFailed.RequestNo);
      this.showFailCard = false;
      try{
        this.fetchTransactionCounts();
      } catch(error){
        console.log(error);
      }
        
        })
        .catch(error => {
          console.error('Error adding attachment', error);
          // Handle error if needed
        });
    }
  },

    async fetchProducts() {
    try {
      const response = await axios.get(this.$config.GETINVESTMENTPRODUCT_ENDPOINT);
      this.products = response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },

    formatAmount(amount) {
const parsedAmount = parseFloat(amount);


if (isNaN(parsedAmount)) {
  console.error('Invalid amount:', amount);
  return ''; 
}


const roundedAmount = parsedAmount.toFixed(2);

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true 
});

return formatter.format(roundedAmount);
},

getBlobUrl(base64String) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  },

  async openDocument(PDFSrc) {
    const token = sessionStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    try {
      const response = await axios.get(`${this.$config.GETATTACHMENT_ENDPOINT}/${PDFSrc}`, { headers });
      this.pdfBlobUrl = this.getBlobUrl(response.data.attachmentsBase64);
      this.pdfsrc = response.data.attachmentsBase64;
    } catch (error) {
      console.error('Error fetching attachment:', error);
      this.$toast.open({
        message: 'Error opening Document, please try again later',
        type: 'error',
        duration: 3000,
      });
    }

    this.showDocument = true;
  },

  

  closeDocumentModal() {
    this.showDocument = false;
    this.pdfBlobUrl = '';
    // Release the Blob URL when the modal is closed
    URL.revokeObjectURL(this.pdfBlobUrl);
  },

 
  

    formatDate(dateTimeString) {
  const date = new Date(dateTimeString);
  const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits for day
  const month = date.toLocaleString('en-US', { month: 'short' }); // Get short month name
  const year = date.getFullYear().toString(); // Get full year

  // Concatenate day, month, and year with hyphens
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
},


    async getUsers() {
    try {
      const response = await axios.get(this.$config.GETAPPROVER_ENDPOINT);
      return response.data.users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users. Please try again later.');
    }
  },

    async setUserRoleInSession() {
try {
  const users = await this.getUsers();
  const loggedInUserId = this.UserId;
  console.log('Approval Users are: ', users);
  console.log('Logged in UserID is: ', loggedInUserId);

  // Find the user in the list
  const loggedInUser = users.find((user) => user.UserID == loggedInUserId);
  console.log('Logged in User is: ', loggedInUser);

  if (loggedInUser) {
    if (loggedInUser.IsRequester == 1) {
      this.moduleuserRole = 'Requester';
    } else if (loggedInUser.IsApprover1 == 1) {
      this.moduleuserRole = 'Approver1';
    } else if (loggedInUser.IsApprover2 == 1) {
      this.moduleuserRole = 'Approver2';
    } else if (loggedInUser.IsReviewer == 1) {
      this.moduleuserRole = 'Reviewer';
    } else {
      this.moduleuserRole = 'NotPermitted';
    }

    sessionStorage.setItem('moduleuserRole', this.moduleuserRole);
    console.log(`User role: ${this.moduleuserRole}`);
  } else {
    console.error('Logged-in user not found in the list.');
    // Set a default role for users not found
    this.moduleuserRole = 'Admin';
    sessionStorage.setItem('moduleuserRole', this.moduleuserRole);
  }
} catch (error) {
  console.error('Error fetching or processing user data:', error);
  // this.$toast.open({
  //   message: error.message || 'Failed to fetch or process user data.',
  //   type: 'error',
  //   duration: 3000,
  // });
}
},


    async fetchTransactions2() {
      const token = sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
    try {
      // Use your HTTP client to fetch transactions from the endpoint
      const response = await axios.get(this.$config.GETCOMPLETEDTRANSACTIONS_ENDPOINT,{ headers });
      if (response.status === 200) {
        this.allTransactions = response.data.transactions;
        this.filterTransactions();
      } else {
        console.error('Error fetching transactions:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }finally {
  this.isLoadingCard = false; // Set loading to false whether the request succeeds or fails
}
  },

  async fetchCompletedTransactions() {
      const token = sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
    try {
      // Use your HTTP client to fetch transactions from the endpoint
      const response = await axios.get(this.$config.GETCOMPLETEDTRANSACTIONS_ENDPOINT,{ headers });
      if (response.status === 200) {
        const allTransactions = response.data.transactions;
        this.allTransactions = allTransactions.filter(transaction => 
          transaction.ReviewerLevelStatus == 0 && 
          (transaction.ApprovalLevel1Status != 2 || transaction.ApprovalLevel2Status != 2) &&
          !(transaction.ApprovalLevel1Status == 2 && transaction.ApprovalLevel2Status == 0)
        );
                  this.filterTransactions();
      } else { 
        console.error('Error fetching transactions:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }finally {
  this.isLoadingCard = false; // Set loading to false whether the request succeeds or fails
}
  },

 

  selectTab(tab, tabName) {

this.selectedTab = tab;
this.selectedTabName = tabName;

},


    finalTransactionStatus() {
this.getRecords.forEach(record => {
  if (record.ApprovalLevel1Status === 1 && record.ApprovalLevel2Status === 1) {
    record.finalStatus = "Approved";
  } else if (record.ApprovalLevel1Status === 2 && record.ApprovalLevel2Status === 0) {
    record.finalStatus = "Rejected";
  } else if (record.ApprovalLevel1Status === 1 && record.ApprovalLevel2Status === 2) {
    record.finalStatus = "Rejected";
  }
});
},


    async fetchTransactionCounts() {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await axios.get(this.$config.GETTRANSACTIONCOUNT_ENDPOINT, { headers });
    if (response.status === 200) {
      this.transactionCounts = response.data.transactionCounts;
    } else {
      console.error('Error fetching transaction counts:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching transaction counts:', error);
  }
},


    closeTransactionCard(){
      this.showTransactionCard = false;
    },

    openTransactionCard(){
      this.showTransactionCard = true;
    },

    ViewTransaction(TransactionData){
      this.showTransactionCard = true;
      this.TransactionData = TransactionData;
    },

    updateTransaction(){
      this.tableData = this.tableData.filter(transaction => transaction.RequestNo !== this.TransactionData.RequestNo);
    },


    toggleAllSelections() {
    console.log('toggleAllSelections called');
    console.log('selectAll after toggle:', this.selectAll);
    this.tableData.forEach((row, index) => {
      row.selected = this.selectAll;
      console.log(`Row ${index} selected after toggle:`, row.selected);
    });
  },

    toggleHover() {
          this.hovered = !this.hovered;
        
      },

      togglePopup(row) {
        this.tableData.forEach(row => {
      row.showPopup = false;
    });
        console.log('popup clicked', row);
  // Check if the row already has the showPopup property
  if (!Object.prototype.hasOwnProperty.call(row, 'showPopup')) {
    // If not, add it with an initial value of false
    this.$set(row, 'showPopup', false);
  }
  // Toggle the showPopup value for the corresponding row
  row.showPopup = !row.showPopup;
},


  closePopups() {

    console.log('Close popup clicked');
    // Close all popups
    this.tableData.forEach(row => {
      row.showPopup = false;
    });
  },

    nextPage() {
  const totalPages = Math.ceil(this.totalRows / this.rowsPerPage);
  if (this.currentPage < totalPages) {
    this.currentPage++;
  }
},
prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
},


          initializeChart() {
        const ctx = document.getElementById('myChart');
        if (ctx) {
          const data = {
          labels: ['Approved', 'Rejected', 'Pending'],
          datasets: [
              {
              label: 'Value',
              data: [this.transactionCounts.ApprovedCount, this.transactionCounts.RejectedCount,this.transactionCounts.PendingCount], 
              backgroundColor: ['#8E1611','#FFBDBA','#E28D8A'],
              }
          ]
          };

          const options = {
            responsive: false,
            plugins: {
              legend: {
                position: 'bottom',
                align: 'center',
                labels: {
                  font: {
                  size: 10, 
                  },
                  boxWidth: 10,
              }
              },
              tooltip: {
              enabled: true,
              },
              title: {
                display: true,
              },
              labels: {
              display: true,
              font: {
                  size: 12,
              },
              formatter: function(value, context) {
                  return `${context.label}: ${value}`;
              }
              }
            },
          };


          // Destroy existing chart instance if any
          if (this.myChart) {
            this.myChart.destroy();
          }

          // Create new chart instance
          this.myChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options,
           
          });

          console.log(this.myChart);
        }
      },





    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    updateCalendar() {
      // Add logic to update your calendar based on selectedMonth and selectedYear
      console.log(`Selected Month: ${this.selectedMonth}, Selected Year: ${this.selectedYear}`);
    },

    hideDropdown() {
      this.showDropdown = false;
    },
  },
  
  };
  </script>

  <style>

@media (max-width: 900px) {

  .big-white-card-main {
    background-color: #FFF; /* White background color */
    margin: 0px 0px; /* Margin as needed */
    padding: 8px; /* Padding as needed */
    min-height: 500px;
    height: auto;
  }

  .calendar-dropdown {
  display: none;
  
}

.search-bar{
  display: none;
}

.attachment-button {
  background-color: transparent;
  color: #000;
  padding: 5px 10px;
  font-size: 10px;
  border-radius: 3px;
  cursor: pointer;
  width: 120px;
  height: 25px;
  border: 1px solid #32848F;
}

}

@media (min-width: 900px) {

  .attachment-button {
  background-color: transparent;
  color: #000;
  padding: 5px 10px;
  font-size: 10px;
  border-radius: 3px;
  cursor: pointer;
  width: 100px;
  height: 25px;
  border: 1px solid #32848F;
}

.big-white-card-main {
    background-color: #FFF; /* White background color */
    margin: 20px 40px; /* Margin as needed */
    padding: 20px; /* Padding as needed */
    min-height: 500px;
    height: auto;
  }

  .calendar-dropdown {
  border-radius: 5px;
  display: flex;
  margin-left: 40px;
  margin-top: 10px;
  font-size: 12px;
  height: 25px;
  
}
}



.dropdown-select {
  margin-right: 5px;
  border: 1px solid #8E1611;
  color: #000;
  text-align: center;
  border-radius: 3px;
  font-size: 12px;
  transition: border-color 0.3s ease-in-out;
}

.dropdown-select:hover {
  border-color: #510d0a; /* Green border on hover */
}

.dropdown-select::-webkit-scrollbar {
  width: 2px; /* Set the width of the scrollbar */
}

.dropdown-select::-webkit-scrollbar-thumb {
  background-color: #c6c5cb; /* Set the color of the scrollbar thumb */
  border-radius: 3px; /* Optional: Add rounded corners to the thumb */
}

.select-date-range{
    height: 25px;
    width: auto;
    padding: 5px;
    background-color: #8E1611;
    color: #fff;
    font-size: 11px;
    border-radius: 3px;
    cursor: pointer;
  }

  .apply-button{
    height: 25px;
    width: auto;
    padding: 5px;
    background-color: #8E1611;
    color: #fff;
    font-size: 11px;
    border-radius: 3px;
    margin-left: 5px;
    cursor: pointer;
  }

</style>
  

  