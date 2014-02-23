(function($) {
	$(document).ready(function() {
		$.each(timeline_data, function() {
			$('.timeline').append(createTimelineRow(this));
		});

		$(window).bind('beforeunload', function(e) {
			return 's';
		});
	});

	var createTimelineRow = function(data) {
		data = data || {};
		var $timeline_row = $('<div class="list-group-item row" />');
		var $add_btn = $('<a href="javascript:void(0);" class="glyphicon glyphicon-plus"></a>');
		var $remove_btn = $('<a href="javascript:void(0);" class="glyphicon glyphicon-remove"></a>');
		var $year_title_row = $(
			'<div class="row">' +
			'	<div class="col-xs-2">' +
			'		<input class="form-control input-sm input-year" type="text" placeholder="Year" value="' + (data.year || '') + '" />' +
			'	</div>' +
			'	<div class="col-xs-5">' +
			'		<input class="form-control input-sm input-title" type="text" placeholder="Title" value="' + (data.title || '') + '"/>' +
			'	</div>								' +
			'	<div class="col-xs-5">' +
			'		<input class="form-control input-sm input-subtitle" type="text" placeholder="Subtitle" value="' + (data.sub_title || '') + '"/>' +
			'	</div>								' +
			'</div>');
		var $content_row = $(
			'<div class="row content">' +
			'	<div class="col-xs-12">' +
			'		<textarea rows="3" class="form-control input-sm input-content" placeholder="Content">' + (data.body_html || '') + '</textarea>' +
			'	</div>' +
			'</div>');

		$timeline_row.append($add_btn).append($remove_btn).append($year_title_row).append($content_row);

		$add_btn.on('click', function() {
			var $html = createTimelineRow();
			$timeline_row.after($html.hide());
			$html.slideDown();
		});

		$remove_btn.on('click', function(){
			if(!$year_title_row.find('.input-year').val() && !$year_title_row.find('.input-title').val() &&
			   !$year_title_row.find('.input-subtitle').val() && !$content_row.find('.input-content').val()){
				$timeline_row.remove();
			} else {
				Modal.confirm({
					title: $.i18n._('delTimeline'),
					text: $.i18n._('whetherDelTimeline'),
					confirm: function() {
						$timeline_row.remove();
					}
				});
			}
		});

		return $timeline_row;
	};

}(jQuery));