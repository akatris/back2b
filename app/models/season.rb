class Season < ApplicationRecord
  belongs_to :establishment
	validates :year, format: { with: /\A2[\d]{3}\z/ },
		uniqueness: { scope: :establishment }
end
