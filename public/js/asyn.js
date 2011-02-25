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
    request,
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
  var status = payload.head.status;

  if (status != 200) {
    $(element).html(":(");
    return;
  }
  var body = payload.body;


  // Render the content
  var content = body.content;
  $(element).html(body.content);

  // Do any commands
  commands = body.commands;
  //alert(commands);
  //alert (typeof(commands));
  if (commands.length > 0) {
    // Do each command
    for (var c in commands) {
      command = commands[c];
      //console.log(command.toString());
      executeCommand(command);
    }
  }



}

function executeCommand(command) {

  //console.log("executeCommand: " + command
  //console.log("command is a type of " + typeof(command));
  verb = command.verb;
  noun = command.noun;
  console.log (verb + " with "+ noun);
  if (typeof(noun) == 'string') {

    // String noun

    if (verb == 'alert') {
      console.log("Displaying alert: " + noun);
      alert(noun);
    }

    if (verb == 'set_title') {
      console.log("Setting title to: " + noun);
      document.title = noun;
    }

  }

  if (typeof(noun) == 'object') {

    if (verb == 'send_payload_request') {
      console.log("Sending payload request: " + noun + "on behalf of: " + noun.enquirer );
      sendPayloadRequest(noun.enquirer, noun);
    }


  }


}