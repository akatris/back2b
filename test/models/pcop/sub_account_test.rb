require 'test_helper'

class Pcop::SubAccountTest < ActiveSupport::TestCase
  def setup
    @sub_account = pcop_sub_accounts(:one)
  end

  test "is valid" do
    assert @sub_account.valid?
  end

  test "id should contain 3 characters" do
    @sub_account.id = 12
    @sub_account.name = "fa"
    assert_not @sub_account.valid?
    @sub_account.id = 123
    assert @sub_account.valid?
  end

  test "name should be unique" do
    @sub_account.save
    other_sub_account = pcop_sub_accounts(:two)
    other_sub_account.name = @sub_account.name
    assert other_sub_account.invalid?
  end
end
