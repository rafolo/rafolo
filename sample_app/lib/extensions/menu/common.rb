module Common

  module ClassMethods
    def say_hi23
      puts "hi"
    end
  end

  extend ClassMethods
  def self.included( other )
    other.extend( ClassMethods )
  end

end