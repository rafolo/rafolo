require 'rspec'

require 'extensions/menu/menu_class.rb'
require 'extensions/menu/menu_extension.rb'

RSpec.configure do |c|
  c.include MenuExtension
end


class Test1
  has_menu 'name1', 'link1', :enabled => false, :order => 2
end

class Test2
  has_menu 'name2', 'link2', :enabled => false, :order => 2
end

describe 'Menu extension should contain' do

  it 'Test1 should contain two elements' do

    (get_menuable [Test1.class, Test2.class]).count.should == 2

  end
end