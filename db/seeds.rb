# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create({first_name: 'christopher', last_name: 'smith', email: 'smithopher87@gmail.com', password: 'password', user_type: 'standard'});
User.create({first_name: 'jaden', last_name: 'carver', email: 'jaden@ga.co', password: 'password',user_type: 'standard'});
User.create({first_name: 'dennis', last_name: 'liaw', email: 'dennis@ga.co', password: 'password', user_type: 'standard'});
User.create({first_name: 'edward', last_name: 'petner', email: 'eddiep@gmail.com', password: 'password', user_type: 'standard'});
User.create({first_name: 'pan', last_name: 'wangperawong', email: 'panw@ga.co', password: 'password', user_type: 'standard'});

Post.create({title: "so what's the deal with vg/pg ratio?", post_type: 'standard', content: "i keep hearing about vg and pg but I don't really know what that means, anybody want to help me out with that?", user_id: '2'});
Post.create({title: "variable voltage box vs mech mod?", post_type: 'standard', content: "I'm thinking about getting a new mod but I'm not sure which direction I want to go in. I can build coils, so I COULD go with a mech mod, just not sure whether I really want to. anybody have any input?", user_id: '1'});
Post.create({title: "you silly vapers...", post_type: 'standard', content: "always chillin outside blowin clouds around", user_id: '5'});
Post.create({title: "I don't know what to write here", post_type: "standard", content: "but I really need to seed the database with something", user_id: "5"})
Post.create({title: "Where the hell can I find some damn Aeternus Resistance Zero Point One?!?!", post_type: 'standard', content: "I love that stuff and I haven't had any since August. Anyone know where I can find some before I freak out?", user_id: '2'})

Status.create({user_id: '1', article: 'spice trader'});
Status.create({user_id: '2', article: 'looper'});
Status.create({user_id: '3', article: 'pound cake'});
Status.create({user_id: '2', article: 'silk'});
Status.create({user_id: '3', article: 'i love donuts'});
Status.create({user_id: '1', article: 'milk man'});

Comment.create({content: "it has to do with the viscosity of the juice. vegetable glycerin, or vg, is the thicker component and it is naturally the sweeter of the two main components and produces the clouds. propolene glycol, or pg, is thinner and is a more inherently bitter than vg, but the flavor is suspended in the pg. now what does that mean? well, if you use a tank, most tanks (even sub-ohm tanks) can't run juice much thicker than 80-20 without drying out and giving you a nasty dry hit. if you have a tank, you generally want to find the mixture that you can vape without ruining your atomizer while decreasing the amount of pg as much as possible, especially if you're sensitive to the flavor of pg (as I am). Keep in mind, usually only up to 10% of your juice is actual flavoring, so if you are vaping 60/40, 30% of your juice is just plain old pg put in there to water the juice down so your atomizer can soak it up faster to prevent dry hits. If you use a drip atomizer, you could vape 100% VG, though you won't be getting any flavor (some people claim that they have flavored 100% vg juices, but I don't believe them). generally speaking, if you drip, 90/10 is ideal, you will get ridiculous clouds but still have the 10% flavor.", user_id: '1', post_id: '1'});
Comment.create({content: 'but it is a glorious experience, Pan.', user_id: '3', post_id: '3'});
Comment.create({content: 'thanks! that helps so much!', user_id: '2', post_id: '1'});
