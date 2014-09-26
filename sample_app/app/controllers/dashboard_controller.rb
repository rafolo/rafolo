class DashboardController < ApplicationController
  has_menu2 "Dashboard", "/dashboard", :enabled => true, :icon => 'icon-dashboard', :order => 0

  def index
  end
end
