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
puts params[:verb]
  if params[:verb] == 'request_local_id'

    # 'routes' for internal assets - tp move into a DB, obv.

      return body_wrap(erb :aggregator) if params[:noun] == 'aggregator'
      return body_wrap(erb :aggregator2) if params[:noun] == 'aggregator2'

      return body_wrap(erb :table) if params[:noun] == 'table'
  end

  if params[:verb] == "request_uri"

    puts "External query"
    begin
    body_wrap(open(params[:noun]).read)
    rescue
      return {
        'head' => {
          'status' => 404
        }
      }
    end

  end

  if params[:verb] == "request_uri_body"

    puts "External query"
    begin
    body_wrap(open(params[:noun]).read)
    rescue
      return {
        'head' => {
          'status' => 404
        }
      }
    end

  end

  #puts params
  # echo back for debugging

  return {
    'head' => {
      'status' => 404
    }
  }

end

# wraps a valid asyn JSON container around 'content'
# bonus feature: It adds a title setting test just
# for shits n gigs
def body_wrap content

  puts "Bodywrapping content: " + content.to_s

  cmds = Array.new

  cmds << {'verb' => 'set_content', 'noun' => content}
  # debug hack
  cmds << {'verb' => 'set_title', 'noun' => 'done.'}


  response = {
      'head' => {
        'status' => 200
      },
      'body' => cmds #{
        #'commands' => cmds,
        #'content' => content.gsub("\n","") #"[=----------------------=]")
      #}
  }.to_json

  puts "Response: " + response
  response

end