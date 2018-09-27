class Supply < ApplicationRecord
  has_one :establishment
  validates :available, presence: true, numericality: true
end
