class UsersController < ApplicationController
  before_action :authorize

  def home
    @user = User.find(current_user.id)
    @friend_post = Post.where(:user_id => current_user.following).map{|e| {id: e.id, user_id: e.user_id, title: e.title, post_type: e.post_type, author_fname: User.find(e.user_id).first_name.capitalize, author_lname: User.find(e.user_id).last_name.capitalize}}
    # @friend_post_formatted = @friend_post.map{|e| {title: e.title, post_type: e.post_type, author_fname: User.find(e.user_id).first_name.capitalize, author_lname: User.find(e.user_id).last_name.capitalize}}
    @friend_status = Status.where(:user_id => current_user.following).map{|e| {title: e.article, user_id: e.user_id, author_fname: User.find(e.user_id).first_name.capitalize, author_lname: User.find(e.user_id).last_name.capitalize}}
    @first_name = @user.first_name.capitalize
    render component: 'UserHomeContainer', props: { user: @user, first_name: @first_name, friend_post: @friend_post, friend_status: @friend_status }
  end

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
