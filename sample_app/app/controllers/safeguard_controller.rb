class SafeguardController < ApplicationController
  has_menu2 "Safeguard", "/safeguard/index/#", :enabled => true, :icon => 'icon-lock', :order => 40
  def index
  end
end
