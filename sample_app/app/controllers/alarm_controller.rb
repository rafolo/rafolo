class AlarmController < ApplicationController
  has_menu2 "Alarms", "/alarm/index/#/alarm", :enabled => true, :icon => 'icon-bell-alt', :order => 10

  def index
  end
end
