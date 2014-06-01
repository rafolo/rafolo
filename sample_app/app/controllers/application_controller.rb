
  class ApplicationController < ActionController::Base
    protect_from_forgery
    include SessionsHelper
    include LocalizationHelper
    include MenuHelper

    before_filter :set_locale

    #RK Locale
    private

    def set_locale
      I18n.locale = params[:locale] if params[:locale].present?
      # current_user.locale
      # request.subdomain
      # request.env["HTTP_ACCEPT_LANGUAGE"]
      # request.remote_ip
    end

    def default_url_options(options = {})
      {locale: I18n.locale}
    end
  end
