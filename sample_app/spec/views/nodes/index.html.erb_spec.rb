require 'spec_helper'

describe 'nodes/index' do
  before(:each) do
    @nodes = [
        stub_model(Node,
                   :name => 'Name',
                   :description => 'Description'
        ),
        stub_model(Node,
                   :name => 'Name',
                   :description => 'Description'
        )
    ]
    assign(:nodes, @nodes)
  end

  it 'renders a list of nodes' do
    render
    @node = @nodes[0]
    assert_select 'h1', :text => t2('node.listing')
    assert_select 'tr>th', :text => t2('Name')
    assert_select 'tr>th', :text => t2('Description')
    assert_select 'tr>td', :text => 'Name', :count => 2
    assert_select 'tr>td', :text => 'Description', :count => 2
    assert_select "a[href=#{node_path(@node)}]", :text => t2('Show')
    assert_select "a[href=#{edit_node_path(@node)}]", :text => t2('Edit')
    assert_select "a[href=#{node_path(@node)}]", :text => t2('Destroy')
    assert_select "a[data-confirm=#{t2("Are you sure?")}]", :text => t2('Destroy')

  end
end

