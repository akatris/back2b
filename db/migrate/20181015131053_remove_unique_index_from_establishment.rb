class RemoveUniqueIndexFromEstablishment < ActiveRecord::Migration[5.2]
  def change
    remove_index :establishments, :name
  end
end
