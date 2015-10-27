class FavoriteStores < ActiveRecord::Migration
  def change
    create_table :favorite_stores, id: false do |t|
      t.belongs_to :user, index: true
      t.belongs_to :store, index: true
    end
  end
end
