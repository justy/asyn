require 'sinatra'
require 'sinatra/reloader' if development?
require 'json'
require 'open-uri'

  @hack = 0

get '/' do
  #redirect '/boot.html'
  @page_title = "booting.."

  erb :boot
end

get '/payloads' do

  puts "params:" + params.to_s

  if params[:content_id]

    # 'routes' for internal assets - tp move into a DB, obv.

      return body_wrap(erb :aggregator) if params[:content_id] == 'aggregator'

      return body_wrap(erb :table) if params[:content_id] == 'table'


  end

  if params[:external_query]
    puts "External query"
    response = body_wrap(open(params[:external_query]).read)

  end

  #puts params
  # echo back for debugging

  #puts body_wrap params
  #body_wrap params.to_json

  # Simply retrieve the payload for the provided id
  # Eg
  #  {
  #     "head": { "status":200 },
  #     "body": {
  #         "commands":
  #         ["requestPayload slot_100"
  #        , "requestPayload slot_101"],
  #         "content":"Loading new content"
  #       }
  #
  #     }

  #'{"body":"jo"}'.to_json

  # Obviously this does nothing but return some canned content

  # alert_command = {
  #    'verb' => 'alert',
  #    'noun' => 'wow!'
  #    }.to_json;
  #
  #    commands = Array.new
  #    commands << alert_command
  #    #commands << alert_command
  #
  #
  #   returnGoodPayload commands, 'Here\'s the content'

end

get '/marjee' do

  col = params[:colour]

  @likes_colour =
  (col == "orange" || col == "red")

  erb :marjee
end


# wraps a valid asyn JSON container around 'content'
# bonus feature: It adds a title setting test just
# for shits n gigs
def body_wrap content

  puts "Bodywrapping content: " + content.to_s

  cmds = Array.new
  cmds << {'verb' => 'set_title','noun' => 'done.'}
  # HACK!
  #puts request.url
  #puts @@hack
  #cmds << {'verb' => 'query','noun' => {'enquirer' => '#bottom_right', 'content_id' => 'table'}} if @hack == 0
  #cmds << {'verb' => 'query','noun' => {'enquirer' => '#top_right', 'content_id' => 'aggregator'}} if @hack == 1
  #cmds << {'verb' => 'query','noun' => {'enquirer' => '#bottom_left', 'content_id' => 'aggregator'}} if @hack == 2
  #cmds << {'verb' => 'query','noun' => {'enquirer' => '#bottom_left', 'content_id' => 'aggregator'}} if @@hack == 3
   #   @hack = @hack + 1
    #  @hack = 0 if @hack == 3

#  if request.url == "http://localhost:4567/payloads?content_id=aggregator"
 #     cmds << {'verb' => 'send_payload_request','noun' => {'enquirer' => '#bottom_right', 'external_query' => 'http://smh.com.au'}}
 #end

  response = {
      'head' => {
        'status' => 200
      },
      'body' => {
        'commands' => cmds,
        'content' => content.gsub("\n","") #"[=----------------------=]")
      }
  }.to_json

  puts response
  response

end