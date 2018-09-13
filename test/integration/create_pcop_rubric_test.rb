require 'test_helper'

class CreatePcopRubricTest < ActionDispatch::IntegrationTest
  test "should display errors when inputs are invalid" do
    get new_pcop_path
    post pcops_path, params: {
      pcop_form: {
        id: 0,
        name: '',
        description: ''
      }
    }
    assert_template 'pcops/new'
    assert_select 'div.error_message'
  end

  test "should save rubric based on id" do
    get new_pcop_path
    assert_difference 'Pcop::Category.count' do
      post pcops_path, params: {
        pcop_form: {
          id: 4,
          name: 'test',
          description: 'test'
        }
      }
    end
    assert_redirected_to pcops_path
  end
end
