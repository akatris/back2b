class Pcop::ClassesController < ApplicationController
  def index
    @classes = Pcop::Class.all
  end

  # Render pcop creation page
  def new
    @class = Pcop::Class.new
  end

  # Create a new pcop class.
  def create
    @class = Pcop::Class.new pcop_class_params
    if @class.save
    else
      render 'new'
    end
  end

  private
    def pcop_class_params
      params.require(:pcop_class).permit(:id, :name, :description)
    end
end
