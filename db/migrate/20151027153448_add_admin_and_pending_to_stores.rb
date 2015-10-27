class AddAdminAndPendingToStores < ActiveRecord::Migration
  def change
    add_reference :stores, :user, index: true, foreign_key: true
    add_column :stores, :pending_approval, :boolean
  end
end
