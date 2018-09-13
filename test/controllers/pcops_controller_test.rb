require 'test_helper'

class PcopsControllerTest < ActionDispatch::IntegrationTest
  test "Should display a list of pcop entity" do
    get pcops_path
    assert_response :success
  end
end
