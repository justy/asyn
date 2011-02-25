require 'sinatra'
require 'sinatra/reloader' if development?
require 'json'

get '/' do
  #redirect '/boot.html'
  @page_title = "booting.."
  erb :boot
end

get '/payloads' do
  # echo back for debugging
  # params.to_json

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

  alert_command = {
    'verb' => 'alert',
    'noun' => 'wow!'
    }.to_json;

    commands = Array.new
    commands << alert_command
    #commands << alert_command


   returnGoodPayload commands, 'Here\'s the content'

end

get '/marjee' do

  col = params[:colour]

  @likes_colour =
  (col == "orange" || col == "red")

  erb :marjee
end



def returnGoodPayload commands, content
    {
      'head' => {
        'status' => 200
      },
      'body' => {
        'commands' => commands,
        'content' => content
      }
    }.to_json
end