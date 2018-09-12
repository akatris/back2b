class CreatePcopSubAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :pcop_sub_accounts do |t|
      t.string :name
      t.string :description
      t.references :pcop_account, foreign_key: true

      t.timestamps
    end
    add_index :pcop_sub_accounts, :name, unique: true
  end
end
