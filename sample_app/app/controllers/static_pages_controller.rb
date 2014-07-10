class StaticPagesController < ApplicationController
  layout 'coreadminblank'

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

    #TODO! remove after TDD Works
    if signed_in?
      @micropost2 = current_user.microposts.build
    end

    render :layout => "application"


  end


  def lookups
    @rooms = Room.all
    @tracks = Track.all
    @time_slots = TimeSlot.all
  end

end
