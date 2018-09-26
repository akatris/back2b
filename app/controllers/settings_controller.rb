class SettingsController < ApplicationController
  def profile
    @user = current_user
  end

  def establishment
  end
end
