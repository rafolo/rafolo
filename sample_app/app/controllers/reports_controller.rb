class ReportsController < ApplicationController
  has_menu2 "Reports", "/reports/index/#", :enabled => true, :icon => 'icon-bar-chart', :order => 30
  def index
  end
end
