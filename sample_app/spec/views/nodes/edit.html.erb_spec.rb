require 'spec_helper'

describe 'nodes/edit' do
  require 'spec_helper'

  before(:each) do
    @node = assign(:nodes, stub_model(Node,
                                     :name => 'MyString',
                                     :description => 'MyString'
                        ))
  end

  it 'renders the edit node form' do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select 'h1', :text => t2('node.editing')
    assert_select 'form', :action => alarms_path(@node), :method => 'post' do
      assert_select 'label[for=node_name]', :text => t2('activerecord.attributes.node.name')
      assert_select 'input#node_name', :name => 'node[name]'
      assert_select 'label[for=node_description]', :text => t2('activerecord.attributes.node.description')
      assert_select 'input#node_description', :name => 'node[description]'
      assert_select 'input[type=submit]', :value => t2('helpers.submit.node.update')
    end

    assert_select "a[href=#{node_path(@node)}]", :text => t2('Show')
    assert_select "a[href=#{nodes_path}]", :text => t2('Back')
  end
end
