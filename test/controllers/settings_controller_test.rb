require 'test_helper'

class SettingsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @user = users :basic_user
  end

  test "settings home url should be redirected to profile" do
    log_in_as @user
    get settings_url
    assert_response :success
    assert_template 'settings/profile'
  end

  test "should get profile" do
    log_in_as @user
    get settings_profile_url
    assert_response :success
    assert_template 'users/_form'
  end

  test "should get establishment" do
    log_in_as @user
    get settings_establishment_url
    assert_response :success
  end
end
