class Pcop::Rubric < ApplicationRecord
  belongs_to  :pcop_sub_account, foreign_key: 'pcop_sub_account_id',
              optional: true
  validates   :id, format: { with: /\A[1-7][\d]{3}\z/ }, uniqueness: true
  validates   :name, presence: true, length: { maximum: 255 }
  validates   :description, length: { maximum: 500 }
  validates   :eligible_transactions, length: { maximum: 500 }
end
