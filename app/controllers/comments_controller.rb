class CommentsController < ApplicationController

  def new

    @comment = Comment.new(content: params[:content], user_id: current_user.id, post_id: params[:post_id])

    if @comment.save
      render json: {status: 'success'}
    else
      render json: {status: 'error in comments_controller'}
    end
  end

end
