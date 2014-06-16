require 'spec_helper'

describe "alarms/edit" do
  before(:each) do
    @alarm = assign(:alarm, stub_model(Alarm,
      :name => "MyString",
      :description => "MyString",
      :active => false
    ))
  end

  it "renders the edit alarm form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => alarms_path(@alarm), :method => "post" do
      assert_select "input#alarm_name", :name => "alarm[name]"
      assert_select "input#alarm_description", :name => "alarm[description]"
      assert_select "input#alarm_active", :name => "alarm[active]"
    end
  end
end
