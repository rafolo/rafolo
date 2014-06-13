class AlarmController < ApplicationController
  has_menu2 "Alarms", "/alarm/index#alarm", :enabled => true

  def index
  end
end
