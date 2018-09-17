require 'test_helper'

class Pcop::AccountTest < ActiveSupport::TestCase
  def setup
    @category = pcop_categories :one
    @account = pcop_accounts :one
    @another_account = pcop_accounts :two
  end

  test "Should be valid" do
    assert @account.valid?
  end

  test "Id's length should not exceed 2" do
    @account.id = 123
    assert_not @account.valid?
  end

  test "Ids are required" do
    @account.id = nil
    assert_not @account.valid?
  end

  test "Ids should contain only numeric value" do
    @account.id = 'ab'
    assert_not @account.valid?
  end

  test "Id should be unique" do
    @account.save
    @another_account.id = @account.id
    assert @another_account.invalid?
  end

  test "name is required" do
    @account.name = nil
    assert_not @account.valid?
  end

  test "name's length should not exceed 255" do
    @account.name = 'a' * 256
    assert_not @account.valid?
    @account.name = 'a' * 255
    assert @account.valid?
  end

  test "description's length should not exceed 255" do
    @account.description = 'a' * 256
    assert_not @account.valid?
  end

  test "description is not required" do
    @account.description = nil
    assert @account.valid?
  end
end
