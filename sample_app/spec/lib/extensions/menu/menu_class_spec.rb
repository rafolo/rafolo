require 'rspec'

require 'extensions/menu/menu_class.rb'

class Test1
  has_menu 'name', 'link', :enabled => false, :order => 2, "Default" => "/credit_card/index"
end

describe 'Menu extension' do

  it 'Test1 should contain methods' do

    (Test1.respond_to? :child).should == true;

    (Test1.respond_to?  :name).should == true
    (Test1.respond_to?  :link).should == true

    (Test1.respond_to?  :enabled?).should == true
    (Test1.enabled?).should == false

    (Test1.respond_to?  :order).should == true
    (Test1.order).should == 2
  end


  class Test2
    has_menu 'name', 'link', :enabled => false
  end

  it 'Test2 should contain order 0' do

    (Test2.respond_to?  :name).should == true
    (Test2.respond_to?  :link).should == true

    (Test2.enabled?).should == false

    (Test2.order).should == 0
  end

  class Test3
    has_menu 'name', 'link'
  end

  it 'Test3 should have no enabled' do

    (Test3.respond_to?  :name).should == true
    (Test3.respond_to?  :link).should == true

    (Test3.respond_to?  :enabled?).should == false

    (Test3.respond_to?  :order).should == true
    (Test3.order).should == 0
  end

  class Test4
    has_menu 'name', 'link'
    def self.enabled?
      false
    end
  end

  it 'Test4 should be disabled' do

    (Test4.respond_to?  :name).should == true
    (Test4.respond_to?  :link).should == true

    (Test4.enabled?).should == false
    (Test4.order).should == 0
  end
end