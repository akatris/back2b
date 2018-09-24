class CreateEstablishments < ActiveRecord::Migration[5.2]
  def change
    create_table :establishments do |t|
      t.string :name, limit: 255
      t.belongs_to :supply, index: { unique: true }

      t.timestamps
    end
    add_index :establishments, :name, unique: true
  end
end
