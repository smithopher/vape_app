class NewusersController < ApplicationController

  def new
    render component: 'UserSignup'
  end

  def create
    if params[:password1] == params[:password2]
      @user = User.new(first_name: params[:firstName], last_name: params[:lastName], email: params[:email], password: params[:password1])
      @user.save
      session[:user_id] = @user.id
      redirect_to '/'
    end
  end

end
