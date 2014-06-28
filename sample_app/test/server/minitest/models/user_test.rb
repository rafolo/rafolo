require File.expand_path('../../test_helper.rb', __FILE__)

class TestUserRegister < MiniTest::Test
  def setup
    @user = User.new
  end
  def test_not_valid
    assert !@user.valid?
  end
end