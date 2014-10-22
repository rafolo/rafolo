require 'spec_helper'

describe "Alarms.js" do
  subject { page }

  let(:user) { FactoryGirl.create(:user) }

  before do
    sign_in user
    SampleApp::Application.config.show_examples = true
  end

  describe "GET /alarms" do
    before { visit root_path }

    it "has page available" do
      get alarms_path
      response.status.should be(200)
    end

    it "has correct gui elements", js: true do

      visit alarm_index_path

      current_path.should eq(alarm_index_path)

      should have_xpath('//*[@id="breadcrumbs"]/div[2]/span[1]')
      should have_content("Your alarms")
      should have_content("Alarm")
    end

    it "has correct UI lab links" do
      visit alarm_index_path
      should have_xpath('//a[@href="/ui_lab/buttons.html"]')
      should have_xpath('//a[@href="/ui_lab/general.html"]')
      should have_xpath('//a[@href="/ui_lab/icons.html"]')
      should have_xpath('//a[@href="/ui_lab/grid.html"]')
      should have_xpath('//a[@href="/ui_lab/tables.html"]')
      should have_xpath('//a[@href="/ui_lab/widgets.html"]')
      should have_xpath('//a[@href="/ui_lab/widgets.html"]')
    end

    it "has correct Forms link" do
      visit alarm_index_path
      should have_xpath('//a[@href="/forms/forms.html"]')
    end

    it "has correct Charts link" do
      visit alarm_index_path
      should have_xpath('//a[@href="/charts/charts.html"]')
    end

    it "has correct Others links" do
      visit alarm_index_path
      should have_xpath('//a[@href="/other/wizard.html"]')
      should have_xpath('//a[@href="/other/login.html"]')
      should have_xpath('//a[@href="/other/sign_up.html"]')
      should have_xpath('//a[@href="/other/full_calendar.html"]')
      should have_xpath('//a[@href="/other/error404.html"]')
    end

  end
end
