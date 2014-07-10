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

      should have_link('Default', href: "/credit_card/index?locale=en")
      should have_xpath('//*[@id="breadcrumbs"]/div[2]/span[1]')
      should have_content("Your alarms")
    end

    it "has correct UI lab links" do
      SampleApp::Application.config.show_examples = true  #TODO: possible site effect for other Specs ?
      visit alarm_index_path
      puts body
      should have_xpath('//a[@href="/ui_lab/buttons.html"]')
      should have_xpath('//a[@href="/ui_lab/general.html"]')
      should have_xpath('//a[@href="/ui_lab/icons.html"]')
      should have_xpath('//a[@href="/ui_lab/grid.html"]')
      should have_xpath('//a[@href="/ui_lab/tables.html"]')
      should have_xpath('//a[@href="/ui_lab/widgets.html"]')
      should have_xpath('//a[@href="/ui_lab/widgets.html"]')
    end

    it "has correct Forms link" do
      SampleApp::Application.config.show_examples = true  #TODO: possible site effect for other Specs ?
      visit alarm_index_path
      puts body
      should have_xpath('//a[@href="/forms/forms.html"]')
    end

  end
end















