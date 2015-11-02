class Post < ActiveRecord::Base
  belongs_to :user
  belongs_to :store
  has_many :upvotes
  has_many :comments
end
