(function() {
	var _confirmModalHtml = function(options) {
		options = options || {};
		var $modal = $("<div class='modal fade' />");
		var $modal_dialog = $("<div class='modal-dialog' />");
		var $modal_content = $("<div class='modal-content' />");

		var $modal_header = $("<div class='modal-header' />");
		var $close_btn = $('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
		var $modal_title = $('<h4 class="modal-title">' + (options.title || "Modal title") + '</h4>');
		$modal_header.append($close_btn).append($modal_title);

		var $modal_body = $('<div class="modal-body" />').append($('<p />').append(options.text || ""));

		var $modal_footer = $('<div class="modal-footer" />');
		var $modal_close = $('<button type="button" class="btn btn-sm btn-default" data-dismiss="modal">' + $.i18n._("cancel") + '</button>');
		var $modal_confirm = $('<button type="button" class="btn btn-sm btn-red confirm-btn">'+ $.i18n._('ok') +'</button>');
		$modal_footer.append($modal_close).append($modal_confirm);

		$modal_content.append($modal_header).append($modal_body).append($modal_footer);
		$modal.append($modal_dialog.append($modal_content));
		$modal.on('hidden.bs.modal', function() {
			$modal.remove();
		});
		return $modal;
	};

	var creatConfirmModal = function(options) {
		var $modal = _confirmModalHtml(options);
		$("body").append($modal);
		$modal.modal("show");
		if(options && options.confirm && $.isFunction(options.confirm)){
			$modal.find('.confirm-btn').on('click', function(){
				$modal.modal("hide");
				options.confirm();
			});
		}
	};

	window.Modal = {
		confirm: creatConfirmModal
	};
})();