class WorksheetController < ApplicationController
  has_menu2 "Work sheet", "/worksheet/index/#", :enabled => true, :icon => 'icon-time', :order => 60
  def index
  end
end
