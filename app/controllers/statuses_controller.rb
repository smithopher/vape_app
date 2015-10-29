class StatusesController < ApplicationController
  before_action :authorize

  def create
    status = Status.new(user_id: current_user.id, article: params[:article]).save
  end

end
