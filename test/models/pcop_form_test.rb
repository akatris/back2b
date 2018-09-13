require 'test_helper'

class PcopFormTest < ActiveSupport::TestCase

  def setup
    @form = Pcop::Form.new(id: 1, name: 'test', description: 'tst')
  end

  test "form works" do
    assert @form
  end

  test "form is valid" do
    assert @form.valid?
  end

  test "Id is required" do
    @form.id = nil
    assert_not @form.valid?
  end

  test "Id should begin with 1 to 7" do
    @form.id = 0
    assert_not @form.valid?
    @form.id = 19
    assert @form.valid?
  end

  test "Id should not contains alphabetic characters" do
    @form.id = '0sd'
    assert_not @form.valid?
  end

  test "Id should not exceed 4 characters" do
    @form.id = 12345
    assert_not @form.valid?
  end
end
