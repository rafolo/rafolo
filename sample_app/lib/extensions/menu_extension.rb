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

    #enabled
    if (options.has_key?(:enabled))
      #raise ('Method: enabled already definied in ' + self.class.to_s) if self.respond_to? :enabled?
      self.class_eval("def self.enabled?; #{options[:enabled]}; end")
    end

    #children
    children = options.reject { |key, value| key == :enabled }

    body = "result = []; "
    if !children.empty?
      children.each { |key, value| body+= "result << MenuItem.new('#{key}', '#{value}'); " }
    end

    self.class_eval("def self.child;" + body + ";" + "end;")

  end
end