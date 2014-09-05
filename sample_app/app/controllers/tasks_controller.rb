class TasksController < ApplicationController
  has_menu2 "Tasks", "/tasks/index/#", :enabled => true, :icon => 'icon-tasks', :order => 80
  def index
  end
end
