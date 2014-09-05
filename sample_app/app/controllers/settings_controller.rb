class SettingsController < ApplicationController
  has_menu2 "Settings", "/settings/index/#", :enabled => true, :icon => 'icon-cogs', :order => 90
  def index
  end
end
