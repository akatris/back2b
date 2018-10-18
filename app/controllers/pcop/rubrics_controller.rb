class Pcop::RubricsController < ApplicationController
  def index
    @rubrics = Pcop::Rubric.all
    respond_to do |format|
      format.json {render json: @rubrics}
    end
  end
end
