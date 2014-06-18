class DashboardController < ApplicationController
  has_menu2 "Dashboard", "/dashboard.html", :enabled => true

  def index
  end
end
