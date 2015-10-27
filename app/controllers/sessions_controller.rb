class SessionsController < ApplicationController

  def new
    render component: 'UserLogin'
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      if @user.type =
    end
  end

end
