class CreatePcopRubrics < ActiveRecord::Migration[5.2]
  def change
    create_table :pcop_rubrics do |t|
      t.string :name
      t.text :description
      t.text :eligible_transactions
      t.references :pcop_sub_account, foreign_key: true

      t.timestamps
    end
    add_index :pcop_rubrics, :name, unique: true
  end
end
