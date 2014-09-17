// 				<コ:彡
//
//			dpla-thumbs
// 
//
// nabil kashyap (www.nabilk.com)
// this is a simple script to show off the basics of the DPLA
// API -- not particularly robust but I hope gives the basic idea

var dplaThumbs = {
	baseURL: 'http://api.dp.la/v2/items?q=',
	data: {
		'q': '',
		'page': 2,
		'page_size': 25,
		'api_key': apiKey
	},

	template: _.template( $('#thumbs_template').html() ),
	search: function(str, int){
		

	// the main object to store your GET parameters ... 
	// the possibilities are (almost) endless
		dplaThumbs.data.q = str;

	    dplaThumbs.getData()
	    	.done(function(d){ 
	    		dplaThumbs.showThumbs(d);
				$('.tooltip').tooltip({
					animation: true,
					html: true,
					placement: 'auto bottom'
					});

	    	});
	},

	getData: function(){
	// the basic ajax request
		return $.ajax({

	        type: 'GET',
	        url: dplaThumbs.baseURL,
	        data: dplaThumbs.data,
	        // don't forget! otherwise won't work
	        dataType: 'jsonp',
	        error: function(e) { console.log(e.message); }
	    });
	},

	showThumbs: function(json){
		$thumbs = $('#thumbs ul');
		$thumbs.empty();

		$results = $('#results h3');
		$results.find('#page-size').html( dplaThumbs.data['page_size'] );
		$results.show();

		// each request has some overall metadata, like data.count
		var count = (json.count > 0) ? json.count + ' results' : 'no results';
		$('#count h1').text(count);
		
		for(var i =0; i < json.limit; i++ ){

			$thumbs.append(this.template({thumb: json.docs[i]}));	
		}
	}
}

$(function(){

	$('body').tooltip({
		selector: '[rel=tooltip]',
		html: true
	});
	// search button event
	$('#search').submit(function(e) {

		e.preventDefault();
	    page = ($('#thumbs ul li').length == 0) ? 1 : page + 1; 
	    $('#thumbs ul li').remove();
		var input = $('#search input[type=text]').val();
		dplaThumbs.search(input, page);
});

});