$(document).ready(function () {
    $("#liNavigation").show();

    //debugger;
    //var productId = @Html.Raw(Json.Encode(ViewBag.ProductId));
    //alert(productId);

    $(".nav li").removeClass("active");
    $("#img_info_step").attr('src', '/Content/Images/info_step.png');
    $("#img_bank_step").attr('src', '/Content/Images/bank_step_on.png');
    $("#img_bank_step").addClass("active");

    $('#lbl_userName').text(sessionStorage.getItem('userName'));
    var vendorNumber = sessionStorage.getItem('vendorNumber');
    //var payeeId = sessionStorage.getItem('payeeId');
    var paymentJson = sessionStorage.getItem('paymentJson');
    if (sessionStorage.getItem('accessToken') == null) {
        window.location.href = "/Home/UnAuthorized";
    }
    
    $('#btn_bank_back').on('click', function (e) {
        storeDetails();
        window.history.back();
    });

    $("#pnlAttachment").hide();
    var fileSelectytedtype = '';
    $("#btn_voidCheck").on('click', function (e) {
        $("#pnlAttachment").show();
        fileSelectytedtype = 'VC';
        //$("#btn_Statement").prop('disabled', true).addClass('disabled');
        //$("#btn_verifyLetter").prop('disabled', true).addClass('disabled');

        $("#btn_verifyLetter").addClass('disabled_color');
        $("#btn_voidCheck").removeClass('disabled_color');
        $("#btn_Statement").addClass('disabled_color');
    });
    $("#btn_Statement").on('click', function (e) {
        $("#pnlAttachment").show();
        fileSelectytedtype = 'ST';
        //$("#btn_voidCheck").prop('disabled', true).addClass('disabled');
        //$("#btn_verifyLetter").prop('disabled', true).addClass('disabled');

        $("#btn_verifyLetter").addClass('disabled_color');
        $("#btn_voidCheck").addClass('disabled_color');
        $("#btn_Statement").removeClass('disabled_color');
    });

    $("#btn_verifyLetter").on('click', function (e) {
        $("#pnlAttachment").show();
        fileSelectytedtype = 'VL';
        //$("#btn_voidCheck").prop('disabled', true).addClass('disabled');
        //$("#btn_Statement").prop('disabled', true).addClass('disabled');

        $("#btn_verifyLetter").removeClass('disabled_color');
        $("#btn_voidCheck").addClass('disabled_color');
        $("#btn_Statement").addClass('disabled_color');
    });   

    $(function () {
        $("input:file[id=file-upload]").change(function () {
            $("#file-upload-value").html($(this).val());
        });
    });

    $('input[type="file"]').change(function (e) {
        debugger;
        var ext = ['.PDF', '.DOC', '.DOCX', '.JPG', '.JPEG', '.GIF', '.PNG'];
        var fileName = e.target.files[0].name;
        var file = e.target.files[0];
        //var fileCopy = e.target.files[0]
        var fileExtenstion = getFileExtenstion(fileName.toUpperCase(), ext);
        if (file) {
            if (file.size >= 10485760) {
                $("#fileError_or_Info").html('The file size is too large. Please choose another file.');
            }
            else if (fileExtenstion == null)
                $("#fileError_or_Info").html('The acceptable file types are .pdf, .doc, .docx, .jpg, .jpeg, .gif, .png. Please choose another file.');
            else {
                sessionStorage.setItem('selectedFile', file);
                $("#txtattachment").val(fileName);

                var today = new Date();
                var cHour = today.getHours();
                var cMin = today.getMinutes();
                var cSec = today.getSeconds();
                debugger;
                var d = new Date($.now());
                var stmp = d.getDate() + '' + (d.getMonth() + 1) + '' + d.getFullYear() + '' + d.getHours() + '' + d.getMinutes() + ''+ d.getSeconds();

                var mFileName = /*cHour + cMin + cSec + */stmp + "_" +  vendorNumber + "_" + fileSelectytedtype + fileExtenstion.toLowerCase();
                $("#fileExtention").html(mFileName);
            }
        }
    });

    function getFileExtenstion(target, values) {
        debugger;
        for (var i = 0; i < values.length; i++) {
            if (target.indexOf(values[i]) > -1) {
                return values[i];
            }
        }
        return null;
    }


    
    $('#btnAttachmentUpload').click(function (e) {
        //e.preventDefault();
    });

    $('#btn_bank_next').on('click', function (e) {
        debugger;
        var accountType = $('#txtAccountType').val();
        var bankAcNo = $('#txtBankAcNo').val();
        var re_BankAcNo = $('#txtRe-BankAcNo').val();
        var bankRoutingNo = $('#txtBankRoutingNo').val();
        var financialIns = $('#txtFinancialIns').val();
        var dDNotifiEmail = $('#txtDDNotifiEmail').val();
        var reDDNotifiEmail = $('#txtReDDNotifiEmail').val();

        var bool = true;

        //if (accountType.length <= 0) {
        //    $("#accountType").html('Account Type is required');
        //    bool = false;
        //}

        if (bankAcNo.length <= 0) {
            $("#bankAcNo").html('Bank Account Number is required');
            bool = false;
        }

        if (re_BankAcNo.length <= 0) {
            $("#re_BankAcNo").html('Re Enter Bank Account Number is required');
            bool = false;
        }

        if (bankRoutingNo.length <= 0) {
            $("#bankRoutingNo").html('Bank Routing Number is required');
            bool = false;
        }

        if (financialIns.length <= 0) {
            $("#financialIns").html('Financial Institution Name is required, Click on Verify Bank button.');
            bool = false;
        }

        if (dDNotifiEmail.length <= 0) {
            $("#dDNotifiEmail").html('Email Address is required');
            bool = false;
        }

        if (reDDNotifiEmail.length <= 0) {
            $("#reDDNotifiEmail").html('Re Enter Email Address is required');
            bool = false;
        }

        if (!bool) {
            return false;
        } else {
            storeDetails();
            window.location.href = '/deposit/_partialAttachment';
        }
    });

    function storeDetails() {
        var bankdetailsRow = [];
        bankdetailsRow.push({
            AccountType: $("#txtAccountType").val(),
            BankAccountNumber: $("#txtBankAcNo").val(),
            ReBankAcNo : $("#txtRe-BankAcNo").val(),
            BankRoutingNo : $("#txtBankRoutingNo").val(),
            FinancialIns : $("#txtFinancialIns").val(),
            DDNotifiEmail  : $("#txtDDNotifiEmail").val(),
            ReDDNotifiEmail : $("#txtReDDNotifiEmail").val(),
            });
        sessionStorage.setItem('bankdetailsJson', bankdetailsRow);
    }

    $('#btn_voidCheck').hover(function () {
        //if (!$('btn_voidCheck').is(':disabled')) {
        //    $('#btn_voidCheck').addClass('buttonBig_hover');
        //}
        $(this).text('Voided Check must have the holder’s name.');
        
    }, function () {
            $(this).text('Voided Check');
            //if (!$('btn_voidCheck').is(':disabled')) {
            //    $('#btn_voidCheck').removeClass('buttonBig_hover');
            //}
    });

    $('#btn_Statement').hover(function () {
        $(this).text('Statement must include the full bank account number and holder’s name.');

    }, function () {
            $(this).text('First page of Bank Statement');
    });

    $('#btn_verifyLetter').hover(function () {
        $(this).text('Letter must include the bank account number, account type and account holder’s name.The letter must be printed on the financial institution’s letterhead which includes the authorized bank representative name, title, phone number and signature.');
    }, function () {
        $(this).text('Bank Verification Letter');
    });

});


