# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Post.create({title: "so what's the deal with vg/pg ratio?", post_type: 'standard', content: "i keep hearing about vg and pg but I don't really know what that means, anybody want to help me out with that?", user_id: '3'});
Post.create({title: "variable voltage box vs mech mod?", post_type: 'standard', content: "I'm thinking about getting a new mod but I'm not sure which direction I want to go in. I can build coils, so I COULD go with a mech mod, just not sure whether I really want to. anybody have any input?", user_id: '2'});
Post.create({title: "you silly vapers...", post_type: 'standard', content: "always chillin outside blowin clouds around", user_id: '6'});
Post.create({title: "I don't know what to write here", post_type: "standard", content: "but I really need to seed the database with something", user_id: "5"})
Post.create({title: "Where the hell can I find some damn Aeternus Resistance Zero Point One?!?!", post_type: 'standard', content: "I love that stuff and I haven't had any since August. Anyone know where I can find some before I freak out?", user_id: '2'})

Status.create({user_id: '2', article: 'spice trader'});
Status.create({user_id: '3', article: 'looper'});
Status.create({user_id: '5', article: 'pound cake'});
Status.create({user_id: '3', article: 'silk'});
Status.create({user_id: '2', article: 'i love donuts'});
