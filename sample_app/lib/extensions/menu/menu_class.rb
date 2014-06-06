# MenuExtension to create a menu list
# Usage:
#
#     class CreditCardController < ApplicationController
#       has_menu "Title1" "Link1" "SubTitle1" => "Link1", "SubTitle2" => "Link2"
#       def self.enabled
#         TRUE #Your logic here!
#       end
#
#       def index
#       end
#     end
#
# has_menu "Title1", :enabled => true, "SubTitle1" => "Link1", "SubTitle2" => "Link2"
# no  self.enabled method required
class Class

  def has_menu(name, link, options = {})
    #menuable
    self.class_eval("def self.menuable; true; end")

    #title
    self.class_eval("def self.title; '#{name}'; end")

    #link
    self.class_eval("def self.link; '#{link}'; end")

    #order
    if (options.has_key?(:order))
      self.class_eval("def self.order; #{options[:order]}; end")
    else
      self.class_eval("def self.order; 0; end")
    end

    #enabled
    if (options.has_key?(:enabled))
      #raise ('Method: enabled already defined in ' + self.class.to_s) if self.respond_to? :enabled?
      self.class_eval("def self.enabled?; #{options[:enabled]}; end")
    end

    #cssclass
    if (options.has_key?(:cssclass))
      self.class_eval("def self.cssclass; #{options[:cssclass]}; end")
    else
      self.class_eval("def self.cssclass; nil; end")
    end

    #children
    children = options.reject { |key, value| key == :enabled }
    children = children.reject { |key, value| key == :cssclass }

    body = "result = []; "
    if !children.empty?
      children.each { |key, value| body+= "result << MenuItem.new('#{key}', '#{value}'); " }
    end

    self.class_eval("def self.child;" + body + ";" + "end;")

  end
end

