class Pcop::AccountsController < ApplicationController
  def index
  end

  def show
  end

  def new
    category = Pcop::Category.find(params[:category_id])
    @account = category.accounts.build
  end

  def edit
  end

  def create
    category = Pcop::Category.find(params[:category_id])
    account_params = params[:pcop_account]
    @account = category.accounts.build(id: account_params[:id], name: account_params[:name], description: account_params[:description])
    if @account.save
      redirect_to pcop_categories_path
    else
      render 'pcop/accounts/new'
    end
  end

  def update
  end

  def destroy
  end

  private
    def account_params
      params.require(:pcop_account).permit(:id, :name, :description)
    end
end
