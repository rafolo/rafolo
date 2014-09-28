require 'extensions/menu/menu_extension.rb'

module MenuHelper
 include MenuExtension

  def MenuHelper.left_menu
    Rails.application.eager_load!
    return MenuExtension.get_menuable ApplicationController.descendants
  end

  def item_css_selected(item, css_class)
    path = ([params[:controller], params[:action]] * '/').downcase

    if url_contains(item.link, path, item.icon) || item.children.any? {|child| url_contains(child.link, path, child.icon)}
      css_class
    else
      nil
    end
  end

  private
  def item_selected(item, path, icon)
    if url_contains(item.link, path, icon)
      provide(:selected_menu_icon, icon)
      true
    else
      item.children.any? {|child|
        url_contains(child.link, path, child.icon)
      }
    end
  end
  def url_contains(url, path, icon)
    if(url.downcase.include?(path.downcase))
      content_for_set(:selected_menu_icon, icon)
      true
    else
      false
    end
  end

end
