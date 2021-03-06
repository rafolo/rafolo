class MicropostsController < ApplicationController
  before_filter :signed_in_user
  before_filter :correct_user, only: :destroy

  def create
    @micropost2 = current_user.microposts.build(params[:micropost])
    if @micropost2.save
      flash[:success] = "Micropost created!"
      redirect_to root_path
    else
      @feed_items = []
      render 'static_pages/dashboard'
    end
  end

  def destroy
    @micropost.destroy
    redirect_to root_path
  end

  private

  def correct_user
    @micropost = current_user.microposts.find(params[:id])
    redirect_to root_path if @micropost.nil?
  end
end