var vdd = vdd || {};

$(document).ready(function () {
    $('#lbl_userName').text(sessionStorage.getItem('userName'));
    if (sessionStorage.getItem('userName') == null) {
        $("#img_username").hide();
    }
    $("#liNavigation").hide();

    $('#lbl_header').html('Contact Us');
    $('#btn_contactus_submit').click(btn_contactus_click);
    $('#txtPhone').mask('(000)000-0000');
    

    //function getContactUs() {
    //    $.ajax({
    //        contentType: 'application/json; charset=utf-8',
    //        type: "POST",
           
    //        dataType: 'json',
    //        headers: {
    //            'Authorization': 'Basic ' + btoa('contactus')  // This method can be called before login,  so there wont be any security token created,  hense this by pass
    //        },
    //        success: function (data) {
    //        }
    //        , complete: function (jqXHR) {
    //        }
    //        , error: function (jqXHR, textStatus, errorThrown) {
    //            if (jqXHR.status == '401') {
    //                window.location.href = "/Home/UnAuthorized";
    //            }
    //        }
    //    });
    //};

});

$(".form-control").on('input', function (e) {
    //$("#lbl_invaliduserentry").text("");
    $(".errmessage").html("");
});

// $('#lbl_userName').text(sessionStorage.getItem('userName'));
function btn_contactus_click() {
    var company = $('#txtCompany').val();
    var firstName = $('#txtFirstName').val();
    var lastName = $('#txtLastName').val();
    var phone = $('#txtPhone').val();
    var eMail = $('#txtEmail').val();
    var subject = $('#txtSubject').val();
    var subjectText = $('#txtSubject  option:selected').text();
    var message = $('#txtMessage').val();
    var bool = true;

    if (company.length <= 0) {
        $("#companyspan").html('Company required');
        bool = false;
    } else {
        $("#companyspan").html('');
    }

    if (firstName.length <= 0) {
        $("#firstNamespan").html('First Name required');
        bool = false;
    } else {
        $("#firstNamespan").html('');
    }

    if (lastName.length <= 0) {
        $("#lastNamespan").html('Last Name required');
        bool = false;
    } else {
        $("#lastNamespan").html('');
    }

    if (phone.length <= 0) {
        $("#phonespan").html('Phone required');
        bool = false;
    } else if (!validatePhone(phone)) {
        $("#phonespan").html('Valid Phone # required.');
        bool = false;
    }
    else {
        $("#phonespan").html('');
    }

    if (eMail.length <= 0) {
        $("#emailspan").html('Email required');
        bool = false;
    }
    else if (!isEmail(eMail)) {
        $("#emailspan").html('Please enter valid Email Address');
        bool = false;
    } else {
        $("#emailspan").html('');
    }
    if (parseInt(subject) <= 0) {
        $("#subjectspan").html('Subject required');
        bool = false;
    } else {
        $("#subjectspan").html('');
    }

    if (eMail.length <= 0) {
        $("#messagespan").html('Message required');
        bool = false;
    } else {
        $("#messagespan").html('');
    }

    if (!bool) {
        return false;
    }
    postContactUs(company, firstName, lastName, phone, eMail, subjectText, message);
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
            'Authorization': 'Basic ' + btoa('contactus')  // This method can be called before login,  so there wont be any security token created,  hense this by pass
        },
        success: function (data) {
        }
        , complete: function (jqXHR) {
        }
        , error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == '401') {
                window.location.href = "/Home/UnAuthorized";
            }
        }
    });
};

GetGetGeneralContent_ContactUs();
function GetGetGeneralContent_ContactUs() {
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        url: hostdomainUrl + "api/values/RetrieveGeneralContent_ContactUs/",
        dataType: 'json',

        headers: {
            'Authorization': 'Basic ' + btoa('admin')  // This method can be called before login,  so there wont be any security token created,  hense this by pass

        },
        success: function (data) {
            $("#lbl_email").html(data.data.generalContent_ContactUs.Email);
            $("#lbl_mailingaddress").html(data.data.generalContent_ContactUs.MailingAddress);
            $("#lbl_phoneNumber").html(data.data.generalContent_ContactUs.Phone);
            $("#lbl_officeHours").html(data.data.generalContent_ContactUs.OfficeHours);
        },
        error: function (_XMLHttpRequest, textStatus, errorThrown) {
            if (_XMLHttpRequest.status == '401') {
                window.location.href = "/Home/UnAuthorized";
            }
        }
    });
};



