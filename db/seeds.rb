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

Post.create({title: '9 South is awesome', post_type: 'standard', content: 'refer to title', user_id: '2'});
Post.create({title: 'That juice though...', post_type: 'standard', content: 'blahhhh', user_id: '2'});
Post.create({title: "so what's the deal with vg/pg ratio?", post_type: 'standard', content: "i keep hearing about vg and pg but I don't really know what that means, anybody want to help me out with that?", user_id: '3'});
Post.create({title: "variable voltage box vs mech mod?", post_type: 'standard', content: "I'm thinking about getting a new mod but I'm not sure which direction I want to go in. I can build coils, so I COULD go with a mech mod, just not sure whether I really want to. anybody have any input?", user_id: '2'});
Post.create({title: "you silly vapers...", post_type: 'standard', content: "always chillin outside blowin clouds around", user_id: '6'});
Post.create({title: "I don't know what to write here", post_type: "standard", content: "but I really need to seed the database with something", user_id: "5"})
