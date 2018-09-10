class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.column :username, :string, {limit: 32}
      t.column :email, :string, {null: true}
      t.string :password_digest

      t.timestamps
    end
  end
end
