class CreateSupplies < ActiveRecord::Migration[5.2]
  def change
    create_table :supplies do |t|
      t.decimal :available, precision: 12, scale: 2

      t.timestamps
    end
  end
end
