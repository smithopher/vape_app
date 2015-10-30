class User < ActiveRecord::Base
  has_and_belongs_to_many :stores
  has_many :comments
  has_many :posts
  has_many :upvotes

  has_secure_password

  def self.search(search)
    @split_search = search.split(' ')
    @search_fname = @split_search.first
    @search_lname = @split_search.last
    where("first_name ILIKE ?", "%#{@search_fname}%")
    where("last_name ILIKE ?", "%#{@search_lname}%")
  end

end
