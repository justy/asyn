/*!
 * asyn System v 0.0.1
 * http://coolfusion.com.au/asyn
 *
 * Copyright 2011, Justin James Clayden
 *
 * Date: Fri Feb 25 13:55:29 2011 -0500
 */

function sendPayloadRequest(element) {

  $("#page").html("loading...");
   $.get(
     "payloads",  // By convention
     {"id":element},
     function(data){
       acceptPayload(element, data);
     },
     "text"
   );

}

function acceptPayload(element, payload_string) {

  payload = JSON.parse(payload_string);
  //payload_head = payload.head;
  //payload_body = payload.body;

  $(element).html(payload_string);

  //alert ("Status: " + payload_head.status);
  //alert ("Body: " + payload_body);


}