require 'test_helper'

class Pcop::ClassesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pcop_classes_url
    assert_response :success
  end

end
