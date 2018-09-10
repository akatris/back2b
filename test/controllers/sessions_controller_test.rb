require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get login_path
    assert_response :success
  end

  test "flash should disapear after refresh" do
    get login_path
    post login_path, params: {session: {username: '', password: ''}}
    assert_select 'div.flash'
    get login_path
    assert_select 'div.flash', count: 0
  end
end
