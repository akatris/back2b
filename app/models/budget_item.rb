class BudgetItem < ApplicationRecord
  belongs_to  :season
  belongs_to  :pcop_rubric, class_name: 'Pcop::Rubric'
end
