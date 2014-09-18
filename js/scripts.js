//				<コ:彡
//
//			dpla-thumbs
// 
//
// nabil kashyap (www.nabilk.com)
// this is a simple script to show off the basics of the DPLA
// API -- not particularly robust but I hope gives the basic idea

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