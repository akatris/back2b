class CreateBudgetItems < ActiveRecord::Migration[5.2]
  def change
    create_table :budget_items do |t|
      t.references :season, foreign_key: true
      t.references :pcop_rubric, foreign_key: true

      t.timestamps
    end
  end
end
