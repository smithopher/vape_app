class CreateStores < ActiveRecord::Migration
  def change
    create_table :stores do |t|
      t.string :name
      t.string :location
      t.string :opens_at
      t.string :closes_at

      t.timestamps null: false
    end
  end
end
