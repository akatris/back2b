require 'test_helper'

class Pcop::AccountsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @class = pcop_classes(:one)
    @account = pcop_accounts(:two)
  end

  test "should get index" do
    get pcop_class_accounts_url(@class)
    assert_response :success
  end

  test "should get show" do
    get pcop_class_account_url(@class, @account)
    assert_response :success
  end

  test "should get edit" do
    get edit_pcop_class_account_url(@class, @account)
    assert_response :success
  end

  test "should get new" do
    get new_pcop_class_account_url(@class)
    assert_response :success
  end

  test "should get update" do
    patch pcop_class_account_url(@class, @account)
    assert_response :success
  end

  test "should get destroy" do
    delete pcop_class_account_url(@class, @account)
    assert_response :success
  end

end
