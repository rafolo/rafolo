require 'active_support/concern'
require 'rails/configuration'

module Config
  extend ActiveSupport::Concern

  module ClassMethods
    cattr_accessor :refresh_autorefresh, :refresh_livejs, instance_accessor: false
  end


  class Rails::Application::Configuration
    include Config

  end
end