require 'test_helper'

class SettingsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @user = users :one
    log_in_as @user
  end

  test "settings home url should be redirected to profile" do
    get settings_url
    assert_response :success
    assert_template 'settings/profile'
  end

  test "should get profile" do
    get settings_profile_url
    assert_response :success
    assert_template 'users/_form'
  end

  test "should get establishment" do
    get settings_establishment_url
    assert_response :success
    assert_template 'establishments/_form'
  end

  test "should get supply" do
    get settings_supply_url
    assert_response :success
  end
end
