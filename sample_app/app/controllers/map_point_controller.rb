class MapPointController < ApplicationController

  #menu2
  has_menu2 "Localisation", "/map_point/index",
            :enabled => true, :icon => 'icon-home', :order => 10,
            :children => [ MenuItem.new('Points', '/map_point/index/#/mappoint', true, 'icon-road', 1),
                           MenuItem.new('Routes', '/map_point/route/#/maproute', true, 'icon-truck', 1)
            ]

  def self.enabled?
    true
  end

  def index
  end

  def route
  end
end
