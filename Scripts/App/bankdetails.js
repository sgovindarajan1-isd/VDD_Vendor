$(document).ready(function () {
    $("#liNavigation").show();
    $(".round-tab").css("border-color", "#e0e0e0");


    // testing values
    if ($(location).attr('href').indexOf("local") > -1) {
        $('#txtAccountType').val('1');
        $('#txtBankAcNo').val('66112342');
        $('#txtRe-BankAcNo').val('66112342');
        $('#txtBankRoutingNo').val('122000661');

        $('#txtDDNotifiEmail').val('ddnotify@isd.com');
        $('#txtReDDNotifiEmail').val('ddnotify@isd.com');
    }

    // testing values


    if ($(location).attr('href').indexOf("_partialBankDetails") > -1) {

        $("#img_info_step").attr('src', '/Content/Images/info_step.png');
        $("#img_bank_step").attr('src', '/Content/Images/bank_step_on.png');
        $("#img_bank_step").addClass("active");
        $("#li_bankstep").addClass("active");
        $("#li_bankstep").removeClass("disabled");
        $("#img_bank_step").parent().css("border-color", "#7030A0");
        $('#lbl_header').html('Enter Banking Information');
        $('#img_checkImage').hide();  //  by default img will be invisible

        var bankobj = JSON.parse(sessionStorage.getItem("bankdetailsJson"));
        if ((bankobj != null) && (bankobj != 'undefined')) {
            $("#txtAccountType").prop('selectedIndex', bankobj[0].AccountType);
            $("#txtBankAcNo").val(bankobj[0].BankAccountNumber);
            $("#txtRe-BankAcNo").val(bankobj[0].ReBankAcNo),
            $("#txtBankRoutingNo").val(bankobj[0].BankRoutingNo);
            $("#txtFinancialIns").val(bankobj[0].FinancialIns);
            $("#txtDDNotifiEmail").val(bankobj[0].DDNotifiEmail);
            $("#txtReDDNotifiEmail").val(bankobj[0].ReDDNotifiEmail);

            var accountType = $('#txtAccountType').val();
            if (parseInt(accountType) != 1) {
                $('#img_checkImage').hide();
            }
            else {
                $('#img_checkImage').show();
            }
        }
    }
    else if ($(location).attr('href').indexOf("_partialAttachment") > -1) {
        $("#img_info_step").attr('src', '/Content/Images/info_step.png');
        $("#img_bank_step").attr('src', '/Content/Images/bank_step.png');
        $("#img_bank_attachment_step").attr('src', '/Content/Images/attachment_step_on.png');
        $("#img_bank_attachment_step").parent().css("border-color", "#7030A0");
        $("#img_bank_attachment_step").addClass("active");
        $("#li_attachmentstep").addClass("active");

        $('#lbl_header').html('Add Attachment');
        var bankobj = JSON.parse(sessionStorage.getItem("bankdetailsJson"));

        if (!(bankobj == null) || (bankobj == 'undefined')) {
            if (bankobj[0].AccountType == 2)  // SAVING ACCOUNT
            {
                $("#btn_voidCheck").addClass('disabled_color');
                $("#btn_voidCheck").prop('disabled', true);
            }
        }
        $("#span_bankstep").removeClass("disabled");       

        var attachobj = sessionStorage.getItem('uploadedfile');
        if ((attachobj != null) && (attachobj != 'undefined')) {
            $("#divmodifiedFileName").show();
            $("#pnlAttachment").show();

            $("#txtattachment").val(sessionStorage.getItem('originalfileName'));
            $("#modifiedFileName").text(sessionStorage.getItem('uploadedfile'));            
        }
        else {
            $("#pnlAttachment").hide();
            $("#divmodifiedFileName").hide();
        }        
    }
    else if ($(location).attr('href').indexOf("_partialBankVerify") > -1) {
        $("#img_bank_step").attr('src', '/Content/Images/bank_step.png');
        $("#img_info_step").attr('src', '/Content/Images/info_step.png');
        $("#img_bank_verify_step").attr('src', '/Content/Images/verify_step_on.png');
        $("#img_bank_verify_step").parent().css("border-color", "#7030A0");
        $("#img_bank_verify_step").addClass("active");
        $("#li_verify_step").addClass("active");

        $("#span_bankstep").removeClass("disabled");
        $("#span_attachmentstep").removeClass("disabled");

        $('#lbl_header').html('Verify Banking Information');

        var bankdetailsJson = jQuery.parseJSON(sessionStorage.bankdetailsJson);
        var acType = "Error";
        if (bankdetailsJson[0].AccountType == "1")
            acType = "Checking";
        else if (bankdetailsJson[0].AccountType == "2")
            acType = "Saving";

        $("#accountType").text(acType);
        $("#nameonbankAc").text(sessionStorage.getItem('userName'));
        $("#bankAcNo").text(bankdetailsJson[0].BankAccountNumber);
        $("#bankRoutingNo").text(bankdetailsJson[0].BankRoutingNo);
        var img = new Image();
        //img.src = sessionStorage.getItem('imagefile-selectedFile');  //working earlier
        img.src = sessionStorage.getItem('uploadedfile');
        $(".imagearea").html(img);

        var str = ".pdf,.doc,.docx,";
        var strarray = str.split(",");
        if (strarray.indexOf(sessionStorage.getItem('uploadedfileExtenstion').toLowerCase()) <= -1) {
            $("#Verifyimg").attr("src", "/Uploads/" + sessionStorage.getItem('uploadedfile'));
            $("#divBankVerifyDoc").css('display', 'block');
        }
        else {
            $("#filelink").attr("href", "/Uploads/" + sessionStorage.getItem('uploadedfile'));
            $('a#filelink').text(sessionStorage.getItem('uploadedfile'));
            $("#divBankVerifyImage").css('display', 'block');
        }
    }
    $('#lbl_userName').text(sessionStorage.getItem('userName'));
    var vendorNumber = sessionStorage.getItem('vendorNumber');

    //var paymentJson = JSON.parse(sessionStorage.paymentJson); //sessionStorage.getItem('paymentJson');
    //var paymentJsonObj = JSON.parse(sessionStorage.getItem("paymentJson"));  

    if (sessionStorage.getItem('accessToken') == null) {
        window.location.href = "/Home/UnAuthorized";
    }

    $('#btn_bank_back').on('click', function (e) {
        storeDetails();
        window.history.back();
    });

    $('#txtAccountType').change(function (e) {
        var accountType = $('#txtAccountType').val();
        if (parseInt(accountType) != 1) {
            $('#img_checkImage').hide();
        }
        else {
            $('#img_checkImage').show();
        }
    });

    $("#txtBankRoutingNo").focusout(function () {
        verifyBank();
    }).click(function (e) {
        e.stopPropagation();
        return true;
    });

    //$("#pnlAttachment").hide();
    //$("#divmodifiedFileName").hide();
    var fileSelectytedtype = '';

    $('.buttonBig').on('click', function () {
        $("#divmodifiedFileName").hide();
        $("#pnlAttachment").show();

        sessionStorage.setItem('selectedFile', null);
        $("#txtattachment").val('');
    });

    $("#btn_voidCheck").on('click', function () {
        fileSelectytedtype = 'VC';

        $("#btn_voidCheck").removeClass('disabled_color');
        $("#btn_verifyLetter").addClass("disabled_color");
        $("#btn_Statement").addClass("disabled_color");
    });
    $("#btn_Statement").on('click', function () {
        fileSelectytedtype = 'ST';

        $("#btn_Statement").removeClass('disabled_color');
        $("#btn_verifyLetter").addClass('disabled_color');
        $("#btn_voidCheck").addClass('disabled_color');
    });
    $("#btn_verifyLetter").on('click', function () {
        fileSelectytedtype = 'VL';

        $("#btn_verifyLetter").removeClass('disabled_color');
        $("#btn_voidCheck").addClass('disabled_color');
        $("#btn_Statement").addClass('disabled_color');
    });

    $(function () {
        $("input:file[id=file-upload]").change(function () {
            $("#file-upload-value").html($(this).val());
        });
    });

    function handleFileSelect(fileInput) {  ////  if sessionstorage 'uploadedfile'  works delete this key
        var file = fileInput;
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.src = reader.result;
            //localStorage.theImage = reader.result; //stores the image to localStorage
            sessionStorage.setItem('imagefile-selectedFile', reader.result);
        }

        var aa = reader.readAsDataURL(file);
        var img = new Image();
        //img.src = localStorage.theImage;
        //$('.imagearea').html(img);
        return img;
    };

    $('input[type="file"]').change(function (e) {
        var ext = ['.PDF', '.JPG', '.JPEG', '.GIF', '.PNG'];  // '.DOC', '.DOCX',
        $("#fileError_or_Info").html("");
        var fileName = e.target.files[0].name;
        var file = e.target.files[0];

        var imagefile = handleFileSelect(file);
        var fileExtenstion = getFileExtenstion(fileName.toUpperCase(), ext);
        if (file) {
            if (file.size >= 10485760) {
                $("#fileError_or_Info").html('The file size is too large. Please choose another file.');
                return;
            }
            else if (fileExtenstion == null) {
                $("#fileError_or_Info").html('The acceptable file types are .pdf, .jpg, .jpeg, .gif, .png. Please choose another file.');  //  .doc, .docx, 
                return;
            }
            else {
                sessionStorage.setItem('selectedFile', imagefile);  //  if sessionstorage 'uploadedfile'  works delete this key

                $("#txtattachment").val(fileName);
                sessionStorage.setItem('originalfileName', fileName);  //  original file name: we keep this in case coming back from  next screen 

                var uniqueFileName = getUniqueFileNameusingCurrentTime();
                var modifiedFileName = uniqueFileName + "_" + vendorNumber + "_" + fileSelectytedtype + fileExtenstion.toLowerCase();

                uploadfile(file, modifiedFileName, fileExtenstion.toLowerCase());

                $("#divmodifiedFileName").show();
                $("#modifiedFileName").text(modifiedFileName);
            }
        }
        e.target.value = '';
    });

    $("#btn_FileAttachmentDelete").on('click', function () {
        sessionStorage.removeItem('selectedFile');
        sessionStorage.removeItem('imagefile-selectedFile');
        sessionStorage.removeItem('originalfileName');
        sessionStorage.removeItem('uploadedfile');
        sessionStorage.removeItem('uploadedfileExtension');

        $("#modifiedFileName").text("");
        $("#fileError_or_Info").html("");
        $("#divmodifiedFileName").hide();
        $("#txtattachment").val("");
    });

    function getFileExtenstion(target, values) {
        for (var i = 0; i < values.length; i++) {
            if (target.indexOf(values[i]) > -1) {
                return values[i];
            }
        }
        return null;
    }

    $(".form-control").on('input', function (e) {
        //$("#lbl_invaliduserentry").text("");
        $(".errmessage").html("");
    });

    $('#btn_bank_next').on('click', function (e) {
        var accountType = $('#txtAccountType').val();
        var bankAcNo = $('#txtBankAcNo').val();
        var re_BankAcNo = $('#txtRe-BankAcNo').val();
        var bankRoutingNo = $('#txtBankRoutingNo').val();
        var financialIns = $('#txtFinancialIns').val().toLowerCase();
        var dDNotifiEmail = $('#txtDDNotifiEmail').val();
        var reDDNotifiEmail = $('#txtReDDNotifiEmail').val();

        var bool = true;

        if (parseInt(accountType) <= 0) {
            $("#accountType").html('Account Type is required.');
            bool = false;
        } else {
            $("#accountType").html('');
        }

        if (bankAcNo.length <= 0) {
            $("#bankAcNo").html('Bank Account Number is required.');
            bool = false;
        } else {
            $("#bankAcNo").html('');
        }

        if (re_BankAcNo.length <= 0) {
            $("#re_BankAcNo").html('Re Enter Bank Account Number is required.');
            bool = false;
        } else if (bankAcNo !== re_BankAcNo) {
            $("#re_BankAcNo").html('Bank Account Numbers do not match.');
            bool = false;
        } else {
            $("#re_BankAcNo").html('');
        }

        if (bankRoutingNo.length <= 0) {
            $("#bankRoutingNo").html('Bank Routing Number is required.');
            // $("#txtFinancialIns").css({ "background-color": "#ccc" });
            bool = false;
        } else {
            $("#bankRoutingNo").html('');
            //$("#txtFinancialIns").css({ "background-color": "#fff" });
        }

        if ((financialIns.length <= 0) || (financialIns === ("no banks found"))) {
            $("#financialIns").html('Financial Institution Name is required.');
            bool = false;
        } else {
            $("#financialIns").html('');
        }

        if (dDNotifiEmail.length <= 0) {
            $("#dDNotifiEmail").html('Email Address is required.');
            bool = false;
        } else if (!isEmail(dDNotifiEmail)) {
            $("#dDNotifiEmail").html('Please enter valid Email Address.');
            bool = false;
        } else {
            $("#dDNotifiEmail").html('');
        }

        if (reDDNotifiEmail.length <= 0) {
            $("#reDDNotifiEmail").html('Re Enter Email Address is required.');
            bool = false;
        } else if (!isEmail(reDDNotifiEmail)) {
            $("#reDDNotifiEmail").html('Please enter valid Email Address.');
            bool = false;
        } else if (dDNotifiEmail !== reDDNotifiEmail) {
            $("#reDDNotifiEmail").html('Direct Deposit Notification Email Addresses do not match.');
            bool = false;
        } else {
            $("#reDDNotifiEmail").html('');
        }

        if (!bool) {
            return false;
        } else {
            storeDetails();
            window.location.href = '/deposit/_partialAttachment';
        }
    });

    $('#btn_verifyBank').on('click', function (e) {
        verifyBank();
    });

    function verifyBank() {
        var aba = 0;
        aba = $("#txtBankRoutingNo").val();

        $.ajax({
            contentType: "application/json; charset=utf-8",
            type: "post",

            url: "/deposit/validateRoughtingNumber?aba=" + aba,
            success: function (data) {
                $("#txtFinancialIns").val(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#txtFinancialIns").val("No banks found");
            }
        });
    };

    function storeDetails() {
        var bankdetailsRow = [];
        bankdetailsRow.push({
            AccountType: $("#txtAccountType").val(),
            BankAccountNumber: $("#txtBankAcNo").val(),
            ReBankAcNo: $("#txtRe-BankAcNo").val(),
            BankRoutingNo: $("#txtBankRoutingNo").val(),
            FinancialIns: $("#txtFinancialIns").val(),
            DDNotifiEmail: $("#txtDDNotifiEmail").val(),
            ReDDNotifiEmail: $("#txtReDDNotifiEmail").val(),
        });
        sessionStorage.setItem('bankdetailsJson', JSON.stringify(bankdetailsRow));
    }

    $('#btn_voidCheck').hover(function () {
        $(this).text('Voided Check must have the holder’s name.');
    }, function () {
        $(this).text('Voided Check');
    });

    $('#btn_Statement').hover(function () {
        $(this).text('Statement must include the full bank account number, holder’s name and must be dated within 3 months.');
    }, function () {
        $(this).text('First page of Bank Statement');
    });

    $('#btn_verifyLetter').hover(function () {
        $(this).text('Letter must include the bank account number, account type and account holder’s name. The letter must be printed on the financial institution’s letterhead which includes the authorized bank representative name, title, phone number, signature, and must be dated within 3 months.');

             
    }, function () {
        $(this).text('Bank Verification Letter');
    });

    $('#btn_attach_next').on('click', function (e) {
        if ($("#txtattachment").val().length > 0) {
            window.location.href = '/deposit/_partialBankVerify';
        }
        else {
            toastr.options.positionClass = "toast-bottom-right";
            toastr.warning("You must select an attachment to continue!");
        }
    });

    $('#btn_attach_back').on('click', function (e) {
        window.history.back();
    });

    /*Verify bankinfo*/

    $('#btn_verify_notyou').on('click', function (e) {
        $("#alertContent").html("Los Angeles County requires that the name in our system matches the name on your bank account. If you need help to update the name in our system, please contact the Department that you are doing business with.");
        $("#alertModal").modal({
            backdrop: 'static'
        });
    });

    $("#btn_alertOK").on('click', function (e) {
        $('#alertModal').modal('toggle');
    });

    $("#btn_verify_no").on('click', function (e) {
        sessionStorage.setItem('selectedFile', null);
        sessionStorage.setItem('imagefile-selectedFile', null);
        //window.history.back();
        window.location.href = "/deposit/_partialBankDetails";
    });

    $("#btn_verify_yes").on('click', function (e) {
        window.location.href = '/deposit/_partialCertify';
    });

    function uploadfile(filetoupload, modifiedFileName, ext) {
        if (window.FormData !== undefined) {
            var files = filetoupload;
            // Create FormData object  
            var fileData = new FormData();

            // Looping over all files and add it to FormData object  
            fileData.append(files.name, files);

            // Adding one more key to FormData object for modified file name 
            fileData.append('modifiedFilename', modifiedFileName);

            $.ajax({
                url: '/deposit/UploadAttachmentFile',
                type: "POST",
                contentType: false, 
                processData: false, 
                data: fileData,
                success: function (result) {
                    sessionStorage.setItem('uploadedfile', result);
                    sessionStorage.setItem('uploadedfileExtenstion', ext);    //to-do get from config file
                },
                error: function (err) {
                    toastr.options.positionClass = "toast-bottom-right";
                    toastr.warning("Error in uploading Attachment, Please check the entry!");
                }
            });

            //  
            $.ajax({
                url: hostdomainUrl + "api/values/UploadAttachmentFile",
                type: "POST",
                contentType: false,
                processData: false,
                data: fileData,
                headers: {
                    'Authorization': 'Basic ' + btoa(sessionStorage.getItem('accessToken'))
                },
                success: function (result) {
                    sessionStorage.setItem('uploadedfile', result);
                    sessionStorage.setItem('uploadedfileExtenstion', ext);    //to-do get from config file
                },
                error: function (err) {
                    toastr.options.positionClass = "toast-bottom-right";
                    toastr.warning("Error in uploading Attachment, Please check the entry!");
                }
            });


        } else {
            alert("Attachment File type is not supported.");
        }
    };
});


