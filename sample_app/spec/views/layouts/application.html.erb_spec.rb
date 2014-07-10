# require 'spec_helper'
#
# describe "layouts/application" do
#   before(:each) do
#
#   end
#
#   it "should render ui lab links" do
#     render
#
#     assert_select 'a[href=?]', /..\/\/ui_lab\/buttons\.html/, :count => 1
#   end
# end
require 'spec_helper'

describe 'layouts/application' do

  context 'signed-in user' do

    before { view.stub(:user_signed_in?) { true } }

    context 'completed onboarding' do

      before do
        user = double('user')
        user.stub(:has_completed_onboarding?) { false }
        user.stub(:name) { "test" }
        user.stub(:email) { "test@example.com" }
        user.stub(:microposts) { microposts = []
                                 microposts.push Micropost.new :content=>"micropost1"
                                 microposts
                                }
        assign(:current_user, user)

        micropost = Micropost.new :content=>"new micrpost"
        assign(:micropost, micropost)
      end

      it "should display alert" do
        render
        rendered.should have_selector('.alert')
        #TODO! Make it work ###TDD Missings
        # have_selector(".alert") do |content| See also:
        #   content.should have_selector(:option, :value => 1)
        #   content.should have_selector(:option, :value => 2)
        # end
      end

    end
  end

  context 'signed-out user' do

  end


end
