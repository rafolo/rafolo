require 'spec_helper.rb'

describe 'Menu extension2 full' do

  it 'Mappoint should contain methods2' do

   MapPointController.menuable.should == true
   MapPointController.enabled.should == true
   MapPointController.title.should == "Maps"
   MapPointController.children.count.should == 2

  end

end