require 'extensions/menu_extension.rb'

class AlarmController < ApplicationController
  has_menu "Alarms", "test", :enabled => true

  def index
  end
end
