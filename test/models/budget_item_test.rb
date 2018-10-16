require 'test_helper'

class BudgetItemTest < ActiveSupport::TestCase
  def setup
    @budget_item = budget_items :one
    @budget_item.pcop_rubric = pcop_rubrics :one
    @budget_item.season = seasons :one
  end

  test "Budget item should be valid" do
    assert @budget_item.valid?
  end

  test "season is required" do
    @budget_item.season = nil
    assert_not @budget_item.valid?
  end

  test "rubric is required" do
    @budget_item.pcop_rubric = nil
    assert_not @budget_item.valid?
  end
end
