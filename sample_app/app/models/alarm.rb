class Alarm < ActiveRecord::Base
  attr_accessible :active, :born, :description, :name
end
