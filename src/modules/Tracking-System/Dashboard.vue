<template>
  <dashboard-layout>

    <template v-if="fetchDataLoading">
      <div class="big-white-card2">
        <div class="loader-container" v-if="isLoadingData">
          <div class="center-content3">
            <div style="margin-bottom: 250px; font-size: 12px; color: #000;">
        <center><div class="loader2" style="margin-bottom: 15px;"></div></center>
        <p v-if="loadingText === 'Fetching Records'">Fetching Transactions...</p>
        <p v-else-if="loadingText === 'Please Wait'">Please Wait...</p>
        <p  v-else-if="loadingText === 'Fetching Documents'">Fetching Documents...</p>
        <p  v-else>Please wait...</p>
      </div>
    </div>
      </div>
      </div>
          </template>
          <template v-else>
            <div v-if="moduleuserRole !== 'Requester' && moduleuserRole !== 'Approver1' && moduleuserRole !== 'Approver2' && moduleuserRole !== 'Reviewer' && userRole !== 'Admin'">
              <div class="big-white-card2"></div>
            <div v-if="moduleuserRole !== 'Requester' && moduleuserRole !== 'Approver1' && moduleuserRole !== 'Approver2' && moduleuserRole !== 'Reviewer' && userRole !== 'Admin'" class="modal-overlay">
            <Modal class="custom-modal custom-modal-width">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                   
                  </div>

                  <div class="modal-body modal-text">
                    Sorry!! You currently do not have enough permission to view this page.<br>Please contact the system administrator....
                  </div>
                  <div class="modal-footer">
                    <router-link to="/dashboard" class="logout-button">Ok</router-link>
                  </div>
                </div>
              </div>
            </Modal>
                </div>
              </div>
                <div v-else>
        <div class="dashboard-section-header" style="display: flex;   margin-bottom: 15px; justify-content: space-between">
     

      <div class="dashboard-tabs">
        <div > 
          <div class="tab-buttons-container" style="display: flex; justify-content: space-between">
      <div class="tab-buttons-head">
        <button
          :class="{ activeTab: selectedHeadTab === 'today' }"
          @click="selectHeadTab('today')"
        >
          <div style="display: flex; white-space: nowrap;">Today</div>
        </button>

        <button
          :class="{ activeTab: selectedHeadTab === 'thisWeek' }"
          @click="selectHeadTab('thisWeek')"
        >
          <div style="display: flex; white-space: nowrap;">This Week</div>
        </button>

        <button
          :class="{ activeTab: selectedHeadTab === 'thisMonth' }"
          @click="selectHeadTab('thisMonth')"
        >
          <div style="display: flex; white-space: nowrap;">This Month</div>
        </button>

      </div>
    </div>

    </div>
  </div>

  <div style="font-size: 12px; color: #000; font-weight: bold; display: flex;">
            <img class="custom-icon" src="@/components/img/Main_Assests/roleIcon.svg" alt="Custom Icon">
            <div class="role-indicator">{{moduleuserRole}}</div></div>
</div>

        <div class="dashboard-section">
          
          <div class="main-section">
            <div class="dashboard-section-body">
      <swiper
        v-if="isMobile"
        :slides-per-view="1"
        @slideChange="onSlideChange"
        ref="mySwiper"
        class="mySwiper"
      >
        <swiper-slide>
          <div class="dashboard-section-body-card">
            <span class="card3-header">
              <div class="card-writeup">Approved Transactions</div>
              <img src="@/components/img/Main_Assests/CardIconApproved.svg" alt="Custom Icon" class="custom-icon-2" style="height: 17px;">
            </span>
            <div class="card-data">{{ transactionCounts.ApprovedCount }}</div>
            <div class="card-label1">
              <img src="@/components/img/Main_Assests/label-icon.svg" alt="Custom Icon" class="custom-icon2">
              Total Approved Transactions
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="dashboard-section-body-card">
            <span class="card3-header">
              <div class="card-writeup">Rejected Transactions</div>
              <img src="@/components/img/Main_Assests/CardIconRejected.svg" alt="Custom Icon" class="custom-icon-2" style="height: 17px;">
            </span>
            <div class="card-data">{{ transactionCounts.RejectedCount }}</div>
            <div class="card-label2">
              <img src="@/components/img/Main_Assests/label-icon2.svg" alt="Custom Icon" class="custom-icon2">
              Total Rejected Transactions
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="dashboard-section-body-card">
            <span class="card3-header">
              <div v-if="moduleuserRole != 'Approver1' && moduleuserRole != 'Approver2'" class="card-writeup">Pending Transactions</div>
              <div v-else-if="moduleuserRole == 'Approver1'" class="card-writeup">Awaiting Level(1) Approval</div>
              <div v-else-if="moduleuserRole == 'Approver2'" class="card-writeup">Awaiting Level(2) Approval</div>
              <img src="@/components/img/Main_Assests/CardIconPending.svg" alt="Custom Icon" class="custom-icon-2" style="height: 17px;">
            </span>
            <div v-if="moduleuserRole != 'Approver1' && moduleuserRole != 'Approver2'" class="card-data">{{ transactionCounts.PendingCount }}</div>
          <div v-else-if="moduleuserRole == 'Approver1'" class="card-data">{{ Apv1tableData.length + Apv1tableData2.length }}</div>
          <div v-else-if="moduleuserRole == 'Approver2'" class="card-data">{{ Apv2tableData.length + Apv2tableData2.length }}</div>
         
          <div  class="card-label3">
            <img src="@/components/img/Main_Assests/label-icon3.svg" alt="Custom Icon" class="custom-icon2">
            Total Pending Transactions
          </div>
          <!-- <div v-else class="card-label4">
            <router-link to="/tracking-system/view" style="color: #000; text-decoration: none;">
            <img src="@/components/img/Main_Assests/label-icon3.svg" alt="Custom Icon" class="custom-icon2"> 
            <div style="display: flex;">Total Awaiting Level(1) Approval: <div class="APV1-indicator"><center>{{LV1Data.length}}</center></div>
          </div> 
            </router-link>
          </div> -->
          </div>
        </swiper-slide>
      </swiper>

    <div v-if="isMobile" class="pagination-container">
      <span
          v-for="(card, index) in cards"
          :key="index"
          :class="['pagination-bullet', { active: currentSlide === index }]"
          @click="goToSlide(index)"
        ></span>
      </div> 


      <div v-else class="dashboard-section-body-item">
        <div class="dashboard-section-body-card">
          <span class="card3-header">
            <div class="card-writeup">Approved Transactions</div>
            <img src="@/components/img/Main_Assests/CardIconApproved.svg" alt="Custom Icon" class="custom-icon-2">
          </span>
          <div class="card-data">{{ transactionCounts.ApprovedCount }}</div>
          <div class="card-label1">
            <img src="@/components/img/Main_Assests/label-icon.svg" alt="Custom Icon" class="custom-icon2">
            Total Approved Transactions
          </div>
        </div>
        <div class="dashboard-section-body-card">
          <span class="card3-header">
            <div class="card-writeup">Rejected Transactions</div>
            <img src="@/components/img/Main_Assests/CardIconRejected.svg" alt="Custom Icon" class="custom-icon-2">
          </span>
          <div class="card-data">{{ transactionCounts.RejectedCount }}</div>
          <div class="card-label2">
            <img src="@/components/img/Main_Assests/label-icon2.svg" alt="Custom Icon" class="custom-icon2">
            Total Rejected Transactions
          </div>
        </div>
        <div class="dashboard-section-body-card">
          <span class="card3-header">
            <div v-if="moduleuserRole != 'Approver1' && moduleuserRole != 'Approver2'" class="card-writeup">Pending Transactions</div>
              <div v-else-if="moduleuserRole == 'Approver1'" class="card-writeup">Awaiting Level(1) Approval</div>
              <div v-else-if="moduleuserRole == 'Approver2'" class="card-writeup">Awaiting Level(2) Approval</div>
            <img src="@/components/img/Main_Assests/CardIconPending.svg" alt="Custom Icon" class="custom-icon-2">
          </span>
          <div v-if="moduleuserRole != 'Approver1' && moduleuserRole != 'Approver2'" class="card-data">{{ transactionCounts.PendingCount }}</div>
          <div v-else-if="moduleuserRole == 'Approver1'" class="card-data">{{ Apv1tableData.length + Apv1tableData2.length }}</div>
          <div v-else-if="moduleuserRole == 'Approver2'" class="card-data">{{ Apv2tableData.length + Apv2tableData2.length }}</div>

          <div class="card-label3">
            <img src="@/components/img/Main_Assests/label-icon3.svg" alt="Custom Icon" class="custom-icon2">
            Total Pending Transactions
          </div>
          <!--<div v-else class="card-label4">
            <router-link to="/tracking-system/view" style="color: #000; text-decoration: none;">
            <img src="@/components/img/Main_Assests/label-icon3.svg" alt="Custom Icon" class="custom-icon2">
            <div style="display: flex;">Total Awaiting Level(1) Approval: <div class="APV1-indicator"><center>{{LV1Data.length}}</center></div>
          </div>
            </router-link>
          </div> -->
        </div>
      </div>
    </div>
        </div>
      </div>

      <div class="dashboard-container">
      <div class="left-section2">
        <div class="big-white-card-left">
      <div class="table-divider">
        <div > 
          <div class="tab-buttons-container" style="display: flex; justify-content: space-between">
      <div class="tab-buttons">
        <button
          :class="{ activeTab: selectedTab === 'pending' }"
          @click="selectTab('pending')"
        >
          <div style="display: flex; white-space: nowrap;"> All Pending 
            <div v-if="tableData.length != 0 && moduleuserRole == 'Approver1'" class="count-indicator">{{ Apv1tableData.length }}</div>
            <div v-else-if="tableData.length != 0 && moduleuserRole == 'Approver2'" class="count-indicator">{{ Apv2tableData.length }}</div>
            <div v-else-if="tableData.length != 0 && moduleuserRole == 'Reviewer' && !ReviewerViewingPending" class="count-indicator">{{ RVWtableData.length }}</div>
            <div v-else-if="tableData.length != 0 && moduleuserRole != 'Approver1' && moduleuserRole != 'Approver2'  && moduleuserRole != 'Reviewer' || ReviewerViewingPending" class="count-indicator">{{ allTransactions.length }}</div>
          
          </div>
        </button>
        <button
          :class="{ activeTab: selectedTab === 'reinitiated' }"
          @click="selectTab('reinitiated')"
        >
          <div style="display: flex; white-space: nowrap;"> Re-Initiated 
            <div v-if="tableData.length != 0 && moduleuserRole == 'Approver1'" class="count-indicator">{{ Apv1tableData2.length }}</div>
            <div v-else-if="tableData.length != 0 && moduleuserRole == 'Approver2'" class="count-indicator">{{ Apv2tableData2.length }}</div>
            <div v-else-if="tableData.length != 0 && moduleuserRole == 'Reviewer' && !ReviewerViewingPending" class="count-indicator">{{ RVWtableData2.length }}</div>
            <div v-else-if="tableData.length != 0 && moduleuserRole == 'Requester' || ReviewerViewingPending " class="count-indicator">{{ AllReprocesed.length }}</div>
          
          </div>
        </button>


        <button v-for="product in products" :key="product.ProductID" @click="selectTab(product.ProductID, product.ProductName)" :class="{ activeTab: selectedTab === product.ProductID }">
      {{ product.ProductID }}
    </button>

      </div>
      <div>
      </div>
       <!-- Refresh Button-->
       <div  v-if="!isMobile" class="button-container" style="height: 35px; ">
        <button class="onboard-button4" @click="refreshTable">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i>
              </span>
              <span v-else> <img src="@/components/img/Main_Assests/refresh.svg" alt="Refresh Icon"></span>
          Refresh</button>
      </div>
    </div>

    </div>
  </div>
  <center><div v-if="showSuccessMessage" style="font-size: 12px;" class="alert alert-success" role="alert">
          {{ successMessage }}
        </div></center>

        <center><div v-if="showErrorMessage" style="font-size: 12px;" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div></center>

    
      <div v-if="selectedTab === 'pending' || selectedTab === 'reinitiated'">
        <div class="horizontal-container">
          
          <div style="display: flex; justify-content: space-between;">

      <div  v-if="!isMobile" style="display: flex;">
      <!-- Dropdown -->

      <div v-if="moduleuserRole != 'Requester'  && moduleuserRole != 'Reviewer' && !isMobile" class="dropdown-container">
            <select
              id="cardSwitch"
              class="form-control"
              v-model="cardSwitch"
              ref="dropdown1"
              @change="handleCardSwitch"
              style="font-size: 12px; background-color: transparent;  cursor: pointer; z-index: 2; width: 130px; height: 35px;  color: #000; font-size: 13px; border: 1px solid #D1D5DB;"
            >
              <option value="Select Action" selected disabled>Select Action</option>
              <option value="Single">Single Approval</option>
              <option value="Bulk Approval">Bulk Approval</option>
            </select>
            <div class="dropdown-icon-container" >
              <img src="@/components/img/Main_Assests/dropdown.svg" alt="Dropdown Icon" @click="toggleDropdown">
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
        

           

        </div>

        <div v-if="moduleuserRole == 'Reviewer'" class="tab-buttons-head2 mb-2">
              <button
                :class="{ activeTab: selectedReviwerTab === 'Approved' }"
                @click="selectReviewerTab('Approved')"
              >
                <div style="display: flex; white-space: nowrap;">Approved Transactions</div>
              </button>

              <button
                :class="{ activeTab: selectedReviwerTab === 'Awaiting' }"
                @click="selectReviewerTab('Awaiting')"
              >
                <div style="display: flex; white-space: nowrap;">Awaiting Approval</div>
              </button>

            </div>

            <router-link v-if="moduleuserRole == 'Approver2'" class="tab-buttons-head2 mb-2" to="/tracking-system/view">
              <button style="background-color: #8E1611; color: #fff;">
                <div style="display: flex; white-space: nowrap;">View Awaiting Level(1) Transactions</div>
              </button>

            </router-link>
        
      <hr v-if="isMobile && moduleuserRole == 'Reviewer'">



    </div>
    <hr v-if="isMobile && moduleuserRole == 'Reviewer'">
    <div v-if="isMobile" class="mb-2" style="font-size: 13px; font-weight: bold; color: #000; margin-top: 0px; margin-left: 15px;">
      <div style="display: flex;">
  Total Request Amount: <div class="sum-total ml-2">₦{{ formatAmount(TotalRequestAmount) }}</div>
  </div>
  

  <!-- <div class="search-bar mt-3" style="margin-left: 180px;  max-width: 300px;">
      <div class="search-icon ">
        <img src="@/components/img/Main_Assests/Search.svg" alt="Search Icon" style="padding-right: 15px;">
      </div>
      <input type="text" class="form-control ml-1" v-model="searchTerm"  style="width: 180px; height: 36px; color:#000; font-size: 13px; border: 1px solid #D1D5DB;" placeholder="  Search here...">
    </div> -->
</div>
    <hr v-if="!isMobile ">
    <div v-if="!isMobile" style="font-size: 13px; font-weight: bold; color: #000; display: flex; margin-bottom: 15px;">
  Total Request Amount: <div class="sum-total ml-2">₦{{ formatAmount(TotalRequestAmount) }}</div>
</div>
<!-- <hr v-if="!isMobile && moduleuserRole == 'Reviewer'"> -->

    <div class="custom-table-container" :key="currentPage">
      
      <table class="custom-table2">
        <thead>
          <tr v-if="!isMobile">
            <th v-if="cardSwitch == 'Bulk Approval'">
              <span style="font-size: 14px; display: inline; white-space: nowrap;"> 
                <center><input type="checkbox" style="padding-top: 10px;" v-model="selectAll" @change="toggleAllSelections"> Select All </center></span>
            </th>
            <th>Date</th>
            <th style="white-space: nowrap;">Client Name</th>
            <th>InstructionNo</th>
            <th>Amount</th>
            <th v-if="moduleuserRole == 'Requester' || ReviewerViewingPending">Level(1)Status</th>
          <th v-if="moduleuserRole == 'Requester' || ReviewerViewingPending">Level(2)Status</th>
            <th v-if="moduleuserRole != 'Requester' && !ReviewerViewingPending">Status</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredRows.length === 0">
        <tr>
          <td colspan="8" style="text-align: center;">No Pending Transactions</td>
        </tr>
      </template>
          <template v-else-if="searchTerm && filteredRows.length > 0">
          <tr v-for="(transactions, index) in filteredRows" @click="ViewTransaction(transactions, index)" :key="transactions.instructionNo" class="table-row">
            <td v-if="cardSwitch == 'Bulk Approval'" @click.stop><center>
              <div class="custom-control custom-checkbox small">
              <input type="checkbox" class="custom-control-input" :id="'customCheck' + index" v-model="transactions.selected"  @click.stop>
              <label class="custom-control-label small-text" :for="'customCheck' + index"></label>
            </div>
          </center>
            </td>
            <td v-if="!isMobile"  style="white-space: nowrap;">{{ formatDate(transactions.RequestDate) }}</td>

            <td style="white-space: nowrap;"><div v-if="isMobile" style="font-weight: bold;">
              Client Name</div>{{ transactions.ClientName }}
              <div v-if="isMobile" style="font-weight: bold; color: green; font-size: 10px;">
              InstructionNo: {{ transactions.RequestNo }}</div>

              <div v-if="moduleuserRole == 'Requester' && isMobile || ReviewerViewingPending && isMobile " style="display: flex">
            <div v-if="transactions.ApprovalLevel1Status == 0">
              <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(1)Status: </div>
              <div class="pending-indicator2"><center>Pending</center></div>
          </div>
          <div v-if="transactions.ApprovalLevel1Status == 1">
            <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(1)Status: </div>
            <div class="approved-indicator"><center>Approved</center></div>
          </div>
            </div>

        <div v-else-if="moduleuserRole != 'Requester' && isMobile || ReviewerViewingPending && isMobile">
              <div v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'">
                <div class="mt-1 ml-1"  style="font-weight: bold;">Status</div>
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="moduleuserRole == 'Reviewer' && !ReviewerViewingPending">
              <div class="mt-1 ml-2" style="font-weight: bold;">Status</div>
              <div class="approved-indicator"><center>Approved</center></div>
            </div>
          </div>
            </td>

            <td v-if="!isMobile" style="color: green; font-weight: bold; white-space: nowrap;">{{ transactions.RequestNo }}</td>
            
            <td><div v-if="isMobile" style="font-weight: bold;">Amount</div>₦{{ formatAmount(transactions.Amount) }}
            <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
              Date: {{ formatDate(transactions.RequestDate) }}</div>
              <div v-if="moduleuserRole == 'Requester' && isMobile || ReviewerViewingPending && isMobile">
            <div v-if="transactions.ApprovalLevel2Status == 0">
              <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(2)Status</div>
            <div class="pending-indicator2"><center>Pending</center></div>
          </div>
          <div v-if="transactions.ApprovalLevel2Status == 1">
            <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(2)Status</div>
            <div class="approved-indicator"><center>Approved</center></div>
          </div>
              </div>
              <div v-else-if="moduleuserRole != 'Requester' && isMobile">
                <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
              Product: {{ transactions.InvestmentProduct }}</div>
              </div>
            </td>

            <td v-if="moduleuserRole == 'Requester' && !isMobile || ReviewerViewingPending && !isMobile">
            <div v-if="transactions.ApprovalLevel1Status == 0">
              <center><div class="pending-indicator2"><center>Pending</center></div></center>
          </div>
          <div v-if="transactions.ApprovalLevel1Status == 1">
            <center><div class="approved-indicator"><center>Approved</center></div></center>
          </div>
          </td>

          <td v-if="moduleuserRole == 'Requester' && !isMobile || ReviewerViewingPending && !isMobile">
            <div v-if="transactions.ApprovalLevel2Status == 0">
            <div class="pending-indicator2"><center>Pending</center></div>
          </div>
          <div v-if="transactions.ApprovalLevel2Status == 1">
            <div class="approved-indicator"><center>Approved</center></div>
          </div>
          </td>

            <td v-if="moduleuserRole != 'Requester' && !isMobile && !ReviewerViewingPending ">
              <div v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2' || moduleuserRole == 'Requester'">
                <div v-if="isMobile" style="font-weight: bold;"><center>Status</center></div>
              <div class="pending-indicator"><center>Pending</center></div>
            </div>
            <div v-if="moduleuserRole == 'Reviewer' && !ReviewerViewingPending">
              <div v-if="isMobile" style="font-weight: bold;"><center>Status</center></div>
              <div class="approved-indicator"><center>Approved</center></div>
            </div>
            </td>
            <td v-if="!isMobile">{{ transactions.InvestmentProduct }}</td>

         </tr>
          </template>
          <template v-else>
            <tr v-for="(transactions, index) in visibleRows" :key="transactions.instructionNo" @click="ViewTransaction(transactions, index)" :class="{ 'selected-row': selectedRow === index }" class="table-row">
            <td v-if="cardSwitch == 'Bulk Approval'" @click.stop><center>
              <div class="custom-control custom-checkbox small">
              <input type="checkbox" class="custom-control-input" :id="'customCheck' + index" v-model="transactions.selected"  @click.stop>
              <label class="custom-control-label small-text" :for="'customCheck' + index"></label>
            </div>
          </center>
            </td>
            <td v-if="!isMobile"  style="white-space: nowrap;">{{ formatDate(transactions.RequestDate) }}</td>

            <td style="white-space: nowrap;"><div v-if="isMobile" style="font-weight: bold;">
              Client Name</div>{{ transactions.ClientName }}
              <div v-if="isMobile" style="font-weight: bold; color: green; font-size: 10px;">
              InstructionNo: {{ transactions.RequestNo }}</div>

              <div v-if="moduleuserRole == 'Requester' && isMobile || ReviewerViewingPending && isMobile " style="display: flex">
            <div v-if="transactions.ApprovalLevel1Status == 0">
              <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(1)Status: </div>
              <div class="pending-indicator2"><center>Pending</center></div>
          </div>
          <div v-if="transactions.ApprovalLevel1Status == 1">
            <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(1)Status: </div>
            <div class="approved-indicator"><center>Approved</center></div>
          </div>
            </div>

        <div v-else-if="moduleuserRole != 'Requester' && isMobile || ReviewerViewingPending && isMobile">
              <div v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'">
                <div class="mt-1 ml-1"  style="font-weight: bold;">Status</div>
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="moduleuserRole == 'Reviewer' && !ReviewerViewingPending">
              <div class="mt-1 ml-2" style="font-weight: bold;">Status</div>
              <div class="approved-indicator"><center>Approved</center></div>
            </div>
          </div>
            </td>

            <td v-if="!isMobile" style="color: green; font-weight: bold; white-space: nowrap;">{{ transactions.RequestNo }}</td>
            
            <td><div v-if="isMobile" style="font-weight: bold;">Amount</div>₦{{ formatAmount(transactions.Amount) }}
            <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
              Date: {{ formatDate(transactions.RequestDate) }}</div>
              <div v-if="moduleuserRole == 'Requester' && isMobile || ReviewerViewingPending && isMobile">
            <div v-if="transactions.ApprovalLevel2Status == 0">
              <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(2)Status</div>
            <div class="pending-indicator2"><center>Pending</center></div>
          </div>
          <div v-if="transactions.ApprovalLevel2Status == 1">
            <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(2)Status</div>
            <div class="approved-indicator"><center>Approved</center></div>
          </div>
              </div>
              <div v-else-if="moduleuserRole != 'Requester' && isMobile">
                <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
              Product: {{ transactions.InvestmentProduct }}</div>
              </div>
            </td>

            <td v-if="moduleuserRole == 'Requester' && !isMobile || ReviewerViewingPending && !isMobile">
            <div v-if="transactions.ApprovalLevel1Status == 0">
              <center><div class="pending-indicator2"><center>Pending</center></div></center>
          </div>
          <div v-if="transactions.ApprovalLevel1Status == 1">
            <center><div class="approved-indicator"><center>Approved</center></div></center>
          </div>
          </td>

          <td v-if="moduleuserRole == 'Requester' && !isMobile || ReviewerViewingPending && !isMobile">
            <div v-if="transactions.ApprovalLevel2Status == 0">
            <div class="pending-indicator2"><center>Pending</center></div>
          </div>
          <div v-if="transactions.ApprovalLevel2Status == 1">
            <div class="approved-indicator"><center>Approved</center></div>
          </div>
          </td>

            <td v-if="moduleuserRole != 'Requester' && !isMobile && !ReviewerViewingPending">
              <div v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2' || moduleuserRole == 'Requester'">
                <div v-if="isMobile" style="font-weight: bold;"><center>Status</center></div>
              <div class="pending-indicator"><center>Pending</center></div>
            </div>
            <div v-if="moduleuserRole == 'Reviewer' && !ReviewerViewingPending">
              <div v-if="isMobile" style="font-weight: bold;"><center>Status</center></div>
              <div class="approved-indicator"><center>Approved</center></div>
            </div>
            </td>
            <td v-if="!isMobile">{{ transactions.InvestmentProduct }}</td>

          </tr>
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
          
          <div style="display: flex; justify-content: space-between;">

      <div  v-if="!isMobile" style="display: flex;">
      <!-- Dropdown -->

      <div v-if="moduleuserRole != 'Requester'  && moduleuserRole != 'Reviewer' && !isMobile" class="dropdown-container">
            <select
              id="cardSwitch"
              class="form-control"
              v-model="cardSwitch"
              ref="dropdown1"
              @change="handleCardSwitch"
              style="font-size: 12px; background-color: transparent;  cursor: pointer; z-index: 2; width: 130px; height: 35px;  color: #000; font-size: 13px; border: 1px solid #D1D5DB;"
            >
              <option value="Select Action" selected disabled>Select Action</option>
              <option value="Single">Single Approval</option>
              <option value="Bulk Approval">Bulk Approval</option>
            </select>
            <div class="dropdown-icon-container" >
              <img src="@/components/img/Main_Assests/dropdown.svg" alt="Dropdown Icon" @click="toggleDropdown">
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
        

           

        </div>

        <div v-if="moduleuserRole == 'Reviewer'" class="tab-buttons-head2 mb-2">
              <button
                :class="{ activeTab: selectedReviwerTab === 'Approved' }"
                @click="selectReviewerTab('Approved')"
              >
                <div style="display: flex; white-space: nowrap;">Approved Transactions</div>
              </button>

              <button
                :class="{ activeTab: selectedReviwerTab === 'Awaiting' }"
                @click="selectReviewerTab('Awaiting')"
              >
                <div style="display: flex; white-space: nowrap;">Awaiting Approval</div>
              </button>

            </div>
        
      <hr v-if="isMobile && moduleuserRole == 'Reviewer'">



    </div>
    <div v-if="isMobile && moduleuserRole != 'Reviewer'" class="mb-2" style="font-size: 13px; font-weight: bold; color: #000; margin-top: 0px; margin-left: 15px;">
      <div style="display: flex;">
  Total Request Amount: <div class="sum-total ml-2">₦{{ formatAmount(TotalRequestAmount) }}</div>
  </div>

  <!-- <div class="search-bar mt-3" style="margin-left: 180px;  max-width: 300px;">
      <div class="search-icon ">
        <img src="@/components/img/Main_Assests/Search.svg" alt="Search Icon" style="padding-right: 15px;">
      </div>
      <input type="text" class="form-control ml-1" v-model="searchTerm"  style="width: 180px; height: 36px; color:#000; font-size: 13px; border: 1px solid #D1D5DB;" placeholder="  Search here...">
    </div> -->
</div>
    <hr v-if="!isMobile && moduleuserRole != 'Reviewer'">
    <div v-if="!isMobile && moduleuserRole != 'Reviewer'" style="font-size: 13px; font-weight: bold; color: #000; display: flex; margin-bottom: 15px;">
  Total Request Amount: <div class="sum-total ml-2">₦{{ formatAmount(TotalRequestAmount) }}</div>
</div>

<div class="custom-table-container" :key="currentPage">
      
      <table class="custom-table2">
        <thead>
          <tr v-if="!isMobile">
            <th v-if="cardSwitch == 'Bulk Approval'">
              <span style="font-size: 14px; display: inline; white-space: nowrap;"> 
                <center><input type="checkbox" style="padding-top: 10px;" v-model="selectAll" @change="toggleAllSelections"> Select All </center></span>
            </th>
            <th>Date</th>
            <th style="white-space: nowrap;">Client Name</th>
            <th>InstructionNo</th>
            <th>Amount</th>
            <th v-if="moduleuserRole == 'Requester' || ReviewerViewingPending">Level(1)Status</th>
          <th v-if="moduleuserRole == 'Requester' || ReviewerViewingPending">Level(2)Status</th>
            <th v-if="moduleuserRole != 'Requester' && !ReviewerViewingPending">Status</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredRows.length === 0">
        <tr>
          <td colspan="8" style="text-align: center;">No Pending Transactions</td>
        </tr>
      </template>
          <template v-else-if="searchTerm && filteredRows.length > 0">
          <tr v-for="(transactions, index) in filteredRows" @click="ViewTransaction(transactions, index)" :key="transactions.instructionNo" class="table-row">
            <td v-if="cardSwitch == 'Bulk Approval'" @click.stop><center>
              <div class="custom-control custom-checkbox small">
              <input type="checkbox" class="custom-control-input" :id="'customCheck' + index" v-model="transactions.selected"  @click.stop>
              <label class="custom-control-label small-text" :for="'customCheck' + index"></label>
            </div>
          </center>
            </td>
            <td v-if="!isMobile"  style="white-space: nowrap;">{{ formatDate(transactions.RequestDate) }}</td>

            <td style="white-space: nowrap;"><div v-if="isMobile" style="font-weight: bold;">
              Client Name</div>{{ transactions.ClientName }}
              <div v-if="isMobile" style="font-weight: bold; color: green; font-size: 10px;">
              InstructionNo: {{ transactions.RequestNo }}</div>

              <div v-if="moduleuserRole == 'Requester' && isMobile || ReviewerViewingPending && isMobile " style="display: flex">
            <div v-if="transactions.ApprovalLevel1Status == 0">
              <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(1)Status: </div>
              <div class="pending-indicator2"><center>Pending</center></div>
          </div>
          <div v-if="transactions.ApprovalLevel1Status == 1">
            <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(1)Status: </div>
            <div class="approved-indicator"><center>Approved</center></div>
          </div>
            </div>

        <div v-else-if="moduleuserRole != 'Requester' && isMobile || ReviewerViewingPending && isMobile">
              <div v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'">
                <div class="mt-1 ml-1"  style="font-weight: bold;">Status</div>
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="moduleuserRole == 'Reviewer' && !ReviewerViewingPending">
              <div class="mt-1 ml-2" style="font-weight: bold;">Status</div>
              <div class="approved-indicator"><center>Approved</center></div>
            </div>
          </div>
            </td>

            <td v-if="!isMobile" style="color: green; font-weight: bold; white-space: nowrap;">{{ transactions.RequestNo }}</td>
            
            <td><div v-if="isMobile" style="font-weight: bold;">Amount</div>₦{{ formatAmount(transactions.Amount) }}
            <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
              Date: {{ formatDate(transactions.RequestDate) }}</div>
              <div v-if="moduleuserRole == 'Requester' && isMobile || ReviewerViewingPending && isMobile">
            <div v-if="transactions.ApprovalLevel2Status == 0">
              <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(2)Status</div>
            <div class="pending-indicator2"><center>Pending</center></div>
          </div>
          <div v-if="transactions.ApprovalLevel2Status == 1">
            <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(2)Status</div>
            <div class="approved-indicator"><center>Approved</center></div>
          </div>
              </div>
              <div v-else-if="moduleuserRole != 'Requester' && isMobile">
                <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
              Product: {{ transactions.InvestmentProduct }}</div>
              </div>
            </td>

            <td v-if="moduleuserRole == 'Requester' && !isMobile || ReviewerViewingPending && !isMobile">
            <div v-if="transactions.ApprovalLevel1Status == 0">
              <center><div class="pending-indicator2"><center>Pending</center></div></center>
          </div>
          <div v-if="transactions.ApprovalLevel1Status == 1">
            <center><div class="approved-indicator"><center>Approved</center></div></center>
          </div>
          </td>

          <td v-if="moduleuserRole == 'Requester' && !isMobile || ReviewerViewingPending && !isMobile">
            <div v-if="transactions.ApprovalLevel2Status == 0">
            <div class="pending-indicator2"><center>Pending</center></div>
          </div>
          <div v-if="transactions.ApprovalLevel2Status == 1">
            <div class="approved-indicator"><center>Approved</center></div>
          </div>
          </td>

            <td v-if="moduleuserRole != 'Requester' && !isMobile && !ReviewerViewingPending ">
              <div v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2' || moduleuserRole == 'Requester'">
                <div v-if="isMobile" style="font-weight: bold;"><center>Status</center></div>
              <div class="pending-indicator"><center>Pending</center></div>
            </div>
            <div v-if="moduleuserRole == 'Reviewer' && !ReviewerViewingPending">
              <div v-if="isMobile" style="font-weight: bold;"><center>Status</center></div>
              <div class="approved-indicator"><center>Approved</center></div>
            </div>
            </td>
            <td v-if="!isMobile">{{ transactions.InvestmentProduct }}</td>

         </tr>
          </template>
          <template v-else>
            <tr v-for="(transactions, index) in visibleRows" :key="transactions.instructionNo" @click="ViewTransaction(transactions, index)" :class="{ 'selected-row': selectedRow === index }" class="table-row">
            <td v-if="cardSwitch == 'Bulk Approval'" @click.stop><center>
              <div class="custom-control custom-checkbox small">
              <input type="checkbox" class="custom-control-input" :id="'customCheck' + index" v-model="transactions.selected"  @click.stop>
              <label class="custom-control-label small-text" :for="'customCheck' + index"></label>
            </div>
          </center>
            </td>
            <td v-if="!isMobile"  style="white-space: nowrap;">{{ formatDate(transactions.RequestDate) }}</td>

            <td style="white-space: nowrap;"><div v-if="isMobile" style="font-weight: bold;">
              Client Name</div>{{ transactions.ClientName }}
              <div v-if="isMobile" style="font-weight: bold; color: green; font-size: 10px;">
              InstructionNo: {{ transactions.RequestNo }}</div>

              <div v-if="moduleuserRole == 'Requester' && isMobile || ReviewerViewingPending && isMobile " style="display: flex">
            <div v-if="transactions.ApprovalLevel1Status == 0">
              <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(1)Status: </div>
              <div class="pending-indicator2"><center>Pending</center></div>
          </div>
          <div v-if="transactions.ApprovalLevel1Status == 1">
            <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(1)Status: </div>
            <div class="approved-indicator"><center>Approved</center></div>
          </div>
            </div>

        <div v-else-if="moduleuserRole != 'Requester' && isMobile || ReviewerViewingPending && isMobile">
              <div v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'">
                <div class="mt-1 ml-1"  style="font-weight: bold;">Status</div>
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="moduleuserRole == 'Reviewer' && !ReviewerViewingPending">
              <div class="mt-1 ml-2" style="font-weight: bold;">Status</div>
              <div class="approved-indicator"><center>Approved</center></div>
            </div>
          </div>
            </td>

            <td v-if="!isMobile" style="color: green; font-weight: bold; white-space: nowrap;">{{ transactions.RequestNo }}</td>
            
            <td><div v-if="isMobile" style="font-weight: bold;">Amount</div>₦{{ formatAmount(transactions.Amount) }}
            <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
              Date: {{ formatDate(transactions.RequestDate) }}</div>
              <div v-if="moduleuserRole == 'Requester' && isMobile || ReviewerViewingPending && isMobile">
            <div v-if="transactions.ApprovalLevel2Status == 0">
              <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(2)Status</div>
            <div class="pending-indicator2"><center>Pending</center></div>
          </div>
          <div v-if="transactions.ApprovalLevel2Status == 1">
            <div class="mt-1" style="font-weight: bold; font-size: 10px">Level(2)Status</div>
            <div class="approved-indicator"><center>Approved</center></div>
          </div>
              </div>
              <div v-else-if="moduleuserRole != 'Requester' && isMobile">
                <div v-if="isMobile" style="font-weight: bold; font-size: 11px; white-space: nowrap;">
              Product: {{ transactions.InvestmentProduct }}</div>
              </div>
            </td>

            <td v-if="moduleuserRole == 'Requester' && !isMobile || ReviewerViewingPending && !isMobile">
            <div v-if="transactions.ApprovalLevel1Status == 0">
              <center><div class="pending-indicator2"><center>Pending</center></div></center>
          </div>
          <div v-if="transactions.ApprovalLevel1Status == 1">
            <center><div class="approved-indicator"><center>Approved</center></div></center>
          </div>
          </td>

          <td v-if="moduleuserRole == 'Requester' && !isMobile || ReviewerViewingPending && !isMobile">
            <div v-if="transactions.ApprovalLevel2Status == 0">
            <div class="pending-indicator2"><center>Pending</center></div>
          </div>
          <div v-if="transactions.ApprovalLevel2Status == 1">
            <div class="approved-indicator"><center>Approved</center></div>
          </div>
          </td>

            <td v-if="moduleuserRole != 'Requester' && !isMobile && !ReviewerViewingPending">
              <div v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2' || moduleuserRole == 'Requester'">
                <div v-if="isMobile" style="font-weight: bold;"><center>Status</center></div>
              <div class="pending-indicator"><center>Pending</center></div>
            </div>
            <div v-if="moduleuserRole == 'Reviewer' && !ReviewerViewingPending">
              <div v-if="isMobile" style="font-weight: bold;"><center>Status</center></div>
              <div class="approved-indicator"><center>Approved</center></div>
            </div>
            </td>
            <td v-if="!isMobile">{{ transactions.InvestmentProduct }}</td>

          </tr>
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
      </div>

<!-- <div class="third-divider"></div> -->

 <div class="right-section">
  <div class="big-white-card-right">

    <div class="Status-card">

      <div v-if="cardSwitch != 'Bulk Approval'">
      <div class="Status-card-header mb-3">Pending Approval</div>
      <div v-if="tableData.length == 0" style="font-size: 10px; color: #000;">
      <div class="card-divider"></div>
        <center>No Pending Transactions</center>
        <div class="card-divider"></div>
        </div>
        <div v-else>
      <!-- Display client name -->
      <div class="card-divider"></div>
      <div class="Status-card-title">Client Name:</div>
      <div class="Status-card-value mb-2"> {{ TransactionData.ClientName }}</div>

      <div class="Status-card-title">Client Code:</div>
        <div class="Status-card-value mb-2"> {{ TransactionData.ClientCode }}</div>
        <!-- Display instruction number -->
        <div class="Status-card-title">Instruction No:</div>
        <div class="Status-card-value mb-2" style="color: green; font-weight: bold; white-space: nowrap;">  {{ TransactionData.RequestNo }}</div>
        <div class="card-divider"></div>


      <div class="mb-2" style="display: flex;">
      <div  class="mr-3">
        <div class="Status-card-title">Request Date:</div>
        <div class="Status-card-value"> {{ formatDate(TransactionData.DocumentDate) }}</div>
      </div>
      <div>
        <div class="Status-card-title">Document Date:</div>
        <div class="Status-card-value"> {{ formatDate(TransactionData.RequestDate) }}</div>
      </div>
      </div>

      <div @click="openDocument(TransactionData.RequestNo)" class="attachment-button2">
        <span v-if="spinnerloading2">
                <i class="fa fa-spinner fa-spin mr-2"></i>
              </span>
              <span v-else><i class="fas fa-eye mr-2"></i></span>
              View Attachment</div>
      <div class="card-divider"></div>

      <div class="Status-card-title">Posted By:</div>
        <div class="Status-card-value mb-2">{{ TransactionData.PostedBy }}</div>
        <div class="Status-card-title">Quantity:</div>
          <div class="Status-card-value mb-2">{{ formatAmount(TransactionData.Quantity) }}</div>
          <div class="Status-card-title">Amount:</div>
        <div class="Status-card-value mb-2" style="font-size: 18px; color: green; font-weight: bold">₦{{ formatAmount(TransactionData.Amount) }}</div>
        <div class="card-divider"></div>


      
      <div>

        <div v-if="moduleuserRole === 'Approver1' && TransactionData.ApprovalLevel1Status === 0  || moduleuserRole === 'Approver2' && TransactionData.ApprovalLevel1Status === 0">
          <div class="mt-0">
      <button @click="showApprove(TransactionData)" class="approve-button2 mr-2">Approve</button>
      <button @click="showReason(TransactionData)" class="reject-button2">Reject</button>
      </div>
      </div>
      <div v-else-if="moduleuserRole === 'Approver2'" >
        <button @click="showApprove(TransactionData)" class="approve-button2 mr-2">Approve</button>
      <button @click="showReason(TransactionData)" class="reject-button2">Reject</button>
      </div>
      <div v-else-if="moduleuserRole === 'Reviewer' && !ReviewerViewingPending" >
        <button @click="CheckPaid(TransactionData)" class="approve-button2 mr-2">Paid</button>
      <button @click="CheckFalied(TransactionData)" class="reject-button2">Failed</button>
      </div>

      <div v-else-if="moduleuserRole === 'Requester' || ReviewerViewingPending">
        <div v-if="TransactionData.ApprovalLevel1Status === 0" class="Status-card-title mb-2" style="display: flex; justify-content: space-between;"><div>Level (1) Approval Status:</div> <div class="pending-indicator2"><center>Pending</center></div></div>
        <div v-else-if="TransactionData.ApprovalLevel1Status === 1" class="Status-card-title mb-2" style="display: flex; justify-content: space-between;"><div>Level (1) Approval Status:</div> <div class="approved-indicator"><center>Approved</center></div></div>
        <div v-else class="Status-card-title mb-2" style="display: flex; justify-content: space-between;"><div>Level (1) Approval Status:</div> <div class="pending-indicator"><center>Rejected</center></div></div>


        <div v-if="TransactionData.ApprovalLevel2Status === 0"  class="Status-card-title" style="display: flex; justify-content: space-between;"><div>Level (2) Approval Status:</div> <div class="pending-indicator2"><center>Pending</center></div></div>
        <div v-else-if="TransactionData.ApprovalLevel2Status === 1"  class="Status-card-title" style="display: flex; justify-content: space-between;"><div>Level (2) Approval Status:</div> <div class="approved-indicator"><center>Approved</center></div></div>
        <div v-else  class="Status-card-title" style="display: flex; justify-content: space-between;"><div>Level (2) Approval Status:</div> <div class="pending-indicator"><center>Rejected</center></div></div>
        <div class="card-divider"></div>


      </div>

      </div>
     
      </div>
      </div>


<div v-else>
<div class="Status-card-header">Bulk Approval</div>
<div class="card-divider"></div>
<div class="selected-cards">
<div v-if="selectedTransactions.length == 0" style="font-size: 10px; color: #000;">
<center>Selected Transactions are shown here</center>
<div class="card-divider"></div>
</div>
<div v-for="transaction in selectedTransactions" :key="transaction.instructionNo" class="status-card">

<div class="bulk-selection-card">
<p><strong style="color: #fff;">Instruction No:</strong> {{ transaction.RequestNo }}</p>
<p><strong style="color: #fff;">Amount:</strong> ₦{{ formatAmount(transaction.Amount) }}</p>
<!-- <p><strong>Client Name:</strong> {{ transaction.ClientName }}</p> -->
</div>
</div>
</div>
<div v-if="selectedTransactions.length != 0" class="card-divider"></div>
<div v-if="selectedTransactions.length != 0"  style="display: flex; margin-top: 5px;">
<div class="button-container" style="height: 35px; margin-left: 10px ">
<button class="approve-button" @click="bulkApproveTransactions">
  <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i>
              </span>
              <span v-else>Approve</span></button>
</div>

<div class="button-container" style="height: 35px; margin-left: 10px ">
<button class="reject-button" @click="showReason">
  Reject</button>
</div>
</div>
</div>

</div>

<div class="chart-container">
<center> <canvas id="myChart"></canvas> </center>
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
  <div v-if="!isMobile">
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
        <button class="logout-button" style="background-color: green;" @click="CompleteTransaction">
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
<div v-else>
  <div class="generic-modal">
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
        <button class="logout-button" style="background-color: green;" @click="CompleteTransaction">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i>
              </span>
              <span v-else>Yes</span>
          
        </button>
      </div>
    </div>
  </div>
</div>
    </div>

    <div class="modal-overlay" v-show="showFailCard">
      <div v-if="!isMobile">
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
<div v-else>
  <div class="generic-modal">
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
</div>
    </div>

    <div class="modal-overlay" v-show="showApproveModal">
      <div v-if="!isMobile">
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
            <label for="reason" class="text-black" style="margin-bottom: 1px;">Comment (Optional)</label>
            <textarea
              class="form-control inputModal"
              id="reason"
              style="height: 100px"
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

        <div style="display: flex">
        <button class="logout-cancel mr-2" @click="closeAppprove">Cancel</button>
        <!-- <button type="button" class="btn btn-secondary" @click="showlogoutDialog = false">Cancel</button> -->
        <button class="logout-button" @click="approveTransaction">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i> loading
              </span>
              <span v-else>Submit</span>
        </button>
      </div>
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
          Would you like to leave a comment for this approval?
        </div>
        <button type="button" class="close"  @click="closeAppprove">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body modal-text">
        <div class="mb-3">
            <label for="reason" class="text-black" style="margin-bottom: 1px;">Comment (Optional)</label>
            <textarea
              class="form-control inputModal"
              id="reason"
              style="height: 100px"
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

        <div style="display: flex">
        <button class="logout-cancel mr-2" @click="closeAppprove">Cancel</button>
        <!-- <button type="button" class="btn btn-secondary" @click="showlogoutDialog = false">Cancel</button> -->
        <button class="logout-button" @click="approveTransaction">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i> loading
              </span>
              <span v-else>Submit</span>
        </button>
      </div>
      </div>
    </div>
  </div>
</div>

    </div>

    <div class="modal-overlay" v-show="showReasonModal">
      <div v-if="!isMobile">
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
              class="form-control inputModal"
              id="reason"
              style="height: 100px;"
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
    
        <button v-if="cardSwitch == 'Bulk Approval'" class="logout-button" @click="bulkRejectTransactions">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i> loading
              </span>
              <span v-else>Submit</span>
        </button>

        <button v-if="cardSwitch != 'Bulk Approval'" class="logout-button" @click="rejectTransaction">
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
<div v-else>
  <div class="generic-modal">
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
              class="form-control inputModal"
              id="reason"
              style="height: 100px;"
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
    
        <button v-if="cardSwitch == 'Bulk Approval'" class="logout-button" @click="bulkRejectTransactions">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i> loading
              </span>
              <span v-else>Submit</span>
        </button>

        <button v-if="cardSwitch != 'Bulk Approval'" class="logout-button" @click="rejectTransaction">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i>
              </span>
              <span v-else>Submit</span>
        </button>
      </div>
    </div>
  </div>
</div>
    </div>

    <div class="modal-overlay" v-show="showStatusModal">
      <div class="Status-card">

        <div v-if="cardSwitch != 'Bulk Approval'">
        <div class="Status-card-header mb-3" style="display: flex; justify-content: space-between">
          <div>Pending Approval</div>
          <button type="button" class="close"  @click="showStatusModal = false">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <div v-if="tableData.length == 0" style="font-size: 10px; color: #000;">
        <div class="card-divider"></div>
          <center>No Pending Transactions</center>
          <div class="card-divider"></div>
          </div>
          <div v-else>
        <!-- Display client name -->
        <div class="card-divider"></div>
        <div class="Status-card-title">Client Name:</div>
        <div class="Status-card-value mb-2"> {{ TransactionData.ClientName }}</div>

        <div class="Status-card-title">Client Code:</div>
          <div class="Status-card-value mb-2"> {{ TransactionData.ClientCode }}</div>
          <!-- Display instruction number -->
          <div class="Status-card-title">Instruction No:</div>
          <div class="Status-card-value mb-2" style="color: green; font-weight: bold; white-space: nowrap;">  {{ TransactionData.RequestNo }}</div>
          <div class="card-divider"></div>


        <div class="mb-2" style="display: flex;">
        <div  class="mr-3">
          <div class="Status-card-title">Request Date:</div>
          <div class="Status-card-value"> {{ formatDate(TransactionData.DocumentDate) }}</div>
        </div>
        <div>
          <div class="Status-card-title">Document Date:</div>
          <div class="Status-card-value"> {{ formatDate(TransactionData.RequestDate) }}</div>
        </div>
        </div>

        <div @click="openDocument(TransactionData.RequestNo)" class="attachment-button2">
          <span v-if="spinnerloading2">
                <i class="fa fa-spinner fa-spin mr-2"></i>
              </span>
              <span v-else><i class="fas fa-eye mr-2"></i></span>
              View Attachment</div>
        <div class="card-divider"></div>

        <div class="Status-card-title">Posted By:</div>
          <div class="Status-card-value mb-2">{{ TransactionData.PostedBy }}</div>
          <div class="Status-card-title">Quantity:</div>
            <div class="Status-card-value mb-2">{{ formatAmount(TransactionData.Quantity) }}</div>
            <div class="Status-card-title">Amount:</div>
          <div class="Status-card-value mb-2" style="font-size: 18px; color: green; font-weight: bold">₦{{ formatAmount(TransactionData.Amount) }}</div>
          <div class="card-divider"></div>



        <div>

          <div v-if="moduleuserRole === 'Approver1' && TransactionData.ApprovalLevel1Status === 0  || moduleuserRole === 'Approver2' && TransactionData.ApprovalLevel1Status === 0">
            <div class="mt-0">
        <button @click="showApprove(TransactionData)" class="approve-button2 mr-2">Approve</button>
        <button @click="showReason(TransactionData)" class="reject-button2">Reject</button>
        </div>
        </div>
        <div v-else-if="moduleuserRole === 'Approver2'" >
          <button @click="showApprove(TransactionData)" class="approve-button2 mr-2">Approve</button>
        <button @click="showReason(TransactionData)" class="reject-button2">Reject</button>
        </div>
        <div v-else-if="moduleuserRole === 'Reviewer' && !ReviewerViewingPending " >
          <button @click="CheckPaid(TransactionData)" class="approve-button2 mr-2">Paid</button>
        <button @click="CheckFalied(TransactionData)" class="reject-button2">Failed</button>
        </div>

        <div v-else-if="moduleuserRole === 'Requester' || ReviewerViewingPending">
          <div v-if="TransactionData.ApprovalLevel1Status === 0" class="Status-card-title mb-2" style="display: flex; justify-content: space-between;"><div>Level (1) Approval Status:</div> <div class="pending-indicator2"><center>Pending</center></div></div>
          <div v-else-if="TransactionData.ApprovalLevel1Status === 1" class="Status-card-title mb-2" style="display: flex; justify-content: space-between;"><div>Level (1) Approval Status:</div> <div class="approved-indicator"><center>Approved</center></div></div>
          <div v-else class="Status-card-title mb-2" style="display: flex; justify-content: space-between;"><div>Level (1) Approval Status:</div> <div class="pending-indicator"><center>Rejected</center></div></div>


          <div v-if="TransactionData.ApprovalLevel2Status === 0"  class="Status-card-title" style="display: flex; justify-content: space-between;"><div>Level (2) Approval Status:</div> <div class="pending-indicator2"><center>Pending</center></div></div>
          <div v-else-if="TransactionData.ApprovalLevel2Status === 1"  class="Status-card-title" style="display: flex; justify-content: space-between;"><div>Level (2) Approval Status:</div> <div class="approved-indicator"><center>Approved</center></div></div>
          <div v-else  class="Status-card-title" style="display: flex; justify-content: space-between;"><div>Level (2) Approval Status:</div> <div class="pending-indicator"><center>Rejected</center></div></div>
          <div class="card-divider"></div>


        </div>

        </div>

        </div>
        </div>

        </div>
    </div>

  <view-transaction
  :showTransactionCard="showTransactionCard" 
  :TransactionData="TransactionData" 
  @close-card="closeTransactionCard"
  @open-card="openTransactionCard"
  @update-transaction="updateTransaction"
  ></view-transaction>

  </div>

  </template>

  </dashboard-layout>
</template>
  
  <script>
  import DashboardLayout from '@/components/DashboardLayout.vue';
  import ViewTransaction from './ViewTransaction.vue'
  import Chart from 'chart.js/auto';
  import axios from 'axios'; 
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';
  import SwiperCore, { Pagination } from 'swiper';
  import { getDocument} from 'pdfjs-dist';
  import * as pdfjsLib from 'pdfjs-dist/build/pdf';
  import { mapActions, mapGetters, mapMutations } from 'vuex';



  SwiperCore.use([Pagination]);

  
  export default {
    name: 'Tracker-dashboard',

  
    components: {
      DashboardLayout,
      ViewTransaction,
      Swiper,
       SwiperSlide,
    },
  
    data() {
    return {
    showSuccessMessage: false,
    showErrorMessage: false,
    successMessage: '',
    errorMessage: '',
    windowWidth: window.innerWidth,
    cards: [
      {
        id: 1,
        title: 'Approved Transactions',
      },
      {
        id: 2,
        title: 'Rejected Transactions',
      },
      {
        id: 3,
        title: 'Pending Transactions',
      }
    ],


      myChart: null,
      selectedRow: 0,
      showDocument: false,
      showDocument2: false,
      pdfsrc: null,
      pdfBlobUrl: '',
      selectedTab: 'pending',
      selectedHeadTab: 'today',
      selectedReviwerTab: 'Approved',
      ReviewerViewingPending: false,
      selectedMonth: new Date().getMonth() + 1, // January is 1-based
      selectedYear: new Date().getFullYear(),
      months: [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ],
      years: [],
      showChart: true,
      cardSwitch: 'Select Action',
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
      TransactionData: [],
      counts: [],
      Graphcounts: [],

      isModalOpen: false,
      selectedTransaction: null,
      transactions: [],
      showUsersDialog: false,
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
      allTransactions: [],
      selectedTabName: '',
      Apv1tableData: '',
      Apv2tableData: '',
      Apv2tableData2: '',
      Apv1tableData2: '',
      RVWtableData: '',
      RVWtableData2: '',
      AllReprocesed: '',
      AllReinitiated: '',
      LV1Data: '',
      showPaidCard: false,
      showFailCard: false,
      uploadedFile: null,
      finalCheckPaid: '',
      finalCheckFailed: '',
      showReasonModal: false,
      showApproveModal: false,
      showApprovalModal: false,
      showStatusModal: false,
      errorReasonMessage: false,
      erroruploadMessage: false,
      reason: '',
      selectedData: '',
      spinnerloading: false,
      spinnerloading2: false,
      refreshInterval: null,
      TotalRequestAmount: '',
      currentSlide: 0,
      pdfDoc: null,
      numPages: 0,
      currentPDFPage: 1,
      pdfCanvas: null,
      isLoadingData: false,
      loadingText: 'Fetching Records',
      displayScale: null, 
      startDistance: 0, // To track the start distance of a pinch
      initialScale: 2.0,
    };
  },
  async mounted() {
    this.startLoader();

    window.addEventListener('resize', this.handleResize);
    this.displayScale = window.innerWidth < 768 ? 0.5 : 1.0;
    
    document.addEventListener('click', this.closePopups);

    this.userRole = sessionStorage.getItem('role');
    this.UserId = sessionStorage.getItem('userId');
    
    

    try{
      await this.fetchProducts();
      await this.setUserRoleInSession();
      this.moduleuserRole = sessionStorage.getItem('moduleuserRole');
      console.log(`User role before initilizing: ${this.moduleuserRole}`);

      if(this.moduleuserRole != 'Reviewer'){
        await this.$store.dispatch('fetchPendingTransactions');
      } else{
        await this.$store.dispatch('fetchAllTransactions');
      }
      
    await this.filterTransactions();
    await this.fetchTransactionCounts();
    await this.finalTransactionStatus();
    this.$store.dispatch('startRefreshInterval');
    this.totalRows = this.tableData.length;
    this.TransactionData = this.tableData[0];
   
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

    this.$nextTick(() => {
    this.initializeChart();
  });
   
    const currentYear = new Date().getFullYear();
    for (let year = 2000; year <= 2030; year++) {
      this.years.push(year);
    }
    console.log(currentYear);


    this.refreshInterval = setInterval(() => {
      if(this.moduleuserRole != 'Reviewer' && this.cardSwitch != 'Bulk Approval'){
        this.$store.dispatch('fetchPendingTransactions');
         this.fetchTransactionCounts();
      } else if(this.moduleuserRole == 'Reviewer' && this.ReviewerViewingPending){
        this.$store.dispatch('fetchPendingTransactions');
        this.fetchTransactionCounts();
      }else if(this.moduleuserRole == 'Reviewer' && this.cardSwitch != 'Bulk Approval'){
        this.$store.dispatch('fetchAllTransactions');
        this.fetchTransactionCounts();
      }
  }, 10000);
  },

  beforeUnmount() {
  // Clear the interval when the component is destroyed
  if (this.refreshInterval) {
    clearInterval(this.refreshInterval);
  }
  window.removeEventListener('resize', this.handleResize);
    
},

  computed: {

    isMobile() {
    return this.windowWidth < 768;
  },

  ...mapGetters(['PendingTransactions','CompletedTransactions']),

    selectedTransactions() {
    return this.visibleRows.filter(transaction => transaction.selected);
  },

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

        searchTerm() {
    this.currentPage = 1;
    
  
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

    ...mapActions(['fetchPendingTransactions','fetchAllTransactions']),
    ...mapMutations(['removePendingTransaction','removePendingTransactionsBulk','removeApprovedTransaction']),

    async renderPDF() {
      window.FlutterBridge.postMessage(this.pdfsrc);
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
    this.spinnerloading2 = true;
    const token = sessionStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    try {
      const response = await axios.get(`${this.$config.GETATTACHMENT_ENDPOINT}/${PDFSrc}`, { headers });
      this.pdfBlobUrl = this.getBlobUrl(response.data.attachmentsBase64);
      this.pdfsrc = response.data.attachmentsBase64;
      this.spinnerloading2 = false;
    } catch (error) {
      console.error('Error fetching attachment:', error);
      this.$toast.open({
        message: 'Error opening Document, please try again later',
        type: 'error',
        duration: 3000,
      });
    }

    if(this.isMobile){
          // this.showDocument2 = true;
          this.renderPDF();
        }else{
          this.showDocument = true;
        }
  },

    async renderPDF2() {
      this.$nextTick(async () => {
        const pdfContainer = this.$refs.pdfContainer;
       

        if (!pdfContainer) {
          console.error('PDF container not found.');
          return;
        }

        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.269/pdf.worker.mjs';

        // Convert base64 to Uint8Array
        const base64ToUint8Array = (base64) => {
          const binaryString = window.atob(base64);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          return bytes;
        };

        // Decode the base64 string to Uint8Array
        const pdfData = base64ToUint8Array(this.pdfsrc);

        try {
          // Get the PDF document
          const pdfDoc = await getDocument({ data: pdfData }).promise;
          this.numPages = pdfDoc.numPages;

          // Clear previous content
          pdfContainer.innerHTML = '';

          for (let pageNum = 1; pageNum <= this.numPages; pageNum++) {
            const page = await pdfDoc.getPage(pageNum);

            // Create a new canvas element
            const canvas = document.createElement('canvas');
            pdfContainer.appendChild(canvas);

            // Set the render scale for high-resolution rendering
             // Display scale based on screen width
            const renderScale = 2.0; // Render scale for high-resolution rendering
            const viewport = page.getViewport({ scale: renderScale });

            // Set canvas dimensions to match the viewport
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // Use CSS to scale the canvas for display
            canvas.style.width = `${viewport.width * this.displayScale / renderScale}px`;
            canvas.style.height = `${viewport.height * this.displayScale / renderScale}px`;

            // Get the canvas context for rendering
            const context = canvas.getContext('2d');

            // Set up the render context
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };

            // Render the PDF page onto the canvas
            await page.render(renderContext).promise;
          }
        } catch (error) {
          console.error('Error rendering PDF on canvas:', error);
          this.$toast.open({
            message: 'Error rendering PDF on canvas.',
            type: 'error',
            duration: 3000,
          });
        }
      });
    },

    onTouchStart(event) {
      if (event.touches.length === 2) {
        const dx = event.touches[0].pageX - event.touches[1].pageX;
        const dy = event.touches[0].pageY - event.touches[1].pageY;
        this.startDistance = Math.sqrt(dx * dx + dy * dy);
        this.initialScale = this.displayScale;
      }
    },
    onTouchMove(event) {
      if (event.touches.length === 2) {
        const dx = event.touches[0].pageX - event.touches[1].pageX;
        const dy = event.touches[0].pageY - event.touches[1].pageY;
        const newDistance = Math.sqrt(dx * dx + dy * dy);
        const scaleChange = newDistance / this.startDistance;
        this.scale = this.displayScale * scaleChange;
        this.renderPDF();
      }
    },

    closeDocumentModal() {
    
    if(this.isMobile){
      
        this.showStatusModal = true;
        this.showDocument2 = false;
        this.pdfsrc = null;
      }else{
        this.showDocument = false;
        this.pdfBlobUrl = '';
    // Release the Blob URL when the modal is closed
    URL.revokeObjectURL(this.pdfBlobUrl);
      }
  },


    async startLoader() {
  
    try {
      this.isLoadingData = true;

      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update loading text
      this.loadingText = 'Fetching Records';

      // Simulate delay for demonstration purposes
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update loading text
      this.loadingText = 'Please Wait';

      // Simulate delay for demonstration purposes
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.loadingText = 'Fetching Documents';

    } catch (error) {
      console.error(error);
    }
  },

    async fetchTransactions() {
      const token = sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
    try {
      // Use your HTTP client to fetch transactions from the endpoint
      const response = await axios.get(this.$config.GETPOSTEDTRANSACTIONS_ENDPOINT,{ headers });
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
          && !(transaction.ApprovalLevel1Status == 1 && transaction.ApprovalLevel2Status == 2)
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

async selectReviewerTab(tab) {

this.selectedReviwerTab = tab;
if(tab == 'Approved'){
this.ReviewerViewingPending = false;
}else{
  this.ReviewerViewingPending = true;
}
await this.$store.dispatch('fetchPendingTransactions');
this.filterTransactions();


},


  filterTransactions() {
  this.allTransactions = this.PendingTransactions;
  
  const sortAlphabetically = (data) => {
    return data.sort((a, b) => {
      const nameA = a.ClientName.toLowerCase();
      const nameB = b.ClientName.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  };

  if (this.moduleuserRole == 'Approver1') {
    let tableData = this.allTransactions.filter(transaction => transaction.ApprovalLevel1Status == 0 && transaction.IsReprocessed != 1 );
    let tableData2 = this.allTransactions.filter(transaction => transaction.ApprovalLevel1Status == 0 && transaction.IsReprocessed == 1);
    tableData = sortAlphabetically(tableData);
    tableData2 = sortAlphabetically(tableData2);
    if (this.selectedTab === 'pending') {
      this.tableData = tableData;
      this.totalRows = this.tableData.length;
      this.TransactionData = this.tableData[this.selectedRow];
      this.Apv1tableData = tableData;
      this.Apv1tableData2 = tableData2;
    } else if (this.selectedTab === 'reinitiated') {
      this.tableData = tableData2;
      this.totalRows = this.tableData.length;
      this.TransactionData = this.tableData[this.selectedRow];
      this.Apv1tableData2 = tableData2;
    } else {
      this.tableData = tableData.filter(transaction => transaction.InvestmentProduct === this.selectedTabName && transaction.IsReprocessed != 1);
      this.tableData = sortAlphabetically(this.tableData);
      this.totalRows = this.tableData.length;
      this.TransactionData = this.tableData[this.selectedRow];
    }
  } else if (this.moduleuserRole == 'Approver2') {
    let tableData = this.allTransactions.filter(transaction => transaction.ApprovalLevel1Status == 1 && transaction.IsReprocessed != 1);
    let tableData2 = this.allTransactions.filter(transaction => transaction.ApprovalLevel1Status == 1 && transaction.IsReprocessed == 1);
    tableData = sortAlphabetically(tableData);
    tableData2 = sortAlphabetically(tableData2);
    if (this.selectedTab === 'pending') {
      this.tableData = tableData;
      this.totalRows = this.tableData.length;
      this.TransactionData = this.tableData[this.selectedRow];
      this.Apv2tableData = tableData;
      this.Apv2tableData2 = tableData2;
    } else if (this.selectedTab === 'reinitiated') {
      this.tableData = tableData2;
      this.totalRows = this.tableData.length;
      this.TransactionData = this.tableData[this.selectedRow];
      this.Apv2tableData2 = tableData2;
    } else {
      this.tableData = tableData.filter(transaction => transaction.InvestmentProduct === this.selectedTabName && transaction.IsReprocessed != 1);
      this.tableData = sortAlphabetically(this.tableData);
      this.totalRows = this.tableData.length;
      this.TransactionData = this.tableData[this.selectedRow];
    }
  } else if (this.moduleuserRole == 'Reviewer' && !this.ReviewerViewingPending) {
    let tableData = this.CompletedTransactions.filter(transaction => transaction.ApprovalLevel2Status == 1 && transaction.ReviewerLevelStatus != 1 && transaction.IsReprocessed != 1);
    let tableData2 = this.CompletedTransactions.filter(transaction => transaction.ApprovalLevel2Status == 1 && transaction.ReviewerLevelStatus != 1 && transaction.IsReprocessed == 1);
    tableData = sortAlphabetically(tableData);
    tableData2 = sortAlphabetically(tableData2);
    if (this.selectedTab === 'pending') {
      this.tableData = tableData;
      this.totalRows = this.tableData.length;
      this.TransactionData = this.tableData[this.selectedRow];
      this.RVWtableData = tableData;
      this.RVWtableData2 = tableData2;
    } else if (this.selectedTab === 'reinitiated') {
      this.tableData = tableData2;
      this.totalRows = this.tableData.length;
      this.TransactionData = this.tableData[this.selectedRow];
      this.Apv2tableData2 = tableData2;
    } else {
      this.tableData = tableData.filter(transaction => transaction.InvestmentProduct === this.selectedTabName && transaction.IsReprocessed != 1);
      this.tableData = sortAlphabetically(this.tableData);
      this.totalRows = this.tableData.length;
      this.TransactionData = this.tableData[this.selectedRow];
    }
  } else {
    if (this.selectedTab === 'pending') {
      this.tableData = this.allTransactions.filter(transaction => transaction.IsReprocessed != 1);
      this.tableData = sortAlphabetically(this.tableData);
      this.AllReprocesed = this.allTransactions.filter(transaction => transaction.IsReprocessed == 1);
      this.totalRows = this.tableData.length;
      this.TransactionData = this.tableData[this.selectedRow];
    } else if (this.selectedTab === 'reinitiated') {
      this.tableData = this.allTransactions.filter(transaction => transaction.IsReprocessed == 1);
      this.tableData = sortAlphabetically(this.tableData);
      this.AllReprocesed = this.tableData;
      this.totalRows = this.tableData.length;
      this.TransactionData = this.tableData[this.selectedRow];
    } else {
      this.tableData = this.allTransactions.filter(transaction => transaction.InvestmentProduct === this.selectedTabName && transaction.IsReprocessed != 1);
      this.tableData = sortAlphabetically(this.tableData);
      this.totalRows = this.tableData.length;
      this.TransactionData = this.tableData[this.selectedRow];
    }
  }

  this.TotalRequestAmount = this.tableData
    .reduce((sum, transaction) => sum + parseFloat(transaction.Amount), 0)
    .toFixed(2);

  this.LV1Data = this.allTransactions.filter(transaction => transaction.ApprovalLevel1Status == 0);
},





  downloadPDF() {
    const link = document.createElement('a');
    link.href = this.getDocumentUrl(this.pdfsrc);
    link.download = 'document.pdf';
    link.click();
  },


    ViewTransaction(TransactionData, index){
      // this.showTransactionCard = true;
      this.TransactionData = TransactionData;
      this.selectedRow = index;

      if(this.isMobile){
        this.showStatusModal = true;
      }
    },

    onSlideChange(swiper) {
    this.currentSlide = swiper.activeIndex;
  },
  goToSlide(index) {
    const swiperInstance = this.$refs.mySwiper.swiper;
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  },

    handleResize() {
    this.windowWidth = window.innerWidth;
  },

    toggleSelection(transaction) {
    // Handle individual row selection
    transaction.selected = !transaction.selected;
  },

    async refreshTable(){

      try{

        this.spinnerloading = true;

      if(this.moduleuserRole != 'Reviewer'){
        await this.$store.dispatch('fetchPendingTransactions');
        await this.fetchTransactionCounts();
      } else{
        await this.fetchCompletedTransactions();
        await this.fetchTransactionCounts();
      }
   
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
    this.spinnerloading = false;
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

  try{
    const response = await axios.post(endpoint, approvalData, { headers });
    if (response.status === 200) {
      console.log('Transaction status updated successfully', response.data);
      if(!this.isMobile){
      this.$toast.open({
        message: 'Transaction updated successfully',
        type: 'success',
        duration: 3000,
      });
    }else{
      this.successMessage = 'Transaction updated successfully';
      this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
    }
      this.spinnerloading = false;
      this.removePendingTransaction(this.selectedData.RequestNo);
      this.tableData = this.tableData.filter(transaction => transaction.RequestNo !== this.selectedData.RequestNo);
      this.TransactionData = this.tableData[0];
      this.reason = '';
      this.showReasonModal = false;
      this.showApproveModal = false;
      try{
        this.fetchTransactionCounts();
      } catch(error){
        console.log(error);
      }
    } else {
      this.spinnerloading = false;
      console.error('Error updating transaction status', response.error);
      this.$toast.open({
        message: `Error updating transaction status: ${response}`,
        type: 'error',
        duration: 3000,
      });
    }

  }catch(error){
    this.spinnerloading = false;
      console.error('Error updating transaction status', error);
      this.$toast.open({
        message: `Error updating transaction status: ${error}`,
        type: 'error',
        duration: 3000,
      });

  }
},

    updateCharacterCount() {
    this.characterCount = this.reason.length;
  },

  closeAppprove(){
      this.showApproveModal = false;
       if(this.isMobile){
      this.showStatusModal = true;
      }

    },

    showApprove(TransactionData){
      if(this.isMobile){
      this.showStatusModal = false;
      }
      this.showApproveModal = true;
      this.selectedData = TransactionData;
    },


    closeReason(){
      this.showReasonModal = false;
      if(this.isMobile){
      this.showStatusModal = true;
      }

    },

    showReason(TransactionData){
      if(this.isMobile){
      this.showStatusModal = false;
      }
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
    this.spinnerloading = true;
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
        if(!this.isMobile){
        this.$toast.open({
          message: 'Bulk approval request submitted successfully',
          type: 'success',
          duration: 3000,
        });
      }else{
        this.successMessage = 'Transaction updated successfully';
      this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
      }
        this.spinnerloading = false;
        const approvedRequestNos = payload.map(request => request.requestNo);
        this.$store.commit('removePendingTransactionsBulk', approvedRequestNos);
        this.tableData = this.tableData.filter(transaction => !approvedRequestNos.includes(transaction.RequestNo));
        this.filterTransactions();
        this.cardSwitch = 'Select Action';
         
      } else {
        console.error('Error submitting bulk approval request:', response.statusText);
        this.spinnerloading = false;
        this.$toast.open({
          message: `Error submitting bulk approval request: ${response.statusText}`,
          type: 'error',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error submitting bulk approval request', error);
      if(!this.isMobile){
      this.$toast.open({
        message: `Error submitting bulk approval request: ${error}`,
        type: 'error',
        duration: 3000,
      });
    }else{
      this.errorMessage = 'An error occured while updating trasaction.';
            this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
    }
    }
  },

    CheckPaid(TransactionData){
      if(this.isMobile){
      this.showStatusModal = false;
      }
      this.showPaidCard = true;
      this.finalCheckPaid = TransactionData;
    },

    CheckFalied(TransactionData){
      if(this.isMobile){
      this.showStatusModal = false;
      }
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
        if(!this.isMobile){
      this.$toast.open({
        message: 'Transaction completed successfully',
        type: 'success',
        duration: 3000,
      });
    }else{
      this.successMessage = 'Transaction updated successfully';
      this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
    }
      this.spinnerloading = false;
      // this.removeApprovedTransaction(this.finalCheckPaid.RequestNo);
      this.$store.dispatch('removeApprovedTransaction', this.finalCheckPaid.RequestNo);
      this.tableData = this.tableData.filter(transaction => transaction.RequestNo !== this.finalCheckPaid.RequestNo);
      this.TransactionData = this.tableData[0];
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
      if(!this.isMobile){
      this.$toast.open({
        message: 'Error completing transaction',
        type: 'error',
        duration: 3000,
      });
    }else{
      this.errorMessage = 'An error occured while updating trasaction.';
            this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
    }
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
          if(!this.isMobile){
          this.$toast.open({
        message: 'Transaction updated successfully',
        type: 'success',
        duration: 3000,
      });
    }else{
      this.successMessage = 'Transaction updated successfully';
      this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }
  
      this.spinnerloading = true;
      this.tableData = this.tableData.filter(transaction => transaction.RequestNo !== this.finalCheckFailed.RequestNo);
      this.TransactionData = this.tableData[0];
      this.showFailCard = false;
      this.spinnerloading = false;
      this.uploadedFile = null;
      try{
        this.fetchTransactionCounts();
      } catch(error){
        console.log(error);
      }
        
        })
        .catch(error => {
          console.error('Error adding attachment', error);
          this.errorMessage = 'An error occured while updating trasaction.';
            this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
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


 

  selectTab(tab, tabName) {

this.selectedTab = tab;
this.selectedTabName = tabName;
this.searchTerm = '';

},


selectHeadTab(tab) {

this.selectedHeadTab = tab;
this.transactionCounts = this.counts[this.selectedHeadTab];

},


async fetchTransactionCounts() {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  try {
  const response = await axios.get(this.$config.GETTRANSACTIONCOUNT_ENDPOINT, { headers });
  if (response.status === 200) {
    this.counts = response.data.transactionCounts;
    this.Graphcounts = response.data.transactionCounts.thisMonth;
    this.transactionCounts = this.counts[this.selectedHeadTab];
    
  } else {
    console.error('Error fetching transaction counts:', response.status);
  }
} catch (error) {
  console.error('Error fetching transaction counts:', error);
}
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


   


    closeTransactionCard(){
      this.showTransactionCard = false;
    },

    openTransactionCard(){
      this.showTransactionCard = true;
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
              data: [this.Graphcounts.ApprovedCount, this.Graphcounts.RejectedCount,this.Graphcounts.PendingCount], 
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
                  size: 8, 
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
                  size: 5,
              },
              formatter: function(value, context) {
                  return `${context.label}: ${value}`;
              },
              layout: {
              padding: 0

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

.pdf-viewer1 {
background: #fff;
padding: 20px;
border-radius: 10px;
max-width: 90%;
max-height: 90%;
overflow-y: auto;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.pdf-viewer1::-webkit-scrollbar {
width: 2px;
height: 5px; 
}

.pdf-viewer1::-webkit-scrollbar-thumb {
background-color: #c6c5cb; 
border-radius: 3px;
}

.pdf-container {
display: flex;
flex-direction: column;
align-items: center;
}

.pdf-container canvas {
margin-bottom: 20px;
border: 1px solid #ccc;
box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

.pdf-viewer-canvas {
width: 100%;
height: auto;
border: 1px solid #ccc;
box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

.pdf-canvas {
width: 100%;
height: auto;
}

@media (max-width: 900px) {

  .inputModal{
      height: 150px; 
      width: 100%; 
      font-size: 12px; 
      color: #000;
    }

.big-white-card2 {
background-color: #fff;
margin: 0px 0px; 
padding: 0px; 
height: auto;
overflow: hidden;
}

.right-section {
display: none;
}

.left-section2 {
min-width: 510px;
}

.dashboard-section-body-item2{
display: none;
}

.dashboard-section-body-item1{
display: none;
}

.dashboard-section-body-card2{
background-color: #FFF;
height: 100px;
min-width: 400px;
width: calc(100% - 0px);
max-width: 600px;
border: 0.3px solid #D1D9E2;
margin-top: 5px;
padding: 15px;
}

.card5-header {
font-size: 14px;
color:  #5F6D7E;
display: flex;
justify-content: space-between;
}

.card-label5{
background-color: #F8F9FC;
height: 35px;
width: auto;
padding: 7px;
color: #D7BB29;
border-radius: 10px;
font-size: 14px;
}

.dashboard-section-body {
display: flex;
gap: 20px; 
flex-wrap: wrap;
}

.dashboard-section-body-card {
  flex: 1 1 calc(50% - 5px); /* Two cards per row on smaller screens */
  max-width: calc(95% - 5px); /* Ensures they don't exceed 50% width */
}

.dashboard-section-body-card {
background: linear-gradient(135deg, #8E1611, #bd1a14); /* Example gradient */
height: 160px;
border: 0.3px solid #D1D9E2;
padding: 15px;
border-radius: 15px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
display: flex;
flex-direction: column;

}

.dashboard-section{
margin: 20px 0px; 
height: 170px;
padding: 0px;
} 

.left-section2 {
    flex: 1 1 550px; 
    min-width: 250px; 
  }

.big-white-card-left {
  background-color: #fff;
  margin: 0; 
  padding: 5px;
  height: auto;
  min-height: 250px;
  min-width: 100px; /* Minimum width for the card */
  width: 100%; /* Grow to fill the available space */
  max-width: 100%; /* Allow it to grow as much as the screen allows */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Light shadow for depth */
  border-radius: 10px; /* Optional: Rounded corners */
}

.custom-table2 {
border-collapse: separate; /* Use 'separate' instead of 'collapse' */
border-spacing: 0 10px; /* Add 10px spacing between rows */
width: 100%;
}
.custom-table2 tr {
background-color: #f7d1d06a;
}

.custom-table2 tbody tr {
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add box shadow */
transition: transform 0.3s ease, box-shadow 0.3s ease; 
border-radius: 10px;
}

.custom-table2 tbody tr td:first-child,
.custom-table2 tbody tr th:first-child {
border-top-left-radius: 10px; /* Adjust the radius value as needed */
border-bottom-left-radius: 10px;
}

.custom-table2 tbody tr td:last-child,
.custom-table2 tbody tr th:last-child {
border-top-right-radius: 10px;
border-bottom-right-radius: 10px;
}

.selected-row {
background-color: #f7d1d06a !important
}

.custom-table2 tbody tr:hover {
background-color: #f7d1d06a; 

}

.Status-card{
padding: 15px;
height: auto;
background-color: #faf5f1;
border: 1px solid #00000034;
border-radius: 5px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
width: 400px;

}

.generic-modal{
padding: 15px;
height: auto;
background-color: #fff;
border-radius: 5px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
width: 350px;

}

#myChart{
height: 90px;
width: 120px;

}




.dashboard-section-body {
display: flex;
gap: 0px; 
flex-wrap: wrap;
}

.mySwiper {
width: 100%
}

.swiper-slide {
display: flex;
justify-content: center;
width: 100%;
}

.card-writeup{
font-size: 16px;
color: #fff;

}

.custom-icon-2{
height: 30px;
width: auto;
}

.card-data{
color: #fff;
font-size: 28px;
font-weight: bold;
margin-top: 10px;
}

.card-label1{
background-color: #F8F9FC;
height: 35px;
width: 165px;
padding: 8px;
padding-left: 5px;
color: green;
border-radius: 10px;
font-size: 10px;
margin-top: 20px;
}

.card-label2{
background-color: #F8F9FC;
height: 35px;
width: 165px;
padding: 8px;
padding-left: 5px;
color: #8E1611;
border-radius: 10px;
font-size: 10px;
margin-top: 20px;
}
.card-label3{
background-color: #F8F9FC;
height: 35px;
width: 165px;
padding: 8px;
padding-left: 5px;
color: #ab9424;
border-radius: 10px;
font-size: 10px;
margin-top: 20px;
}
.card-label4{
      background-color: #F8F9FC;
      height: 35px;
      width: 195px;
      padding: 8px;
      padding-left: 5px;
      color: #000;
      border-radius: 10px;
      font-size: 10px;
      font-weight: bold;
      margin-top: 20px;
      cursor: pointer;
      transition: transform 0.3s;
  }

  .card-label4:hover{
    transform: scale(1.1);
  }

.dashboard-section-header{

height: 20px;
padding: 5px;
display: flex;
font-size: 12px;
font-weight: bold;
margin-left: 10px;
margin-right: 10px;
color:#000;
}

.pdf-viewer {
width: auto; 
max-width: 300px; 
height: 85%; 
max-height: 400px; 
background-color: transparent;
padding: 10px;
box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

.pdf-viewer-iframe {
width: 100%;
height: 100%;
border: none;
}

.APV1-indicator{
    max-width: 30px;
    min-width: 20px;
    width: auto;
    height: 16px;
    padding: 1px 3px;
    font-size: 10px;
    background-color: #595858;
    color: #fff;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-left: 5px;
  }


}

  .sum-total{
    height: 22px;
    width: auto;
    padding: 3px;
    background-color: green;
    color: #fff;
    border-radius: 7px;
    font-size: 12px;
    font-weight: bold;
  }

.selected-cards {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 400px;
    overflow: auto;
  }
  .selected-cards::-webkit-scrollbar {
width: 2px; /* Set the width of the scrollbar */
}

.selected-cards::-webkit-scrollbar-thumb {
background-color: #c6c5cb; /* Set the color of the scrollbar thumb */
border-radius: 3px; /* Optional: Add rounded corners to the thumb */
}

  .card-divider{
    width: 100%;
    border: 1px solid #00000035;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .bulk-selection-card{
    height: 35px;
    width: auto;
    padding: 10px;
    background-color: #8E1611;
    color: #fff;
    font-size: 10px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  

  .Status-card-title{
    font-size: 12px;
    color: #000;
    font-weight: bold
  }

  .Status-card-value{
    font-size: 11px;
    color: #000;
  }

  .Status-card-header{
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
 

  .chart-container{
    height: 200px;
    background-color: #ffffffb8;
    margin-top: 20px;
    
  }
  .dashboard-section{
    display: flex;
    justify-content: space-between;
  }

  .main-section{
    width: 100%;    
  }

  .dashboard-container {
    display: flex;
    gap: 70px; /* Space between left and right sections */
  }



  .right-section {
    flex: 0 0 380px; /* Fixed width of 380px */
    width: 380px; /* Fixed width of 380px */
  }

  

  .third-divider{
    height: 400px;
    width: 0px;
    border: 0.5px solid #00000036;
    margin-left: 20px
  }

  .APV1-Nav-indicator{
    max-width: 30px;
    min-width: 22px;
    width: auto;
    height: 20px;
    padding: 1px 3px;
    font-size: 11px;
    background-color: #fff;
    color: #000;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-left: 5px;
  }
  

  .APV1-Nav-indicator2{
    max-width: 30px;
    min-width: 22px;
    width: auto;
    height: 20px;
    padding: 1px 3px;
    font-size: 11px;
    background-color: #E4E5E7;
    color: #000;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-left: 5px;
  }
  



  @media (min-width: 900px) {

   

    .APV1-indicator{
    max-width: 30px;
    min-width: 20px;
    width: auto;
    height: 12px;
    padding: 0px 3px;
    font-size: 9px;
    background-color: #595858;
    color: #fff;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-left: 5px;
  }

    .inputModal{
      height: 100px; 
      width: 400px; 
      font-size: 12px; 
      color: #000;
    }

    .left-section2 {
    flex: 1 1 550px; 
    min-width: 550px; 
  }


.pdf-viewer {
width: 90%; /* Adjust width as needed */
max-width: 1200px; /* Set a maximum width if needed */
height: 85%; /* Adjust height as needed */
max-height: 900px; /* Set a maximum height if needed */
background-color: transparent;
padding: 10px;
box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

.pdf-viewer-iframe {
width: 100%;
height: 100%;
border: none;
}

    .dashboard-section-header{
    
    height: 40px;
    padding: 10px;
    display: flex;
    font-size: 12px;
    font-weight: bold;
    margin-left: 30px;
    margin-right: 40px;
    color:#000;
  }

    .card-label2{
      background-color: #F8F9FC;
      height: 20px;
      width: 120px;
      padding: 3px;
      padding-left: 5px;
      color: #8E1611;
      border-radius: 10px;
      font-size: 8px;
      margin-top: 20px;
  }
  .card-label3{
      background-color: #F8F9FC;
      height: 20px;
      width: 120px;
      padding: 3px;
      padding-left: 5px;
      color: #ab9424;
      border-radius: 10px;
      font-size: 8px;
      margin-top: 20px;
  }

  .card-label4{
      background-color: #F8F9FC;
      height: 22px;
      width: 170px;
      padding: 3px;
      padding-left: 5px;
      color: #000;
      border-radius: 10px;
      font-size: 8px;
      font-weight: bold;
      margin-top: 20px;
      cursor: pointer;
      transition: transform 0.3s;
  }

  .card-label4:hover{
    transform: scale(1.1);
  }

    .card-label1{
      background-color: #F8F9FC;
      height: 20px;
      width: 120px;
      padding: 3px;
      padding-left: 5px;
      color: green;
      border-radius: 10px;
      font-size: 8px;
      margin-top: 20px;
  }

    .card-data{
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    margin-top: 10px;
  }

    .custom-icon-2{
      height: 20px;
      width: auto;
    }

    .custom-icon-3{
      height: 20px;
      width: auto;
    }

    .card-writeup{
    font-size: 13px;
    color: #fff;
   
  }

    .mySwiper {
      width: 100%;
    }

    .swiper-slide {
      display: flex;
      justify-content: center;
    }

    .dashboard-section-body {
      display: flex;
      gap: 20px; 
      flex-wrap: wrap;
    }

    .dashboard-section-body-card {
      background: linear-gradient(135deg, #8E1611, #bd1a14); /* Example gradient */
      height: 130px;
      flex: 1 1 310px; /* Allow cards to grow but maintain a minimum width */
      max-width: 350px; /* Optional: set a max width if needed */
      border: 0.3px solid #D1D9E2;
      padding: 15px;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    
    }

    #myChart{
    height: 120px;
    width: 200px;

  }

    .Status-card{
    padding: 15px;
    height: auto;
    background-color: #f7d1d015;
    border: 1px solid #00000034;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    
  }

    .big-white-card-left {
        background-color: #FFF; 
        margin: 20px 0px; 
        margin-left: 40px;
        margin-right: 20px;
        padding: 20px; 
        height: 730px;
        width: 100%;
      }
    .dashboard-section-body-card2{
      display: none;
    }

    .dashboard-section {
    margin: 0px 40px; 
    height: 130px;
    padding: 0px;
  }

  .custom-table2 {
    border-collapse: collapse;
    border-spacing: 0 10px;
    width: 100%;
  }

  .custom-table2 tr {
    background-color: #f7d1d015;
  }

  .selected-row {
    background-color: #dcdbdb !important
  }

  .custom-table2 tbody tr:hover {
    background-color: #dcdbdb; 
    
  }

  }

  .custom-control-input {
      display: inline-block;
      padding: 0%;
      margin: 0%;
    }

  .vertical-dots-cell {
      position: relative;
    }

  .pending-indicator{
    width: auto;
    height: 20px;
    padding: 2px 5px;
    font-size: 10px;
    background-color: #8E1611;
    color: #fff;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }

  .pending-indicator2{
    width: 60px;
    height: 20px;
    padding: 2px 5px;
    font-size: 10px;
    background-color: #8E1611;
    color: #fff;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }

  .approved-indicator{
    width: 60px;
    height: 20px;
    padding: 2px 5px;
    font-size: 10px;
    background-color: #0f7534;
    color: #fff;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }

  .approved-indicator2{
    width: 60px;
    height: 20px;
    padding: 2px 5px;
    font-size: 10px;
    background-color: #0f7534;
    color: #fff;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }

  .role-indicator{
    width: auto;
    height: 20px;
    padding: 2px 5px;
    font-size: 11px;
    background-color: #595858;
    color: #fff;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-left: 5px;
  }

 

  .app-indicator{
    width: 200px;
    height: 20px;
    padding: 2px 5px;
    font-size: 11px;
    background-color: #8E1611;
    color: #fff;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-left: 5px;
  }


  
/* Styling for table rows */


.custom-table-container {
overflow-y: auto; 
overflow-x: auto; 
}




.custom-table2 th,
.custom-table2 td {
padding: 15px;
text-align: left;
border-bottom: 1px solid #fff;
font-size: 12px;
}

.custom-table2 th {
background-color: #fff;
border-top: 1px solid #f2d6d6;
font-size: 14px;
}


.custom-table2 th,
.custom-table2 td {
border-bottom: 1px;
}



/* Styling for horizontal lines */
.custom-table2 th,
.custom-table2 tbody tr {
border-bottom: 1px solid #f2d6d6;
color: #000;
cursor: pointer;
}

/* Remove border from last row */
.custom-table2 tbody tr:last-child {
border-bottom: 1px solid #ddd1e8;
}

.tab-buttons-container {
display: flex;
overflow-x: auto;
-webkit-overflow-scrolling: touch; 
overflow-y: hidden;
white-space: nowrap;
}

.tab-buttons-container::-webkit-scrollbar {
display: none;
}


  .table-divider{
    width: 100%;
    height: 40px;
    background-color: transparent;
    border-bottom: 0.5px solid #b0a8a8; 
    margin-bottom: 30px
  }

  .dashboard-tabs{
    width: 100%;
    height: 35px;
    background-color: transparent;
  
  }

  .third-responsive{
      display: none;
    }



 

 

 

 

@media (min-width: 1200px) {
.dashboard-section-body-card {
  flex: 0 1 calc(33.33% - 20px); /* Adjust card width to fit 3 cards in a row with spacing */
}
}

  .big-white-card2 {
  background-color: transparent; /* White backgrou                        nd color */
  margin: 0px 0px; /* Margin as needed */
  padding: 10px; /* Padding as needed */
  height: 500px;
}

  .dashboard-section-body-item{
 
    height: 200px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    
  }

.pagination-container {
display: flex;
justify-content: center;
align-items: center;
margin-top: 10px;
width: 100%; /* Ensure the container takes the full width of its parent */
}

.pagination-bullet {
width: 10px;
height: 10px;
background-color: #fea4a1;
border-radius: 50%;
margin: 0 5px;
cursor: pointer;
}

.pagination-bullet.active {
background-color: #8E1611;
}

 

  .canvasTop {
  border-top: 1px;
}

.tab-buttons-head {
display: flex;
margin-bottom: 0px;
}

.tab-buttons-head::-webkit-scrollbar {
display: none; 
}

.tab-buttons-head button {
background-color: #b0a8a849;
border: none;
cursor: pointer;
font-size: 12px;
margin-right: 5px;
border-radius: 10px;
padding: 5px;
color: #363333;
}

.tab-buttons-head button.activeTab {
/* border-bottom: 2px solid #8E1611;  */
background-color: #8E1611;
color: #fff; 
}

.tab-buttons-head2 button {
background-color: #b0a8a849;
border: none;
cursor: pointer;
font-size: 10px;
margin-right: 5px;
border-radius: 10px;
padding: 9px;
color: #363333;
}

.tab-buttons-head2 button.activeTab {
/* border-bottom: 2px solid #8E1611;  */
background-color: #8E1611;
color: #fff; 
}



.tab-buttons {
display: flex;
margin-bottom: 40px;
}

.tab-buttons::-webkit-scrollbar {
display: none; 
}

.tab-buttons button {
background-color: transparent;
border: none;
cursor: pointer;
font-size: 12px;
margin-right: 10px;
padding: 10px;
color: #b0a8a8;
}

.tab-buttons button.activeTab {
border-bottom: 2px solid #8E1611; 
color: #000; 
}

.calendar-dropdown {
border-radius: 5px;
display: flex;
margin-left: 850px;
font-size: 12px;
height: 25px;

}

.dropdown-select {
margin-right: 5px;
border: 1px solid #000;
text-align: center;
border-radius: 3px;
font-size: 12px;
transition: border-color 0.3s ease-in-out;
}

.dropdown-select:hover {
border-color: #4CAF50; /* Green border on hover */
}

.dropdown-select::-webkit-scrollbar {
width: 2px; /* Set the width of the scrollbar */
}

.dropdown-select::-webkit-scrollbar-thumb {
background-color: #c6c5cb; /* Set the color of the scrollbar thumb */
border-radius: 3px; /* Optional: Add rounded corners to the thumb */
}


.custom-icon-size{
  height: 70px;
  width: auto;
}



.big-white-card {
  background-color: #FFF; /* White background color */
  margin: 20px 40px; /* Margin as needed */
  padding: 20px; /* Padding as needed */
  height: 700px;
}



.big-white-card-right {
  background-color: transparent; 
  margin: 20px 0px; 
  margin-right: 30px;
  padding: 0px; 
  height: auto;
}

.center-content {
  text-align: center;
  margin-top: 160px;
  
}


.write-up {
  font-size: 16px;
  margin-top: 10px;
  color: #000;
  font-weight: bold;
}

.head-text {
margin-left: 40px;
font-size: 22px;
color: #000;
font-weight: bold;
}

.head-text2 {
margin-left: 0px;
font-size: 22px;
color: #000;
font-weight: bold;
}

.oval-icon{
  margin-left: 70px;
}
.oval-icon2{
  margin-left: 58px;
}

.oval-icon3a{
  display: flex;
  
}

.subhead-text{
margin-left: 40px;
font-size: 14px;
}

.subhead-text2{
font-size: 14px;
}

.dashboard-cards {
display: flex;
justify-content: space-between;
margin: 20px 40px;
}

.dashboard-card {
flex: 1;
/* border: 1px solid #624915; */
/* border-radius: 5px; */
padding-top: 10px;
background-color: #FFF9ED;
height: 90px;
width: 100px;

}

.card1-border{
border-left: 1px solid #624915 ;
border-top: 1px solid #624915 ;
border-bottom: 1px solid #624915 ;
border-radius: 3px;
}

.card2-border{
border-left: 1px solid #624915 ;
border-top: 1px solid #624915 ;
border-bottom: 1px solid #624915 ;
}

.card3-border{
border-left: 1px solid #624915 ;
border-top: 1px solid #624915 ;
border-bottom: 1px solid #624915 ;
border-right: 1px solid #624915 ;
}

.card4-border{
border-right: 1px solid #624915 ;
border-top: 1px solid #624915 ;
border-bottom: 1px solid #624915 ;
border-radius: 3px;

}

.card3-header {
font-size: 14px;
color:  #5F6D7E;
display: flex;
justify-content: space-between;
}

.card-value {
font-size: 15px;
margin-top: 10px;
margin-left: 20px;
margin-bottom: 0px;
font-weight: bolder;
color: #000;
}

/* .pdf-viewer {
width: 100%;
height: 700px; 
border: none;
} */


.pdf-modal {
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 1002;
background-color: #fff;
padding: 20px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.pdf-viewer-overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
background-color: rgba(0, 0, 0, 0.8);
align-items: center;
z-index: 1001;
}


  
  </style>
  