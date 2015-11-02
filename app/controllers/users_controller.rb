class UsersController < ApplicationController
  before_action :authorize

  def home
    @user = User.find(current_user.id)
    @friend_post = Post.where(:user_id => current_user.following).order(created_at: :desc).first(5).map{|e| {id: e.id, user_id: e.user_id, title: e.title, post_type: e.post_type, author_fname: User.find(e.user_id).first_name.capitalize, author_lname: User.find(e.user_id).last_name.capitalize}}
    @friend_status = Status.where(:user_id => current_user.following).order(created_at: :desc).first(5).map{|e| {title: e.article, user_id: e.user_id, author_fname: User.find(e.user_id).first_name.capitalize, author_lname: User.find(e.user_id).last_name.capitalize}}
    @first_name = @user.first_name.capitalize
    render component: 'UserHomeContainer', props: { user: @user, first_name: @first_name, friend_post: @friend_post, friend_status: @friend_status }
  end

  def index
    @users = User.where(:id=>current_user.following)
    @proper_users = @users.map{|e| {id: e.id, first_name: e.first_name.capitalize, last_name: e.last_name.capitalize}}
    render component: 'UserIndexContainer', props: { users: @proper_users }
  end

  def search
    @users = User.all
    if params[:search]
      @users = User.search(params[:search])
    end
    @proper_users = @users.map{|e| {id: e.id, first_name: e.first_name.capitalize, last_name: e.last_name.capitalize}}
    render component: 'UserSearchContainer', props: {search_users: @proper_users}
  end

  def show
    @user = User.find(params[:id])
    @posts = @user.posts
    @statuses = Status.where(:user_id => @user.id).order(created_at: :desc).first(10)
    @user_follow = false
    current_user.following.map do |e|
      if e.to_i == @user.id
        @user_follow = true
      end
    end
    render component: 'UserShow', props: { first_name: @user.first_name.capitalize, last_name: @user.last_name.capitalize, user: @user, posts: @posts, statuses: @statuses, user_follow: @user_follow}
  end

  def following
    @user=User.find(current_user.id)
    @user.following << params[:follow_id]
    if @user.save
      render json: {status: 'success'}
    else
      render json: {status: 'server error from users_controller'}
    end
  end

end
