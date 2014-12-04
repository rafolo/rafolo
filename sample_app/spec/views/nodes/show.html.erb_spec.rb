require 'spec_helper'

describe 'nodes/show' do
  before(:each) do
    @node = assign(:nodes, stub_model(Node,
      :name => 'Name1',
      :description => 'Description1'
    ))
  end

  it 'renders attributes in <p>' do
    render

    assert_select 'b', :text => t2('Name')
    assert_select 'b', :text => t2('Description')
    rendered.should match(/Name1/)
    rendered.should match(/Description1/)
    assert_select "a[href=#{edit_node_path(@node)}]", :text => t2('Edit')
    assert_select "a[href=#{nodes_path}]", :text => t2('Back')
  end
end
