require 'test_helper'

class Pcop::CategoriesControllerTest < ActionDispatch::IntegrationTest

  def setup
    @category_1 = pcop_categories(:one)
  end

  test "should get index" do
    get pcop_categories_url
    assert_response :success
  end

  test "should show the create page" do
    get new_pcop_category_url
    assert_response :success
  end

  test "should save class to the database" do
    assert_difference 'Pcop::Category.count' do
      post pcop_categories_url , params: {
        pcop_category: {
          id: 3,
          name: 'Test',
          description: @category_1.description
        }
      }
    end
  end

  test "should view class detail" do
    get pcop_category_url @category_1
    assert_response :success
  end
end
