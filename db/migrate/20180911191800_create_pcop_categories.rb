class CreatePcopCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :pcop_categories do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
    add_index :pcop_categories, :name, unique: true
  end
end
