require 'spec_helper'

describe "Alarms" do
  subject { page }

  let(:user) { FactoryGirl.create(:user) }

  before { sign_in user }

  describe "GET /alarms" do
    before { visit root_path }

    it "has page available" do
      get alarms_path
      response.status.should be(200)
    end

    it "has correct gui" do
      visit alarm_index_path

      current_path.should eq(alarm_index_path)

      #should have_link("Buttons", href: "../ui_lab/buttons.html")
      #assert_select 'a[href=?]', /..\/\/ui_lab\/buttons\.html/, :count => 1
      should have_link('Default', href: "/credit_card/index?locale=en")
      should have_xpath('//*[@id="breadcrumbs"]/div[2]/span[1]')
      should have_content("Your alarms")

    end
  end
end















