require 'test_helper'

class SupplyUpdateTest < ActionDispatch::IntegrationTest
  def setup
    @user = users :one
    log_in_as @user
  end

  test "update fails" do
    get settings_supply_path
    patch supply_path(@user.establishment.supply), params: {
      supply: {
        available: 'not a number'
      }
    }
    assert_template 'settings/supply'
    assert_template 'supplies/_form'
    assert_select 'div.error_message'
  end

  test "update success" do
    get settings_supply_path
    patch supply_path(@user.establishment.supply), params: {
      supply: {
        available: '1.23'
      }
    }
    assert_redirected_to settings_supply_path
    s = @user.establishment.supply
    s.reload
    assert_equal s.available, 1.23
  end
end
