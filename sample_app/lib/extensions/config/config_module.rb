require 'active_support/concern'
require "active_support/all"
require 'rails/configuration'

module Config
  extend ActiveSupport::Concern

  module ClassMethods
    cattr_accessor :refresh_autorefresh, :refresh_livejs,
                   :app_config, :show_examples,
                   instance_values: false

  end


  class Rails::Application::Configuration
    include Config

  end
end

