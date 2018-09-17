# TODO: Improve id validation
class Pcop::Account < ApplicationRecord
  belongs_to      :pcop_category, foreign_key: 'pcop_category_id',
                  optional: true
  has_many        :sub_accounts, class_name: 'Pcop::SubAccount',
                  foreign_key: 'pcop_account_id', inverse_of: 'pcop_account'
  validates       :id, presence: true, format: { with: /\A[\d]{2}\z/ },
                  uniqueness: true
  validates       :name, length: { maximum: 255 }, presence: true
  validates       :description, length: { maximum: 255 }
end
