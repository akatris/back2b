require 'test_helper'

class EstablishmentUpdateTest < ActionDispatch::IntegrationTest
  def setup
    @user = users :basic_user
    log_in_as @user
  end

  test "should diplay validation errors" do
    get settings_establishment_path
    patch establishment_path(@user.establishment), params: {
      establishment: {
        name: nil
      }
    }
    assert_template 'settings/establishment'
    assert_select 'div.error_message'
  end

  test "success update" do
    get settings_establishment_path
    patch establishment_path(@user.establishment), params: {
      establishment: {
        name: 'fako'
      }
    }
    assert_redirected_to settings_establishment_path
  end
end
