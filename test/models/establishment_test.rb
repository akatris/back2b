require 'test_helper'

class EstablishmentTest < ActiveSupport::TestCase
  def setup
    @establishment = establishments :one
  end

  test "should be valid" do
    assert @establishment.valid?
  end

  test "name is required" do
    @establishment.name = nil
    assert @establishment.invalid?
  end

  test "name should not exceed 255" do
    @establishment.name = 'a' * 256
    assert @establishment.invalid?
  end

  test "must have a supply" do
    @establishment.supply = nil
    assert @establishment.invalid?
  end
end
