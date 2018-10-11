require 'test_helper'

class SeasonsCreateTest < ActionDispatch::IntegrationTest
  def setup
    log_in_as users(:one)
    @season_one = seasons :one
  end

  test "create season fails" do
    get seasons_path, params: {
      create_season: true
    }
    assert_select 'div#newSeason', style: 'display:block'
  end
end
