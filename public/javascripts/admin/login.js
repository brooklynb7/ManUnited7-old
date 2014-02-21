(function($) {
	$(document).ready(function() {
		$('#userNameInput, #pwdInput').placeholder();

		$("#signInBtn").on("click", function() {
			return checkSignInSubmit();
		});
	});

	var checkSignInSubmit = function() {
		if (!$.trim($("#userNameInput").val()) || !$.trim($("#pwdInput").val())) {
			showErrorMsg();
			return false;
		}
		return true;
	};

	var showErrorMsg = function(){
		$(".errorMsg").html($.i18n._("fillAllFields")).show();
	};
})(jQuery);