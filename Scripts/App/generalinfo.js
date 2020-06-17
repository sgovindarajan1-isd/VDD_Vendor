$(document).ready(function () {
    $('#lbl_userName').text(sessionStorage.getItem('userName'));
    $('#lbl_header').html('General Information');
    $('#btn_contactus_submit').click(btn_contactus_click);
});