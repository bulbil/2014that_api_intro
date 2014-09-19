##DPLA API QUICKIE

Nabil Kashyap
Digital Scholarship Librarian
Swarthmore College
nkashya1@swarthmore.edu

###What is this?

Hopefully the quickest way to dig into the Digital Public Library of America’s API -- this reference provides the barest essentials for returning (re)usable JSON-LD data from the DPLA. It borrows heavily from DPLA documentation plus some basic real world experience. It is an introduction, not a definitive guide. It does not cover what you might do with the data once it is returned. For that, you will need some understanding of AJAX and JSONP. 

###Where else should I look?

For those those who want a deeper dive into the details, check out the DPLA’s documentation: [http://dp.la/info/developers/codex/](http://dp.la/info/developers/codex/)

Finally, a few tools and libraries on GitHub ([http://dp.la/info/developers/sample-code-and-libraries/](http://dp.la/info/developers/sample-code-and-libraries/)) to make your job easier, helping you shoehorn in your weapon of choice, be it PHP or Python or Ruby or Java or Node.js.

###But besides the DPLA, where should I look?

[Mia Ridge's API Wiki](http://museum-api.pbworks.com/w/page/21933420/Museum%C2%A0APIs) is targeted and well curated with a heavy museum focus.
[ProgrammableWeb](http://www.programmableweb.com/) is the boss of all API directories. Comprehensive but not always accurate.

And an aptly named blog post also on Mia's site ["Cool stuff made with cultural heritage APIs "](http://museum-api.pbworks.com/w/page/21933412/Cool%20stuff%20made%20with%20cultural%20heritage%20APIs)

###What data am I getting?

DPLA dishes out JSON-LD, that is, JSON with a little bit of structure and a few required fields so that it can be used for linked data. To see what you’re getting yourself into, look here for a complete sample response ([http://dp.la/info/developers/codex/responses/](http://dp.la/info/developers/codex/responses/)).

###What should I do with the data?

For some app ideas, try here ([http://dp.la/apps](http://dp.la/apps)) and here ([http://dp.la/info/developers/appfest/the-apps/](http://dp.la/info/developers/appfest/the-apps/)). 

You can check out an embarrassingly simple use of the DPLA API that returns thumbnails from simple searches right here ([http://github.com/bulbil/dpla_thumbs.git](http://github.com/bulbil/dpla_thumbs.git)). It gives a sense of the data structure and sample JavaScript queries that might spur ideas.

###How do I get the data? (aka, structure your RESTful request)

base URL: `http://api.dp.la/v2`

####1) get an API Key

First you need to request a key through a simple POST request. A simple way to do this is to use curl and the command line:

`curl -v -XPOST http://api.dp.la/v2/api_key/YOUR_EMAIL@example.com`

Expect an email with a 32 digit key that you can tag onto GET requests to authenticate.

####2) construct a search query

What resources are you thinking of querying, items or collections? (Roughly speaking, an item returns data about a single piece of content held by one of DPLA’s contributors. A collection returns data about groupings of items.)

* resource type: `http://api.dp.la/v2/items?` 
  *What about these resources are you interested in searching? DPLA offers an awesome number of fields to search on. For a full treatment of the data model and what fields are available for search ([http://dp.la/info/developers/codex/responses/object-structure/](http://dp.la/info/developers/codex/responses/object-structure/)).
* key word in any field: `http://api.dp.la/v2/items?q=chuck+AND+norris`
* key word in a specific field: 
  * `http://api.dp.la/v2/items?sourceResource.description=chuck+AND+norris`

Notice how the examples incorporate boolean search terms? Yes, they’re allowed. And so are wildcard characters (*).
* temporal range: 
  * `http://api.dp.la/v2/items?sourceResource.temporal.begin=1972-01-01`
* spatial designation:
  * `http://api.dp.la/v2/items?sourceResource.spatial=Ryan&sourceResource.spatial.state=Oklahoma`

Not all items indexed by DPLA have all fields filled. If you stick to generic fields, the API will return more hits. On the other hand, requests that dig deeply into the data model will automatically filter out items that have less robust metadata.

####3) refine how you’d like your results served

* what fields would you like returned (delimited by commas):
  * `&fields=sourceResource.description,sourceResource.date`
* how many results (10 is the default, 500 is the max):
  * `&page_size=25`
* incrementing results:
  * `&page=3`
* sorting results:
  * `&sort_by=sourceResource.spatial.coordinates`

####4) add a callback if you’re using JSONP

`&callback=yourFineFunction`

####5) add your key

`http://api.dp.la/v2/items?sourceResource.description=chuck+AND+norris&sourceResource.temporal.begin=1972-01-01&fields=sourceResource.description,sourceResource.date&callback=yourFineFunction&api_key=[YOUR API KEY HERE]`

OR AJAX-style:
```
$.ajax({
type: 'GET',
url: url,
        data: {
	‘sourceResource.description’: ‘chuck+AND+norris’,
	‘sourceResource.temporal.begin’: ‘1972-1-01’,
	‘fields’: ‘sourceResource.description,sourceResource.date’,
	‘api_key’: [YOUR API KEY HERE]	
        },	
        dataType: 'jsonp',
        success: function(d) { [YOUR AWESOME FUNCTION] },
        error: function(e) { console.log(e.message); }
});
```
####6) go forth and hack!
