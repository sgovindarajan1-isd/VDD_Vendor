$(document).ready(function () {
    $('#btn_gotoLogin').on('click', function (e) {
        window.location.href = '/deposit/_partialLogin';
    });

    $('#btn_Guide').on('click', function (e) {
      //  window.location.href = '/Home/GeneralInfo';
    });


    $('#btn_appStatus').on('click', function (e) {
        debugger;
        var ConfirmationNum = "sdfg";//$("#txtConfirmationNum").val();
        var vendorDetails = {};
        vendorDetails.Confirmation = "sdg";


        $.ajax({
            contentType: 'application/json; charset=utf-8',
            type: "post",
            dataType: 'json',
            data: JSON.stringify(vendorDetails),
            //headers: {
            //    'Authorization': 'Basic ' + btoa(sessionStorage.getItem('accessToken'))
            //},
            url: hostdomainUrl + "api/values/GetApplicationStatus/",
            success: function (data) {
                debugger
                //alert('suceess');
                window.location.href = '/deposit/_partialAppStatus';
                
                sessionStorage.setItem('ConfirmationNum', $("#txtConfirmationNum").val());
            },
            error: function (_XMLHttpRequest, textStatus, errorThrown) {
               // alert('error');
                window.location.href = '/deposit/_partialAppStatus';
            }
        });

        //$.ajax({
        //    contentType: 'application/json; charset=utf-8',
        //    type: "POST",
        //    dataType: 'json',
        //   // data: JSON.stringify({ 'Id': 0, 'IdText': ConfirmationNum, 'Text': ConfirmationNum }),
        //    //data: JSON.stringify({ 'ConfirmationNum': ConfirmationNum }),  // 'payeeId': payeeId 
        //    //data: JSON.stringify({ 'Confirmation': ConfirmationNum }),
        //    data: JSON.stringify({ 'vendorNumber': ConfirmationNum }),  // 'payeeId': payeeId 
            
        //    //{ 'ConfirmationNum': ConfirmationNum }),  // 'payeeId': payeeId 
        //    headers: {
        //        'Authorization': 'Basic ' + btoa(sessionStorage.getItem('accessToken'))
        //    },
        //    //url: hostdomainUrl + "api/values/GetApplicationStatus?Name=" + ConfirmationNum,
        //    url: hostdomainUrl + "api/values/GetApplicationStatus/",
        //    success: function (data) {
        //        debugger
        //        alert('suceess');
        //    },
        //    error: function (jqXHR, textStatus, errorThrown) {
        //        alert('error');
        //    }
        //});
    });
    

});