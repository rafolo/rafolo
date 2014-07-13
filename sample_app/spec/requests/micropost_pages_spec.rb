require 'spec_helper'

describe "Micropost pages" do

  subject { page }

  let(:user) { FactoryGirl.create(:user) }

  before { sign_in user

  # user = User.create!("email" => "rafal@pkey.pl", "name" => "Rafal", "password" => "123456", "password_confirmation" => "123456")
  # User.create!("email" => "olgierd.falat@gmail.com", "name" => "Olgierd", "password" => "123456", "password_confirmation" => "123456")
  #
  # (1..3).each do |i|
  #   user.microposts << Micropost.create(:content => "micropost#{i}")
  # end


  }

  describe "micropost creation" do
    before { visit root_path }

    describe "with invalid information" do
      
      it "should not create a micropost" do
        expect { click_button "Post" }.not_to change(Micropost, :count)
      end

      describe "error messages" do
        before { click_button "Post" }
        it { should have_content('error') }
      end
    end
  end
  
  describe "micropost destruction" do
    before { FactoryGirl.create(:micropost, user: user) }

    #TODO! resolve FactoryGirl error
    # describe "as correct user" do
    #   before { visit root_path }
    #
    #   it "should delete a micropost" do
    #     expect { click_button "delete" }.should change(Micropost, :count).by(-1)
    #   end
    # end
    pending "Resolve/Update FactoryGirl"
  end
end
