require 'extensions/menu/menu_module.rb'

class AlarmController < ApplicationController
  has_menu2 "Alarms", "test", :enabled => true

  def index
  end
end
