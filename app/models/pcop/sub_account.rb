class Pcop::SubAccount < ApplicationRecord
  belongs_to :pcop_account, foreign_key: 'pcop_account_id', optional: true
  validates  :id, format: { with: /\A[1-7][\d]{2}\z/ }
  validates  :name, uniqueness: true
end
