require 'sinatra'
require 'sinatra/reloader' if development?
require 'json'

get '/' do
  #redirect '/boot.html'
  @page_title = "booting.."
  erb :boot
end

get '/payloads' do

  puts params
  # echo back for debugging

  puts body_wrap params
  body_wrap params

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



def body_wrap content

  puts "Bodywrapping content: " + content.to_s

  cmds = Array.new

  {
      'head' => {
        'status' => 200
      },
      'body' => {
        'commands' => cmds,
        'content' => content
      }
  }.to_json

end