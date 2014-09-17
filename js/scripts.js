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
		'page_size': 0,
		'api_key': apiKey
	},

	template: _.template( $('#thumbs_template').html() ),
	
	search: function(str, page){
	// the main object to store your GET parameters ... 
	// the possibilities are (almost) endless
		this.data.q = str;
		this.data.page = page;

	    this.getData()
	    	.done(_.bind(function(d){ 
	    		this.showThumbs(d);
				$('.tooltip').tooltip({
					animation: true,
					html: true,
					placement: 'auto bottom'
					});
				}, this)
			);
	},

	getData: function(){
	// the basic ajax request
		return $.ajax({

	        type: 'GET',
	        url: this.baseURL,
	        data: this.data,
	        // don't forget! otherwise won't work
	        dataType: 'jsonp',
	        error: function(e) { console.log(e.message); }
	    });
	},

	showThumbs: function(json){
		// $thumbs = $('#thumbs ul');
		var $thumbs = $('#thumbs');
		$thumbs.masonry('remove', $('.thumb'));
		$results = $('#results h3');
		$results.find('#page-size').html( this.data['page_size'] );
		$results.show();

		// each request has some overall metadata, like data.count
		var count = (json.count > 0) ? json.count + ' results' : 'no results';
		$('#count h1').text(count);
		
		var thumbsArray = [];
		for(var i =0; i < json.limit; i++ ){

			if(json.docs[i].object){ $thumbs.append($(this.template({thumb: json.docs[i]}))); }
		}
		$thumbs.masonry('appended', $('.thumb'));
		console.log(thumbsArray);
	}
}

$(function(){

	$('body').tooltip({
		selector: '[rel=tooltip]',
		html: true
	});

	var $thumbs = $('#thumbs');
	$('#thumbs').masonry({
		// options
		columnWidth: 200,
		itemSelector: '.thumb',
		containerStyle: null,
		// isFitWidth: true,
		gutter: 15
	});

	// search button event
	$('#search').submit(function(e) {

		e.preventDefault();
	    var page = ($('#thumbs div').length == 0) ? 1 : page + 1; 
		var input = $('#search input[type=text]').val();
		dplaThumbs.search(input, page);
	});

});