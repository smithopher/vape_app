class Post < ActiveRecord::Base
  belongs_to :user_id
  belongs_to :store_id
  has_many :upvotes
end