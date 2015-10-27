class UsersController < ApplicationController

  def index
    @users = User.all
    render component: 'UserIndexContainer', props: { users: @users }
  end

end
