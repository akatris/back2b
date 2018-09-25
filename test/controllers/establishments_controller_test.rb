require 'test_helper'

class EstablishmentsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users :another_user
  end

  test "should display the establishment creation page" do
    log_in_as @user
    get new_establishment_path
    assert_response :success
  end
end
