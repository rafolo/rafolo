require 'rspec'

describe 'Menu Helper adds menu' do

  it 'should should add two menus'  do

    items = left_menu
    items.empty?.should == false
  end
end