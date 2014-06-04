module MenuExtension
  class MenuItem

    attr_accessor :name, :child, :link

    def initialize n, l
      @name = n
      @link = l

      @child = []
    end

  end

  public

  def get_menuable classes=[]
    result = []
    classes.each do |c|
      name = c.to_s.gsub(/Controller/, '')
      if (c.respond_to? :menuable)
        if (c.enabled?)
          mi = MenuItem.new(c.title, c.link)
          c.child.each { |i| mi.child << i }
          result << mi
        end
      end
    end

  end

    return result
  end