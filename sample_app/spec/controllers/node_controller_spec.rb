require 'spec_helper'

describe NodeController do
  let(:user) { FactoryGirl.create(:user) }
  let(:admin) { FactoryGirl.create(:admin) }
  let!(:user_node) { FactoryGirl.create(:node, users: [user]) }
  let!(:admin_node) { FactoryGirl.create(:node, users: [admin]) }

  describe 'as regular user' do
    before do
      controller.stub(current_user: user)
      @updated_node = {:name => 'Name updated', :description => 'Description updated'}
    end

    describe "GET 'index'" do
      it 'should return not authorized' do
        get 'index'
        response.status.should be 401
      end
    end

    describe "GET 'new'" do
      it 'should return not authorized' do
        get 'new'
        response.status.should be 401
      end
    end

    describe "PUT 'update/:id'" do
      it 'should return not authorized' do

        put :update, id: user_node.id, node: @updated_node
        response.status.should be 401
      end
    end

    describe 'DELETE destroy' do
      it 'should return not authorized' do
        delete :destroy, id: user_node.id
        response.status.should be 401
      end
    end
  end

  describe 'as an admin user' do
    before do
      controller.stub(current_user: admin)
      @updated_node = {:name => 'Name updated', :description => 'Description updated'}
    end

    describe "GET 'index'" do
      it 'should return OK' do
        get 'index'
        response.status.should be 200
        response.should render_template('index')
      end
    end

    describe "GET 'new'" do
      it 'should return OK' do
        get 'new'
        response.status.should be 200
      end
    end

    describe "PUT 'update/:id'" do
      it 'should return OK' do
        put :update, id: admin_node.id, node: @updated_node
        response.should redirect_to admin_node
        admin_node.reload
        admin_node.name.should == @updated_node[:name]
        admin_node.description.should == @updated_node[:description]
      end
    end

    describe 'DELETE destroy' do
      it 'should delete node and redirect to node index' do
        expect {
          delete :destroy, id: admin_node.to_param
        }.should change(Node, :count).by(-1)
        response.should redirect_to node_path
      end
    end
  end
end
