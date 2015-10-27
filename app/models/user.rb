class User < ActiveRecord::Base
  has_and_belongs_to_many :stores
  has_many :comments, :posts, :upvotes

  has_secure_password

end
