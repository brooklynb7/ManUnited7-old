(function($) {
	$(document).ready(function() {
		$('#title, #slug, #tag, #originalUrl, #source').placeholder();

		var editor = $('textarea#editor').ckeditor({
			language: $.cookie("i18nlocale")
		}).editor;

		editor.setData($('#content').val());

		editor.on("instanceReady", function() {
			this.document.on("keyup", function() {
				//console.log($('textarea#editor').val());
			});
		});

		$("#publishBtn").on("click", function() {
			$("#content").val($('textarea#editor').val());
			if (checkPostField()) {
				showErrorMsg("");
				$this = $(this);
				publishPost($this);
			}
		});
		$("#editBtn").on("click", function() {
			$("#content").val($('textarea#editor').val());
			if (checkPostField()) {
				showErrorMsg("");
				$this = $(this);
				editPost($this);
			}
		});
	});

	var publishPost = function($btn) {
		$btn.button('loading');
		$.ajax({
			url: '/api/post/new',
			type: 'post',
			data: getPostObject(),
			success: function(rst) {
				window.location.href = '/admin/post';
			},
			error: function(jqXHR) {
				showErrorMsg(jqXHR.responseText);
			},
			complete: function() {
				$btn.button('reset');
			}
		});
	};

	var editPost = function($btn) {
		$btn.button('loading');
		$.ajax({
			url: '/api/post/edit',
			type: 'post',
			data: getPostObject($("#postId").val()),
			success: function(rst) {
				window.location.href = '/admin/post';
			},
			error: function(jqXHR) {
				showErrorMsg(jqXHR.responseText);
			},
			complete: function() {
				$btn.button('reset');
			}
		});
	};

	var getPostObject = function(id) {
		var postObject = {
			title: $.trim($("#title").val()),
			slug: $.trim($("#slug").val()),
			content: $.trim($("#content").val()),
			tag: $.trim($("#tag").val()),
			originalUrl: $.trim($("#originalUrl").val()),
			source: $.trim($("#source").val()),
			coverImg: $.trim($("#coverImg").val()),
			visible: ($("#visible")[0].checked ? 1 : 0)
		};
		if(id) {
			postObject["postId"] = id;
		}
		return postObject;
	};

	var checkPostField = function() {
		if (!$.trim($("#title").val())) {
			showErrorMsg($.i18n._("fillTitle"));
			return false;
		} else if (!$.trim($("#slug").val())) {
			showErrorMsg($.i18n._("fillSlug"));
			return false;
		}/* else if (!$.trim($("#short_desc").val())) {
			showErrorMsg($.i18n._("fillShortDesc"));
			return false;
		} */else if (!$.trim($("#content").val())) {
			showErrorMsg($.i18n._("fillContent"));
			return false;
		} else {
			return true;
		}
	};

	var showErrorMsg = function(errMsg) {
		$(".errorMsg").html(errMsg).show();
	};
})(jQuery);