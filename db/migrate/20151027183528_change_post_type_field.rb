class ChangePostTypeField < ActiveRecord::Migration
  def change
    change_table :posts do |t|
      t.rename :type, :post_type
    end
  end
end
