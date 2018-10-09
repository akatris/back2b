require 'test_helper'

class PcopsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = pcop_categories :one
  end

  test "Should display a list of pcop entity" do
    get pcops_path
    assert_response :success
  end

  test "should display pcop creation page" do
    get new_pcop_path
    assert_response :success
  end

  test "should display pcop update page" do
    get edit_pcop_path @category
    assert_response :success
  end

  test "should responde to xhr" do
    get pcops_path, params: {format: :json}
    body = JSON.parse @response.body
    assert_equal 'application/json', @response.content_type
    assert_instance_of Array, body
    assert_includes body[0], 'accounts'
  end
end
