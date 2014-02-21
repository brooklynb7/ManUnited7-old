(function($) {
	$(document).ready(function() {
		$('#currentPwd, #newPwd, #confirmPwd').placeholder();

		$("#changePwdBtn").on("click", function() {
			return checkChangePwdSubmit();
		});
	});

	var checkChangePwdSubmit = function() {
		if (!$.trim($("#currentPwd").val()) || !$.trim($("#newPwd").val()) || !$.trim($("#confirmPwd").val())) {
			showErrorMsg($.i18n._("fillAllFields"));
			return false;
		} else if($.trim($("#newPwd").val()) !== $.trim($("#confirmPwd").val())) {
			showErrorMsg($.i18n._("wrongConfirmPwd"));
			return false;
		} else {
			return true;
		}
	};

	var showErrorMsg = function(errMsg){
		$(".successMsg").html("");
		$(".errorMsg").html(errMsg).show();
	};
})(jQuery);