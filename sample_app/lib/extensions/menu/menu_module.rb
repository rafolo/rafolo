require 'active_support/concern'
require 'action_controller'
require 'active_model/mass_assignment_security'

require File.expand_path '../menu_item.rb', __FILE__

module Menu
  extend ActiveSupport::Concern

  module ClassMethods

    def has_menu2 title, link, *args

      options = args.extract_options!

      cattr_accessor :title, :link, :menuable, :enabled, :children, :instance_writer => false, :instance_reader => false

      self.title = title
      self.link = link
      self.menuable = true;

      if options.has_key?(:enabled)
        self.enabled = options[:enabled]
      else
        self.enabled = self.enabled?
      end

      #children
      self.children = []
      items = options.reject { |key, value| key == :enabled || key == :cssclass }
      items.each { |key, value| self.children << MenuItem.new(key, value, true) }

    end

    def enabled?
      true
    end

  end

  def self.enabled?
    return false
  end

  class ActionController::Base
    include ActiveModel::MassAssignmentSecurity
    include Menu

  end
end