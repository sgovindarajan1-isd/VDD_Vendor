var vdd = vdd || {};
$(document).ready(function () {
    $("#liNavigation").show();

    $("#li_infostep").addClass("active");
    $("#li_infostep").removeClass("disabled");
    $(".round-tab").css("border-color", "#e0e0e0");
    $("#img_info_step").parent().css("border-color", "#7030A0");
    $('#lbl_userName').text(sessionStorage.getItem('userName'));
    var vendorNumber = sessionStorage.getItem('vendorNumber');
    //var payeeId = sessionStorage.getItem('payeeId');
    $('#lbl_header').html('Payment Information');
    $("#div_spinner").addClass('loader');
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        dataType: 'json',
        data: JSON.stringify({ 'vendorNumber': vendorNumber }),  // 'payeeId': payeeId 
        headers: {
            'Authorization': 'Basic ' + btoa(sessionStorage.getItem('accessToken'))
        },
        url: hostdomainUrl + "api/values/GetVendorDetailsByName/",
        success: function (data) {
            $("#div_spinner").removeClass('loader');
            $('#ddGrid').dataTable({
                responsive: true,
                data: data.data.vendorlst,
                columns: [
                    { 'data': '' },
                    { 'data': 'VendorAddress' },
                    {
                        'data': 'RoutingNumber',
                        "render": function (data, type, row, meta) {
                            if (row.Status === 'Approved') {
                                // data = '******' + row.AcccountNo.substr(row.AcccountNo.length - 4);  //'Masked';
                                data = '******' + data.substr(data.length - 4);  //'Masked';
                            }
                            return data;
                        }
                    },
                    {
                        'data': 'AcccountNo',
                        "render": function (data, type, row, meta) {
                            if (row.Status === 'Approved') {
                                // data = '******' + row.AcccountNo.substr(row.AcccountNo.length - 4);  //'Masked';
                                data = '******' + data.substr(data.length - 4);  //'Masked';
                            }
                            return data;
                        }, "width": '12%'
                    },
                    { 'data': 'AccountType' },
                    { 'data': 'RemittanceEmail' },
                    { 'data': 'Status', "width": '140px', 'className': 'payment-status-color' }
                ],
                //"order": [[1, "VendorNumber"]],

                columnDefs: [
                    {
                        searchable: true,
                        width: '3%',
                        targets: 0,
                        data: null,
                        defaultContent: '',
                        orderable: false,
                        className: 'select-checkbox',
                    },
                ],
                select: {
                    style: 'multi',
                    selector: 'td:first-child'
                },
                "createdRow": function (row, data, dataIndex) {
                   // if (data.Status.toLowerCase() === 'pending') {
                    if (data.Status.toLowerCase() === 'new') {
                        $(row).css('background-color', 'lightgrey');
                        $('td', row).removeClass('select-checkbox');
                    }
                }
            });

            var table = $('#ddGrid').DataTable();
            var allRowsArePending = true;
            table.rows(function (idx, data, node) {
                if (data.Status.toLowerCase() !== 'new') {  // direct deposit    "pending" replaced as new
                    allRowsArePending = false;
                    return true;
                }
            });

            if (allRowsArePending) {
                $("#pendingMessage").text("Your request is currently pending review. Please allow up to 20 days to process the request.")
                $('#btn_deposit_next').hide();
            }
        },
        error: function (_XMLHttpRequest, textStatus, errorThrown) {
            if (_XMLHttpRequest.status == '401') {
                window.location.href = "/Home/UnAuthorized";
            }
        }
    });

    $('#btn_deposit_next').on('click', function (e) {
        //$(".nav li").removeClass("active");
        //$(".nav li").removeClass('background_selected');
        //$("#img_bank_step").attr('src', '/Content/Images/bank_step_on.png');
        var paymentRows = [];
        var table = $('#ddGrid').DataTable();
        if (table.rows('.selected').any()) {
            $.each(table.rows('.selected').data(), function () {
                paymentRows.push({
                    VendorNumber: this["VendorNumber"],
                    VendorName: this["VendorName"],
                    LocationID: this["LocationID"],
                    VendorAddress: this["VendorAddress"],
                    RoutingNumber: this["RoutingNumber"],
                    AcccountNo: this["AcccountNo"],
                    AccountType: this["AccountType"],
                    RemittanceEmail: this["RemittanceEmail"],
                    Status: this["Status"],
                });
            })

            sessionStorage.setItem('paymentJson', JSON.stringify(paymentRows));
            window.location.href = '/deposit/_partialBankDetails';
        }
        else {
            toastr.options.positionClass = "toast-bottom-right";
            toastr.warning("Please select atleast one Address to Continue!");
        }
    });

});

