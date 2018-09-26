class EstablishmentsController < ApplicationController
  def update
    @establishment = Establishment.find current_user.establishment.id
    if @establishment.update_attributes establishment_params
      redirect_to settings_establishment_path
    else
      render 'settings/establishment'
    end
  end

  private
    def establishment_params
      params.require(:establishment).permit(:name)
    end
end
