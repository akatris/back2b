require 'test_helper'

class CreatePcopClassTest < ActionDispatch::IntegrationTest
  def setup
    @pcop_class = pcop_classes(:one)
  end

  test "should display error if invalid informations are given" do
    get new_pcop_class_path
    assert_template 'pcop/classes/new'
    post pcop_classes_path, params: {
      pcop_class: {
        name: @pcop_class.name,
        description: @pcop_class.description
      }
    }
    assert_template 'pcop/classes/new'
    assert_select 'div.error_messages'
  end
end
