"use strict";
//  Global variables
var vdd = {};
vdd.GlobalVariables = {
    IsValidUser: false,
    UserName: ''
};

var Globaljqvar = {
};
window.__INITIAL_STATE__ = {
    IsValidUser: false
};

$('#img_username').on('click', function (e) {
    //$('#logoutModal').modal('show');
});

$('.liselect').on('click', function () {
    //$(this).toggleClass('background_selected');
});

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