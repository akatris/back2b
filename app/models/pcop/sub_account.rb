class Pcop::SubAccount < ApplicationRecord
  belongs_to  :pcop_account, foreign_key: 'pcop_account_id', optional: true
  has_many    :rubrics, class_name: 'Pcop::Rubric',
              foreign_key: 'pcop_sub_account_id',
              inverse_of: 'pcop_sub_account', dependent: :destroy
  validates   :id, format: { with: /\A[1-7][\d]{2}\z/ }, uniqueness: true
  validates   :name, presence: true, length: { maximum: 255 }
  validates   :description, length: { maximum: 500 }
end
