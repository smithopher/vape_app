class FavoriteStores < ActiveRecord::Migration
  def change
    create_table :favorite_stores, id: false do |t|
      t.references :user, index: true, foreign_key: true
      t.references :store, index: true, foreign_key: true
    end
  end
end
