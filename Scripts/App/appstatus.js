$(document).ready(function () {
    $('#lbl_userName').text(sessionStorage.getItem('userName'));
    $('#lbl_header').html('Application Status Lookup');

    $('#txt_ConfirmationNum').text(sessionStorage.getItem('ConfirmationNum'));

    $('#btn_checkStatus123').click(clickstatus);

    //$('#btn_checkStatus').on('click', function (e) {
    //    debugger;
    //    var ConfirmationNum = "sdfg";//$("#txtConfirmationNum").val();
    //    var vendorDetails = {};
    //    vendorDetails.Confirmation = "sdg";


        //$.ajax({
        //    contentType: 'application/json; charset=utf-8',
        //    type: "post",
        //    dataType: 'json',
        //    //data: JSON.stringify({ 'id': 10 }),
        //    data: JSON.stringify({ 'UserId': 'userid', 'Tin': 'tin' }),
        //    //headers: {
        //    //    'Authorization': 'Basic ' + btoa(sessionStorage.getItem('accessToken'))
        //    //},
        //    url: hostdomainUrl + "api/values/GetApplicationStatus/",
        //    success: function (data) {
        //        debugger
                
        //    },
        //    error: function (_XMLHttpRequest, textStatus, errorThrown) {
        //    }
        //});
    //});
});

function clickstatus() {
    abctest('sdfg')
}


function abctest(confi) {
    //alert('abetest functino ');
    var SecuredToken = '';
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        url: hostdomainUrl + "api/values/checkStatus/",
        dataType: 'json',
        data: JSON.stringify({ 'UserId': 'a', 'Tin': 'tin' }),
        beforeSend: function () {
            $("#loaderDiv").show();
        },
        //headers: {
        //    'Authorization': 'Basic ' + btoa(SecuredToken + ":" + 'userid' + ':' + 'tin')
        //},

        success: function (data) {
            debugger

        },
        error: function (_XMLHttpRequest, textStatus, errorThrown) {
        }
    });
};
