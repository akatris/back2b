require 'test_helper'

class Pcop::CategoriesControllerTest < ActionDispatch::IntegrationTest
  test "should get categories as json" do
    get pcop_categories_path, params: {format: :json}
    body = JSON.parse @response.body
    assert_instance_of Array, body
    assert_equal 'application/json', @response.content_type
  end
end
