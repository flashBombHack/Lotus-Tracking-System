
// Application Global Configuration
export const API_BASE_URL = 'https://stagings.vaps.parkwayprojects.xyz/SAP-API/api';

export const APP_ITEMS_ENDPOINT = `${API_BASE_URL}/app/get-appitems`;
export const GETAPPITEMS_BYID_ENDPOINT = `${API_BASE_URL}/app/get-appitem`;
export const GETCATEGORIES_ENDPOINT = `${API_BASE_URL}/app/get-categories`;
export const USER_PRIVILEGES_ENDPOINT = `${API_BASE_URL}/user/getUserPrivileges`;
export const ADDAPPITEMS_ENDPOINT = `${API_BASE_URL}/app/add-appitem`;
export const GETCOLORTAG_ENDPOINT = `${API_BASE_URL}/app/get-colortags`;
export const ADDCATEGORY_ENDPOINT = `${API_BASE_URL}/app/add-category`;
export const UPDATECOLORTAG_ENDPOINT = `${API_BASE_URL}/app/update-colortags`;
export const GETDEPT_ENDPOINT = `${API_BASE_URL}/user/getdept`;
export const ADDDEPT_ENDPOINT = `${API_BASE_URL}/user/add-dept`;
export const UPDATEDEPT_ENDPOINT = `${API_BASE_URL}/user/update-dept`;
export const DELETEDEPT_ENDPOINT = `${API_BASE_URL}/user/delete-dept`;
export const GETDEPTBYID_ENDPOINT = `${API_BASE_URL}/user/getdeptbyID`;
export const GETUSERROLE_ENDPOINT = `${API_BASE_URL}/user/getrole`;
export const CREATEUSER_ENDPOINT = `${API_BASE_URL}/user/createUser`;
export const GETUSERBYEMAIL_ENDPOINT = `${API_BASE_URL}/user/getuserbyemail`;
export const ADDUSERPRIVILLAGES_ENDPOINT = `${API_BASE_URL}/user/add-userprivileges`;
export const UPDATEAPPITEM_ENDPOINT = `${API_BASE_URL}/app/update-appitem`;
export const GETCATEGORYBYID_ENDPOINT = `${API_BASE_URL}/app/get-category`;
export const UPDATECATEGORY_ENDPOINT = `${API_BASE_URL}/app/update-category`;
export const RESETPASSWORD_ENDPOINT = `${API_BASE_URL}/user/resetpassword`;
export const DELETEUSER_ENDPOINT = `${API_BASE_URL}/user/deleteuserbyemail`;
export const DELETEUSERPRIVILLAGE_ENDPOINT = `${API_BASE_URL}/user/deletePrivilage`;
export const UPDATEUSERINFO_ENDPOINT = `${API_BASE_URL}/user/updateUser`;
export const VALIDATEUSER_ENDPOINT = `${API_BASE_URL}/user/validate`;
export const GETUSERS_ENDPOINT = `${API_BASE_URL}/user/getusers`;
export const DELETECATEGORY_ENDPOINT = `${API_BASE_URL}/app/delete-category`;
export const DELETEAPPITEM_ENDPOINT = `${API_BASE_URL}/app/delete-appitem`;
export const ADDACTIVITYLOG_ENDPOINT = `${API_BASE_URL}/app/addactivitylog`; 
export const GETACTIVITYLOG_ENDPOINT = `${API_BASE_URL}/app/getactivitylog`;
export const GETAUDITLOGWITHRANGE_ENDPOINT = `${API_BASE_URL}/app/getauditlogwithrange`;
export const RESETUSERPASSWORD_ENDPOINT = `${API_BASE_URL}/user/resetuserpassword`;

//End

//Modules Configurations ( Add all new modules config parameters here)

// 1:  Netpay Module

export const NETPAYAPI_BASE_URL = 'https://app.swwipe.com/SAP.NetpayAPI/api/netpay';

export const RESTARTSETTLEMENT_ENDPOINT = `${NETPAYAPI_BASE_URL}/restart`;
export const CHECKSETTELEMTSTATUS_ENDPOINT = `${NETPAYAPI_BASE_URL}/check-settlement`;
export const GETSETTELEMTSTATUS_ENDPOINT = `${NETPAYAPI_BASE_URL}/getstatus`;
export const GETNETPAYTRANSACTION_ENDPOINT = `${NETPAYAPI_BASE_URL}/getTransactions`;
export const UPDATESETTLEMENT_ENDPOINT = `${NETPAYAPI_BASE_URL}/update-settlement`;
export const ADDREPROCESSEDRECORD_ENDPOINT = `${NETPAYAPI_BASE_URL}/addreprocessrecords`;
export const GETREPROCESSEDRECORD_ENDPOINT = `${NETPAYAPI_BASE_URL}/getreprocessedrecords`;

// 2:  Sale Executive Module

export const SAVEANDCONTINUE_ENDPOINT = `${API_BASE_URL}/app/save-onboarding-data`;

// 3:  InApp Notification

export const INAPP_BASE_URL = 'https://staging.swwipe.com/Swwipe.API';

export const INAPPNOTIFICATION_ENDPOINT = `${INAPP_BASE_URL}/api/v1/Notification/sendinappnotificationtoall`;


