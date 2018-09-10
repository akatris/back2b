require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest

  def setup
    @admin = users :admin
    @basic_user = users :basic_user
    @another_user = users :another_user
  end

  test "should get new" do
    get signup_url
    assert_response :success
  end

  test "should get index" do
    get users_path
    assert_response :success
  end

  test "account owner can view profile" do
    log_in_as @basic_user
    get user_path(@basic_user)
    assert_response :success
  end

  test "admin can view any profile" do
    log_in_as @admin
    get user_path(@basic_user)
    assert_response :success
  end

  test "non-admin users cannot see other profile" do
    log_in_as @basic_user
    get user_path(@another_user)
    assert_redirected_to user_path(@another_user)
  end
end
