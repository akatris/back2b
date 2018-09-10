require 'test_helper'

class LogInUsersTest < ActionDispatch::IntegrationTest
  def setup
    @admin = users(:admin)
  end

  test "login with invalid information" do
    get login_path
    post login_path, params: {session: {username: 'admin', password: 'admin'}}
    assert_template 'sessions/new'
    assert flash[:danger]
  end

  test "login with valid information" do
    get login_path
    post login_path, params: {
      session: {
        username: @admin.username,
        password: 'password'
        }
      }
    assert_redirected_to root_path
    follow_redirect!
    assert_select "a[href=?]", logout_path
  end

end
