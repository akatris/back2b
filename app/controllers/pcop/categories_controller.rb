class Pcop::CategoriesController < ApplicationController
  def index
    @categories = Pcop::Category.all
  end

  def show
    @category = Pcop::Category.find params[:id]
  end

  # Render pcop creation page
  def new
    @category = Pcop::Category.new
  end

  # Create a new pcop class.
  def create
    @category = Pcop::Category.new pcop_category_params
    if @category.save
    else
      render 'new'
    end
  end

  private
    def pcop_category_params
      params.require(:pcop_category).permit(:id, :name, :description)
    end
end
