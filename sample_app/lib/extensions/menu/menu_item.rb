module Menu

  class MenuItem

    attr_accessor :title, :children, :link, :enabled

    def initialize t, l, e
      @title = t
      @link = l
      @enabled = e
      @children = []
    end

  end

end