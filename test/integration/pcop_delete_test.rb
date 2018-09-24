require 'test_helper'

class PcopDeleteTest < ActionDispatch::IntegrationTest
  def setup
    @category = pcop_categories :one
    @account = pcop_accounts :one
    @sub_account = pcop_sub_accounts :one
    @rubric = pcop_rubrics :one
  end

  test "should delete category" do
    @category.save
    assert_difference 'Pcop::Category.count', -1 do
      delete pcop_path(@category.id)
    end
    assert_redirected_to pcops_path
  end

  test "should also delete other pcop type" do
    @sub_account.save
    assert_difference 'Pcop::SubAccount.count', -1 do
      delete pcop_path(@sub_account.id)
    end
    assert_redirected_to pcops_path
  end
end
