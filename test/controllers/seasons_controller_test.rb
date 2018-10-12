require 'test_helper'

class SeasonsControllerTest < ActionDispatch::IntegrationTest
	def setup
		log_in_as users(:one)
    @season_one = seasons :one
	end

	test "should display a list of seasons" do
		get seasons_path
		assert_response :success
	end
 
  test "should create season" do
    assert_difference 'Season.count' do
      post seasons_path, params: {
        season: { year: 2019 }
      }
    end
    assert_redirected_to seasons_path
  end

  test "should display errors" do
    assert_no_difference 'Season.count' do
      post seasons_path, params: { season: { year: nil }}
    end
    assert_equal "Impossible de créer l'année budgetaire", flash[:alert]
  end

  test "should view detail page" do
    get season_path @season_one
    assert_response :success
  end
end

