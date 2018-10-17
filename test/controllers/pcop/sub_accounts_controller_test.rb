require 'test_helper'

class Pcop::SubAccountsControllerTest < ActionDispatch::IntegrationTest
  test "should get subaccounts as json" do
    get pcop_sub_accounts_path, params: {format: :json}
    body = JSON.parse @response.body
    assert_instance_of Array, body
    assert_equal 'application/json', @response.content_type
  end
end
