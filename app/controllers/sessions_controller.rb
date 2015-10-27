class SessionsController < ApplicationController

  def new
    render component: 'UserLogin'
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      # if @user.type =
    end
    redirect_to '/following'
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/'
  end

end
