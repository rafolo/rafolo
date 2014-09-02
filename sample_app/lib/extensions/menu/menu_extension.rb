
require File.expand_path('../menu_module.rb', __FILE__)

module MenuExtension
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