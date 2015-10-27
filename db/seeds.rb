# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create({first_name: 'christopher', last_name: 'smith', email: 'email@gmail.com', password: 'password', user_type: 'admin'});
User.create({first_name: 'jaden', last_name: 'carver', email: 'someemail@gmail.com', password: 'password', user_type: 'admin'});
User.create({first_name: 'edward', last_name: 'petner', email: 'fuckyourface@gmail.com', password: 'password', user_type: 'admin'});
User.create({first_name: 'dennis', last_name: 'liaw', email: 'dennis@ga.co', password: 'password', user_type: 'standard'});
User.create({first_name: 'pan', last_name: 'wangperawong', email: 'datemail@gmail.com', password: 'password', user_type: 'standard'});
User.create({first_name: 'bobby', last_name: 'king', email: 'myemail@gmail.com', password: 'password', user_type: 'standard'});

Store.create({name: '9 South Vapes', location: 'Galloway, NJ', opens_at: '10am', closes_at: '8pm', user_id: '2', pending_approval: false});
Store.create({name: 'Beyond Vape', location: '31st St & 7th Ave, New York, NY', opens_at: '11am', closes_at: '10pm', user_id: '2', pending_approval: false});

Post.create({title: '9 South is awesome', post_type: 'standard', content: 'refer to title', user_id: '2'});
Post.create({title: 'That juice though...', post_type: 'standard', content: 'blahhhh', user_id: '2'});
