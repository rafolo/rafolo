require 'extensions/menu/menu_extension.rb'

module MenuHelper
 include MenuExtension

  def MenuHelper.left_menu
    Rails.application.eager_load!
    return MenuExtension.get_menuable ApplicationController.descendants
  end

end
