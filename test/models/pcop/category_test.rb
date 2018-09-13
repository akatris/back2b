require 'test_helper'

class Pcop::CategoryTest < ActiveSupport::TestCase
  def setup
    @category_one = pcop_categories(:one)
    @category_two = pcop_categories(:two)
  end

  test "should be valid" do
    assert @category_one.valid?
  end

  test "ids should contain only one unit" do
    @category_one.id = 12
    assert_not @category_one.valid?
  end

  test "ids are required" do
    @category_one.id = nil
    assert_not @category_one.valid?
  end

  test "name should be unique" do
    @category_one.save
    @category_two.name = @category_one.name
    assert_not @category_two.valid?
  end

  test "name is required" do
    @category_one.name = nil
    assert_not @category_one.valid?
  end

  test "name's length should not exceed 255" do
    @category_one.name = 'a' * 256
    assert_not @category_one.valid?
  end

  test "description's length should not exceed 255" do
    @category_one.description = 'a' * 256
    assert_not @category_one.valid?
  end
end
