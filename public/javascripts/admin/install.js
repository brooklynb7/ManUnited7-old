(function($) {
	$(document).ready(function() {
		$('#userNameInput, #pwdInput').placeholder();

		$("#initializeBtn").on("click", function() {
			return checkInitializeSubmit();
		});
	});

	var checkInitializeSubmit = function() {
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