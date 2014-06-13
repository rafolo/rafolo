
class MapPointController < ApplicationController

  #menu2
  has_menu2 "Maps", "/credit_card/index", :enabled => true, "Points" => "/map_point/index/#/mappoint", "Routes" => "/map_point/route/#/maproute"

  def self.enabled?
    true
  end

  def index
  end

  def route
  end
end
