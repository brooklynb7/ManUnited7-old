(function($) {
	var BusyIndicator = function(element) {
		this.element = $(element);
		this.isVisible = false;
	};
	BusyIndicator.prototype.show = function() {
		if (this.element) {
			this.element.block({
				message: '<img style="width:12px;height:12px;" src="/resources/images/loading.gif" />',
				css: {
					backgroundColor: 'transparent',
					border: '0px'
				},
				overlayCSS: {
					backgroundColor: '#EEE',
					opacity: 0.5
				},
				baseZ: 10000
			});
			this.isVisible = true;
		}
		return this;
	};
	BusyIndicator.prototype.hide = function() {
		if (this.element) {
			this.element.unblock();
		}
		this.isVisible = false;
		return this;
	};

	$.fn.busy = function(option) {
		return this.each(function() {
			var $this = $(this)
			var data = $this.data('jq.busy')

			if (!data) $this.data('jq.busy', (data = new BusyIndicator(this)));
			if (typeof option == 'string') data[option]();
		});
	}

	$.fn.busy.Constructor = BusyIndicator;

})(jQuery);