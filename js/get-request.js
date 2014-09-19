/*

 *				<コ:彡
 *
			dpla-thumbs
 *
	THATCAMP PHILLY INTRO TO APIs : get request template
 *	Nabil Kashyap / nkashya1@swarthmore.edu / 9.19.14
	
 *	

 */

// the address
var baseURL = 'http://api.dp.la/v2/items?q=';

// the question
var data = {
	'q': 'cats',
	// 'facets': 'sourceResource.stateLocatedIn',
	'api_key': apiKey
};

getData = function(){

	// cross origin demo
	return $.get('http://api.dp.la/v2/items?q=cats&api_key=' + apiKey);

// ----------------------------------------------------

// FILL IN WITH AN ACTUAL AJAX REQUEST

// ----------------------------------------------------
};

$(function(){

	getData().done(function(data){

	// making sense of the response		
		
		console.log(data);
		var json = data.docs;
/*		
		var json = data.facets['sourceResource.stateLocatedIn.name'].terms;
		var json = _.sortBy(response, function(d) { return d.count; }).reverse();

*/
		$list = $('#list ul');
		_.each(json, function(d){

			var html = d.sourceResource.title;
			// var html = d.term + ": " + d.count
			
			$list.append('<li><h3>');
			$list.find('li h3').last().html(html);
		});

	});
});


// the basic ajax request
/*	return $.ajax({

	type: 'GET',
	url: baseURL,
	data: data,
	// don't forget! otherwise won't work
	dataType: 'jsonp',
	success: function(d){ console.log("you're a success!") },
	error: function(e) { console.log(e.message); }
	}); */
