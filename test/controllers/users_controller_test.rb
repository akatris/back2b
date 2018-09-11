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
    assert_redirected_to user_path(@basic_user)
  end

  test "only admin should view the users list" do
    log_in_as @admin
    get users_path
    assert_response :success
  end

  test "non admin should not view users list" do
    log_in_as @basic_user
    get users_path
    assert_redirected_to root_path
  end

  test "can't delete account if not an amdin" do
    log_in_as @basic_user
    assert_no_difference 'User.count' do
      delete user_path(@basic_user)
    end
    assert_redirected_to root_path
  end

  test "delete account if admin" do
    log_in_as @admin
    assert_difference 'User.count', -1 do
      delete user_path(@basic_user)
    end
    assert_redirected_to users_path
  end

  test "admin can't delete his own account" do
    log_in_as @admin
    assert_no_difference 'User.count' do
      delete user_path(@admin)
    end
    assert_redirected_to users_path
  end

  test "admin can update any account" do
    log_in_as @admin
    get edit_user_path(@basic_user)
    patch user_path(@basic_user), params: {
      user: {
        username: 'hello',
        password: 'password',
        password_confirmation: 'password',
        role: 'basic'
      }
    }
    assert_redirected_to user_path(@basic_user)
    user = User.find_by(username: 'hello')
    assert user
  end

  test "account owner can update their account" do
    log_in_as @basic_user
    get edit_user_path @another_user
    assert_redirected_to user_path(@basic_user)
  end
end
