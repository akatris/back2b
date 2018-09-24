class AddEstablishementToUser < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :establishment, index: {unique: true}, null: true
  end
end
