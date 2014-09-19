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
var dplaThumbs = {
	baseURL: 'http://api.dp.la/v2/items?q=',
	// the main object to store your GET parameters ... 
	// the possibilities are (almost) endless

	data: {
		'q': '',
		'page': 0,
		'page_size': 25,
		'api_key': apiKey
	},

	$el: $('#thumbs'),
	
	template: _.template( $('#thumbs_template').html() ),
	
	search: function(str){

		this.data.q = str;
		this.data.page += 1;

		this.getData()
		.done(_.bind(function(d){
			this.showThumbs(d);
			$('.tooltip').tooltip({
				animation: true,
				html: true,
				placement: 'auto bottom' });
			}, this)
		);
	},

	getData: function(){
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
			type: 'GET',
			url: this.baseURL,
			data: this.data,
			// don't forget! otherwise won't work
			dataType: 'jsonp',
			error: function(e) { console.log(e.message); }
			});
		},

	showThumbs: function(json){

		this.$el.packery('remove' , $('.thumb') );
		$results = $('#results h3');
		$results.find('#page-size').html( this.data['page_size'] );
		$results.show();

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
		
		var thumbsArray = [];
		for(var i =0; i < json.limit; i++ ){

			if(json.docs[i].object){
				this.$el.append($(this.template( { thumb: json.docs[i] }) ) );
				this.$el.packery( 'addItems', $('.thumb').last() );
			}
		}

		this.$el.packery().imagesLoaded( this.$el.packery() );
	}
};

$(function(){

	$('body').tooltip({
		selector: '[rel=tooltip]',
		html: true
	});

	$('#thumbs').packery({
		// options
		itemSelector: '.thumb',
		// styleContainer: null,
		gutter: 15,
		transitionDuration: ".75s"
	});

	$('#search').submit(function(e) {
		e.preventDefault();
		var input = $('#search input[type=text]').val();
		dplaThumbs.search(input);
	});
});
