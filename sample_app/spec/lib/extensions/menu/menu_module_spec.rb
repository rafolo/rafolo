require 'spec_helper.rb'

describe 'Menu module full' do

  it 'should contain  in Mappoint' do

   MapPointController.menuable.should == true
   MapPointController.enabled.should == true
   MapPointController.title.should == "Localisation"
   MapPointController.children.count.should == 2

  end

end