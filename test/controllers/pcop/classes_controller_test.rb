require 'test_helper'

class Pcop::ClassesControllerTest < ActionDispatch::IntegrationTest

  def setup
    @class_1 = pcop_classes(:one)
  end

  test "should get index" do
    get pcop_classes_url
    assert_response :success
  end

  test "should show the create page" do
    get new_pcop_class_url
    assert_response :success
  end

  test "should save class to the database" do
    assert_difference 'Pcop::Class.count' do
      post pcop_classes_url , params: {
        pcop_class: {
          id: 3,
          name: 'Test',
          description: @class_1.description
        }
      }
    end
  end

  test "should view class detail" do
    get pcop_class_path @class_1
    assert_response :success
  end
end
