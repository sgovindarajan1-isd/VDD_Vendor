$(document).ready(function () {

    var vendorDetails = {};
    //var bankDetails = {};
    var bankDetails = new Array();

    $("#img_info_step").parent().css("border-color", "#7030A0");
    $('#lbl_userName').text(sessionStorage.getItem('userName'));
    var vendorNumber = sessionStorage.getItem('vendorNumber');

    $("#liNavigation").show();
    $(".round-tab").css("border-color", "#e0e0e0");

    //$(".nav li").removeClass("active");
    if ($(location).attr('href').indexOf("_partialCertify") > -1) {
        $("#img_info_step").attr('src', '/Content/Images/info_step.png');
        $("#img_bank_verify_step").attr('src', '/Content/Images/info_step.png');
        $("#img_certify_step").attr('src', '/Content/Images/certify_step_on.png');
        $("#img_certify_step").addClass("active");
        $("#img_certify_step").parent().css("border-color", "#7030A0");
        $('#lbl_header').html('Certify');
    }
    else if ($(location).attr('href').indexOf("_partialSubmit") > -1) {
        $("#img_info_step").attr('src', '/Content/Images/info_step.png');
        $("#img_certify_step").attr('src', '/Content/Images/certify_step.png');
        $("#img_submit_step").attr('src', '/Content/Images/submit_step_on.png');
        $("#img_submit_step").addClass("active");
        $("#img_submit_step").parent().css("border-color", "#7030A0");
        $('#lbl_header').html('Submit');
        getSubmitDetails();
    }
    else if ($(location).attr('href').indexOf("_partialConfirmation") > -1) {
        $("#img_info_step").attr('src', '/Content/Images/info_step.png');
        $("#img_certify_step").attr('src', '/Content/Images/certify_step.png');
        $("#img_submit_step").attr('src', '/Content/Images/submit_step.png');
        $("#img_confirmation_step").attr('src', '/Content/Images/confirmation_step_on.png');
        $("#img_confirmation_step").addClass("active");
        $("#img_confirmation_step").parent().css("border-color", "#7030A0");
        $('#lbl_header').html('Confirmation');
    }


    $(".form-control").on('input', function (e) {
        $(".errmessage").html("");
    });

    $("#btn_certify_back").on('click', function (e) {
        //sessionStorage.setItem('selectedFile', null);
        //sessionStorage.setItem('imagefile-selectedFile', null);
        window.history.back();
    });

    $('#btn_certify_next').on('click', function (e) {
        var signerName = $('#txtSignerName').val();
        var signerTitle = $('#txtSignerTitle').val();
        var signerPhone = $('#txtSignerPhone').val();
        var signerEmail = $('#txtSignerEmail').val();
        var bool = true;

        if (signerName.length <= 0) {
            $("#signerName").html('Authorized Signer’s Name is required.');
            bool = false;
        } else {
            $("#signerName").html('');
        }

        if (signerTitle.length <= 0) {
            $("#signerTitle").html('Authorized Signer’s Title is required.');
            bool = false;
        } else {
            $("#signerTitle").html('');
        }

        if (signerPhone.length <= 0) {
            $("#signerPhone").html('Authorized Signer’s Phone # is required.');
            bool = false;
        } else {
            $("#signerPhone").html('');
        }

        if (signerEmail.length <= 0) {
            $("#signerEmail").html('Authorized Signer’s Email is required.');
            bool = false;
        }
        else if (!isEmail(signerEmail)) {
            $("#signerEmail").html('Please enter valid Email address');
            bool = false;
        }
        else {
            $("#signerEmail").html('');
        }


        if (!bool) {
            return false;
        } else if ($("#chk_certify").prop('checked') == false) {
            toastr.options.positionClass = "toast-bottom-right";
            toastr.warning("Authorization box must be checked.");
            return false;
        }
        else {
            storeDetails();
            window.location.href = '/deposit/_partialSubmit';
        }
    });


    function storeDetails() {
        var certifydetailsRow = [];
        certifydetailsRow.push({
            Signername: $("#txtSignerName").val(),
            Signertitle: $("#txtSignerTitle").val(),
            Signerphone: $("#txtSignerPhone").val(),
            Signeremail: $("#txtSignerEmail").val(),
        });
        sessionStorage.setItem('certifydetailsJson', JSON.stringify(certifydetailsRow));
    }

    /*Submit Section */

    $("#btn_submit_back").on('click', function (e) {
        window.history.back();
    });
    $('#btn_submit_next').on('click', function (e) {
        var bool = true;

        if (!bool) {
            return false;
        } else if ($("#chk_submit").prop('checked') == false) {
            toastr.options.positionClass = "toast-bottom-right";
            toastr.warning("Authorization box must be checked.");
            return false;
        }
        else {
            submitDetailstoDB();  // submit/ generate confirmation number
            window.location.href = '/deposit/_partialConfirmation';
        }
    });
    function getSubmitDetails() {
        debugger;
        var bankobj = JSON.parse(sessionStorage.getItem("bankdetailsJson"));

        $("#vendorname").html(sessionStorage.getItem('vendorNumber'));
        $("#payeename").html(sessionStorage.getItem('userName'));
        $("#ssn").html(sessionStorage.getItem('tin'));
        vendorDetails.vendorname = sessionStorage.getItem('vendorNumber');
        vendorDetails.payeename = sessionStorage.getItem('userName');
        vendorDetails.ssn = sessionStorage.getItem('tin');


        if (!(bankobj == null) || (bankobj == 'undefined')) {
            $("#typeofAccount").html(bankobj[0].AccountType);
            $("#accountNumber").html(bankobj[0].BankAccountNumber);
            $("#routingNumber").html(bankobj[0].BankRoutingNo);
            $("#finInsName").html(bankobj[0].FinancialIns);
            $("#ddemail").html(bankobj[0].DDNotifiEmail);

            vendorDetails.typeofAccount = bankobj[0].AccountType;
            vendorDetails.accountNumber = bankobj[0].BankAccountNumber;
            vendorDetails.routingNumber = bankobj[0].BankRoutingNo;
            vendorDetails.finInsName = bankobj[0].FinancialIns;
            vendorDetails.ddNotifiEmail = bankobj[0].DDNotifiEmail;
        }
        var paymentJsonObj = JSON.parse(sessionStorage.getItem("paymentJson"));
        $.each(paymentJsonObj, function (key, value) {
            var s = '<div class="form-group">' +
                '<div class= "col-md-12" >' +
                '<span>' + value.VendorAddress + '</span>' +
                '</div >' +
                '</div >';
            $('#banklocations').append(s);
//            var bankDetl = [];
            var bankDetl = {};
            
            bankDetl.address = value.VendorAddress;
            //bankDetails.push(bankDetl);
            bankDetails.push(value.LocationID);
        });

        var certifyobj = JSON.parse(sessionStorage.getItem("certifydetailsJson"));
        if (!(certifyobj == null) || (certifyobj == 'undefined')) {
            $("#signername").html(certifyobj[0].Signername);
            $("#signertitle").html(certifyobj[0].Signertitle);
            $("#signerphone").html(certifyobj[0].Signerphone);
            $("#signeremail").html(certifyobj[0].Signeremail);

            vendorDetails.signername = certifyobj[0].Signername;
            vendorDetails.signertitle = certifyobj[0].Signertitle;
            vendorDetails.signerphone = certifyobj[0].Signerphone;
            vendorDetails.signeremail = certifyobj[0].Signeremail;
        }

        vendorDetails.locationIDs = bankDetails;
        vendorDetails.VendorAttachmentFileName = sessionStorage.getItem('uploadedfile')
    }

    function submitDetailstoDB() {
        debugger;
        var venDetails = JSON.stringify(vendorDetails);

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            type: "POST",
            url: hostdomainUrl + "api/values/SubmitVendorDD/",
            dataType: 'json',
            data: venDetails,
            headers: {
                'Authorization': 'Basic ' + btoa(sessionStorage.getItem('accessToken'))
            },
            success: function (data) {
                $("#confirmationNumber").html(data.data.Confirmation);
                $("#SubmittedDate").html(data.data.SubmitDateTime);
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
    /*Submit Section end */

    /*Confirmation Section begin */
    /*Confirmation Section end */
});