(function($) {
	var locale = $.cookie("i18nlocale") || "zh-cn";
	$.ajax({
		type: "get",
		url: "/resources/locales/" + locale + ".js",
		async: false,
		dataType: "json",
		success: function(rst) {
			$.i18n.load(rst);
		}
	});

	$(document).ready(function() {
		$(".i18n.en").on("click", function() {
			$.cookie("i18nlocale", 'en', {
				expires: 365,
				path: '/'
			});
			window.location.reload();
		});

		$(".i18n.zh").on("click", function() {
			$.cookie("i18nlocale", "zh-cn", {
				expires: 365,
				path: '/'
			});
			window.location.reload();
		});

		$(".container").css('min-height',$(window).height() - 120);
	});
})(jQuery);
