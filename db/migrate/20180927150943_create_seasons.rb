class CreateSeasons < ActiveRecord::Migration[5.2]
  def change
    create_table :seasons do |t|
      t.references :establishment, foreign_key: true
      t.string :year

      t.timestamps
    end
  end
end
