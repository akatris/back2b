class Pcop::Account < ApplicationRecord
  belongs_to      :pcop_class, foreign_key: 'pcop_class_id', optional: true
  has_many        :sub_accounts, class_name: 'Pcop::SubAccount',
                  foreign_key: 'pcop_account_id'
end
