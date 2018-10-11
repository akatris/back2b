require 'test_helper'

class SeasonTest < ActiveSupport::TestCase
	def setup
		@season_one = seasons :one
	end

	test "should be valid" do
		assert @season_one.valid?
	end

	test "should be a valid year" do
		@season_one.year = 203
		assert_not @season_one.valid?
		@season_one.year = "hello"
		assert_not @season_one.valid?
		@season_one.year = 2014
		assert @season_one.valid?
	end

	test "year should be unique for each establishment" do
		@season_one.save
		season = Season.new(year: @season_one.year)
		season.establishment = establishments :one
		assert_not season.valid?
	end
end
