class UsersController < ApplicationController
  before_action :admin_only, only: [:index]
  before_action :account_owner, only: [:show]
  before_action :not_own_account_and_admin, only: [:destroy]
  before_action :filter_edit, only: [:edit, :update]

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def edit
    @user = User.find(params[:id])
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new user_params
    @user.role = "basic"
    supply = Supply.create(available: 0)
    establishment = supply.create_establishment name: 'default'
    @user.establishment = establishment
    if @user.save
      flash[:success] = 'Account created'
      redirect_to root_url
    else
      render 'new'
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      redirect_to settings_profile_path
    else
      render 'settings/profile'
    end
  end

  def destroy
    user = User.find params[:id]
    user.delete
    redirect_to users_path
  end

  private
    def user_params
        params.require(:user)
          .permit(:username, :password, :password_confirmation, :role)
    end

    def filter_edit
      user = User.find(params[:id])
      redirect_to user_path(current_user) unless current_user.id == user.id || admin?
    end

    def account_owner
      user = User.find(params[:id])
      redirect_to user_path(current_user) unless current_user.id == user.id || admin?
    end

    def own_account_or_admin
      user = User.find(params[:id])
      redirect_to user_path(user)
    end

    def admin_only
      redirect_to root_path unless admin?
    end

    def not_own_account_and_admin
      user = User.find(params[:id])
      if !admin?
        redirect_to root_path
      elsif own_account?(user)
        redirect_to users_path
      end
    end
end
