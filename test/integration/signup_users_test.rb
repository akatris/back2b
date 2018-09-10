require 'test_helper'

class SignupUsersTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.new username: 'sitraka',
                    password: 'password',
                    password_confirmation: 'password'
  end


  test "Should render new on error" do
    @user.username = ''
    post signup_url, params: {
      user: {
        username: @user.username,
        password: 'password',
        password_confirmation: 'password'
        }
      }
    assert_template 'users/new'
    assert_select 'div.error_message'
    assert_select 'ul.error_detail'
  end

  test "Should redirect to home page" do
    get signup_url
    assert_difference 'User.count' do
      post signup_url, params: {user: {username: @user.username,
        password: 'password',
        password_confirmation: 'password'}}
    end
    assert_redirected_to root_url
    follow_redirect!
    user = User.find_by(username: @user.username)
    assert user.basic?
    assert_not flash[:success].nil?
    assert_select 'div.alert-success'
  end
end
