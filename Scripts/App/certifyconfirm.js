$(document).ready(function () {
    $("#img_info_step").parent().css("border-color", "#7030A0");
    $('#lbl_userName').text(sessionStorage.getItem('userName'));
    var vendorNumber = sessionStorage.getItem('vendorNumber');

    $("#liNavigation").show();
    $(".round-tab").css("border-color", "#e0e0e0");

    $(".nav li").removeClass("active");
    if ($(location).attr('href').indexOf("_partialCertify") > -1) {
        $("#img_info_step").attr('src', '/Content/Images/info_step.png');
        $("#img_bank_verify_step").attr('src', '/Content/Images/info_step.png');
        $("#img_certify_step").attr('src', '/Content/Images/certify_step_on.png');
        $("#img_certify_step").addClass("active");
        $("#img_certify_step").parent().css("border-color", "#7030A0");
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
            //  go to next page
        }
    });

    function storeDetails() {
        debugger;
        var certifydetailsRow = [];
        certifydetailsRow.push({
            AccountType: $("#txtSignerName").val(),
            BankAccountNumber: $("#txtSignerTitle").val(),
            ReBankAcNo: $("#txtSignerPhone").val(),
            BankRoutingNo: $("#txtSignerEmail").val(),
        });
        sessionStorage.setItem('certifydetailsJson', JSON.stringify(certifydetailsRow));
    }



});