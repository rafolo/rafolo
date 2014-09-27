require 'spec_helper'

describe "Static pages" do

  subject { page }

  describe "Home page" do
    before { visit root_path }
    
    it { should have_selector('h1', text: t2("WelcomeMessage")) }
    it { should have_selector('title', text: full_title('')) }  
    it { should_not have_selector('title', text: 'Dashboard') }

    describe "for signed-in users" do
      let(:user) { FactoryGirl.create(:user) }
      before do
        FactoryGirl.create(:micropost, user: user, content: "Lorem ipsum")
        FactoryGirl.create(:micropost, user: user, content: "Dolor sit amet")
        sign_in user
        visit root_path
      end

      it "should render the user's feed" do
        user.feed.each do |item|
          # TODO! Add better match
          # page.should have_selector("li##{item.id}", text: item.content)
          page.should have_content(item.content)
        end
      end

      describe "follower/following counts" do
        let(:other_user) { FactoryGirl.create(:user) }
        before do
          other_user.follow!(user)
          visit root_path
        end

        #TODO! VErif logic & delete
        # it { should have_link("0 following", href: localize_path(following_user_path(user)) ) }
        # it { should have_link("1 followers", href: localize_path(followers_user_path(user)) )}
         it { should have_link(user.name, href: localize_path(user_path(user)) )}

      end
    end
  end

  describe "Help page" do
    before { visit help_path }
    
    it { should have_selector('h1', text: t2('Help')) }
    it { should have_selector('title', text: full_title(t2('Help'))) }
  end

  describe "About page" do
    before { visit about_path }

    it { should have_selector('h1', text: t2('About Us')) }

    it { should have_selector('title', text: full_title(t2('About Us'))) }
  end

  describe "Contact page" do
    before { visit contact_path }
    
    it { should have_selector('h1', text: 'Contact') }
    it { should have_selector('title', text: full_title('Contact')) }     
  end

  it "should have the right links on the layouts" do
    visit root_path
    click_link t2("Sign in")
    page.should have_selector 'title', text: full_title(t2('Sign in'))

    #TODO! uncomment
    # click_link "About"
    # page.should have_selector 'title', text: full_title('About Us')
    click_link t2("Help")
    page.should have_selector 'title', text: full_title(t2('Help'))

    click_link t2("Home")
    click_link t2("Sign up now!")
    page.should have_selector 'span', text: full_title(t2('Sign up'))

    #puts page.html
    click_link "Vasabi" #TODO! to const
    page.should have_selector '.navbar-header', text: 'Vasabi'
  end
end
