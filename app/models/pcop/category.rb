class Pcop::Category < ApplicationRecord
  has_many  :accounts, class_name: 'Pcop::Account', foreign_key: 'pcop_category_id', inverse_of: 'pcop_category'
  validates :id, format: { with: /\A[1-7]{1}\z/ }, uniqueness: true
  validates :name, length: { maximum: 255 }, presence: true, uniqueness: true
  validates :description, length: { maximum: 255 }
end
