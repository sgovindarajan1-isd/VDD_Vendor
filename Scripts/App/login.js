//var vdd = vdd || {};
$(document).ready(function () {
    $('#btn_login').click(clicklogin);

    $(".validate").on('input', function (e) {      
        $("#lbl_invaliduserentry").text("");
    });
});

function clicklogin() {
    var txt_employee_id = $('#txt_employee_id').val();
    var txt_Password_id = $('#txt_Password_id').val();
    loginExternalVendor(txt_employee_id, txt_Password_id)
}


function loginExternalVendor(userid, tin) {
    ////  To do :  test values for easy access,  remove later
    //var userid = '160431';
    //var tin = '205770300';
    var SecuredToken = '';

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        type: "POST",  // "POST"
        url: hostdomainUrl + "api/values/LoginExternalVendor_authen/",
        dataType: 'json',
        data: JSON.stringify({ 'UserId': userid, 'Tin': tin }),
        beforeSend: function () {
            //$("#loaderDiv").show();
        },
        headers: {
            'Authorization': 'Basic ' + btoa(SecuredToken + ":" + userid + ':' + tin)
        },
       
        success: function (data) {
            sessionStorage.setItem('userName', data.data[0].UserName);
            sessionStorage.setItem('accessToken', data.data[0].ValidateToken);
            sessionStorage.setItem('vendorNumber', userid);
            sessionStorage.setItem('payeeId', data.data[0].PayeeId);

            if (data.data[0].IsValidUser == true) {
                var UserName = data.data[0].UserName;
                // Setting global variable to authendicate the user
                //vdd.GlobalVariables.IsValidUser = true;
                window.location.href = '/deposit/Index';   
                vdd.GlobalVariables.UserName = UserName;
                $("#loaderDiv").hide();
            }
            else {
                $("#lbl_invaliduserentry").text("Invalid Username and Password!")
                $("#loaderDiv").hide();
            }
        }
        , complete: function (jqXHR) {
            
            if (jqXHR.status == '404') {
                $("#lbl_invaliduserentry").text("Invalid Username and Password!")
            }
            $("#loaderDiv").hide();
        }
        , error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == '401') {
                window.location.href = "/Home/UnAuthorized";
            }
            $("#loaderDiv").hide();
        }
    });
};
 
