class PostsController < ApplicationController
  before_action :authorize

  def show
    @post = Post.find(params[:id])
    @author = User.find(@post.user_id)
    @first_name = @author.first_name.capitalize
    @last_name = @author.last_name.capitalize
    @comments = Comment.where(:post_id => @post.id).map{|e| {content: e.content, post_id: e.post_id, user_id: e.user_id, author_fname: User.find(e.user_id).first_name.capitalize, author_lname: User.find(e.user_id).last_name.capitalize}}
    render component: 'PostContainer', props: { post: @post, first_name: @first_name, last_name: @last_name, comments: @comments }
  end

  def create
    @post = Post.new(title: params[:title], post_type: 'standard', content: params[:content], user_id: current_user.id)
    if @post.save
      render json: {status: 'success'}
    else
      render json: {status: 'error'}
    end
  end

end
