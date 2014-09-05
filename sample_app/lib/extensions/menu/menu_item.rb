module Menu

  class MenuItem

    attr_accessor :title, :children, :link, :enabled, :icon, :order

    def initialize t, l, e, i, o = 1000000
      @title = t
      @link = l
      @enabled = e
      @icon = i
      @order = o
      @children = []
    end

  end

end