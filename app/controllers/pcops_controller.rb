class PcopsController < ApplicationController
  # display a list of pcop entities
  def index
    @categories = Pcop::Category.all
  end

  def new
    @pcop_form = Pcop::Form.new
  end
end
