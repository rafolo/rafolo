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
        assign(:current_user, user)
      end

      it "should display alert" do
        render
        rendered.should have_selector('.alert')
      end

    end
  end

  context 'signed-out user' do

  end


end