require 'test_helper'

class SeasonCreateTest < ActionDispatch::IntegrationTest
  def setup
    @season = seasons :one
    @user = users :basic_user
    log_in_as @user
  end

  test "should display error" do
    @season.year = nil
    get new_season_path
    post seasons_path, params: { season: { year: @season.year }}
    assert_template 'seasons/new'
    assert_select 'div.error_message'
  end
end
