require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.new username: 'sitraka',
                    password: 'password',
                    password_confirmation: 'password'
  end

  test "should get new" do
    get signup_url
    assert_response :success
  end
end
