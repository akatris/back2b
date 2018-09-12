class Pcop::Account < ApplicationRecord
  belongs_to :pcop_class, foreign_key: 'class_id', optional: true
end
