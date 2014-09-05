
require File.expand_path('../menu_module.rb', __FILE__)

module MenuExtension
  public

  def MenuExtension.get_menuable classes=[]
    result = []
    classes.each do |c|
      if (c.respond_to? :menuable)
        mi = Menu::MenuItem.new(c.title, c.link, c.enabled?, c.icon, c.order)
        c.children.each { |i| mi.children << i }
        c.children.sort_by! { |i| [i.order, i.title]}
        result << mi

      end
    end

    return result.sort_by!{ |i| [i.order, i.title]}
  end
end