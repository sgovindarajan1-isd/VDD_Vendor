$(document).ready(function () {
    var SecuredToken = '';
    $('#btn_Status').on('click', function (e) {
        alert('btn_Status');
        debugger;

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            type: "POST",
            url: hostdomainUrl + "api/values/CheckStatus/",
            dataType: 'json',
            data: JSON.stringify({ 'Id': '0', 'IdText': 'IdText', 'Text': $('#txt_ConfirmationNum').val() }),
            
            headers: {
                'Authorization': 'Basic ' + btoa(SecuredToken + ":" + '' + ':' + '')
            },
            success: function (data) {
                debugger;
                alert('confirmationNumber', data.data);
            }
            , error: function (jqXHR, textStatus, errorThrown) {
                debugger;
                if (textStatus == 'error') {
                    toastr.options.positionClass = "toast-bottom-right";
                    toastr.warning("Error in Checking Status, Please check the entry!");
                }
                else if (jqXHR.status == '401') {
                    window.location.href = "/Home/UnAuthorized";
                }
            }
        });

    });
});