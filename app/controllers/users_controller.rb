class UsersController < ApplicationController
  before_action :account_owner, only: [:show]
  before_action :admin_only, only: [:index]

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new user_params
    @user.role = "basic"
    if @user.save
      flash[:success] = 'Account created'
      redirect_to root_url
    else
      render 'new'
    end
  end

  private
    def user_params
        params.require(:user)
          .permit(:username, :password, :password_confirmation)
    end

    def account_owner
      user = User.find(params[:id])
      redirect_to user_path(user) unless current_user.id == user.id || admin?
    end

    def admin_only
      redirect_to root_path unless admin?
    end
end
