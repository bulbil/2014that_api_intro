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

var dplaThumbs = {

	template: _.template( $('#thumbs_template').html() ),
	search: function(str, int){
		
	// the main object to store your GET parameters ... 
	// the possibilities are (almost) endless
		data = { 	
			'q': str, 
    		'api_key': apiKey,
    		'page_size': 10,
    		'page': int
	        	};

	    dplaThumbs.getData(data)
	    	.done(function(d){ 
	    		dplaThumbs.showThumbs(d);
				$('.tooltip').tooltip({
					animation: true,
					html: true,
					placement: 'auto bottom'
					});

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
		$thumbs = $('#thumbs ul');
		$thumbs.empty();
		$('#results h3').show();

		// each request has some overall metadata, like data.count
		var count = (json.count > 0) ? json.count + ' results' : 'no results';
		$('#count h1').text(count);
		
		for(var i =0; i < json.limit; i++ ){

			$thumbs.append(this.template({thumb: json.docs[i]}));
			$(thumbs).find('li').tooltip({ 
				title: json.docs[i].sourceResource.title,
				placement: "auto bottom",
				animation: true
			});
		}
	}
}

// bootstrap tooltip instantiation

$(function(){
	
	// search button event
	$('#search').submit(function(e) {

		e.preventDefault();
	    page = ($('#thumbs ul li').length == 0) ? 1 : page + 1; 
	    $('#thumbs ul li').remove();
		var input = $('#search input[type=text]').val();
		dplaThumbs.search(input, page);
});

});