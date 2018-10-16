require 'test_helper'

class PcopTest < ActiveSupport::TestCase
  def setup
    @category = pcop_categories :one
  end

  test "Should contains an array containing all pcops" do
    assert Pcop::all
  end
end
