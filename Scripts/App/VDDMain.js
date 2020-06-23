"use strict";
//  Global variables
var vdd = {};

/* Intial settings */
//$(".nav li").removeClass("active");
$("#btn_loginLock").hide();

vdd.GlobalVariables = {
    IsValidUser: false,
    UserName: ''
};


/*Initial settings*/

var Globaljqvar = {
};
window.__INITIAL_STATE__ = {
    IsValidUser: false
};


// testing begin 

//var is_mobile = 'No';
//if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//	is_mobile = 'Yes';
//}


//debugger;
//	$.getJSON("http://jsonip.appspot.com?callback=?",
//		function (data) {
//			return (data.ip);
//		});

//$.getJSON("http://smart-ip.net/geoip-json?callback=?", function (data) { }); 

//$.get("https://ipinfo.io", function (response) {
//}, "json") 

// testing end


$('#img_username').on('click', function (e) {
    //$('#logoutModal').modal('show');
});


//----------------------  click nav button
//$("#ul").find("li span").click(function () {
//	$('.selectedLi').removeClass('selectedLi');
//	$(this).addClass('selectedLi');
//});

//$(".liselect").click(function () {
//	BusinessLogic();
//});

//function BusinessLogic() {
//	debugger;
//	var text = $('#ul').find("li span span.selectedLi").text();
//	//alert("selected Value112" + text);
//} 

////$("li").addClass("disabled");


$('.liselect').on('click', function () {
	debugger;
	var eId = $(this)[0].id;

	var selectedValue = parseInt($(this).attr('value'));
	//alert('selectd Value : ' + selectedValue);

	var currentNavId = $('.liselect.active')[0].id;
	//alert('current id ' + currentNavId);

	//var s = $('#' + $('.liselect.active')[0].id + '[value=' + currentValue + "]");

	var currentValue = parseInt($('#' + $('.liselect.active')[0].id).attr('value'));
	//alert('currentValue' + currentValue);
	//alert('currentValue' + $('#' + $('.liselect.active')[0].id).attr('value'));

	if (currentValue > selectedValue) {
		//alert('here you go ');

		switch (selectedValue) {
			case 1:
				window.location.href = '/deposit/Index';   
				break;
			case 2:
				window.location.href = '/deposit/_partialBankDetails';
				break;
			case 3:
				window.location.href = '/deposit/_partialAttachment';
				break;
			case 4:
				window.location.href = '/deposit/_partialBankVerify';
				break;
			case 5:
				window.location.href = '/deposit/_partialCertify';
				break;
			case 6:
				window.location.href = '/deposit/_partialSubmit';
				break;
			case 6:
				window.location.href = '/deposit/_partialSubmit';
				break;
		}
	}
	

	
	//if ($(this).length > 0) {
	//	alert($(this)[0].id);
	//}

	//var s = $('#' + eId + '[value=' + currentValue + "]");
	//alert('here '+s.id);
	////  if the li is not active  and value <= current value then 
	////if (! ($("#" + eId).hasClass('active'))  and   {

	////  if the li is not active  and value <= current value then 
	

	//if ($("#"+eId).hasClass('disabled')) {
	//	var value = $(this).attr('value');
	//	alert('Selected menu value : ' + value);
	//	debugger;
	//	if ($(this).length > 0) {
	//		alert($(this)[0].id);
	//	}

	//	alert('current ' + $('.liselect.active')[0].id);

	//	// disabled all nav button

	////	$(this)[0].addClass('disabled');
	//}
	//else
	//	alert('this donot has disabled');


});


//$('.liselect.active').on('click', function () {
//	alert('.liselect.active');
//	//debugger;

//	//if ($(".liselect.active").find('span').hasClass("disabled")) {

//	////if ($(".round-tab").hasClass("disabled")) {
//	//	alert('it has disabled');
//	//} else {
//	//	alert('it has not disabled');
//	//}
	
//	//window.history.back();
//    //$(this).toggleClass('background_selected');
//});
//----------------------  click nav button

//$(".nav li").on("click", function (e) {
//   // e.preventDefault();
//});
//    $(".nav li").removeClass("active");
//    --$(".nav li span span").removeClass("disabled");
//    $(this).addClass("active");
//    --$(".nav li span span").removeClass("disabled");


//$(".nav li span span img").on("click", function () {
//    $("#img_confirmation_step").attr('src', '/Content/Images/confirmation_step.png');
//    $("#img_submit_step").attr('src', '/Content/Images/submit_step.png');
//    $("#img_certify_step_step").attr('src', '/Content/Images/certify_step.png');
//    $("#img_bank_verify_step").attr('src', '/Content/Images/verify_step.png');
//    $("#img_bank_attachment_step").attr('src', '/Content/Images/attachment_step.png');
//    $("#img_bank_step").attr('src', '/Content/Images/bank_step.png');
//    $("#img_info_step").attr('src', '/Content/Images/info_step.png');

//    if ($(this)[0].id == "img_confirmation_step") {
//        $(this).attr('src', '/Content/Images/confirmation_step_on.png');
//    }
//    if ($(this)[0].id == "img_submit_step_step") {
//        $(this).attr('src', '/Content/Images/submit_step_on.png');
//    }
//    if ($(this)[0].id == "img_certify_step_step") {
//        $(this).attr('src', '/Content/Images/certify_step_on.png');
//    }
//    if ($(this)[0].id == "img_bank_verify_step") {
//        $(this).attr('src', '/Content/Images/verify_step_on.png');
//    }
//    if ($(this)[0].id == "img_bank_attachment_step") {
//        $(this).attr('src', '/Content/Images/attachment_step_on.png');
//    }
//    if ($(this)[0].id == "img_info_step") {
//        $(this).attr('src', '/Content/Images/info_step_on.png');
//    }
//    if ($(this)[0].id == "img_bank_step") {
//        $(this).attr('src', '/Content/Images/bank_step_on.png');
//    }
//});

$("#btn_logout").on('click', function () {
    $('#logoutModal').modal('hide');
    sessionStorage.setItem('userName', "");
    sessionStorage.setItem('accessToken', "");
    sessionStorage.setItem('vendorNumber', "");
    //sessionStorage.setItem('payeeId', "");

    window.location.href = "/Home/Index";
});

$("#btn_generalInfo").on('click', function () {
    window.location.href = "/Home/UnAuthorized";
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}




(function ($) {
	$.fn.menumaker = function (options) {
		var cssmenu = $(this), settings = $.extend({
			format: "dropdown",
			sticky: false
		}, options);
		return this.each(function () {
			$(this).find(".menu-button").on('click', function () {
				$(this).toggleClass('menu-opened');
				var mainmenu = $(this).next('ul');
				if (mainmenu.hasClass('open')) {
					mainmenu.slideToggle().removeClass('open');
				} else {
					mainmenu.slideToggle().addClass('open');
					if (settings.format === "dropdown") {
						mainmenu.find('ul').show();
					}
				}
			});
			var $cssmenu = cssmenu.find('li ul').parent();
			$cssmenu.addClass('has-sub');
			$cssmenu.on('mouseenter', function () {
				var doc_w = $(document).width();
				var sub_pos = $(this).find('ul').offset();
				var sub_width = $(this).find('ul').width();
				if ((sub_pos.left + sub_width) > doc_w) {
					$(this).find('ul').css('margin-left', '-' + ((sub_pos.left + sub_width) - doc_w) + 'px');
				}
			});
			multiTg = function () {
				cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
				cssmenu.find('.submenu-button').on('click', function () {
					$(this).toggleClass('submenu-opened');
					$(this).parents('li').toggleClass('sub-active');//mobile fix//
					if ($(this).siblings('ul').hasClass('open')) {
						$(this).siblings('ul').removeClass('open').slideToggle();
					} else {
						$(this).siblings('ul').addClass('open').slideToggle();
					}
				});
			};

			if (settings.format === 'multitoggle') multiTg(); else cssmenu.addClass('dropdown');

			if (settings.sticky === true) cssmenu.css('position', 'fixed');
			resizeFix = function () {
				var mediasize = 1180;
				if ($(window).width() > mediasize) {
					cssmenu.find('ul').show();
				}
				if ($(window).width() <= mediasize) {
					cssmenu.find('ul').removeClass('open'); //.hide()
					cssmenu.find('div.button').removeClass('menu-opened');
				}
			};
			resizeFix();
			return $(window).on('resize', resizeFix);
		});
	};
})(jQuery);