class CommentsController < ApplicationController
  has_menu2 "Comments", "/comments/index/#", :enabled => true, :icon => 'icon-comments', :order => 50
  def index
  end
end
