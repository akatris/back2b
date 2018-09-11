class CreatePcopClasses < ActiveRecord::Migration[5.2]
  def change
    create_table :pcop_classes do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
    add_index :pcop_classes, :name, unique: true
  end
end
