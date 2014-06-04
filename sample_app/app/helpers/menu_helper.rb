require 'extensions/menu/menu_item.rb'

module MenuHelper
 include MenuExtension

  def left_menu
    Rails.application.eager_load!
    return get_menuable ApplicationController.descendants
  end

end
