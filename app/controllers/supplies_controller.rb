class SuppliesController < ApplicationController
  def update
    @supply = current_user.establishment.supply
    if @supply.update_attributes supply_params
      redirect_to settings_supply_path
    else
      render 'settings/supply'
    end
  end

  private
    def supply_params
      params.require(:supply).permit(:available)
    end
end
