/*!
* asyn System v 0.0.1
* http://coolfusion.com.au/asyn
*
* Copyright 2011, Justin James Clayden
*
* Date: Fri Feb 25 13:55:29 2011 -0500
*/

var foundDataLastActivation;
var activeRequests;

var debug_slomo;

function log(msg) {
  console.log(msg);
  $("#footer").html($("#footer").html() + "<br>" + msg );
  //$("#log").html($("#log").html() + "<br>" + $.error());
}

function blog(msg) {
  log("<div class='log'>"+ msg +"</div>");
}

// Interrogate each element for any asyn metadata
// Form a query based on this metadata and
// send it to the server
function asyn_boot() {
  debug_slomo = false;

  blog("Booting asyn");
  foundDataLastActivation = false;
  activeRequests = 0;
  asyn_activate($("*[data-asyn]"));
}

// Parse, execute and scrub every element in the DOM
// with a data-asyn attribute
function asyn_activate(els) {

  var foundData = false;

  if (typeof(els)=='undefined') {
    blog("nil els");
    return;
  }
  //var els = $("*[data-asyn]"); //.children();
  //log(els);
  blog ("Found " + els.length + " data-asyn bearers");

  els.each(

    // For each asyn enabled element
    // Do its command
    function() {

      var asyn_stuff = $(this).attr("data-asyn");
      blog ("DAB:" + asyn_stuff );
      var asyn_json = $.parseJSON(asyn_stuff);
      // log("id: " + $(this).attr("id"));
      // Inject the element's id  (WTF?  Not happening..)
      if ($(this).attr("id")) {
        asyn_json.element_id = "#" + $(this).attr("id");
        $(this).removeAttr("data-asyn");
        foundDataLastActivation = true;
        if (debug_slomo){
          blog("sloooooommmmmmmooooooo");
          chill(100);
          asyn_do(asyn_json);
          chill(100);
        } else {
         asyn_do(asyn_json);
       }

     }
      //log("asyn_json: " + asyn_json);
     //log("data-asyn: " + $(this).attr("data-asyn"));
    }

  )

}

// Send a request to the Server
function asyn_request (element, request) {

  if (debug_slomo) {
    chill(1000);
  }
  // element is a string selector eg "#page"
  // request is assumed to be valid JSON

  $(element).html("<div class='loading'>loading...</div>");  // temp

  $.ajax({
    type: "GET",
    url: "payloads",
    data: request,
    dataType: "json",
    success: function(data) {
      asyn_receive(element,data);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      blog(textStatus);
      blog(errorThrown);
      asyn_error(element,textStatus);
    }

  });

/*
  $.get(
    "payloads",  // By convention
    request,
    function(data){
      asyn_receive(element, data);
    },
    "json"
  );
  */

  activeRequests++;

  log("<div class='client_send'>Active Requests: " + activeRequests + "</div>");

}

// REFACTOR THIS
function asyn_receive(element, payload) {

  activeRequests--;

  log("<div class='client_receive'>Active Requests: " + activeRequests + "</div>");

  log("<div class='client_receive'>Accepting payload: " + payload + " for element: " + element + "</code>");
  // element is a string eg "#page"
  // payload is assumed to already be valid JSON

  // Bail if we got a dud response
  var status = payload.head.status;
  log("<div class='client_receive'>Status: " + status + "</div>");

  if (status != 200) {
    $(element).html(":(");
    return;
  }
  var body = payload.body;

//  log("type of body: " + typeof(body));
  if (typeof(body) == 'object') {
    blog("There are " + body.length + " things to do.");
    for (var c in body) {
      command = body[c];
      command.element_id = element;
      //log("command: " + command.toString());
      asyn_do(command);
    }
  } else {
    asyn_do(body);
  }

  blog("Found data: " + foundDataLastActivation);
  blog("Active requests: " + activeRequests);

  // Recurse
  if (activeRequests < 5  && foundDataLastActivation) {
    blog("recursing..")
   asyn_activate($("*[data-asyn]"));
  }

}

function asyn_error(element, data) {
 // alert("error");
  blog("***********ERROR*********" + data.status);

}

// Do a single command
function asyn_do(command) {

  //log("Type of command: " + typeof(command));
  log("<div class='client_do'>asyn_do:" + $.toJSON(command) + "</div>");//asyn_json);
  //log("command is a type of " + typeof(command));
  verb = command.verb;
  noun = command.noun;
  sender = command.sender;
  element_id = command.element_id;

  // blog ("verb: " + verb + ", noun: " + noun);
  if (typeof(noun) == 'string') {

    // String noun

    if (verb == 'set_content') {
     log("<div class='client_do'>Setting content for element: " + element_id + " " + noun + "</div>");
     $(element_id).html(noun);
       return;
    }

    if (verb == 'log') {
      blog(noun);
    }

    if (verb == 'alert') {
      log("<div class='client_do'>Displaying alert: " + noun + "</div>");
      alert(noun);
    }

    if (verb == 'set_title') {
      log("<div class='client_do'>Setting title to: " + noun + "</div>");
      document.title = noun;
    }

    if (verb == 'request_uri') {
      if (element_id) {
        log("<div class='client_send_external'>Sending external request: " + noun + " on behalf of: " + element_id + "</div>" );
        asyn_request(element_id, command);
      } else {
        log("No element ID provided.");
      }
    }

    if (verb == 'request_uri_body') {
      if (element_id) {
        log("<div class='client_send_external'>Sending external request: " + noun + " on behalf of: " + element_id + "</div>" );
        asyn_request(element_id, command);
      } else {
        log("No element ID provided.");
      }
    }

    if (verb == 'request_local_id') {
      if (element_id) {
        log("<div class='client_send'>Sending payload request: " + noun + " on behalf of: " + element_id + "</div>" );
        asyn_request(element_id, command);
      } else {
        log("No element ID provided.");
      }
    }

  }

}






function chill(millis)
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
}