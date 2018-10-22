class SeasonsController < ApplicationController
  def index
    @seasons = Season.all
    @season = Season.new
  end

  def show
    @season = Season.find params[:id]
    @season_detail = SeasonDetail.new
  end

  def create
    @seasons = Season.all
    @season = Season.new season_params
    @season.establishment = current_user.establishment
    if @season.valid?
      @season.save
      redirect_to seasons_path
    else
      flash.now[:alert] = "Impossible de créer l'année budgetaire"
      render 'index'
    end
  end

  private
    def season_params
      params.require(:season).permit(:year)
    end
end
