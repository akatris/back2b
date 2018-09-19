require 'test_helper'

class PcopUpdateTest < ActionDispatch::IntegrationTest
  def setup
    @category = pcop_categories :one
    @rubric = pcop_rubrics :one
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

  test "should display error for rubrics" do
    @rubric.save
    eligible_transactions = "a" * 501
    patch pcop_path(@rubric.id), params: {
      pcop_form: {
        eligible_transactions: eligible_transactions
      }
    }
    assert_template 'pcops/edit'
    assert_select 'div.error_message'
  end

  test "should update pcop" do
    @category.save
    get edit_pcop_path(@category.id)
    assert_template
    name = "Foo"
    patch pcop_path(@category.id), params: {
      pcop_form: {
        name: name
      }
    }
    assert_redirected_to pcops_path
    @category.reload
    assert_equal name, @category.name
  end


  test "should update rubric" do
    @rubric.save
    get edit_pcop_path(@rubric.id)
    assert_template
    eligible_transactions = "Foo"
    patch pcop_path(@rubric.id), params: {
      pcop_form: {
        eligible_transactions: eligible_transactions
      }
    }
    assert_redirected_to pcops_path
    @rubric.reload
    assert_equal eligible_transactions, @rubric.eligible_transactions
  end
end
