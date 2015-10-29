class CreateStatuses < ActiveRecord::Migration
  def change
    create_table :statuses do |t|
      t.references :user, index: true, foreign_key: true
      t.string :article

      t.timestamps null: false
    end
  end
end
