class StaticPagesController < ApplicationController
  layout 'coreadminblank'

  #menuable :enabled => true, {"Test1" => "../Link1"}

  def home

    if signed_in?
      @micropost = current_user.microposts.build
      @feed_items = current_user.feed.paginate(page: params[:page])
      redirect_to :dashboard
    end

  end

  def help
  end

  def about
  end

  def contact
  end

  def dashboard
    render :layout => "application"
  end

  def metadata
    render json: METADATA
  end

  def lookups
    @rooms      = Room.all
    @tracks     = Track.all
    @time_slots = TimeSlot.all
  end

  ##RK CAB##
  def self.menuable
    true
  end

  def self.name
    "Maps"
  end

  def self.enabled
    TRUE
  end

  def self.child
    result = []
    #result << MenuItem.new("Test", "Link")
  end
  ##CAB

end
