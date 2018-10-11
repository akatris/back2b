require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @basic_user = users :one
  end
  test "should get home" do
    log_in_as @basic_user
    get root_path
    assert_response :success
  end

end
