class Establishment < ApplicationRecord
  belongs_to  :supply
  has_many    :user
  has_many    :season
  validates   :name, presence: true, length: { maximum: 255 }
end
