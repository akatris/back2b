class Pcop::ClassesController < ApplicationController
  def index
    @classes = Pcop::Class.all
  end
end
