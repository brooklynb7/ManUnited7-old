(function($) {
	$(document).ready(function() {
		$(".removePost").on('click', function() {
			var $this = $(this);
			var postId = $this.attr('post-id');
			Modal.confirm({
				title: $.i18n._('delArticle'),
				text: $this.attr('post-title') + "<br/><br/>" + $.i18n._('whetherDelArticle'),
				confirm: function() {
					var $postRow = $('#' + postId);
					$postRow.busy('show');
					$.ajax({
						url: '/api/post/del',
						type: 'post',
						data: {
							postId: postId
						},
						success: function() {
							$postRow.remove();
						},
						complete: function() {
							$postRow.busy('hide');
						}
					});
				}
			});

		});
	});
})(jQuery);