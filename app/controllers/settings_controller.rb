# This controller needs users to be logged in.
class SettingsController < ApplicationController
  def profile
    @user = current_user
  end

  def establishment
    @establishment = current_user.establishment
  end
end
