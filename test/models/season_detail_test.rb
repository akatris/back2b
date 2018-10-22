require 'test_helper'

class SeasonDetailTest < ActiveSupport::TestCase
  def setup
    @season = seasons :one
    @season_detail = SeasonDetail.new
  end

  def test_season_should_be_valid
    assert_not_empty @season_detail.data
  end
end
