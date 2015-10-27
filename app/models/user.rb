class User < ActiveRecord::Base
  has_and_belongs_to_many :stores
  has_many :comments
  has_many :posts
  has_many :upvotes

  has_secure_password

end
