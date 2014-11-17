require 'spec_helper'

describe Node do

  it { should respond_to(:name)}
  it { should respond_to(:description)}
  it { should respond_to(:users)}

  describe 'when name is not present' do
    before { subject.name = '' }
    it { should_not be_valid }
  end

  describe 'when name is too long' do
    before { subject.name = 'a' * 51 }
    it { should_not be_valid }
  end

  describe 'when description is not present' do
    before { subject.description = '' }
    it { should_not be_valid }
  end

  describe 'when description is too long' do
    before { subject.description = 'a' * 256 }
    it { should_not be_valid }
  end

  describe 'users associations' do
    let(:user) { FactoryGirl.create(:user)}

    before do
      @new_node = FactoryGirl.create(:node, users: [user])
    end

    it 'should have associated users' do
      found_node = Node.find @new_node.id
      found_node.should_not be_nil
      found_node.users[0].should eq user
    end
  end


end
