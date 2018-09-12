class Pcop::SubAccount < ApplicationRecord
  belongs_to :pcop_account, foreign_key: 'pcop_account_id', optional: true
end
