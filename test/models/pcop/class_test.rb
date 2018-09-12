require 'test_helper'

class Pcop::ClassTest < ActiveSupport::TestCase
  def setup
    @class_one = pcop_classes(:one)
    @class_two = pcop_classes(:two)
  end

  test "should be valid" do
    assert @class_one.valid?
  end

  test "ids should contain only one unit" do
    @class_one.id = 12
    assert_not @class_one.valid?
  end

  test "ids are required" do
    @class_one.id = nil
    assert_not @class_one.valid?
  end

  test "name should be unique" do
    @class_one.save
    @class_two.name = @class_one.name
    assert_not @class_two.valid?
  end

  test "name is required" do
    @class_one.name = nil
    assert_not @class_one.valid?
  end

  test "name's length should not exceed 255" do
    @class_one.name = 'a' * 256
    assert_not @class_one.valid?
  end

  test "description's length should not exceed 255" do
    @class_one.description = 'a' * 256
    assert_not @class_one.valid?
  end
end
