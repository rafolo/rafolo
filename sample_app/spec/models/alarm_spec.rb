require 'spec_helper'

describe Alarm do
  # pending "add some examples to (or delete) #{__FILE__}"
  it 'one_is_one' do
    1.should==1
  end

  it 'validates presence of a name ' do
    user = User.new(:name => "Test")
    user.should_not be_valid
  end
end
