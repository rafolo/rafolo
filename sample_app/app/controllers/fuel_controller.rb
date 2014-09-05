class FuelController < ApplicationController
  has_menu2 "Fuel", "/fuel/index/#", :enabled => true, :icon => 'icon-dashboard', :order => 70
  def index
  end
end
