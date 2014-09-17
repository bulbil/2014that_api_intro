//				<コ:彡
//
//			dpla-thumbs
// 
//
// nabil kashyap (www.nabilk.com)
// this is a simple script to show off the basics of the DPLA
// API -- not particularly robust but I hope gives the basic idea

// first get your api key from http://dp.la/info/developers/codex/policies/#get-a-key
//var apiKey = '[YOUR_API_KEY]',
var baseURL = 'http://api.dp.la/v2/items?q=',
pageSize = 25,
// pagination does not start on 0 but on an index of 1
page = 1;

// bootstrap tooltip instantiation
$('.tooltip').tooltip();

// search button event
$('#search').submit(function(e) {

	e.preventDefault();

	page = ($('#thumbs ul li').length === 0) ? 1 : page + 1;
	$('#thumbs ul li').remove();

	var input = $('#search input[type=text]').val();

	dplaThumbs.search(input, page);

});

var dplaThumbs = {

	search: function(str, num){
		
	// the main object to store your GET parameters ... 
	// the possibilities are (almost) endless
		data = {
			'q': str,
			'api_key': apiKey,
			'page_size': pageSize,
			'page': num
		};

		dplaThumbs.getData(data)
			.done(function(d){
				dplaThumbs.showThumbs(d);
			});
		},

	getData: function(json){
	// the basic ajax request
		return $.ajax({

		type: 'GET',
		url: baseURL,
		data: json,
		// don't forget! otherwise won't work
		dataType: 'jsonp',
		error: function(e) { console.log(e.message); }
		});
	},

	showThumbs: function(json){

		$('#thumbs ul').empty();
		var $results = $('#results h3');
		$results.show();
		$results.find('#page-size').html(pageSize);

		// each request has some overall metadata, like data.count
		var count = (json.count > 0) ? json.count + ' results' : 'no results';
		$('#count h1').text(count);
		console.log(json.docs);
		// each record is returned in data.docs
		$.each(json.docs, function(i,d) {

			// d.object, for instance, has the URL to the thumb (low-res preview of the digital object)
			// for the purpose of this thing, skips a result if no thumbnail
			if(d.object) {
				$('#thumbs ul').append('<li>');
				var $thumb = $('#thumbs li').last();
				$thumb.append('<a><img>');
				// d.isShownAt has the URL to the original representation of the record
				$thumb.children('a').attr( {'href': d.isShownAt, 'target': 'blank'});
				$thumb.find('a img').attr('src', d.object);
				$thumb.tooltip({'title': d.sourceResource.title, 'placement': 'auto bottom'});
				}
			});
	}
};