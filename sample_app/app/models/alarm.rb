# == Schema Information
#
# Table name: alarms
#
#  id          :integer          not null, primary key
#  name        :string(255)
#  description :string(255)
#  born        :datetime
#  active      :boolean
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Alarm < ActiveRecord::Base
  attr_accessible :born, :description, :name, :active

  validates :name, :born, :presence => true

end
