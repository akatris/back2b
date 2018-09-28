require 'test_helper'

class SeasonTest < ActiveSupport::TestCase
  def setup
    @season = seasons :one
    @another_season = seasons :two
  end

  test "should be valid" do
    assert @season.valid?
  end

  test "same establishment should not have same year" do
    @another_season.year = @season.year
    @another_season.establishment = @season.establishment
    assert @another_season.invalid?
  end

  test "different establishment can have same year" do
    @another_season.year = @season.year
    assert @another_season.valid?
  end

  test "a year is required" do
    @season.year = nil
    assert @season.invalid?
  end

  test "should be a valid year" do
    @season.year = "not a valid year"
    assert @season.invalid?
    @season.year = "2030"
    assert @season.valid?
  end

  test "an establishment is required" do
    @season.establishment = nil
    assert @season.invalid?
  end
end
