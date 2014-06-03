module MenuHelper
  class MenuItem

    attr_accessor :name, :child, :link

    def initialize n, l
      @name = n
      @link = l

      @child = []
    end

  end
end
