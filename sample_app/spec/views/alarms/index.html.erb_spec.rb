require 'spec_helper'

describe "alarms/index" do
  before(:each) do
    assign(:alarms, [
      stub_model(Alarm,
        :name => "Name",
        :description => "Description",
        :active => false
      ),
      stub_model(Alarm,
        :name => "Name",
        :description => "Description",
        :active => false
      )
    ])
  end

  it "renders a list of alarms" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Description".to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
  end
end
