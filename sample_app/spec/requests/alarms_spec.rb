require 'spec_helper'

describe "Alarms" do
  describe "GET /alarms" do
    it "works! (now write some real specs)" do
      # Run the generator again with the --webrat flag if you want to use webrat methods/matchers
      get alarms_path
      response.status.should be(200)
    end

    it "should render correct ui lab links" do
      get alarms_path
      should have_link("Buttons", href: "../ui_lab/buttons.html")
      #assert_select 'a[href=?]', /..\/\/ui_lab\/buttons\.html/, :count => 1
    end
  end
end
