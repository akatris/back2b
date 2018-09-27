require 'test_helper'

class SupplyTest < ActiveSupport::TestCase
  def setup
    @supply = supplies :one
  end

  test "should be valid" do
    assert @supply.valid?
  end

  test "available is required" do
    @supply.available = nil
    assert @supply.invalid?
  end

  test "should contains integers only" do
    @supply.available = 'abc'
    assert @supply.invalid?
    @supply.available = '1.02'
    assert @supply.valid?
  end
end
