require 'test_helper'

class CreatePcopAccountTest < ActionDispatch::IntegrationTest
  def setup
    @category = pcop_categories(:one)
    @account = pcop_accounts(:one)
  end

  test "should render new and display error msg if inputs are invalid" do
    get new_pcop_category_account_path(@category)
    post pcop_category_accounts_path(@category), params: {
      pcop_account: {
        id: nil,
        name: nil,
        description: nil
      }
    }
    assert_template 'pcop/accounts/new'
    assert_select 'div.error_message'
  end

  test "should save account and redirect to pcop category list" do
    get new_pcop_category_account_path(@category)
    assert_difference 'Pcop::Account.count' do
      post pcop_category_accounts_path(@category), params: {
        pcop_account: {
          id: 15,
          name: 'Test name',
          description: 'Test description'
        },
        category_id: @category.id
      }
    end
    assert_redirected_to pcop_categories_path
  end
end
