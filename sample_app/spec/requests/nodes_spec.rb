require 'spec_helper'

describe 'Nodes' do
  describe 'Node links' do
    describe 'as regular user' do
      let(:user) { FactoryGirl.create(:user) }
      before do
        sign_in user
      end
      it 'should not be visible' do
        visit root_path
        pending 'not implemented'
      end
    end

    describe 'as an admin user' do
      let(:admin) { FactoryGirl.create(:admin) }
      before do
        sign_in admin
      end
      it 'should be visible' do
        visit root_path
        pending 'not implemented'
      end
    end
  end
end
