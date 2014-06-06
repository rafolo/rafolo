#require 'extensions/menu/menu_class.rb'
#require 'extensions/menu/menu_module.rb'

class MapPointController < ApplicationController

  #menu2
  #has_menu2 "Maps", "/credit_card/index", :enabled => true, "Points" => "/map_point/index", "History" => "/map_point/history"

  #menu
  #has_menu "Maps", "/credit_card/index", :enabled => true, "Points" => "/map_point/index", "History" => "/map_point/history"
  def self.enabled?
    true
  end

  def index
  end

  def history
  end
end
