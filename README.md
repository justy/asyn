*** This is highly v0.0.1

# asyn #

###asyn is an asynchronous, open, performant Javascript framework that renders web content.

* Open : asyn is designed to be server agnostic.  A server only needs to conform to a simple protocol to work with asyn.

* Performant : Non-blocking is the name of the game.


## Quick Start ##

Kick it off out of the box with

    ruby -rubygems asyn.rb

Open a browser and point it to `http://localhost:4567` to see it in action.

# API #

## Server ##

The Client kernel (a few lines of Javascript) sends requests to the server via a single function:

    sendPayloadRequest(element, request);

where `element` is a string representing a DOM element _(really a selector that will be passed to jQuery)_ and `request` is valid JSON.  In essence:

    'Request content to put into this element.'

This function sends a GET to `/payloads`.

** This has to be re-implemented to reflect this change: the refactoring of this data structure,
adding a 'query' key, with possible values of 'local_id' and 'uri' as well as a 'value' key.  (Similar to verb/noun elsewhere) **

For example:

    asyn_request('#page', {'query' : 'request_local_id' , 'value' : 'page_9317091723' });

or

    asyn_request('#page', {'query' : 'request_local_uri' , 'value' : 'http://coolfusion.com.au' });

Requests of this form:

    { 'request_local_id' : 'foo_id' }

.. should return HTML content accessible by the id 'foo_id' in the DB.  (Or however your controller decides to return this content.  )


Whereas requests of this form:

    { 'request_uri' : 'http://query_url' } // on the webs

.. should return HTML content from an external site.

###Server controller considerations

The simplest request handling is just to loop back the request, like so:

    get '/payloads' do
      body_wrap params.to_json  # body_wrap returns a valid asyn   (and therefore JSON) response

This is useful (only) for debugging.  Normally the server would fetch the content addressed by the either the `content_id` or `query_url`.

However, rather than simply passing back the results of requests, the Server may decide (because specific content requires it) to massage the content of the response, and/or provide a list of commands for the client to execute.

These commands include:

* Send further Server requests
* Manipulate the DOM
* Display an alert

---

##Client

By convention, when a DOM element `element` requests a payload and that payload becomes available, a callback will executed:

    asyn_receive(element, payload);

where `element` is a string, representing a DOM element, for example "#page" or "div", and `payload` is valid JSON, of the form:

    {
      'head' : {
        'status' : '200'
      },
      'body' : [command, command, .. ]
    }

where `command` is a JSON hash of the form:

    {
      'verb' : 'command_verb',
      'noun' : 'command_noun'
    }

e.g.

    {
      'verb' : 'request_local_id',
      'noun' : 'unique_content_id'}
    }
