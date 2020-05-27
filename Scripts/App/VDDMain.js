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

$('#img_username').on('click', function (e) {
    //$('#logoutModal').modal('show');
});

$('.liselect').on('click', function () {
    //$(this).toggleClass('background_selected');
});

//$(".nav li").on("click", function (e) {
//   // e.preventDefault();
//});
//    $(".nav li").removeClass("active");
//    --$(".nav li span span").removeClass("disabled");
//    $(this).addClass("active");
//    --$(".nav li span span").removeClass("disabled");


//$(".nav li span span img").on("click", function () {
//    $("#img_confirmation_step").attr('src', '/Content/Images/confirmation_step.png');
//    $("#img_submit_step").attr('src', '/Content/Images/submit_step.png');
//    $("#img_certify_step_step").attr('src', '/Content/Images/certify_step.png');
//    $("#img_bank_verify_step").attr('src', '/Content/Images/verify_step.png');
//    $("#img_bank_attachment_step").attr('src', '/Content/Images/attachment_step.png');
//    $("#img_bank_step").attr('src', '/Content/Images/bank_step.png');
//    $("#img_info_step").attr('src', '/Content/Images/info_step.png');

//    if ($(this)[0].id == "img_confirmation_step") {
//        $(this).attr('src', '/Content/Images/confirmation_step_on.png');
//    }
//    if ($(this)[0].id == "img_submit_step_step") {
//        $(this).attr('src', '/Content/Images/submit_step_on.png');
//    }
//    if ($(this)[0].id == "img_certify_step_step") {
//        $(this).attr('src', '/Content/Images/certify_step_on.png');
//    }
//    if ($(this)[0].id == "img_bank_verify_step") {
//        $(this).attr('src', '/Content/Images/verify_step_on.png');
//    }
//    if ($(this)[0].id == "img_bank_attachment_step") {
//        $(this).attr('src', '/Content/Images/attachment_step_on.png');
//    }
//    if ($(this)[0].id == "img_info_step") {
//        $(this).attr('src', '/Content/Images/info_step_on.png');
//    }
//    if ($(this)[0].id == "img_bank_step") {
//        $(this).attr('src', '/Content/Images/bank_step_on.png');
//    }
//});

$("#btn_logout").on('click', function () {
    $('#logoutModal').modal('hide');
    sessionStorage.setItem('userName', "");
    sessionStorage.setItem('accessToken', "");
    sessionStorage.setItem('vendorNumber', "");
    //sessionStorage.setItem('payeeId', "");

    window.location.href = "/Home/Index";
});

$("#btn_generalInfo").on('click', function () {
    window.location.href = "/Home/UnAuthorized";
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}