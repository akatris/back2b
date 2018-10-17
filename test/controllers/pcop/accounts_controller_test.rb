require 'test_helper'

class Pcop::AccountsControllerTest < ActionDispatch::IntegrationTest
  test "should get accounts as json" do
    get pcop_accounts_path, params: {format: :json}
    body = JSON.parse @response.body
    assert_instance_of Array, body
    assert_equal 'application/json', @response.content_type
  end
end
