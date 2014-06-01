class StaticPagesController < ApplicationController
  layout 'coreadminblank'

  def home

    if signed_in?
      @micropost = current_user.microposts.build
      @feed_items = current_user.feed.paginate(page: params[:page])
    end

    #redirect_to "/dashboard#"
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
end
