class Pcop::AccountsController < ApplicationController
  def index
    @accounts = Pcop::Account.all
    respond_to do |format|
      format.json {render json: @accounts}
    end
  end
end
