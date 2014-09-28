class WorkshopController < ApplicationController
  has_menu2 "Tests", "/workshop/index/#/test", :enabled => true, :icon => 'icon-legal', :order => 100
  def index
  end
end
