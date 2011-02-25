/*!
* asyn System v 0.0.1
* http://coolfusion.com.au/asyn
*
* Copyright 2011, Justin James Clayden
*
* Date: Fri Feb 25 13:55:29 2011 -0500
*/

function sendPayloadRequest(element) {

  $(element).html("loading...");
  $.get(
    "payloads",  // By convention
    {"id":element},
    function(data){
      acceptPayload(element, data);
    },
    "json" // Y not json??
  );

}

function acceptPayload(element, payload) {

  // element is a string eg "#page_1234"
  // payload is assumed to already be valid JSON

  // Bail if we got a dud response
  status = payload.head.status;

  if (status != 200) {
    $(element).html(":(");
    return;
  }
  body = payload.body;

  // Do any commands
  commands = body.commands;
  if (commands.length > 0) {
    // Do each command
    //executeCommand()
  }

  // Render the content
  content = body.content;
  $(element).html(body.content);


  }