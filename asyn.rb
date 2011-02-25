require 'sinatra'
require 'sinatra/reloader' if development?


get '/' do
  redirect '/boot.html'
end

get '/marjee' do

  col = params[:colour]

  @likes_colour =
  (col == "orange" || col == "red")

  erb :marjee
end
