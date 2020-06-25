$(document).ready(function () {
    $("#div_statusPanel").hide();

    $('#lbl_userName').text(sessionStorage.getItem('userName'));
    $('#lbl_header').html('Application Status Lookup');

    $('#txt_ConfirmationNum').val(sessionStorage.getItem('SessionConfirmationNum'));
    var confirmationNumber = $('#txt_ConfirmationNum').val();

    debugger;
    // for prepopulated case
    if (confirmationNumber.length !== 0) {
        getStatus(confirmationNumber);
    }

    $('#btn_getStatus').on('click', function (e) {
        confirmationNumber = $('#txt_ConfirmationNum').val();

        if (confirmationNumber.length !== 0) {
            getStatus(confirmationNumber);
        }
    });

    function getStatus(confNum) {
        var SecuredToken = 'status';  // This method can be called before login,  so there wont be any security token created,  hense this by pass
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            type: "POST",
            url: hostdomainUrl + "api/values/CheckStatus/",
            dataType: 'json',
            data: JSON.stringify({ 'Id': '0', 'IdText': 'IdText', 'Text': confNum }),

            headers: {
                'Authorization': 'Basic ' + btoa(SecuredToken)
            },

            success: function (data) {
                $("#div_statusPanel").show();
                $("#span_confirmationNumber").text(confNum);
                $("#span_applicationStatus").text(data.data);
            },
            error: function (_XMLHttpRequest, textStatus, errorThrown) {
                $("#div_statusPanel").show();
                $("#span_confirmationNumber").text(confNum);
                $("#span_applicationStatus").text("Error in Status!");
            }
        });
    };
});