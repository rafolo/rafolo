# == Schema Information
#
# Table name: nodes
#
#  id          :integer          not null, primary key
#  name        :string(255)
#  description :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Node < ActiveRecord::Base
  attr_accessible :description, :name

  has_and_belongs_to_many :users
  has_many :devices

  validates :name,  presence: true, length: { maximum: 50 }
  validates :description,  presence: true, length: { maximum: 255 }
end
