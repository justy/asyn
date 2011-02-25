#asyn

###asyn is an asynchronous lightweight open framework for performant and gracefully degrading web content.

---

#API

##Server

The Client kernel (a few lines of Javascript) sends requests to the server via a single function:

    sendPayloadRequest(element, request);

where `element` is a string representing a DOM element _(really a selector that will be passed to jQuery)_ and `request` is valid JSON.

This function sends a GET to `/payloads`.

For example:

    sendPayloadRequest('#page', {'content_id' : 'unique_content_id'});

or

    sendPayloadRequest('#page', {'external_query' : 'http://foo.bar/baz'});

Requests of this form:

    { 'content_id' : 'foo_id' }

.. should return HTML content accessible by the id 'foo_id' in the DB.  (Or however your controller decides to return this content.  )


Whereas requests of this form:

    { 'external_query' : 'http://query_url' } // on the webs

.. should return HTML content from an external site.

###Server controller considerations

Rather than simply passing back the results of requests, the Server may decide (because specific content requires it) to massage the content of the response, and/or, provide a list of commands for the client to execute.

These commands include:

* Send further Server requests
* Manipulate the DOM
* Display an alert

---

##Client

By convention, when a DOM element `element` requests a payload, a callback will executed:

    function acceptPayload(element, payload)

where `element` is a string, representing a DOM element, for example "#page" or "div", and `payload` is valid JSON, of the form:

    {
      'head' : {
        'status' : '200'
      },
      'body' : {
        'commands' : [command, command, .. ]
        'content' : "html_content"
        }
      }

    }

where `command` is a JSON hash of the form:

    {
      'verb' : 'command_verb' // e.g.
    }