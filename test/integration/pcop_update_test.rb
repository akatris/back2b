require 'test_helper'

class PcopUpdateTest < ActionDispatch::IntegrationTest
  def setup
    @category = pcop_categories :one
  end

  test "should display error" do
    @category.save
    @category.name = nil
    patch pcop_path(@category.id), params: {
      pcop_form: {
        id: @category.id,
        name: @category.name,
        description: @category.description
      }
    }
    assert_template 'pcops/edit'
    assert_select 'div.error_message'
  end
end
