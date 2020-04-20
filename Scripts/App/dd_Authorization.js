var vdd = vdd || {};
$(document).ready(function () {
    $('#lbl_userName').text(sessionStorage.getItem('userName'));
    var vendorNumber = sessionStorage.getItem('vendorNumber');
    var payeeId = sessionStorage.getItem('payeeId');
    var vendordata;
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        dataType: 'json',
        data: JSON.stringify({ 'vendorNumber': vendorNumber, 'payeeId': payeeId }),
        headers: {
            'Authorization': 'Basic ' + btoa(sessionStorage.getItem('accessToken'))
        },
        url: hostdomainUrl + "api/values/GetVendorDetailsByName/",
        success: function (data) {
            $('#ddGrid').dataTable({
                responsive: true,
                data: data.data.vendorlst,
                columns: [
                    { 'data': '' },
                    { 'data': 'VendorNumber'},
                    { 'data': 'VendorName' },
                    { 'data': 'VendorAddress' },
                    { 'data': 'RoutingNumber' },
                    { 'data': 'AcccountNo' },
                    { 'data': 'AccountType' },
                    { 'data': 'RemittanceEmail' },
                    { 'data': 'Status' }
                ],
                "order": [[1, "VendorNumber"]],

                columnDefs: [
                    {
                    searchable: true,
                        targets: 0,
                        data: null,
                        defaultContent: '',
                        orderable: false,
                        className: 'select-checkbox'
                    },
                ],
                select: {
                    style: 'os',
                    selector: 'td:first-child'
                },
            });

        },
        error: function (_XMLHttpRequest, textStatus, errorThrown) {
            if (_XMLHttpRequest.status == '401') {
                window.location.href = "/Home/UnAuthorized";
            }
        }
    });
});

   