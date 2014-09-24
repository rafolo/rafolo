
  class ApplicationController < ActionController::Base
    protect_from_forgery
    include SessionsHelper
    include LocalizationHelper
    include MenuHelper

    before_filter :set_locale

    #RK Locale
    private

    def set_locale
      I18n.locale = params[:locale] || SampleApp::Application.config.i18n.default_locale
      # current_user.locale
      # request.subdomain
      # request.env["HTTP_ACCEPT_LANGUAGE"]
      # request.remote_ip
    end

    def default_url_options(options = {})
      {locale: I18n.locale}
    end

    # TODO! Add Authorisations for JSON and others
    # before_filter :auth, :except => [:home, :new, :create]

    # def auth
    #   if !signed_in?
    #     respond_to do |format|
    #       format.json { render :json => [], :status => :unauthorized }
    #       format.html { redirect_to root_path}
    #     end
    #     return false
    #   end
    # end

  end
