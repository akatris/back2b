class Pcop::CategoriesController < ApplicationController
  def index
    @categories = Pcop::Category.all
    respond_to do |format|
      format.json {render json: @categories}
    end
  end
end
