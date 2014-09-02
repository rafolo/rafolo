require 'spec_helper'

describe 'Menu Helper' do
  include MenuHelper

  it 'has two menus'  do

    items = MenuHelper.left_menu
    items.empty?.should == false
  end

  it "should highlight item" do
    helper.params[:controller] = "alarm"
    helper.params[:action] = "index"

    item = MenuHelper.left_menu.find {|i| i.title == "Alarms"}
    item_css_selected(item, "active").should == "active"
  end

  it "should not not highlight item" do
    helper.params[:controller] = "alarm"
    helper.params[:action] = "index"

    item = MenuHelper.left_menu.find {|i| i.title == "Payments"}
    item_css_selected(item, "active").should == nil
  end


  it "should highlight parent and child items" do
    helper.params[:controller] = "map_point"
    helper.params[:action] = "route"

    item = MenuHelper.left_menu.find {|i| i.title == "Maps"}
    item_css_selected(item, "li").should == "li"

    child = item.children.find {|i| i.title == "Routes"}

    item_css_selected(child, "active").should == "active"
  end

  it "should not highlight child items" do
    helper.params[:controller] = "map_point"
    helper.params[:action] = "home"

    item = MenuHelper.left_menu.find {|i| i.title == "Maps"}
    child = item.children.each {|i| item_css_selected(i, "active").should == nil}
  end


end