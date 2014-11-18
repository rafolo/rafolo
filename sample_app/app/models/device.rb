class Device < ActiveRecord::Base
  belongs_to :device_type
  belongs_to :node
  attr_accessible :description, :gid, :name
end
