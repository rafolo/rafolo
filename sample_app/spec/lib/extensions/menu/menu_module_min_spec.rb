#require 'spec_helper.rb'
require 'rspec'
require 'extensions/menu/menu_module.rb'

class Test1 < ActionController::Base
  has_menu2 "Maps", "trwam.pl", enabled: true
end

class Test2 < ActionController::Base
  has_menu2 "Maps", "trwam.pl", enabled: false
end

class Test3 < ActionController::Base
  has_menu2 "Maps", "trwam.pl"

  def enabled?
    return true
  end
end

class Test4 < ActionController::Base
  has_menu2 "Maps", "trwam.pl", enabled: false, "SubTitle1" => "SubLink1", "SubTitle2" => "SubLink2"

  def enabled?
    return true
  end
end

describe 'Menu extension2' do

  it 'Test1 should contain methods2' do

    Test1.menuable.should == true
    Test1.enabled.should == true
    Test1.title.should = "Maps"

  end

  it 'Test2 should contain methods2' do

    Test2.menuable.should == true
    Test2.enabled.should == false
    Test2.title.should = "Maps"

  end

  it 'Test3 should contain methods2' do

    Test3.menuable.should == true
    Test3.enabled.should == false
    Test3.title.should = "Maps"

  end

  it 'Test4 should contain methods2' do

    Test4.menuable.should == true
    Test4.enabled.should == false
    Test4.title.should == "Maps"
    Test4.children.count.should == 2
  end

end