(function($) {
	$(document).ready(function() {
		var isReversed = ($.cookie(sort_cookie_key) == 'desc' ? true : false);
		var $sort_timeline = $('.sort_timeline');
		if (isReversed) {
			timeline_data.reverse();
			setSortDescUi($sort_timeline);
		}
		renderTimeLines();

		$sort_timeline.on('click', function() {
			var $this = $(this);
			timeline_data.reverse();
			if ($this.hasClass('desc')) {
				setSortUi($this);
			} else {
				setSortDescUi($this);
			}
			renderTimeLines();
		});
	});
	var renderTimeLines = function() {
		var $timeline = $('.timeline').empty();
		var invertedArray = _.uniq(_.pluck(timeline_data, 'year'), true);
		$.each(timeline_data, function(i, timeline) {
			var isInverted = false;
			var hasBadge = true;
			if (i > 0) {
				if (timeline_data[i - 1].year == this.year) {
					hasBadge = false;
				}
				if (_.indexOf(invertedArray, this.year) % 2 != 0) {
					isInverted = true;
				}
			}
			$timeline.append(generateTimeline(this, isInverted, hasBadge));
		});
	};

	var sort_cookie_key = "sort_timeline";

	var setSortCookie = function(sort) {
		$.cookie(sort_cookie_key, sort, {
			expires: 365,
			path: '/'
		});
	};

	var setSortUi = function($sortTimelin) {
		setSortCookie('');
		$sortTimelin.removeClass('desc');
		$sortTimelin.find('.glyphicon').addClass('glyphicon-chevron-up').removeClass('glyphicon-chevron-down');
	};

	var setSortDescUi = function($sortTimelin) {
		setSortCookie('desc');
		$sortTimelin.addClass('desc');
		$sortTimelin.find('.glyphicon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
	};

	var generateTimeline = function(timelineObj, isInverted, hasBadge) {
		var $li = $('<li />');
		if (isInverted) {
			$li.addClass('timeline-inverted');
		}

		if (hasBadge) {
			var $year = $('<div class="timeline-badge danger">' + timelineObj.year + '</div>');
			$li.append($year);
		}

		var $panel = $('<div class="timeline-panel"></div>');
		var $heading = $('<div class="timeline-heading"></div>');

		if (timelineObj.title) {
			var $title = $('<h4 class="timeline-title">' + timelineObj.title + '</h4>');
			$heading.append($title);
		}
		if (timelineObj.sub_title) {
			var $subTitle = $('<p><small class="text-muted">' + timelineObj.sub_title + '</small></p>');
			$heading.append($subTitle);
		}
		$panel.append($heading);

		var $body = $('<div class="timeline-body"><p>' + timelineObj.body_html + '</p></div>');
		$panel.append($body);

		$li.append($panel);
		return $li;
	};

	var timeline_data = [{
			'year': 1878,
			'title': 'Newton Heath LYR Football Club',
			'sub_title': 'Manchester United Football Club was formed in 1878 as Newton Heath LYR Football Club by the Carriage and Wagon department of the Lancashire and Yorkshire Railway depot at Newton Heath.',
			'body_html': 'In 1878 the Lancashire and Yorkshire Railway Company granted permission for the employees of its Carriage and Wagon department to start a football team, which was subsequently named Newton Heath LYR. LYR stood for "Lancashire &amp; Yorkshire Railway" and was used to distinguish the team from their colleagues from the Motive Power Division, who were known as Newton Heath Loco.The team was funded by the railway company, who paid the lease on its first home ground, a field close to the railway yard on North Road. It is said that the players were "tough, diligent men who formed a powerful side"; they initially played games against other teams of railway workers, very few of which were recorded.'
		}, {
			'year': 1882,
			'title':'',
			'sub_title':'',
			'body_html': 'During the 1882–83 season, the team played a total of 26 recorded friendly matches, and the following season competed in the Lancashire Cup but lost 7–2 in the first round to the reserve team of Blackburn Olympic.'
		}, {
			'year': 1884,
			'body_html': 'In 1884, Newton Heath LYR applied for the Manchester and District Challenge Cup and reached the final, which they lost 3–0 to Hurst at Whalley Range. The team never failed to score at least three goals in each of the rounds leading up to the final, including in a first round match against Eccles that had to be replayed after the Eccles management protested about Newton Heath\'s third goal.'
		}, {
			'year': 1886,
			'body_html': 'In 1886, the club began to expand by signing players of national reputation such as Jack Powell, who became club captain, Jack and Roger Doughty, and Tom Burke. In 1886–87 the club entered the FA Cup for the first time and were drawn away to Fleetwood Rangers in the first round; they managed to earn a 2–2 but when club captain Jack Powell refused to play a period of extra time, Fleetwood were awarded the tie. A subsequent unsuccessful protest to the Football Association led to Newton Heath LYR entering a self-imposed exile from the FA Cup, which lasted until 1889.'
		}, {
			'year': 1886,
			'body_html': 'Newton Heath reached the final of the Manchester and District Challenge Cup a further five times, winning all but one.'
		}, {
			'year': 1888,
			'body_html': 'In 1888, having been spurned by the newly formed the Football League, Newton Heath entered their first ever league competition, becoming founder members of The Combination.'
		}, {
			'year': 1889,
			'body_html': 'In April 1889, The Combination hit financial difficulties and was wound up before the season could be completed.'
		}, {
			'year': 1890,
			'title': 'Football Alliance',
			'body_html': 'In 1890, after an unsuccessful application (they received only one vote) to join the Football League, Newton Heath and 11 other clubs not in the League formed an organisation known as the Football Alliance, in which they finished eighth in the first season.'
		}, {
			'year': 1892,
			'title': 'First Division',
			'body_html': 'After three further applications, the club joined the Football League when it merged with the Football Alliance in 1892 and Newton Heath was elected to the First Division.'
		}, {
			'year': 1892,
			'title': 'The 1892-93 Newton Heath team',
			'body_html': '<img src="http://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Newton_Heath_1892-93.jpg/640px-Newton_Heath_1892-93.jpg" class="img-rounded img_100" />'
		}
	];
})(jQuery);