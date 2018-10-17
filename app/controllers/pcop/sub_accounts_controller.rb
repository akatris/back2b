class Pcop::SubAccountsController < ApplicationController
  def index
    @sub_accounts = Pcop::SubAccount.all
    respond_to do |format|
      format.json {render json: @sub_accounts}
    end
  end
end
