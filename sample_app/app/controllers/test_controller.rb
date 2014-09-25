class TestController < ApplicationController
  has_menu2 "Tests", "/test/index/#/test", :enabled => true, :icon => 'icon-legal', :order => 100
  def index
  end
end
