"use strict";
//  Global variables
var vdd = {};
vdd.GlobalVariables = {
    IsValidUser: false,
    UserName: ''
};

var Globaljqvar = {
};
//export { Globaljqvar };
window.__INITIAL_STATE__ = {
    IsValidUser: false
};

$('#lbl_userName').on('click', function (e) {
    if (confirm("Are you sure you want to logout?"))
        //window.location.href = "";
        alert('LOGGING OUT')

    return false;
});

$("#btn_logout").on('click', function () {
    $('#modalLogout').modal('hide');
    debugger;
    sessionStorage.setItem('userName', "");
    sessionStorage.setItem('accessToken', "");
    window.location.href = "/Home/Index";
});

$("#btn_generalInfo").on('click', function () {
    debugger;
    alert('gen info');
    window.location.href = "/Home/UnAuthorized";
});