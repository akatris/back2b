class PcopsController < ApplicationController
  # display a list of pcop entities
  def index
    @categories = Pcop::Category.all
  end
end
