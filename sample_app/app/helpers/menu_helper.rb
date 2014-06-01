module MenuHelper

  def left_menu

    result = {}

    Rails.application.eager_load!
    ApplicationController.descendants.each do |c|
      name = c.to_s.gsub(/Controller/, '')
      result.store(name, 'Link')
    end

    return result
  end
end
