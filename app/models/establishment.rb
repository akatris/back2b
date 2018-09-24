class Establishment < ApplicationRecord
  belongs_to :supply
  has_many :user
end
