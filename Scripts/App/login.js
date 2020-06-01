//var vdd = vdd || {};
$(document).ready(function () {
    $("#liNavigation").hide();
    var isNumberKey = function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57))
            return false;
        return true;
    };

    $("#txt_Password_id").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            //display error message
            $("#errmsg").html("Digits Only").show();
            return false;
        }
        else {
            $("#errmsg").hide();
        }
    });
        
    $('#btn_login').click(clicklogin);

    $(".validate").on('input', function (e) {      
        //$("#lbl_invaliduserentry").text("");
        $("#fileError_or_Info").html("");
    });

    $('[data-toggle="popover"]').popover(); 

    $('[data-toggle="popover"]').on('click', function (e) {
        $('[data-toggle="popover"]').not(this).popover('hide');
    });

    $('body').on('click', function (e) {
        if ($(e.target).data('toggle') !== 'popover'
            
            && $(e.target).parents('.popover.in').length === 0) {
            $('[data-toggle="popover"]').popover('hide');
        }
    });
});

function clicklogin() {
    var txt_employee_id = $('#txt_employee_id').val();
    var txt_Password_id = $('#txt_Password_id').val();
    loginExternalVendor(txt_employee_id, txt_Password_id)
}


function loginExternalVendor(userid, tin) {
    ////  To do :  test values for easy access,  remove later
    //var userid = 'SP8313';//'000076'; //'000593'; //'000339';
    //var tin = '474478313'; //'953765453'; //'232116774'; //'942647607'; 

    var SecuredToken = '';

    $.ajax({
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        url: hostdomainUrl + "api/values/LoginExternalVendor_authen/",
        dataType: 'json',
        data: JSON.stringify({ 'UserId': userid, 'Tin': tin }),
        beforeSend: function () {
            $("#loaderDiv").show();
        },
        headers: {
            'Authorization': 'Basic ' + btoa(SecuredToken + ":" + userid + ':' + tin)
        },
       
        success: function (data) {
            sessionStorage.setItem('userName', data.data[0].UserName);
            sessionStorage.setItem('accessToken', data.data[0].ValidateToken);
            sessionStorage.setItem('vendorNumber', userid);
            sessionStorage.setItem('tin', tin);
            //sessionStorage.setItem('payeeId', data.data[0].PayeeId);

            if (data.data[0].IsValidUser == true) {
                var UserName = data.data[0].UserName;
                // Setting global variable to authendicate the user
                //vdd.GlobalVariables.IsValidUser = true;
                window.location.href = '/deposit/Index';   
                vdd.GlobalVariables.UserName = UserName;
                $("#loaderDiv").hide();
            }
            else {
                //$("#lbl_invaliduserentry").text("Invalid Username and Password!")
                $("#fileError_or_Info").html('Your login attempt was not successful or you don’t have the right credentials. Please try again or contact Los Angeles County.');
                $("#loaderDiv").hide();
            }
        }
        , complete: function (jqXHR) {
            
            if (jqXHR.status == '404') {
                //$("#lbl_invaliduserentry").text("Invalid Username and Password!")
                $("#fileError_or_Info").html('Your login attempt was not successful or you don’t have the right credentials. Please try again or contact Los Angeles County.');
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
 
