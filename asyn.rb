require 'sinatra'
require 'sinatra/reloader' if development?
require 'json'

get '/' do
  redirect '/boot.html'
end

get '/payloads' do
  # echo back for debugging
  params.to_json
end

get '/marjee' do

  col = params[:colour]

  @likes_colour =
  (col == "orange" || col == "red")

  erb :marjee
end
