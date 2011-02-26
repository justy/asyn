/*!
* asyn System v 0.0.1
* http://coolfusion.com.au/asyn
*
* Copyright 2011, Justin James Clayden
*
* Date: Fri Feb 25 13:55:29 2011 -0500
*/


// Interrogate each element for any asyn metadata
// Form a query based on this metadata and
// send it to the server
function asyn_boot() {

  console.log("Booting asyn");

  els = $("*[data-asyn]"); //.children();
  console.log(els);

  els.each(
    // For each asyn enabled element
    // Do its command
    function() {
      asyn_stuff =  $(this).attr("data-asyn");
      // Inject the element's id
      //if (els.attr("id")) {
          asyn_stuff.element_id = els.attr("id");
      //}
      console.log(asyn_stuff);
      asyn_do(asyn_stuff);
    }

  )

}

// RENAME THIS
function asyn_request (element, request) {

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

// REFACTOR THIS
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
      asyn_do(command);
    }
  }



}

function asyn_do(command) {

  console.log(command);
  console.log(typeof(command));
  asyn_json = $.parseJSON(command);
  console.log(typeof(asyn_json));
  console.log("asyn_do: " + asyn_json);
  //console.log("command is a type of " + typeof(command));
  verb = asyn_json.query;
  noun = asyn_json.value;

  console.log ("verb: " + verb + ", noun: " + noun);
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

    if (verb == "local_id") {
      console.log("Sending payload request: " + noun + " on behalf of: " + $(this) );
      asyn_request($(this), noun);
    }

  }

  if (typeof(noun) == 'object') {




  }


}