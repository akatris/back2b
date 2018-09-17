require 'test_helper'

class PcopFormTest < ActiveSupport::TestCase

  def setup
    @form = Pcop::Form.new(id: 7, name: 'test', description: 'tst')
    @category = pcop_categories(:one)
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

  test "name is required" do
    @form.name = nil
    assert_not @form.valid?
  end

  test "type should return Pcop::Category when id contains only 1 character" do
    assert Pcop::Category == Pcop::type(4)
  end

  test "type should return Pcop::Account when id contains 2 characters" do
    assert Pcop::Account == Pcop::type(43)
  end

  test "type should return Pcop::SubAccount when id contains 3 characters" do
    assert Pcop::SubAccount == Pcop::type(432)
  end

  test "type should return Pcop::Rubric when id contains 4 characters" do
    assert Pcop::Rubric == Pcop::type(4567)
  end

  test "Can save valid Category" do
    category_form = Pcop::Form.new id: 4, name: 'hello', description: 'hello'
    assert_difference 'Pcop::Category.count' do
      category_form.save_based_on_id
    end
  end

  test "Can save valid Account based on id" do
    # The category id one is already saved from fixtures.
    # these lines just create account inside the category 1
    form = Pcop::Form.new id: 12, name: 'account_12', description: 'hello'
    assert_difference 'Pcop::Account.count' do
      form.save_based_on_id
    end
  end

  test "Can save valid SubAccount based on id" do
    # Uses the account with id 11 from the fixtures
    form = Pcop::Form.new id: 112, name: 'sub_account_112', description: 'hello'
    assert_difference 'Pcop::SubAccount.count' do
      form.save_based_on_id
    end
  end

  test "Can save valid Rubric based on id" do
    # Uses the sub-account with id 111 from the fixtures
    form = Pcop::Form.new id: 1112, name: 'rubric_1112', description: 'hello',
                          eligible_transactions: 'bla bla bla'
    assert_difference 'Pcop::Rubric.count' do
      form.save_based_on_id
    end
  end
end
