require 'extensions/menu/menu_class.rb'

class AlarmController < ApplicationController
  has_menu "Alarms", "test", :enabled => true

  def index
  end
end
