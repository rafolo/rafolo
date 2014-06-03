require 'extensions/menu_extension.rb'

class AlarmController < ApplicationController
  has_menu "Test", "test", :enabled => true

  def index
  end
end
