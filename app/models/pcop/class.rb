class Pcop::Class < ApplicationRecord
  has_many :accounts, class_name: 'Pcop::Account', foreign_key: 'pcop_class_id'
end
