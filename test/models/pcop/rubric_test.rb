require 'test_helper'

class Pcop::RubricTest < ActiveSupport::TestCase
  def setup
    @rubric = pcop_rubrics(:one)
    @another_rubric = pcop_rubrics :two
  end

  test "rubric is valid" do
    assert @rubric.valid?
  end

  test "id's should have valid format" do
    @rubric.id = 12345
    assert @rubric.invalid?
  end

  test "id should be unique" do
    @rubric.save
    @another_rubric.id = @rubric.id
    assert @another_rubric.invalid?
  end

  test "name is required" do
    @rubric.name = nil
    assert @rubric.invalid?
  end

  test "name should not exceed 255" do
    @rubric.name = 'a' * 256
    assert @rubric.invalid?
  end

  test "description should not exceed 500" do
    @rubric.description = 'a' * 501
    assert @rubric.invalid?
  end

  test "eligible_transaction should not exceed 500" do
    @rubric.eligible_transactions = 'a' * 501
    assert @rubric.invalid?
  end
end
