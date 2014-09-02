require 'extensions/menu/menu_extension.rb'

module MenuHelper
 include MenuExtension

  def MenuHelper.left_menu
    Rails.application.eager_load!
    return MenuExtension.get_menuable ApplicationController.descendants
  end

  def item_css_selected(item, css_class)
    path = ([params[:controller], params[:action]] * '/').downcase

    if url_contains(item.link, path) || item.children.any? {|child| url_contains(child.link, path)}
      css_class
    else
      nil
    end
end

  private
  def url_contains(url, path)
    url.downcase.include?(path.downcase)
  end

end
