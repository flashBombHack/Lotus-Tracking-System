<template>
  <dashboard-layout>

    <template v-if="fetchDataLoading">
      <div class="big-white-card2">
        <center><div class="loader"></div></center>
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
        <div class="dashboard-section-header" style="display: flex; justify-content: space-between">
          <div>Overview</div>
          <div style="font-size: 12px; color: #000; font-weight: bold; display: flex;">
            <img class="custom-icon-2" src="@/components/img/Main_Assests/roleIcon.svg" alt="Custom Icon">
            <div class="role-indicator">{{moduleuserRole}}</div></div>
      </div>

    <div class="dashboard-section">
       
      <div class="left-section">


  <div class="dashboard-section-body">

      <div class="dashboard-section-body-item">

          <div class="dashboard-section-body-card">
              <span class="card3-header">
                  <div class="card-writeup">Approved Transactions</div>
                  <img class="custom-icon-2" src="@/components/img/Main_Assests/CardIconApproved.svg" alt="Custom Icon">
              </span>
              <div class="card-data">{{ transactionCounts.ApprovedCount }}</div>
              <div class="card-label1">
                  <img class="custom-icon2" src="@/components/img/Main_Assests/label-icon.svg" alt="Custom Icon">
                  Total Approved Transactions</div>
          </div>

          <div class="dashboard-section-body-card">
              <span class="card3-header">
                <div class="card-writeup">Rejected Transactions</div>
                  <img class="custom-icon-2" src="@/components/img/Main_Assests/CardIconRejected.svg" alt="Custom Icon">
              </span>
              <div class="card-data">{{ transactionCounts.RejectedCount }}</div>
              <div class="card-label2">
                  <img class="custom-icon2" src="@/components/img/Main_Assests/label-icon2.svg" alt="Custom Icon">
                  Total Rejected Transactions</div>
          </div>

         
          <div class="dashboard-section-body-card">
            <span class="card3-header">
              <div class="card-writeup">Pending Transactions</div>
                  <img class="custom-icon-2" src="@/components/img/Main_Assests/CardIconPending.svg" alt="Custom Icon">
              </span>
              <div class="card-data">{{ transactionCounts.PendingCount }}</div>
              <div class="card-label3">
                  <img class="custom-icon2" src="@/components/img/Main_Assests/label-icon3.svg" alt="Custom Icon">
                  Total Pending Transactions</div>
          </div>
        

      </div>
  </div>
     </div>

     <!-- <div class="right-section">
      
         <center> <canvas id="myChart"></canvas> </center>
      

     </div> -->
   


  </div>


    
    

      <div style="display: flex; justify-content: space-between">
      <div class="left-section2">
        <div class="big-white-card-left">
      <div class="table-divider">
        <div style="display: flex; justify-content: space-between"> 
      <div class="tab-buttons">
        <button
          :class="{ activeTab: selectedTab === 'pending' }"
          @click="selectTab('pending')"
        >
          <div style="display: flex;"> All Pending 
            <div v-if="tableData.length != 0 && moduleuserRole == 'Approver1'" class="count-indicator">{{ Apv1tableData.length }}</div>
            <div v-else-if="tableData.length != 0 && moduleuserRole == 'Approver2'" class="count-indicator">{{ Apv2tableData.length }}</div>
            <div v-else-if="tableData.length != 0 && moduleuserRole != 'Approver1' && moduleuserRole != 'Approver2'" class="count-indicator">{{ allTransactions.length }}</div>
          
          </div>
        </button>


        <button v-for="product in products" :key="product.ProductID" @click="selectTab(product.ProductID, product.ProductName)" :class="{ activeTab: selectedTab === product.ProductID }">
      {{ product.ProductID }}
    </button>

      </div>
      <div>
       <!-- Refresh Button-->
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
  </div>

    
      <div v-if="selectedTab === 'pending'">
        <div class="horizontal-container">
      <div style="display: flex;">
      <!-- Dropdown -->

      <div v-if="moduleuserRole != 'Requester'" class="dropdown-container">
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

   <!-- <div v-if="cardSwitch == 'Bulk Approval'" style="display: flex;">
  <div class="button-container" style="height: 35px; margin-left: 10px ">
        <button class="approve-button" @click="bulkApproveTransactions">
          Approve</button>
      </div>

      <div class="button-container" style="height: 35px; margin-left: 10px ">
        <button class="reject-button" @click="showReason">
          Reject</button>
      </div>

      
      <div class="button-container" style="height: 35px; margin-left: 10px ">
        <button class="onboard-button4" @click="refreshTable">
          <span v-if="spinnerloading">
                <i class="fa fa-spinner fa-spin"></i>
              </span>
              <span v-else> <img src="@/components/img/Main_Assests/refresh.svg" alt="Refresh Icon"></span>
         
          Refresh</button>
      </div>

    </div> -->
   


    </div>
    <hr>

    <div class="custom-table-container" :key="currentPage">
      
      <table class="custom-table2">
        <thead>
          <tr>
            <th v-if="cardSwitch == 'Bulk Approval'">
              <span style="font-size: 14px; display: inline; white-space: nowrap;"> 
                <center><input type="checkbox" style="padding-top: 10px;" v-model="selectAll" @change="toggleAllSelections"> Select All </center></span>
            </th>
            <th>Date</th>
            <th>InstructionNo</th>
            <th>Product</th>
            <th>ClientName</th>
            <th>Amount</th>
            <th v-if="moduleuserRole == 'Requester'">Level(1)Status</th>
            <th v-if="moduleuserRole == 'Requester'">Level(2)Status</th>
            <th v-if="moduleuserRole != 'Requester'">Status</th>
            <th style="white-space: nowrap;">Sent By</th>
            <th></th>
            <th v-if="cardSwitch != 'Bulk Approval'"></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredRows.length === 0">
        <tr>
          <td colspan="8" style="text-align: center;">No Pending Transactions</td>
        </tr>
      </template>
          <template v-else-if="searchTerm && filteredRows.length > 0">
          <tr v-for="(transactions, index) in filteredRows" :key="transactions.instructionNo" class="table-row">
            <td v-if="cardSwitch == 'Bulk Approval'" @click.stop><center>
              <div class="custom-control custom-checkbox small">
              <input type="checkbox" class="custom-control-input" :id="'customCheck' + index" v-model="transactions.selected" @click.stop>
              <label class="custom-control-label small-text" :for="'customCheck' + index"></label>
            </div>
          </center>
            </td>
            <td style="white-space: nowrap;">{{ formatDate(transactions.RequestDate) }}</td>
            <td style="color: green; font-weight: bold; white-space: nowrap;">{{ transactions.RequestNo }}</td>
            <td>{{ transactions.InvestmentProduct }}</td>
            <td style="white-space: nowrap;">{{ transactions.ClientName }}</td>
            <td>₦{{ formatAmount(transactions.Amount) }}</td>

            <td v-if="moduleuserRole == 'Requester'">
              <div v-if="transactions.ApprovalLevel1Status == 0">
                <center><div class="pending-indicator2"><center>Pending</center></div></center>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1">
              <center><div class="approved-indicator2"><center>Approved</center></div></center>
            </div>
            </td>

            <td v-if="moduleuserRole == 'Requester'">
              <div v-if="transactions.ApprovalLevel2Status == 0">
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel2Status == 1">
              <div class="approved-indicator2"><center>Approved</center></div>
            </div>
            </td>

            <td v-if="moduleuserRole != 'Requester'">
              <div v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'">
              <div class="pending-indicator"><center>Pending</center></div>
            </div>
            <div v-if="moduleuserRole == 'Reviewer'">
              <div class="approved-indicator"><center>Approved</center></div>
            </div>
            </td>
            <td style="white-space: nowrap;">{{ transactions.PostedBy }}</td>
            <td><div class="attachment-button" @click.stop="openDocument(transactions.AttachmentsBase64)">View Attachment</div> </td>
            <td v-if="cardSwitch != 'Bulk Approval' && moduleuserRole != 'Requester'" class="vertical-dots-cell">
            <!-- Vertically aligned dots -->
            <img src="@/components/img/Main_Assests/dots.svg" 
                 alt="View Icon" 
                 style="padding-right: 10px;"
                 @click.stop="togglePopup(transactions)">

            <!-- Popup tab -->
            <div class="popup-tab2" v-show="transactions.showPopup">

              <div v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'" @click.stop="showApprove(transactions)" class="popup-item nav-link">
                <img v-if="!hovered" src="@/components/img/Main_Assests/popcheckblack.svg" 
                     alt="eye Icon" 
                     class="popup-icon"
                     style="height: 12px; width: auto; margin-left: 2px;">
                <img v-else src="@/components/img/Main_Assests/popcheck.svg" 
                     alt="eye Icon" 
                     class="popup-icon"
                     style="height: 12px; width: auto; margin-left: 2px;">
                     Approve
                    </div>

                     <div  v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'" class="divider"></div>

                <div  v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'" @click.stop="showReason(transactions)" class="popup-item2">
                  <img v-if="!hovered" src="@/components/img/Main_Assests/rejecticon.svg" 
                       alt="plus Icon" 
                       class="popup-icon2"
                       style="height: 12px; width: auto; margin-left: 7px">
                  <img v-else src="@/components/img/Main_Assests/rejecticon.svg" 
                       alt="plus Icon" 
                       class="popup-icon2"
                       style="height: 12px; width: auto; margin-left: 5px">
                  Reject
                </div>

                <div  v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'" class="divider"></div>

                <div  v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'" @click="ViewTransaction(transactions)" class="popup-item3">
                  <img v-if="!hovered" src="@/components/img/Main_Assests/blackeye.svg" 
                       alt="plus Icon" 
                       class="popup-icon3"
                       style="height: 14px; width: auto; margin-left: 7px">
                  <img v-else src="@/components/img/Main_Assests/blackeye.svg" 
                       alt="plus Icon" 
                       class="popup-icon3"
                       style="height: 15px; width: auto; margin-left: 5px">
                  View More
                </div>

                <div v-if="moduleuserRole == 'Reviewer'" class="divider"></div>
                    <!-- For Paid -->
                <div v-if="moduleuserRole == 'Reviewer'" @click.stop="CheckPaid(transactions)" class="popup-itemX">
                  <img v-if="!hovered" src="@/components/img/Main_Assests/popcheckblack.svg" 
                       alt="plus Icon" 
                       class="popup-icon"
                       style="height: 14px; width: auto; margin-left: 7px">
                  <img v-else src="@/components/img/Main_Assests/popcheckblack.svg" 
                       alt="plus Icon" 
                       class="popup-icon3"
                       style="height: 15px; width: auto; margin-left: 5px">
                  Paid
                </div>
                   
                <div v-if="moduleuserRole == 'Reviewer'" class="divider"></div>
                   <!-- for Failing -->
                <div v-if="moduleuserRole == 'Reviewer'" @click.stop="CheckFalied(transactions)" class="popup-item2">
                  <img v-if="!hovered" src="@/components/img/Main_Assests/rejecticon.svg" 
                       alt="plus Icon" 
                       class="popup-icon2"
                       style="height: 14px; width: auto; margin-left: 7px">
                  <img v-else src="@/components/img/Main_Assests/rejecticon.svg" 
                       alt="plus Icon" 
                       class="popup-icon3"
                       style="height: 15px; width: auto; margin-left: 5px">
                  Failed
                </div>
            </div>
          </td>
            
         </tr>
          </template>
          <template v-else>
           <tr v-for="(transactions, index) in visibleRows" :key="transactions.instructionNo" @click="ViewTransaction(transactions)" class="table-row">
            <td v-if="cardSwitch == 'Bulk Approval'" @click.stop><center>
              <div class="custom-control custom-checkbox small">
              <input type="checkbox" class="custom-control-input" :id="'customCheck' + index" v-model="transactions.selected" @click.stop>
              <label class="custom-control-label small-text" :for="'customCheck' + index"></label>
            </div>
          </center>
            </td>
            <td style="white-space: nowrap;">{{ formatDate(transactions.RequestDate) }}</td>
            <td style="color: green; font-weight: bold; white-space: nowrap;">{{ transactions.RequestNo }}</td>
            <td>{{ transactions.InvestmentProduct }}</td>
            <td style="white-space: nowrap;">{{ transactions.ClientName }}</td>
            <td>₦{{ formatAmount(transactions.Amount) }}</td>

            <td v-if="moduleuserRole == 'Requester'">
              <div v-if="transactions.ApprovalLevel1Status == 0">
                <center><div class="pending-indicator2"><center>Pending</center></div></center>
            </div>
            <div v-if="transactions.ApprovalLevel1Status == 1">
              <center><div class="approved-indicator2"><center>Approved</center></div></center>
            </div>
            </td>

            <td v-if="moduleuserRole == 'Requester'">
              <div v-if="transactions.ApprovalLevel2Status == 0">
              <div class="pending-indicator2"><center>Pending</center></div>
            </div>
            <div v-if="transactions.ApprovalLevel2Status == 1">
              <div class="approved-indicator2"><center>Approved</center></div>
            </div>
            </td>

            <td v-if="moduleuserRole != 'Requester'">
              <div v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'">
              <div class="pending-indicator"><center>Pending</center></div>
            </div>
            <div v-if="moduleuserRole == 'Reviewer'">
              <div class="approved-indicator"><center>Approved</center></div>
            </div>
            </td>
            <td style="white-space: nowrap;">{{ transactions.PostedBy }}</td>
            <td><div class="attachment-button" @click.stop="openDocument(transactions.AttachmentsBase64)">View Attachment</div> </td>
            <td v-if="cardSwitch != 'Bulk Approval' && moduleuserRole != 'Requester'" class="vertical-dots-cell">
            <!-- Vertically aligned dots -->
            <img src="@/components/img/Main_Assests/dots.svg" 
                 alt="View Icon" 
                 style="padding-right: 10px;"
                 @click.stop="togglePopup(transactions)">

            <!-- Popup tab -->
            <div class="popup-tab2" v-show="transactions.showPopup">

              <div v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'" @click.stop="showApprove(transactions)" class="popup-item nav-link">
                <img v-if="!hovered" src="@/components/img/Main_Assests/popcheckblack.svg" 
                     alt="eye Icon" 
                     class="popup-icon"
                     style="height: 12px; width: auto; margin-left: 2px;">
                <img v-else src="@/components/img/Main_Assests/popcheck.svg" 
                     alt="eye Icon" 
                     class="popup-icon"
                     style="height: 12px; width: auto; margin-left: 2px;">
                     Approve
                    </div>

                     <div  v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'" class="divider"></div>

                <div  v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'" @click.stop="showReason(transactions)" class="popup-item2">
                  <img v-if="!hovered" src="@/components/img/Main_Assests/rejecticon.svg" 
                       alt="plus Icon" 
                       class="popup-icon2"
                       style="height: 12px; width: auto; margin-left: 7px">
                  <img v-else src="@/components/img/Main_Assests/rejecticon.svg" 
                       alt="plus Icon" 
                       class="popup-icon2"
                       style="height: 12px; width: auto; margin-left: 5px">
                  Reject
                </div>

                <div  v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'" class="divider"></div>

                <div  v-if="moduleuserRole == 'Approver1' || moduleuserRole == 'Approver2'" @click="ViewTransaction(transactions)" class="popup-item3">
                  <img v-if="!hovered" src="@/components/img/Main_Assests/blackeye.svg" 
                       alt="plus Icon" 
                       class="popup-icon3"
                       style="height: 14px; width: auto; margin-left: 7px">
                  <img v-else src="@/components/img/Main_Assests/blackeye.svg" 
                       alt="plus Icon" 
                       class="popup-icon3"
                       style="height: 15px; width: auto; margin-left: 5px">
                  View More
                </div>

                <div v-if="moduleuserRole == 'Reviewer'" class="divider"></div>
                    <!-- For Paid -->
                <div v-if="moduleuserRole == 'Reviewer'" @click.stop="CheckPaid(transactions)" class="popup-itemX">
                  <img v-if="!hovered" src="@/components/img/Main_Assests/popcheckblack.svg" 
                       alt="plus Icon" 
                       class="popup-icon"
                       style="height: 14px; width: auto; margin-left: 7px">
                  <img v-else src="@/components/img/Main_Assests/popcheckblack.svg" 
                       alt="plus Icon" 
                       class="popup-icon3"
                       style="height: 15px; width: auto; margin-left: 5px">
                  Paid
                </div>
                   
                <div v-if="moduleuserRole == 'Reviewer'" class="divider"></div>
                   <!-- for Failing -->
                <div v-if="moduleuserRole == 'Reviewer'" @click.stop="CheckFalied(transactions)" class="popup-item2">
                  <img v-if="!hovered" src="@/components/img/Main_Assests/rejecticon.svg" 
                       alt="plus Icon" 
                       class="popup-icon2"
                       style="height: 14px; width: auto; margin-left: 7px">
                  <img v-else src="@/components/img/Main_Assests/rejecticon.svg" 
                       alt="plus Icon" 
                       class="popup-icon3"
                       style="height: 15px; width: auto; margin-left: 5px">
                  Failed
                </div>
            </div>
          </td>

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
      <div style="display: flex;">
      <!-- Dropdown -->

      <div v-if="moduleuserRole != 'Requester'" class="dropdown-container">
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

   <div v-if="cardSwitch == 'Bulk Approval'" style="display: flex;">
  <div class="button-container" style="height: 35px; margin-left: 10px ">
        <button class="approve-button" @click="openOnboardingModal0">
          Approve</button>
      </div>

      <div class="button-container" style="height: 35px; margin-left: 10px ">
        <button class="reject-button" @click="openOnboardingModal0">
          Reject</button>
      </div>

      <!-- Refresh Button-->
      <div class="button-container" style="height: 35px; margin-left: 10px ">
        <button class="onboard-button4" @click="openOnboardingModal0">
          <img src="@/components/img/Main_Assests/refresh.svg" alt="Refresh Icon">
          Refresh</button>
      </div>

    </div>
    <div v-else>
       <!-- Refresh Button-->
       <div class="button-container" style="height: 35px; ">
        <button class="onboard-button4" @click="openOnboardingModal0">
          <img src="@/components/img/Main_Assests/refresh.svg" alt="Refresh Icon">
          Refresh</button>
      </div>
    </div>


    </div>
    <hr>

    <div class="custom-table-container" :key="currentPage">
      
      <table class="custom-table2">
        <thead>
          <tr>
            <th v-if="cardSwitch == 'Bulk Approval'">
              <span style="font-size: 14px; display: inline; white-space: nowrap;"> 
                <center><input type="checkbox" style="padding-top: 10px;" v-model="selectAll" @change="toggleAllSelections"> Select All </center></span>
            </th>
            <th>Date</th>
            <th>InstructionNo</th>
            <th>Product</th>
            <th>ClientName</th>
            <th>Amount</th>
            <th style="white-space: nowrap;">Sent By</th>
            <th>Status</th>
            <th></th>
            <th v-if="cardSwitch != 'Bulk Approval'"></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredRows.length === 0">
        <tr>
          <td colspan="8" style="text-align: center;">No Pending Transactions</td>
        </tr>
      </template>
          <template v-else-if="searchTerm && filteredRows.length > 0">
          <tr v-for="(transactions, index) in filteredRows" :key="transactions.instructionNo" class="table-row">
            <td v-if="cardSwitch == 'Bulk Approval'"><center>
              <div class="custom-control custom-checkbox small">
              <input type="checkbox" class="custom-control-input" :id="'customCheck' + index" v-model="transactions.index" >
              <label class="custom-control-label small-text" :for="'customCheck' + index"></label>
            </div>
          </center>
            </td>
            <td style="white-space: nowrap;">{{ transactions.RequestDate }}</td>
            <td style="color: green; font-weight: bold;">{{ transactions.RequestNo }}</td>
            <td>{{ transactions.InvestmentProduct }}</td>
            <td>{{ transactions.ClientName }}</td>
            <td>{{ transactions.Amount }}</td>
            <td>{{ transactions.PostedBy }}</td>
            <td><div class="pending-indicator">Pending</div></td>
            <td style="z-index: 2;"><div class="attachment-button" @click="openDocument(transactions.AttachmentsBase64)">View Attachment</div> </td>
            <td v-if="cardSwitch != 'Bulk Approval'" class="vertical-dots-cell">
            <!-- Vertically aligned dots -->
            <img src="@/components/img/Main_Assests/dots.svg" 
                 alt="View Icon" 
                 style="padding-right: 10px;"
                 @click.stop="togglePopup(transactions)">

            <!-- Popup tab -->
            <div class="popup-tab2" v-show="transactions.showPopup">
              <div class="popup-item nav-link">
                <img v-if="!hovered" src="@/components/img/Main_Assests/blackeye.svg" 
                     alt="eye Icon" 
                     class="popup-icon"
                     style="height: 12px; width: auto; margin-left: 2px;">
                <img v-else src="@/components/img/Main_Assests/coloreye.svg" 
                     alt="eye Icon" 
                     class="popup-icon"
                     style="height: 12px; width: auto; margin-left: 2px;">Approve</div>
            </div>
          </td>
            
         </tr>
          </template>
          <template v-else>
           <tr v-for="(transactions, index) in visibleRows" :key="transactions.instructionNo" @click="ViewTransaction(transactions)" class="table-row">
            <td v-if="cardSwitch == 'Bulk Approval'" @click.stop><center>
              <div class="custom-control custom-checkbox small">
              <input type="checkbox" class="custom-control-input" :id="'customCheck' + index" v-model="transactions.selected" @click.stop>
              <label class="custom-control-label small-text" :for="'customCheck' + index"></label>
            </div>
          </center>
            </td>
            <td style="white-space: nowrap;">{{ formatDate(transactions.RequestDate) }}</td>
            <td style="color: green; font-weight: bold; white-space: nowrap;">{{ transactions.RequestNo }}</td>
            <td>{{ transactions.InvestmentProduct }}</td>
            <td style="white-space: nowrap;">{{ transactions.ClientName }}</td>
            <td>₦{{ formatAmount(transactions.Amount) }}</td>
            <td style="white-space: nowrap;">{{ transactions.PostedBy }}</td>
            <td><div class="pending-indicator"><center>Pending</center></div></td>
            <td><div class="attachment-button" @click.stop="openDocument(transactions.AttachmentsBase64)">View Attachment</div> </td>
            <td v-if="cardSwitch != 'Bulk Approval' && moduleuserRole != 'Requester'" class="vertical-dots-cell">
            <!-- Vertically aligned dots -->
            <img src="@/components/img/Main_Assests/dots.svg" 
                 alt="View Icon" 
                 style="padding-right: 10px;"
                 @click.stop="togglePopup(transactions)">

            <!-- Popup tab -->
            <div class="popup-tab2" v-show="transactions.showPopup">
              <div class="popup-item nav-link">
                <img v-if="!hovered" src="@/components/img/Main_Assests/popcheckblack.svg" 
                     alt="eye Icon" 
                     class="popup-icon"
                     style="height: 12px; width: auto; margin-left: 2px;">
                <img v-else src="@/components/img/Main_Assests/popcheck.svg" 
                     alt="eye Icon" 
                     class="popup-icon"
                     style="height: 12px; width: auto; margin-left: 2px;">Approve</div>

                     <div class="divider"></div>

                <div @click="showReason(transactions)" class="popup-item2">
                  <img v-if="!hovered" src="@/components/img/Main_Assests/rejecticon.svg" 
                       alt="plus Icon" 
                       class="popup-icon2"
                       style="height: 12px; width: auto; margin-left: 7px">
                  <img v-else src="@/components/img/Main_Assests/rejecticon.svg" 
                       alt="plus Icon" 
                       class="popup-icon2"
                       style="height: 12px; width: auto; margin-left: 5px">
                  Reject
                </div>

                <div class="divider"></div>

                <div @click="ViewTransaction(transactions)" class="popup-item3">
                  <img v-if="!hovered" src="@/components/img/Main_Assests/blackeye.svg" 
                       alt="plus Icon" 
                       class="popup-icon3"
                       style="height: 14px; width: auto; margin-left: 7px">
                  <img v-else src="@/components/img/Main_Assests/blackeye.svg" 
                       alt="plus Icon" 
                       class="popup-icon3"
                       style="height: 15px; width: auto; margin-left: 5px">
                  View More
                </div>
            </div>
          </td>

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
      
         <center> <canvas id="myChart"></canvas> </center>
        </div>
      

     </div>


 
  </div>

  <div v-if="showDocument" class="pdf-viewer-overlay">
  <div class="pdf-viewer">
    <!-- Inside your template -->
    <iframe :src="getDocumentUrl(pdfsrc)" class="pdf-viewer-iframe"  controls="0"></iframe>


    <button @click="closeDocumentModal" class="btn btn-danger">Close</button>
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

  </div>

  </template>

  </dashboard-layout>
</template>
  
  <script>
  import DashboardLayout from '@/components/DashboardLayout.vue';
  import ViewTransaction from './ViewTransaction.vue'
  import Chart from 'chart.js/auto';
  import axios from 'axios'; 

  
  export default {
    name: 'Tracker-dashboard',

  
    components: {
      DashboardLayout,
      ViewTransaction,
    },
  
    data() {
    return {
      myChart: null,
      showDocument: false,
      pdfsrc: null,
      selectedTab: 'pending',
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
      rowsPerPage: 5,
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
      allTransactions: [],
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
    };
  },
  async mounted() {
    
    document.addEventListener('click', this.closePopups);

    this.userRole = sessionStorage.getItem('role');
    this.UserId = sessionStorage.getItem('userId');

    try{
      await this.fetchProducts();
      await this.setUserRoleInSession();
      this.moduleuserRole = sessionStorage.getItem('moduleuserRole');
      console.log(`User role before initilizing: ${this.moduleuserRole}`);

      if(this.moduleuserRole != 'Reviewer'){
        await this.fetchTransactions();
      } else{
        await this.fetchCompletedTransactions();
      }
      
    await this.filterTransactions();
    await this.fetchTransactionCounts();
    await this.finalTransactionStatus();
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

    this.$nextTick(() => {
    this.initializeChart();
  });
   
    const currentYear = new Date().getFullYear();
    for (let year = 2000; year <= 2030; year++) {
      this.years.push(year);
    }
    console.log(currentYear);


    this.refreshInterval = setInterval(() => {
      if(this.moduleuserRole != 'Reviewer'){
         this.fetchTransactions();
         this.fetchTransactionCounts();
      } else{
        this.fetchCompletedTransactions();
        this.fetchTransactionCounts();
      }
  }, 30000);
  },

  beforeUnmount() {
  // Clear the interval when the component is destroyed
  if (this.refreshInterval) {
    clearInterval(this.refreshInterval);
  }
},

  computed: {

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

    async refreshTable(){

      try{

        this.spinnerloading = true;

      if(this.moduleuserRole != 'Reviewer'){
        await this.fetchTransactions();
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

    getDocumentUrl(base64String) {
    return `data:application/pdf;base64,${base64String}`;
  },

    openDocument(PDFSrc){

      this.showDocument = true;
      this.pdfsrc = PDFSrc;

    },

    closeDocumentModal() {
    this.showDocument = false;
    this.pdfsrc = null;
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
  .dashboard-section{
    display: flex;
    justify-content: space-between;
  }

  .left-section{
    width: 100%;    
  }

  .left-section2{
    width: 690px;    
  }

  .card-writeup{
    font-size: 13px;
    color: #fff;
   
  }

  .third-divider{
    height: 400px;
    width: 0px;
    border: 0.5px solid #00000036;
    margin-left: 20px
  }
  .right-section{  
    width: 500px;
  }

  @media (max-width: 900px) {

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

    .dashboard-section-body-card{
      min-width: 400px;
      width: calc(50% - 0px);
      max-width: 600px;
    }

    .dashboard-section{
      margin: 20px 40px; 
      height: 380px;
      padding: 0px;
      } 
  }

  @media (min-width: 900px) {
    .dashboard-section-body-card2{
      display: none;
    }

    .dashboard-section {
    margin: 0px 40px; 
    height: 130px;
    padding: 0px;
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
    width: auto;
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
.custom-table2 tbody tr:hover {
background-color: #dcdbdb; 

}

.custom-table-container {
overflow-y: auto; 
overflow-x: auto; 
}


.custom-table2 {
border-collapse: collapse;
border-spacing: 0 10px;
width: 100%;
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

.custom-table2 tr {
background-color: #F8F9FC;
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

  .table-divider{
    width: 100%;
    height: 40px;
    background-color: transparent;
    border-bottom: 0.5px solid #b0a8a8; 
    margin-bottom: 30px
  }

  .third-responsive{
      display: none;
    }

  #myChart{
    height: 150px;
    width: 220px;
    margin-bottom: 100px;

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

  .card-data{
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    margin-top: 10px;
  }

  .dashboard-section-body-card {
background: linear-gradient(135deg, #8E1611, #bd1a14); /* Example gradient */
height: 130px;
width: 310px;
border: 0.3px solid #D1D9E2;
padding: 15px;
border-radius: 15px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
}

  .big-white-card2 {
  background-color: transparent; /* White background color */
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

 
  .dashboard-section-body{
    /* background-color: #FFF; */
    display: flex;
    
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

  .canvasTop {
  border-top: 1px;
}

.tab-buttons {
display: flex;
margin-bottom: 40px;
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

.custom-icon-2{
  height: 20px;
  width: auto;
}

.big-white-card {
  background-color: #FFF; /* White background color */
  margin: 20px 40px; /* Margin as needed */
  padding: 20px; /* Padding as needed */
  height: 500px;
}

.big-white-card-left {
  background-color: #FFF; 
  margin: 20px 0px; 
  margin-left: 40px;
  margin-right: 20px;
  padding: 20px; 
  height: 500px;
}

.big-white-card-right {
  background-color: #FFF; 
  margin: 20px 0px; 
  margin-right: 30px;
  padding: 20px; 
  height: 500px;
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

.pdf-viewer {
width: 100%; /* Adjust width as needed */
height: 700px; /* Adjust height as needed */
border: none;
}


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
  
  </style>
  