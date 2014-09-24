require 'spec_helper'

describe "Unsigned-in pages" do

  subject { page }

  describe "index" do

    let(:user) { FactoryGirl.create(:user) }

    before(:all) { 30.times { FactoryGirl.create(:user) } }
    after(:all) { User.delete_all }

    before(:each) do

      sign_out
      visit root_path
    end

    # it "welcomes users1" do
    #   # TODO! body.div.h1 should work, but does not
    #   should have_css('h1', text: "Welcome to the Sample App")
    # end
    it "welcomes users" do
      should have_xpath('/html/body//h1', text: t2('WelcomeMessage'))
    end

    it "has correct gui elements", js: true do

      current_path.should eq(root_path)
      should have_content(t2("WelcomeMessage"))
    end

    describe "menu" do

      it { should have_link(t2('Home')) }
      it { should have_link(t2('Help')) }
      it { should have_link(t2('Sign in')) }
      # TODO! Add Language combo for unsigned page

    end

    describe "content" do
      it do
        should have_link(t2('Sign up now!'))
      end

      it do
        should have_css('.btn', text: t2('Sign up now!'))
      end
    end
  end



end
