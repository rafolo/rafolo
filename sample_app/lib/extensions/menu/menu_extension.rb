
require File.expand_path('../menu_module.rb', __FILE__)

module MenuExtension
  # class MenuItem
  #
  #   attr_accessor :name, :children, :link, :enabled
  #
  #   def initialize n, l, e
  #     @name = n
  #     @link = l
  #     @enabled = e
  #     @children = []
  #   end
  #
  # end

  public

  def MenuExtension.get_menuable classes=[]
    result = []
    classes.each do |c|
      if (c.respond_to? :menuable)
        mi = Menu::MenuItem.new(c.title, c.link, c.enabled?)
        c.children.each { |i| mi.children << i }
        result << mi

      end
    end

    return result
  end


end