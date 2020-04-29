"use strict";
//  Global variables
var vdd = {};
vdd.GlobalVariables = {
    IsValidUser: false,
    UserName: ''
};

var Globaljqvar = {
};
window.__INITIAL_STATE__ = {
    IsValidUser: false
};

$('#lbl_userName').on('click', function (e) {
    $('#exampleModal').modal('show');
    //if (confirm("Are you sure you want to logout?"))
    //    //window.location.href = "";
   // return false;
});

$("#btn_logout").on('click', function () {
    $('#exampleModal').modal('hide');
    sessionStorage.setItem('userName', "");
    sessionStorage.setItem('accessToken', "");
    sessionStorage.setItem('vendorNumber', "");
    sessionStorage.setItem('payeeId', "");

    window.location.href = "/Home/Index";
});

$("#btn_generalInfo").on('click', function () {
    window.location.href = "/Home/UnAuthorized";
});