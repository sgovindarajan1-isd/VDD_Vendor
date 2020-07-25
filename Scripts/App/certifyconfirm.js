$(document).ready(function () {
    var vendorDetails = {};
    //var bankDetails = {};
    var bankDetails = new Array();
    var locationList = new Array();

    $("#img_info_step").parent().css("border-color", "#7030A0");
    $('#lbl_userName').text(sessionStorage.getItem('userName'));
    var vendorNumber = sessionStorage.getItem('vendorNumber');

    $("#liNavigation").show();
    $(".round-tab").css("border-color", "#e0e0e0");

    //$(".nav li").removeClass("active");
    if ($(location).attr('href').indexOf("_partialCertify") > -1) {

        $('#txtSignerPhone').mask('(000)000-0000');

        $("#img_info_step").attr('src', '/Content/Images/info_step.png');
        $("#img_bank_verify_step").attr('src', '/Content/Images/info_step.png');
        $("#img_certify_step").attr('src', '/Content/Images/certify_step_on.png');
        $("#img_certify_step").addClass("active");
        $("#li_certify_step").addClass("active");
        $("#img_certify_step").parent().css("border-color", "#7030A0");
        $('#lbl_header').html('Certify');

        $("#span_bankstep").removeClass("disabled");
        $("#span_attachmentstep").removeClass("disabled");
        $("#span_verify_step").removeClass("disabled");

        ////testing values
        $('#txtSignerName').val('Srini G');
        $('#txtSignerTitle').val('President/CEO');
        $('#txtSignerPhone').val('1233442345');
        $('#txtSignerEmail').val('srini@isd.com');
        //////testing values

        var certifyobj = JSON.parse(sessionStorage.getItem("certifydetailsJson"));
        if ((certifyobj != null) && (certifyobj != 'undefined')) {
            $("#txtSignerName").val(certifyobj[0].Signername);
            $("#txtSignerTitle").val(certifyobj[0].Signertitle);
            $("#txtSignerPhone").val(certifyobj[0].Signerphone),
                $("#txtSignerEmail").val(certifyobj[0].Signeremail);
        }
    }
    else if ($(location).attr('href').indexOf("_partialSubmit") > -1) {
        $("#img_info_step").attr('src', '/Content/Images/info_step.png');
        $("#img_certify_step").attr('src', '/Content/Images/certify_step.png');
        $("#img_submit_step").attr('src', '/Content/Images/submit_step_on.png');
        $("#img_submit_step").addClass("active");
        $("#li_submit_step").addClass("active");
        $("#img_submit_step").parent().css("border-color", "#7030A0");
        $('#lbl_header').html('Submit');
        $("#chk_submit").prop("checked", true);

        $("#span_bankstep").removeClass("disabled");
        $("#span_attachmentstep").removeClass("disabled");
        $("#span_verify_step").removeClass("disabled");
        $("#span_certify_step").removeClass("disabled");
        $("#span_submit_step").removeClass("disabled");

        getSubmitDetails();
    }
    else if ($(location).attr('href').indexOf("_partialConfirmation") > -1) {
        $("#img_info_step").attr('src', '/Content/Images/info_step.png');
        $("#img_certify_step").attr('src', '/Content/Images/certify_step.png');
        $("#img_submit_step").attr('src', '/Content/Images/submit_step.png');
        $("#img_confirmation_step").attr('src', '/Content/Images/confirmation_step_on.png');
        $("#img_confirmation_step").addClass("active");
        $("#li_confirmation_step").addClass("active");
        $("#img_confirmation_step").parent().css("border-color", "#7030A0");
        $('#lbl_header').html('Confirmation');

        $("#span_bankstep").removeClass("disabled");
        $("#span_attachmentstep").removeClass("disabled");
        $("#span_verify_step").removeClass("disabled");
        $("#span_submit_step").removeClass("disabled");
        $("#span_confirmation_step").removeClass("disabled");

        $("#confirmationNumber").html(sessionStorage.getItem('confirmationNumber'));
        $("#submittedDate").html(formatDateDisplay(sessionStorage.getItem('submittedDate')));
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
        debugger;
        if (signerPhone.length <= 0) {
            $("#signerPhone").html('Authorized Signer’s Phone # is required.');
            bool = false;
        } else if (!validatePhone(signerPhone)) {
            $("#signerPhone").html('Valid Authorized Signer’s Phone # is required.');
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

    //function validatePhone(txtPhone) {
    //    debugger;
    //    if (txtPhone.length() < 13)
    //        return false;
    //    var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    //    if (filter.test(txtPhone)) {
    //        return true;
    //    }
    //    else {
    //        return false;
    //    }
    //}

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
            debugger;

            submitDetailstoDB();  // submit/ generate confirmation number
        }
    });

    $("#chk_submit").on('click', function (e) {
        e.preventDefault();
    });

    function getSubmitDetails() {
        debugger;
        var bankobj = JSON.parse(sessionStorage.getItem("bankdetailsJson"));
        var vendorNumber = sessionStorage.getItem('vendorNumber');

        $("#vendorname").html(vendorNumber);
        $("#payeename").html(sessionStorage.getItem('userName'));
        $("#ssn").html(sessionStorage.getItem('tin'));
        vendorDetails.vendorname = vendorNumber;
        vendorDetails.payeename = sessionStorage.getItem('userName');
        vendorDetails.ssn = sessionStorage.getItem('tin');


        if (!(bankobj == null) || (bankobj == 'undefined')) {
            $("#typeofAccount").html(bankobj[0].AccountType);
            $("#accountNumber").html(bankobj[0].BankAccountNumber);
            $("#routingNumber").html(bankobj[0].BankRoutingNo);
            $("#finInsName").html(bankobj[0].FinancialIns);
            $("#ddemail").html(bankobj[0].DDNotifiEmail);

            vendorDetails.AccountType = bankobj[0].AccountType;
            vendorDetails.BankAccountNumber = bankobj[0].BankAccountNumber;
            vendorDetails.BankRoutingNo = bankobj[0].BankRoutingNo;
            vendorDetails.FinancialIns = bankobj[0].FinancialIns;
            vendorDetails.DDNotifiEmail = bankobj[0].DDNotifiEmail;
        }
        var paymentJsonObj = JSON.parse(sessionStorage.getItem("paymentJson"));
        $.each(paymentJsonObj, function (key, value) {
            var s = '<div class="form-group">' +
                '<div class= "col-md-12" >' +
                '<span>' + value.VendorAddress + '</span>' +
                '</div >' +
                '</div >';
            $('#banklocations').append(s);
            var bankDetl = {};
            bankDetl.address = value.VendorAddress;
            locationList.push(value.VendorAddress);
            bankDetails.push(value.LocationID);
        });

        var certifyobj = JSON.parse(sessionStorage.getItem("certifydetailsJson"));
        if (!(certifyobj == null) || (certifyobj == 'undefined')) {
            $("#signername").html(certifyobj[0].Signername);
            $("#signertitle").html(certifyobj[0].Signertitle);
            $("#signerphone").html(certifyobj[0].Signerphone);
            $("#signeremail").html(certifyobj[0].Signeremail);

            vendorDetails.Signername = certifyobj[0].Signername;
            vendorDetails.Signertitle = certifyobj[0].Signertitle;
            vendorDetails.Signerphone = certifyobj[0].Signerphone;
            vendorDetails.Signeremail = certifyobj[0].Signeremail;
        }

        //vendorDetails.Confirmation = "";
        //vendorDetails.SubmitDateTime = new Date();
        vendorDetails.VendorAttachmentFileName = sessionStorage.getItem('uploadedfile')

        //var uniqueFileName = getUniqueFileNameusingCurrentTime();
        //vendorDetails.VendorReportFileName = uniqueFileName + "_" + vendorNumber + "_VendorReport.pdf";

        vendorDetails.locationIDs = bankDetails;
        vendorDetails.locationAddressDescList = locationList;

        vendorDetails.Source_ip = "Source_ip";//getSourceip();
        vendorDetails.Source_device = "Source_device";
        vendorDetails.User_agent = navigator.userAgent;
        vendorDetails.Host_headers = "Host_headers";
    }

    function getSourceip() {
        $.getJSON("http://jsonip.appspot.com?callback=?",
            function (data) {
              //  alert(data.ip);
                return(data.ip);
            });
    }

    function formatDateDisplay(dateVal) {
        var newDate = new Date(dateVal);

        var sMonth = padValue(newDate.getMonth() + 1);
        var sDay = padValue(newDate.getDate());
        var sYear = newDate.getFullYear();
        var sHour = newDate.getHours();
        var sMinute = padValue(newDate.getMinutes());
        var sSecond = padValue(newDate.getSeconds());
        var sAMPM = "AM";

        var iHourCheck = parseInt(sHour);

        if (iHourCheck > 12) {
            sAMPM = "PM";
            sHour = iHourCheck - 12;
        }
        else if (iHourCheck === 0) {
            sHour = "12";
        }

        sHour = padValue(sHour);

        return sMonth + "/" + sDay + "/" + sYear + " " + sHour + ":" + sMinute + ":" + sSecond + " "+ sAMPM;
    }

    function padValue(value) {
        return (value < 10) ? "0" + value : value;
    }

    function submitDetailstoDB() {
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
                debugger;
                sessionStorage.setItem('confirmationNumber', data.data.Confirmation);
                sessionStorage.setItem('submittedDate', data.data.SubmitDateTime);
                vendorDetails.Confirmation = data.data.Confirmation;
                vendorDetails.SubmitDateTime = data.data.SubmitDateTime;
                // generate the report and store in the upload folder

                var uniqueDatetime = getUniqueFileNameusingCurrentTime();
                vendorDetails.VendorReportFileName = "VCM_" + vendorDetails.Confirmation + "_" + uniqueDatetime + ".pdf";
                createReportandGettheFielName(vendorDetails);
                //window.location.href = '/deposit/_partialConfirmation';
             }
            , complete: function (jqXHR) {
             }
            , error: function (jqXHR, textStatus, errorThrown) {
                debugger;
                if (textStatus == 'error') {
                    toastr.options.positionClass = "toast-bottom-right";
                    toastr.warning("Error in submission, Please check the entry!");
                }
                else if (jqXHR.status == '401') {
                    window.location.href = "/Home/UnAuthorized";
                }
            }
        });
    };
    /*Submit Section end */

/*Confirmation Section begin */
    function createReportandGettheFielName(vendorDetails) {
        debugger;
        $.ajax({
            url: '/report/showreport/',
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            //processData: false,
            data: JSON.stringify(vendorDetails),  
            success: function (result) {
                debugger;
                $.ajax({
                    url: hostdomainUrl + "api/values/InsertVendorReportFileName/",
                    type: "POST",
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(vendorDetails),  
                    headers: {
                        'Authorization': 'Basic ' + btoa(sessionStorage.getItem('accessToken'))
                    },
                    success: function (result) {
                        debugger;
                        sessionStorage.setItem('VendorReportFileName', vendorDetails.VendorReportFileName)
                        window.location.href = '/deposit/_partialConfirmation';
                        //return result;
                    },
                    error: function (err) {
                          alert('Report Error' + err.statusText);
                    }
                });
               // return result;
            },
            error: function (err) {
                debugger;
                alert('report error -' + err.statusText);
            }
        });  
    }

    $('#btn_viewReport').on('click', function (e) {
        //var url = '../Home/GetPDF?fileName=' + FileName;
        var url = "/Uploads/" + sessionStorage.getItem('VendorReportFileName');
       // $("#filelink").attr("href", "/Uploads/" + sessionStorage.getItem('VendorReportFileName'));
            window.open(url, '_blank');
    });
    /*Confirmation Section end */
});