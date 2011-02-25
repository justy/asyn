/*!
* asyn System v 0.0.1
* http://coolfusion.com.au/asyn
*
* Copyright 2011, Justin James Clayden
*
* Date: Fri Feb 25 13:55:29 2011 -0500
*/

function sendPayloadRequest(element, request) {

  // element is a string selector eg "#page"
  // request is assumed to be valid JSON

  $(element).html("loading...");
  $.get(
    "payloads",  // By convention
    {"id":element},
    function(data){
      acceptPayload(element, data);
    },
    "json"
  );

}

function acceptPayload(element, payload) {

  // element is a string eg "#page"
  // payload is assumed to already be valid JSON

  // Bail if we got a dud response
  status = payload.head.status;

  if (status != 200) {
    $(element).html(":(");
    return;
  }
  body = payload.body;


  // Render the content
  content = body.content;
  $(element).html(body.content);

  // Do any commands
  commands = body.commands;
  //alert(commands);
  //alert (typeof(commands));
  if (commands.length > 0) {
    // Do each command
    for (c in commands) {
      executeCommand(JSON.parse(commands[c]));
    }
  }



}

function executeCommand(command) {
  //document.write(typeof(command));
  verb = command.verb;
  noun = command.noun;
  //alert (verb + ", "+ noun);
  if (typeof(noun) == 'string') {
    // String noun
    //alert (verb + " " + noun); // I know, I know..
    if (verb == 'alert') {
      alert(noun);
    }
  }


}