#Step by step

##The nitty gritty of the process

1. Client requests boot page

1. Boot page calls asyn_boot - for all elements 'elem' with an aysn-data attr, call asyn_do on $(elem).attr('asyn-data').  Remove the asyn-data attribute so it doesn't fire again

1. For simplicity, by convention, there would be only one command in these attributes (but this could be lifted later) and that command will in most cases be a request to the server for some content

1. Whilst waiting for the response from the server, the requesting element should display the appropriate feedback, timing out if needed.

1. When a response is received, it contains status info, as well as a body- this body is an array of commands.  These commands include:

  * Fill this element with content (default HTML, other formats could be supported.  In the case of HTML, it can include elements with asyn-data attributes)

  * Manipulate the DOM

  * Write to the console (in development)

1. At this stage, there's a need to recurse.

  * DEPTH-FIRST
      * For the element, and each of its children that bear asyn-data element, call aysn_do on their asyn-data's value.

  * QUEUED
      * For the element, and each of its children that bear asyn-data element, add their asyn-data's value to the queue