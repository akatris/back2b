class CreatePcopAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :pcop_accounts do |t|
      t.string :name
      t.string :description
      t.references :pcop_class, foreign_key: true

      t.timestamps
    end
    add_index :pcop_accounts, :name, unique: true
  end
end
