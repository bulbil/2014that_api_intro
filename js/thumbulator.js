/*

 *				<コ:彡
 *
			dpla-thumbs
 *
	THATCAMP PHILLY INTRO TO APIs : thumbulator demo app
 *	Nabil Kashyap / nkashya1@swarthmore.edu / 9.19.14
	
 *	

 */


/*

----------------------------------------------------

get your API KEY by entering this command into the terminal and then checking your email

curl -v –XPOST http://api.dp.la/v2/api_key/[YOUR EMAIL ADDRESS]

----------------------------------------------------

// var apiKey = [ENTER YOUR KEY HERE]

----------------------------------------------------

try this out in your browser's address bar:

http://api.dp.la/v2/items?q=cats&fields=sourceResource.title,sourceResource.subject.name&page_size=10&api_key= [YOUR KEY]

----------------------------------------------------
*/

// the main things you need to worry about
var DT = {

	// where to address your question
	baseURL: 'http://api.dp.la/v2/items?q=',
	
	// the main object to store your GET parameters ... 
	// the possibilities are (almost) endless
	data: {
		'q': '',
		'page': 0,
		'page_size': 25,
		'api_key': apiKey
	},

	// the main container element for the dynamically added elements
	$el: $('#thumbs'),
	// underscore.js template
	template: _.template( $('#thumbs_template').html() ),
	crntSearch: null
};

// the magic api function -- gets data from DPLA using ajax
DT.getData = function(){
	
// ----------------------------------------------------

	return $.ajax({

	type: 'GET',
	url: this.baseURL,
	data: this.data,
	// don't forget! otherwise won't work
	dataType: 'jsonp',
	success: function(d){ console.log("you're a success!") },
	error: function(e) { console.log(e.message); }
	});

 // ----------------------------------------------------

	};

// Don't really have to worry about what's below here if you don't want to
// ----------------------------------------------------
	
// This is what's fired when you click search
DT.search = function(str){
		// checks if the search has changed
		if (this.crntSearch !== null && this.crntSearch !== str) { this.data.page = 0; console.log('new search'); }
		this.crntSearch = str;
		// sets the data to the input string
		this.data.q = str;
		// updates the paging
		this.data.page += 1;

		// this is where the magic happens : gets the data!
		this.getData()
		// don't worry about this
		.done(_.bind(function(d){ this.showThumbs(d); }, this)
		);
	};

// This is what parses the data and adds the thumbnails, tooltips
DT.showThumbs = function(json){
		// removes old thumbs before the next set loads
		this.$el.packery( 'remove' , $('.thumb') );
		$('#no-more').hide();
		$('#page-size span').html( this.data['page_size'] );
		$('#page-size').show();

		var count = (json.count > 0) ? json.count + ' results' : 'no results';
		$('#count h1').text(count);

		// loops through the json
		for(var i =0; i < json.limit; i++ ){
			// check if out of range
			if(typeof json.docs[i] == 'undefined') { $('#no-more').show(); $('#page-size').hide(); }
			// if there's a thumbnail check
			else if(json.docs[i].object){
				// append items and add them to packery
				this.$el.append($(this.template( { thumb: json.docs[i] }) ) );
				this.$el.packery( 'addItems', $('.thumb').last() );
			}
		}
		// get packery to do it's layout once images are loaded
		this.$el.packery().imagesLoaded( this.$el.packery() );
	};

// let 'er rip
// ----------------------------------------------------

$(function(){

	// initializes Bootstrap tooltips
	$('body').tooltip({
		selector: '[rel=tooltip]',
		html: true
	});
	// initializes Packery.js library
	$('#thumbs').packery({
		itemSelector: '.thumb',
		gutter: 15,
		transitionDuration: ".6s"
	});
	// adds an event to the search button and has it fire
	$('#search').submit(function(e) {
		e.preventDefault();
		var input = $('#search input[type=text]').val();
		DT.search(input);
	});
});


// on deck in case you need to look again
// ----------------------------------------------------

/*
DT.getData = function(){
	// the basic ajax request
		return $.ajax({

		type: 'GET',
		url: this.baseURL,
		data: this.data,
		// don't forget! otherwise won't work
		dataType: 'jsonp',
		error: function(e) { console.log(e.message); }
		});
	};
*/