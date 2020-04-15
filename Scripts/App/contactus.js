var vdd = vdd || {};

$(document).ready(function () {
    $('#btn_contactus_submit').click(btn_contactus_click);
});
debugger;
// $('#lbl_userName').text(sessionStorage.getItem('userName'));
function btn_contactus_click() {
    var company = $('#txtCompany').val();
    var firstName = $('#txtFirstName').val();
    var lastName = $('#txtLastName').val();
    var phone = $('#txtPhone').val();
    var eMail = $('#txtEmail').val();
    var subject = $('#txtSubject').val();
    var message = $('#txtMessage').val();
    postContactUs(company, firstName, lastName, phone, eMail, subject, message);
}
function postContactUs(company, firstName, lastName, phone, eMail, subject, message) {
    debugger;
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        url: hostdomainUrl + "api/values/postcontactus/",
        dataType: 'json',
        data: JSON.stringify({
            'Company': company, 'FirstName': firstName, 'LastName': lastName, 'Phone': phone, 'Email': eMail, 'Subject': subject, 'Message': message
        }),
        headers: {
            'Authorization': 'Basic ' + btoa(sessionStorage.getItem('accessToken'))
        },
        success: function (data) {
            debugger;
            alert('contactus sucess');
        }
        , complete: function (jqXHR) {
            debugger;

        }
        , error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == '401') {
                window.location.href = "/Home/UnAuthorized";
            }
        }
    });
};

