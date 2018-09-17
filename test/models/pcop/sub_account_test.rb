require 'test_helper'

class Pcop::SubAccountTest < ActiveSupport::TestCase
  def setup
    @sub_account = pcop_sub_accounts :one
    @another_sub_account = pcop_sub_accounts :two
  end

  test "is valid" do
    assert @sub_account.valid?
  end

  test "id should be valid" do
    @sub_account.id = 12
    assert @sub_account.invalid?
    @sub_account.id = 123
    assert @sub_account.valid?
  end

  test "id should be unique" do
    @sub_account.save
    @another_sub_account.id = @sub_account.id
    assert @another_sub_account.invalid?
  end

  test "name is required" do
    @sub_account.name = nil
    assert @sub_account.invalid?
  end

  test "id is required" do
    @sub_account.id = nil
    assert @sub_account.invalid?
  end

  test "name should not exceed 255" do
    @sub_account.name = "a" * 256
    assert @sub_account.invalid?
  end

  test "description should not exceed 500" do
    @sub_account.description = 'a' * 501
    assert @sub_account.invalid?
  end
end
