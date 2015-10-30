class StatusesController < ApplicationController
  before_action :authorize

  def create
    @status = Status.new(user_id: current_user.id, article: params[:article])

    if @status.save
      render json: {status: 'success'}
    else
      render json: {status: 'server error in statuses_controller'}
    end

  end

end
