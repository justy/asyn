!!asyn is an asynchronous lightweight open framework for performant and gracefully degrading web content.



==API

==Server (sent to)

/payloads

{ 'content_id' : 'foo_id' }   // in the DB

or

{ 'external_query' : 'http://query_url' } // on the webs



==Client (sent to)

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