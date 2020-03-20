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
        headers: {
            'Authorization': 'Basic ' + btoa(SecuredToken + ":" + userid + ':' + tin)
        },
        
        success: function (data) {
            debugger;
            sessionStorage.setItem('userName', data.data[0].UserName);
            sessionStorage.setItem('accessToken', data.data[0].ValidateToken);

            if (data.data[0].IsValidUser == true) {
                var UserName = data.data[0].UserName;
                // Setting global variable to authendicate the user
                //vdd.GlobalVariables.IsValidUser = true;

                $.ajax({
                    type: 'POST',
                    dataType: 'html',
                    url: '/Home/LoginExternalVendor',
                    data: {
                        id: userid, name: tin
                    },
                    success: function (data) {
                        debugger;
                        $('#layoutBody').html(data);
                        vdd.GlobalVariables.UserName = UserName;
                        $('#lbl_userName').text(UserName);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert('error in antiforgery');
                    }
                });
            }
            else {
                $("#lbl_invaliduserentry").text("Invalid Username and Password!")
            }
        }
        , complete: function (jqXHR) {
            
            if (jqXHR.status == '404') {
                $("#lbl_invaliduserentry").text("Invalid Username and Password!")
            }
        }
        , error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == '401') {
                window.location.href = "/Home/UnAuthorized";
            }
        }
    });
};
//$.ajax({
//    url: '/ Home/GetProductDetails',
//    contentType: 'application/html; charset=utf-8',
//    type: 'GET',
//    dataType: 'html'
//})
//    .success(function (result) {
//        $('#dvProductDetails').html(result);
//    })
//    .error(function (xhr, status) {
//        alert(status);
//    })  
