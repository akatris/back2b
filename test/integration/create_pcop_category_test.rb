require 'test_helper'

class CreatePcopCategoryTest < ActionDispatch::IntegrationTest
  def setup
    @pcop_category = pcop_categories(:one)
  end

  test "should display error if invalid informations are given" do
    get new_pcop_category_path
    assert_template 'pcop/categories/new'
    post pcop_categories_path, params: {
      pcop_category: {
        name: @pcop_category.name,
        description: @pcop_category.description
      }
    }
    assert_template 'pcop/categories/new'
    assert_select 'div.error_messages'
  end
end
