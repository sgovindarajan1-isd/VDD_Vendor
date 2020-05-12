var vdd = vdd || {};

$(document).ready(function () {
    $('#lbl_userName').text(sessionStorage.getItem('userName'));
    $('#btn_contactus_submit').click(btn_contactus_click);
});

// $('#lbl_userName').text(sessionStorage.getItem('userName'));
function btn_contactus_click() {
    var company = $('#txtCompany').val();
    var firstName = $('#txtFirstName').val();
    var lastName = $('#txtLastName').val();
    var phone = $('#txtPhone').val();
    var eMail = $('#txtEmail').val();
    var subject = $('#txtSubject').val();
    var message = $('#txtMessage').val();
    var bool = true;

    if (company.length <= 0) {
        $("#companyspan").html('Company required');
        bool = false;
    }

    if (firstName.length <= 0) {
        $("#firstNamespan").html('First Name required');
        bool = false;
    }

    if (lastName.length <= 0) {
        $("#lastNamespan").html('Last Name required');
        bool = false;
    }

    if (phone.length <= 0) {
        $("#phonespan").html('Phone required');
        bool = false;
    }

    if (eMail.length <= 0) {
        $("#emailspan").html('EMail required');
        bool = false;
    }

    if (subject.length <= 0) {
        $("#subjectspan").html('Subject required');
        bool =false;
    }

    if (eMail.length <= 0) {
        $("#messagespan").html('Message required');
        bool = false;
    }

    if (!bool) {
        return false;
    }
    postContactUs(company, firstName, lastName, phone, eMail, subject, message);
}
function postContactUs(company, firstName, lastName, phone, eMail, subject, message) {
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



