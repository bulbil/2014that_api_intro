// 				<コ:彡
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
// pagination does not start on 0 but on an index of 1
page = 1;

// bootstrap tooltip instantiation
$('.tooltip').tooltip();

// search button event
$('#search').submit(function(e) {

	e.preventDefault();

    page = ($('#thumbs ul li').length == 0) ? 1 : page + 1; 
    $('#thumbs ul li').remove();

	var input = $('#search input[type=text]').val();

	dplaThumbs.search(input, page);

});

var dplaThumbs = {

	search: function(str, int){
		
	// the main object to store your GET parameters ... 
	// the possibilities are (almost) endless
		data = { 	
			'q': str, 
    		'api_key': apiKey,
    		'page_size': 10,
    		'page': int
	        	};
	// the basic ajax request
		$.ajax({

	        type: 'GET',
	        url: baseURL,
	        data: data,
	        // don't forget! otherwise won't work
	        dataType: 'jsonp',
	        success: function(data) {
			
			$('#thumbs ul').empty();
			$('#results h3').show();

		// each request has some overall metadata, like data.count
		var count = (data.count > 0) ? data.count + ' results' : 'no results';
		$('#count h1').text(count);
		console.log(data.docs);
		// each record is returned in data.docs
		$.each(data.docs, function(i,d) {

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
		},

	        error: function(e) { console.log(e.message); }
	    });
	}
}
