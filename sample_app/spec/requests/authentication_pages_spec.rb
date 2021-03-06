require 'spec_helper'
require Rails.root.join("app/helpers/localization_helper.rb")

describe "Authentication" do

  subject { page }

  describe "signin page" do
    before { sign_out
    visit signin_path
    }

    it { should have_selector('span', text: t2('Login')) }
    it { should have_field('session[email]') }
  end

  describe "signin" do
    before { visit signin_path }

    describe "with invalid information" do
      before { click_button t2("Sign in") }

      it { should have_selector('title', text: t2('Sign in')) }
      it { should have_error_message }

      describe "after visiting another page" do
        before { click_link t2 ("Home") }
        it { should_not have_error_message }
      end
    end

    describe "with valid information" do
      let(:user) { FactoryGirl.create(:user) }
      before { sign_in user
                #puts html
      }


      it { should have_selector('span', text: user.email) }
      it { should have_link(t2('Profile'), href: localize_path(user_path(user))) }
      it { should have_link(t2('Users'), href: localize_path(users_path)) }
      it { should have_link(t2('Sign out'), href: localize_path(signout_path)) }
      it { should_not have_link(t2('Sign in'), href: localize_path(signin_path)) }

      #TODO! Verify logic
      # describe "followed by signout" do
      #   before { click_link "Sign out" }
      #   it { should have_link('Sign in') }
      # end
    end
  end

  describe "authorization" do

    describe "for non-signed-in users" do
      let(:user) { FactoryGirl.create(:user) }

      describe "when attempting to visit a protected page" do
        before do
          sign_out
          visit edit_user_path(user)
          fill_in "session[email]", with: user.email
          fill_in "session[password]", with: user.password
          click_button t2("Sign in")
        end

        describe "after signing in" do
          it "should render the desired protected page" do
            page.should have_content(t2('Dashboard'))
            page.should have_content(user.name)
          end

          describe "when signing in again" do

            it "should render the default dashboardpage" do
              page.should have_content(t2('Dashboard'))
              page.should have_content(user.name)
            end
          end
        end
      end

      describe "in the Users controller" do

        describe "visiting the edit page" do
          before { visit edit_user_path(user) }
          it {
            should have_selector('span', text: t2('Login'))
          }
          # TODO! show allert if not signin - not sure? it { should have_selector('div.alert.alert-notice') }
        end

        describe "submitting to the update action" do
          before { put user_path(user) }
          specify { response.should redirect_to(localize_path(signin_path)) }
        end

        describe "visiting the user index" do
          before { visit users_path }
          it { should have_selector('span', text: t2('Login')) }
        end

        describe "visiting the following page" do
          before { visit following_user_path(user) }
          it { should have_selector('span', text: t2('Login')) }

        end

        describe "visiting the followers page" do
          before { visit followers_user_path(user) }
          it { should have_selector('span', text: t2('Login')) }

        end
      end
    end

    describe "in the Microposts controller" do

      describe "submitting to the create action" do
        before { post microposts_path }
        specify { response.should redirect_to(localize_path(signin_path)) }
      end

      describe "submitting to the destroy action" do
        before { delete micropost_path(FactoryGirl.create(:micropost)) }
        specify { response.should redirect_to(localize_path(signin_path)) }
      end
    end

    describe "in the Relationships controller" do

      describe "submitting to the create action" do
        before { post relationships_path }
        specify { response.should redirect_to(localize_path(signin_path)) }
      end

      describe "submitting to the destroy action" do
        before { delete relationship_path(1) }
        specify { response.should redirect_to(localize_path(signin_path)) }
      end
    end

    describe "as wrong user" do
      let(:user) { FactoryGirl.create(:user) }
      let(:wrong_user) { FactoryGirl.create(:user, email: "wrong@example.com") }
      before { sign_in user }

      describe "visiting Users#edit page" do
        before { visit edit_user_path(wrong_user) }
        it { should_not have_selector('title', text: 'Edit user') }
      end

      describe "submitting a PUT request to the Users#update action" do
        before { put user_path(wrong_user) }
        specify { response.should redirect_to(localize_path(root_path)) }
      end
    end

    describe "as non-admin user" do
      let(:user) { FactoryGirl.create(:user) }
      let(:non_admin) { FactoryGirl.create(:user) }

      before { sign_in non_admin }

      describe "submitting a DELETE request to the Users#destroy action" do
        before { delete user_path(user) }
        specify { response.should redirect_to(localize_path(root_path)) }
      end
    end
  end
end
