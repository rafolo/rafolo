require 'active_support/concern'
require 'action_controller'
require 'active_model/mass_assignment_security'

module Menu
  extend ActiveSupport::Concern

  class MenuItem

    attr_accessor :name, :child, :link

    def initialize n, l
      @name = n
      @link = l

      @child = []
    end

  end


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
      items.each { |key, value| self.children << MenuItem.new(key, value) }

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