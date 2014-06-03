module MenuHelper

  def left_menu

    Rails.application.eager_load!
    result = []
    ApplicationController.descendants.each do |c|
      name = c.to_s.gsub(/Controller/, '')
      if (c.respond_to? :menuable)
        if (c.enabled?)
          mi = MenuItem.new(c.title, c.link)
          c.child.each { |i| mi.child << i }
          result << mi
        end
      end
    end

    return result
  end
end
