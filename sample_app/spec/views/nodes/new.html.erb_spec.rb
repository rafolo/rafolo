require 'spec_helper'

describe 'nodes/new' do
  before(:each) do
    assign(:node, stub_model(Node,
                              :name => 'MyString',
                              :description => 'MyString'
                 ).as_new_record)
  end

  it 'renders new node form' do
    render

    assert_select 'h1', :text => t2('node.new')
    assert_select 'form', :action => nodes_path, :method => 'post' do
      assert_select 'input#node_name', :name => 'node[name]'
      assert_select 'input#node_description', :name => 'node[description]'
      assert_select 'input[type=submit]', :value => t2('helpers.submit.node.create')
    end

    assert_select "a[href=#{nodes_path}]", :text => t2('Back')
  end
end
