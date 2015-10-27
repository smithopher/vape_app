class UsersController < ApplicationController

  def index
    @users = User.where(:id=>current_user.following)
    @proper_users = @users.map{|e| {id: e.id, first_name: e.first_name.capitalize, last_name: e.last_name.capitalize}}
    render component: 'UserIndexContainer', props: { users: @proper_users }
  end

  def show
    @user = User.find(params[:id])
    @posts = @user.posts
    render component: 'UserShow', props: { first_name: @user.first_name.capitalize, last_name: @user.last_name.capitalize, user: @user, posts: @posts }
  end
end
