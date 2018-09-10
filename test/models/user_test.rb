require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new username: 'sitraka',
                    email: 'ratsimbasitraka@gmail.com',
                    password: 'password',
                    password_confirmation: 'password'
  end

  test "Should be valid" do
    assert @user.valid?
  end

  test "Username is required" do
    @user.username = ' '
    assert_not @user.valid?
  end

  test "username should at least have length 3" do
    @user.username = 'ab'
    assert_not @user.valid?
    @user.username = 'a' * 3
    assert @user.valid?
  end

  test "password should contains at least 6 characters" do
    @user.password = @user.password_confirmation = 'p' * 5
    assert_not @user.valid?
    @user.password = @user.password_confirmation = 'p' * 6
    assert @user.valid?
  end

  test "password is required" do
    @user.password = @user.password_confirmation = ' '
    assert_not @user.valid?
  end

  test "password_confirmation is required" do
    @user.password_confirmation = ' '
    assert_not @user.valid?
  end
end
