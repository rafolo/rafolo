require 'spec_helper'

describe 'Menu Helper' do

  it 'has two menus'  do

    items = MenuHelper.left_menu
    items.empty?.should == false
  end
end