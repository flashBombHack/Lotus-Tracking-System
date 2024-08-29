<template>

    <div v-if="TransactionData">
     <div v-show="showTransactionCard">
      <div v-show="showCard">
   <div class="modal-overlay" >

    <div v-if="!isMobile" class="card mb-4 transaction-card">
    <div class="card-header card-header3">
      <div class="row justify-content-between">
        <div style="display: flex; justify-content: space-between;">


          
          <!-- Display client name -->
          <div class="card-title">Client Name: {{ TransactionData.ClientName }}</div>
          <!-- Display instruction number -->
          <div class="card-title">Instruction No: {{ TransactionData.RequestNo }}</div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div style="display: flex; justify-content: space-between;">
        <div class="card-text" style="width: 250px;">
          <!-- Display transaction details -->
          <p><strong>Request Date:</strong><br> {{ formatDate(TransactionData.RequestDate) }}</p>
          <p><strong>Document Date:</strong><br> {{ formatDate(TransactionData.DocumentDate) }}</p>
          <p style="color: green; font-weight: bold; white-space: nowrap;"><strong>Instruction No:</strong><br> {{ TransactionData.RequestNo }}</p>
          <!-- Add more details as needed -->

          <div style="display: flex; justify-content: space-between">
        <div style="display: flex;">
        <div @click="CloseCard" class="cardClose-button"><center>Close</center></div>
        <div @click="openDocument(TransactionData.RequestNo)" class="attachment-button2">
          <span v-if="spinnerloading2">
                <i class="fa fa-spinner fa-spin mr-2"></i>
              </span>
              <span v-else><i class="fas fa-eye mr-2"></i></span>
              View Attachment</div>
        </div>
  </div>
        </div>


        <div class="card-text" style="width: 250px;">
          <p><strong>Client Code:</strong>  {{ TransactionData.ClientCode }}</p>
          <p><strong>Posted By:</strong> {{ TransactionData.PostedBy }}</p>
          <p><strong>Amount:</strong> ₦{{ formatAmount(TransactionData.Amount) }}</p>
          <p><strong>Quantity:</strong> {{ formatAmount(TransactionData.Quantity) }}</p>
          
        </div>

        

        
        <div class="card-text" style="width: 250px;">
          <!-- Display approval status -->
          <p v-if="TransactionData.ApprovalLevel1Status === 1" class="card-text " ><strong>Level (1) Approval Status:</strong> <h8 style="font-weight: bold;color: rgb(25, 134, 58)">  <div class="approved-indicator3 mb-2"><center>Approved</center></div></h8>
            <strong>Date Approved:</strong><br>{{ formatDate(TransactionData.ApprovalRejectionTime1) }}<br>
              <strong>ApprovedBy:</strong><br>{{ TransactionData.ApprovedBy1}}
            </p>
          <div v-if="TransactionData.ApprovalLevel1Status === 1" class="card-divider"></div>
          

          <p v-if="TransactionData.ApprovalLevel1Status === 2" class="card-text"><strong>Level (1) Approval Status:</strong><h8 style="font-weight: bold;color: rgb(207, 15, 24)"> <div class="rejected-indicator3 mb-2"><center>Rejected</center></div></h8>
          <strong>RejectedBy:</strong><br>{{ TransactionData.ApprovedBy1}}<br>
          <strong>Date Rejected:</strong><br>{{ formatDate(TransactionData.ApprovalRejectionTime1)  }}<br>
          <strong>Reason:</strong><br>{{ TransactionData.Level1Reason}}
        </p>
        <div v-if="TransactionData.ApprovalLevel1Status === 2" class="card-divider"></div>

          <p v-if="TransactionData.ApprovalLevel2Status === 1" class="card-text"><strong>Level (2)Approval Status:</strong><h8 style="font-weight: bold;color: rgb(25, 134, 58)"><div class="approved-indicator3 mb-2"><center>Approved</center></div>  </h8>
          <strong>Date Approved:</strong><br>{{ formatDate(TransactionData.ApprovalRejectionTime2) }}<br>
            <strong>ApprovedBy:</strong><br>{{ TransactionData.ApprovedBy2}}
          </p>

          <div v-if="TransactionData.ApprovalLevel2Status === 1" class="card-divider"></div>

          <p v-if="TransactionData.ApprovalLevel2Status === 2" class="card-text"><strong>Level (2) Approval Status:</strong> <h8 style="font-weight: bold;color: rgb(207, 15, 24)"> <div class="rejected-indicator3 mb-2"><center>Rejected</center></div></h8>
            <strong>RejectedBy:</strong><br>{{ TransactionData.ApprovedBy2}}<br>
          <strong>Date Rejected:</strong><br>{{ formatDate(TransactionData.ApprovalRejectionTime2) }}<br>
            <strong>Reason:</strong><br>{{ TransactionData.Level2Reason}}
      </p>
      <div v-if="TransactionData.ApprovalLevel2Status === 2" class="card-divider"></div>

         
      </div>


      
      </div>
      <br>

     
    </div>    

   
  </div>

  <div v-if="isMobile"  class="card mb-4 transaction-card" style="max-width: 500px;">
    <div class="card-header card-header3">
      <div class="row justify-content-between">
        <div style="display: flex; justify-content: space-between;">


          
          <!-- Display client name -->
          <div class="card-title" style="font-size: 9px">Client Name: {{ TransactionData.ClientName }}</div>
          <!-- Display instruction number -->
          <!-- <div class="card-title" style="font-size: 8px">Instruction No: {{ TransactionData.RequestNo }}</div> -->
        </div>
      </div>
    </div>

    <div class="card-body">
      <div style="display: flex; justify-content: space-between;">
        <div class="card-text mr-5">
          <!-- Display transaction details -->
          <p><strong>Request Date:</strong><br> {{ formatDate(TransactionData.RequestDate) }}</p>
          <p><strong>Document Date:</strong><br> {{ formatDate(TransactionData.DocumentDate) }}</p>
          <p style="color: green; font-weight: bold; white-space: nowrap;"><strong>Instruction No:</strong><br> {{ TransactionData.RequestNo }}</p><br>

          <p v-if="TransactionData.ApprovalLevel1Status === 1" class="card-text " ><strong style="white-space: nowrap;">Level (1) Approval Status:</strong> <h8 style="font-weight: bold;color: rgb(25, 134, 58)">  <div class="approved-indicator mb-2"><center>Approved</center></div></h8>
            <strong>Date Approved:</strong><br>{{ formatDate(TransactionData.ApprovalRejectionTime1) }}<br>
              <strong>ApprovedBy:</strong><br>{{ TransactionData.ApprovedBy1}}
            </p>
          <!-- <div v-if="TransactionData.ApprovalLevel1Status === 1" class="card-divider"></div> -->
          

          <p v-if="TransactionData.ApprovalLevel1Status === 2" class="card-text"><strong style="white-space: nowrap;">Level (1) Approval Status:</strong><h8 style="font-weight: bold;color: rgb(207, 15, 24)"> <div class="pending-indicator2 mb-2"><center>Rejected</center></div></h8>
          <strong>RejectedBy:</strong><br>{{ TransactionData.ApprovedBy1}}<br>
          <strong>Date Rejected:</strong><br>{{ formatDate(TransactionData.ApprovalRejectionTime1)  }}<br>
          <strong>Reason:</strong><br>{{ TransactionData.Level1Reason}}
        </p>
          <!-- Add more details as needed -->

      
        </div>


        <div class="card-text">
          <p><strong>Client Code:</strong>  {{ TransactionData.ClientCode }}</p>
          <p><strong>Posted By:</strong> {{ PostedBy }}</p>
          <p><strong>Amount:</strong> ₦{{ formatAmount(TransactionData.Amount) }}</p>
          <p><strong>Quantity:</strong> {{ formatAmount(TransactionData.Quantity) }}</p><br>

          <!-- <div v-if="TransactionData.ApprovalLevel1Status === 2" class="card-divider"></div> -->

            <p v-if="TransactionData.ApprovalLevel2Status === 1" class="card-text"><strong style="white-space: nowrap;">Level (2)Approval Status:</strong><h8 style="font-weight: bold;color: rgb(25, 134, 58)"><div class="approved-indicator mb-2"><center>Approved</center></div>  </h8>
            <strong>Date Approved:</strong><br>{{ formatDate(TransactionData.ApprovalRejectionTime2) }}<br>
              <strong>ApprovedBy:</strong><br>{{ TransactionData.ApprovedBy2}}
            </p>

            <!-- <div v-if="TransactionData.ApprovalLevel2Status === 1" class="card-divider"></div> -->

            <p v-if="TransactionData.ApprovalLevel2Status === 2" class="card-text"><strong>Level (2) Approval Status:</strong> <h8 style="font-weight: bold;color: rgb(207, 15, 24)"> <div class="pending-indicator2 mb-2"><center>Rejected</center></div></h8>
              <strong>RejectedBy:</strong><br>{{ TransactionData.ApprovedBy2}}<br>
            <strong>Date Rejected:</strong><br>{{ formatDate(TransactionData.ApprovalRejectionTime2) }}<br>
              <strong>Reason:</strong><br>{{ TransactionData.Level2Reason}}
            </p>
            <!-- <div v-if="TransactionData.ApprovalLevel2Status === 2" class="card-divider"></div> -->
          
        </div>

        

        
        <div class="card-text" style="width: 250px;">
          <!-- Display approval status -->
          
      

         
      </div>


      
      </div>
      <br>

     
    </div>   
    
   <div style="display: flex; justify-content: space-between; margin-left: 30px;">
        <div style="display: flex;">
        <div @click="CloseCard" class="cardClose-button"><center>Close</center></div>
        <div @click="openDocument(TransactionData.RequestNo)" class="attachment-button2">
          <span v-if="spinnerloading2">
                <i class="fa fa-spinner fa-spin mr-2"></i>
              </span>
              <span v-else><i class="fas fa-eye mr-2"></i></span>
              View Attachment</div>
        </div>
  </div>

   
  </div>

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
                  <i class="fa fa-spinner fa-spin"></i>
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
          <button class="logout-button" @click="rejectTransaction">Submit</button>
        </div>
      </div>
    </div>
  </Modal>
      </div>
</template>


<script>
 import axios from 'axios';
 import { getDocument} from 'pdfjs-dist';
 import * as pdfjsLib from 'pdfjs-dist/build/pdf';

export default {
    props: ['showTransactionCard', 'TransactionData'],

    data() {
      return {
        windowWidth: window.innerWidth,
        pdfDoc: null,
        numPages: 0,
        currentPDFPage: 1,
        pdfCanvas: null,
        showDocument: false,
        showDocument2: false,
        pdfsrc: null,
        pdfBlobUrl: '',
        moduleuserRole: '',
        showCard: true,
        userRole: '',
        showReasonModal: false,
        showApproveModal: false,
        characterCount: 0,
        reason: '',
        errorReasonMessage: false,
        spinnerloading: false,
        spinnerloading2: false,
      }
    },

    mounted() {
      window.addEventListener('resize', this.handleResize);
      this.moduleuserRole = sessionStorage.getItem('moduleuserRole');
      this.userRole = sessionStorage.getItem('role');
  },

  computed: {

    PostedBy() {
      if (this.TransactionData.PostedBy.length > 20) {
        return this.TransactionData.PostedBy.slice(0, 20) + '...';
      }
      return this.TransactionData.PostedBy;
    },

isMobile() {
return this.windowWidth < 768;
},
  },

    methods: {

      async renderPDF() {
      window.FlutterBridge.postMessage(this.pdfsrc);
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

        // Set the scale for rendering
        const displayScale = window.innerWidth < 768 ? 0.5 : 1.0; // Display scale based on screen width
        const renderScale = 2.0; // Render scale for high-resolution rendering
        const viewport = page.getViewport({ scale: renderScale });

        // Set canvas dimensions to match the viewport
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Use CSS to scale the canvas for display
        canvas.style.width = `${viewport.width * displayScale / renderScale}px`;
        canvas.style.height = `${viewport.height * displayScale / renderScale}px`;

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


    downloadPDF() {
      const link = document.createElement('a');
      link.href = this.getDocumentUrl(this.pdfsrc);
      link.download = 'document.pdf';
      link.click();
    },

      handleResize() {
      this.windowWidth = window.innerWidth;
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

  updateApprovalStatus(approvalData) {
    const token = sessionStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    const endpoint = `${this.$config.UPDATEAPPROVALSTATUS_ENDPOINT}/${this.TransactionData.RequestNo}`;

    axios.post(endpoint, approvalData, { headers })
      .then(response => {
        console.log('Transaction status updated successfully', response.data);
        this.$toast.open({
          message: 'Transaction Updated successfully',
          type: 'success',
          duration: 3000,
        });
        this.spinnerloading = false;
        this.showReasonModal = false;
        this.showApproveModal = false;
        this.$emit('update-transaction');
      })
      .catch(error => {
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
        this.showCard = true;

      },

      showApprove(){
        this.showApproveModal = true;
        this.showCard = false;

      },

      closeReason(){
        this.showReasonModal = false;
        this.showCard = true;

      },

      showReason(){
        if(this.isMobile){
          this.showDocument2 = false;
        }else{
          this.showDocument = false;
        }
        this.showCard = false;

      },

      closeDocumentModal() {
        if(this.isMobile){
          this.showDocument2 = false;
        }else{
          this.showDocument = false;
          this.pdfBlobUrl = '';
    // Release the Blob URL when the modal is closed
    URL.revokeObjectURL(this.pdfBlobUrl);
        }
      this.pdfsrc = null;
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

      formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits for day
    const month = date.toLocaleString('en-US', { month: 'short' }); // Get short month name
    const year = date.getFullYear().toString(); // Get full year

    // Concatenate day, month, and year with hyphens
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
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
        CloseCard(){
            this.$emit('close-card');
        },
    }
};

</script>

<style>

@media (max-width: 900px) {
  .card-title{
    color: #fff;
    font-size: 11px;
    font-weight: bold;
    margin-bottom: 10px;
}

.card-text{
    font-size: 11px;
    color: #000;
}

}

@media (min-width: 900px) {
  .card-title{
    color: #fff;
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 10px;
}

.card-text{
    font-size: 13px;
    color: #000;
}
  
}

.logout-button2 {
  background-color: #8E1611;
  color: #FFF;
  border: none;
  text-align: center;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 5px;
  width: 120px;
  height: 40px;
}

.pending-indicator3{
      width: auto;
      height: 25px;
      padding: 5px;
      font-size: 10px;
      background-color: rgba(10, 47, 116, 0.957);
      color: #fff;
      font-weight: bold;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
    }

    .rejected-indicator3{
      width: auto;
      height: 25px;
      padding: 5px;
      font-size: 10px;
      background-color: #8E1611;
      color: #fff;
      font-weight: bold;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
    }

    .approved-indicator3{
      width: auto;
      height: 25px;
      padding: 5px;
      font-size: 10px;
      background-color: green;
      color: #fff;
      font-weight: bold;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
    }

    .pending-indicator3{
      width: auto;
      height: 25px;
      padding: 5px;
      font-size: 10px;
      background-color: #a37b16;
      color: #fff;
      font-weight: bold;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
    }


.transaction-card {
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add box shadow style here */
}

.card-header3 {
  background-color: #8E1611;
  color: #fff;
  height: 35px;
  margin-bottom: 10px
}

.pdf-viewer {
  width: 100%; /* Adjust width as needed */
  height: 500px; /* Adjust height as needed */
  border: none;
}


.pdf-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
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
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.pdf-viewer {
  width: 80%; /* Adjust width as needed */
  max-width: 1200px; /* Set a maximum width if needed */
  height: 80%; /* Adjust height as needed */
  max-height: 900px; /* Set a maximum height if needed */
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.pdf-viewer-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>