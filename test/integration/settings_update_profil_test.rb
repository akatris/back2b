require 'test_helper'

class SettingsUpdateProfilTest < ActionDispatch::IntegrationTest
  def setup
    @user = users :basic_user
    log_in_as @user
  end

  test "should render the profil page if invalid" do
    get settings_profile_path
    patch user_path(@user), params: {
      user: {
        username: nil
      }
    }
    assert_template 'settings/profile'
    assert_select 'div.error_message'
  end

  test "should update profil" do
    get settings_profile_path
    patch user_path(@user), params: {
      user: {
        username: 'ako',
        password: 'password',
        password_confirmation: 'password'
      }
    }
    assert_redirected_to settings_profile_path
  end
end
