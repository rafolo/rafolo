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
    assert_select 'form', :action => alarms_path(@node), :method => 'post' do
      assert_select 'input#node_name', :name => 'node[name]'
      assert_select 'input#node_description', :name => 'node[description]'
    end
  end
end
