class StatusesController < ApplicationController
  before_action :authorize

  def create
    post = Status.new(user_id: current_user.id, article: params[:article]).save
  end

end
