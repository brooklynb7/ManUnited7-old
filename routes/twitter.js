var url = require('url');
var request = require('request');
var qs = require('querystring');
var fs = require('fs');
var config = require('../config').config;
var util = require('../util');

var api_host = config.twitter.api_host;
var consumer_key = config.twitter.consumer_key;
var consumer_secret = config.twitter.consumer_secret;
var access_token = config.twitter.access_token;
var access_token_secret = config.twitter.access_token_secret;

var getListTimeLineUrl = function(name) {
	return '/lists/statuses.json?slug=' + name + '&owner_screen_name=brooklynb7_';
};

exports.showListTimeline = function(req, res) {
	request.get(generateOAuthRequestOption(getListTimeLineUrl(req.params.name), req), function(e, r, body) {
		//res.render("api_demo/get_profile", {result:JSON.parse(body)});
		res.send(JSON.parse(body));
	});
}

var generateOAuthRequestOption = function(api_url, req) {
	var requestOption = {
		url: api_host + api_url,
		oauth: {
			consumer_key: consumer_key,
			consumer_secret: consumer_secret,
			token: access_token,
			token_secret: access_token_secret
		}
	};
	if (config.needProxy) {
		requestOption.proxy = config.proxyUrl;
	}
	return requestOption;
};

/*var test_data = [{
	"created_at": "Sun Feb 16 08:33:10 +0000 2014",
	"id": 434968683715125250,
	"id_str": "434968683715125248",
	"text": "“@Stayl525: @themichaelowen how is  your little garden stream bearing up with all this rain ?”\n\nNot sure, I'm lapping up the sun in Dubai!!!",
	"source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
	"truncated": false,
	"in_reply_to_status_id": 434967856774934500,
	"in_reply_to_status_id_str": "434967856774934528",
	"in_reply_to_user_id": 48391074,
	"in_reply_to_user_id_str": "48391074",
	"in_reply_to_screen_name": "Stayl525",
	"user": {
		"id": 216264820,
		"id_str": "216264820",
		"name": "michael owen",
		"screen_name": "themichaelowen",
		"location": "UK",
		"description": "The Official Twitter Account of Michael Owen\r\nLondon Marathon Fundraising Page:\r\nhttp://t.co/FffSaT5lcy",
		"url": "http://t.co/EqrbjG0Xa0",
		"entities": {
			"url": {
				"urls": [{
					"url": "http://t.co/EqrbjG0Xa0",
					"expanded_url": "http://michaelowen.com",
					"display_url": "michaelowen.com",
					"indices": [
						0,
						22
					]
				}]
			},
			"description": {
				"urls": [{
					"url": "http://t.co/FffSaT5lcy",
					"expanded_url": "http://uk.virginmoneygiving.com/themichaelowen",
					"display_url": "uk.virginmoneygiving.com/themichaelowen",
					"indices": [
						81,
						103
					]
				}]
			}
		},
		"protected": false,
		"followers_count": 2577040,
		"friends_count": 306,
		"listed_count": 11080,
		"created_at": "Tue Nov 16 06:15:01 +0000 2010",
		"favourites_count": 15,
		"utc_offset": null,
		"time_zone": null,
		"geo_enabled": false,
		"verified": true,
		"statuses_count": 8032,
		"lang": "en",
		"contributors_enabled": false,
		"is_translator": false,
		"is_translation_enabled": true,
		"profile_background_color": "C9B699",
		"profile_background_image_url": "http://pbs.twimg.com/profile_background_images/490997085/Twitter_Backdrop.jpg",
		"profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/490997085/Twitter_Backdrop.jpg",
		"profile_background_tile": false,
		"profile_image_url": "http://pbs.twimg.com/profile_images/378800000682575410/a2ed9f7aa442a990879737b2d66f2b30_normal.jpeg",
		"profile_image_url_https": "https://pbs.twimg.com/profile_images/378800000682575410/a2ed9f7aa442a990879737b2d66f2b30_normal.jpeg",
		"profile_link_color": "AB5000",
		"profile_sidebar_border_color": "EEEEEE",
		"profile_sidebar_fill_color": "EFEFEF",
		"profile_text_color": "333333",
		"profile_use_background_image": true,
		"default_profile": false,
		"default_profile_image": false,
		"following": true,
		"follow_request_sent": false,
		"notifications": false
	},
	"geo": null,
	"coordinates": null,
	"place": null,
	"contributors": null,
	"retweet_count": 19,
	"favorite_count": 67,
	"entities": {
		"hashtags": [],
		"symbols": [],
		"urls": [],
		"user_mentions": [{
			"screen_name": "Stayl525",
			"name": "Steve Taylor",
			"id": 48391074,
			"id_str": "48391074",
			"indices": [
				1,
				10
			]
		}, {
			"screen_name": "themichaelowen",
			"name": "michael owen",
			"id": 216264820,
			"id_str": "216264820",
			"indices": [
				12,
				27
			]
		}]
	},
	"favorited": false,
	"retweeted": false,
	"lang": "en"
}, {
	"created_at": "Sun Feb 16 08:05:46 +0000 2014",
	"id": 434961787817971700,
	"id_str": "434961787817971712",
	"text": "Nicky Romero &amp; NERVO - Like Home (Official Music Video) http://t.co/HcF3vYK9Ru via @youtube",
	"source": "<a href=\"http://twitter.com/tweetbutton\" rel=\"nofollow\">Tweet Button</a>",
	"truncated": false,
	"in_reply_to_status_id": null,
	"in_reply_to_status_id_str": null,
	"in_reply_to_user_id": null,
	"in_reply_to_user_id_str": null,
	"in_reply_to_screen_name": null,
	"user": {
		"id": 816229956,
		"id_str": "816229956",
		"name": "Denny Büttner",
		"screen_name": "ButtnerBrothers",
		"location": "Manchester, UK",
		"description": "Facebook and Instagram: dennybuttner",
		"url": null,
		"entities": {
			"description": {
				"urls": []
			}
		},
		"protected": false,
		"followers_count": 198544,
		"friends_count": 132,
		"listed_count": 859,
		"created_at": "Mon Sep 10 23:27:01 +0000 2012",
		"favourites_count": 166,
		"utc_offset": 7200,
		"time_zone": "Athens",
		"geo_enabled": true,
		"verified": false,
		"statuses_count": 876,
		"lang": "nl",
		"contributors_enabled": false,
		"is_translator": false,
		"is_translation_enabled": false,
		"profile_background_color": "C0DEED",
		"profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
		"profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
		"profile_background_tile": false,
		"profile_image_url": "http://pbs.twimg.com/profile_images/378800000693526447/e839d51be5a1c744c294ce0f1862ee32_normal.jpeg",
		"profile_image_url_https": "https://pbs.twimg.com/profile_images/378800000693526447/e839d51be5a1c744c294ce0f1862ee32_normal.jpeg",
		"profile_banner_url": "https://pbs.twimg.com/profile_banners/816229956/1382264540",
		"profile_link_color": "0084B4",
		"profile_sidebar_border_color": "C0DEED",
		"profile_sidebar_fill_color": "DDEEF6",
		"profile_text_color": "333333",
		"profile_use_background_image": true,
		"default_profile": true,
		"default_profile_image": false,
		"following": true,
		"follow_request_sent": false,
		"notifications": false
	},
	"geo": null,
	"coordinates": null,
	"place": null,
	"contributors": null,
	"retweet_count": 3,
	"favorite_count": 4,
	"entities": {
		"hashtags": [],
		"symbols": [],
		"urls": [{
			"url": "http://t.co/HcF3vYK9Ru",
			"expanded_url": "http://www.youtube.com/watch?v=6agp_W-rqgQ&sns=tw",
			"display_url": "youtube.com/watch?v=6agp_W…",
			"indices": [
				60,
				82
			]
		}],
		"user_mentions": [{
			"screen_name": "YouTube",
			"name": "YouTube",
			"id": 10228272,
			"id_str": "10228272",
			"indices": [
				87,
				95
			]
		}]
	},
	"favorited": false,
	"retweeted": false,
	"possibly_sensitive": false,
	"lang": "en"
}, {
	"created_at": "Sun Feb 16 08:02:46 +0000 2014",
	"id": 434961033024000000,
	"id_str": "434961033024000000",
	"text": "Remember the little dickie bird I spoke about a while ago? It is officially chirping in my ear a little louder!!!",
	"source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
	"truncated": false,
	"in_reply_to_status_id": null,
	"in_reply_to_status_id_str": null,
	"in_reply_to_user_id": null,
	"in_reply_to_user_id_str": null,
	"in_reply_to_screen_name": null,
	"user": {
		"id": 216264820,
		"id_str": "216264820",
		"name": "michael owen",
		"screen_name": "themichaelowen",
		"location": "UK",
		"description": "The Official Twitter Account of Michael Owen\r\nLondon Marathon Fundraising Page:\r\nhttp://t.co/FffSaT5lcy",
		"url": "http://t.co/EqrbjG0Xa0",
		"entities": {
			"url": {
				"urls": [{
					"url": "http://t.co/EqrbjG0Xa0",
					"expanded_url": "http://michaelowen.com",
					"display_url": "michaelowen.com",
					"indices": [
						0,
						22
					]
				}]
			},
			"description": {
				"urls": [{
					"url": "http://t.co/FffSaT5lcy",
					"expanded_url": "http://uk.virginmoneygiving.com/themichaelowen",
					"display_url": "uk.virginmoneygiving.com/themichaelowen",
					"indices": [
						81,
						103
					]
				}]
			}
		},
		"protected": false,
		"followers_count": 2577040,
		"friends_count": 306,
		"listed_count": 11080,
		"created_at": "Tue Nov 16 06:15:01 +0000 2010",
		"favourites_count": 15,
		"utc_offset": null,
		"time_zone": null,
		"geo_enabled": false,
		"verified": true,
		"statuses_count": 8032,
		"lang": "en",
		"contributors_enabled": false,
		"is_translator": false,
		"is_translation_enabled": true,
		"profile_background_color": "C9B699",
		"profile_background_image_url": "http://pbs.twimg.com/profile_background_images/490997085/Twitter_Backdrop.jpg",
		"profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/490997085/Twitter_Backdrop.jpg",
		"profile_background_tile": false,
		"profile_image_url": "http://pbs.twimg.com/profile_images/378800000682575410/a2ed9f7aa442a990879737b2d66f2b30_normal.jpeg",
		"profile_image_url_https": "https://pbs.twimg.com/profile_images/378800000682575410/a2ed9f7aa442a990879737b2d66f2b30_normal.jpeg",
		"profile_link_color": "AB5000",
		"profile_sidebar_border_color": "EEEEEE",
		"profile_sidebar_fill_color": "EFEFEF",
		"profile_text_color": "333333",
		"profile_use_background_image": true,
		"default_profile": false,
		"default_profile_image": false,
		"following": true,
		"follow_request_sent": false,
		"notifications": false
	},
	"geo": null,
	"coordinates": null,
	"place": null,
	"contributors": null,
	"retweet_count": 79,
	"favorite_count": 72,
	"entities": {
		"hashtags": [],
		"symbols": [],
		"urls": [],
		"user_mentions": []
	},
	"favorited": false,
	"retweeted": false,
	"lang": "en"
}];*/