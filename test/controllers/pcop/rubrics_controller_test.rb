require 'test_helper'

class Pcop::RubricsControllerTest < ActionDispatch::IntegrationTest
  test "should get subaccounts as json" do
    get pcop_rubrics_path, params: {format: :json}
    body = JSON.parse @response.body
    assert_instance_of Array, body
    assert_equal 'application/json', @response.content_type
  end
end
