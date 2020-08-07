$(document).ready(function () {
    $("#img_username").hide();
    $("#liNavigation").hide();

    $('#btn_gotoLogin').on('click', function (e) {
        window.location.href = '/deposit/_partialLogin';
    });

    $('#btn_Guide').on('click', function (e) {
        //  window.location.href = '/Home/GeneralInfo';
    });


    $('#btn_appStatus').on('click', function (e) {
        //if ($("#txtConfirmationNum").val().length !== 0) {
        //    sessionStorage.setItem('SessionConfirmationNum', $("#txtConfirmationNum").val());
            window.location.href = '/deposit/_partialAppStatus';
        //}
    });
});