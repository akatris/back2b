class Establishment < ApplicationRecord
  belongs_to :supply
  has_many :user
  validates   :name, presence: true, length: { maximum: 255 }
end
