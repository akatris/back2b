class Season < ApplicationRecord
  belongs_to  :establishment
  validates   :year, uniqueness: { scope: :establishment }, presence: true,
              format: { with: /\A2[\d]{3}\z/}
end
