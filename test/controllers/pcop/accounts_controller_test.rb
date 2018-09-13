require 'test_helper'

class Pcop::AccountsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = pcop_categories(:one)
    @account = pcop_accounts(:two)
  end

  test "should get index" do
    get pcop_category_accounts_url(@category)
    assert_response :success
  end

  test "should get show" do
    get pcop_category_account_url(@category, @account)
    assert_response :success
  end

  test "should get edit" do
    get edit_pcop_category_account_url(@category, @account)
    assert_response :success
  end

  test "should get new" do
    get new_pcop_category_account_url(@category)
    assert_response :success
  end

  test "should get update" do
    patch pcop_category_account_url(@category, @account)
    assert_response :success
  end

  test "should get destroy" do
    delete pcop_category_account_url(@category, @account)
    assert_response :success
  end

end
