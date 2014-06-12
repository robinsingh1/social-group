Parse.initialize("N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ", "faJHtVc1CZNRuGjznDmsRs0UbqaktQbNKosKTbIo");

/*
 *
 * User
 * Activity
 * Comment
 * Like
 * Neighborhood
 * Post
 *
 */

var userModel      = Parse.Object.extend({ className: "User" });
var activityModel  = Parse.Object.extend({ className: "Activity" });
var commentModel   = Parse.Object.extend({ className: "Comment" });
var likeModel      = Parse.Object.extend({ className: "Like" });
var postpostModel      = Parse.Object.extend("Post");

var userCollection     = Parse.Collection.extend({ model: userModel });
var activityCollection = Parse.Collection.extend({ model: activityModel });
var commentCollection  = Parse.Collection.extend({ model: commentModel });
var likeCollection     = Parse.Collection.extend({ model: likeModel });
var postpostCollection     = Parse.Collection.extend({ model: postpostModel });

var users      = new userCollection();
var activities = new activityCollection();
var comments   = new commentCollection();
var likes      = new likeCollection();
var postpost = new postpostCollection();

// Get the Activity Feed for signed inu user
// Get the Posts and Comments

var query = new Parse.Query(Parse.User)
query.equalTo("objectId", "jUsWCmqnbH")
query.find({
  success: function(u){ 
    user = u
  }
});
/*
var query = new Parse.Query(Parse.Object.extend('Posts'))
query.find({
  success: function(p){ 
    the_posts = p
  }, error: function(error){
    console.log('error')
  }
});
*/



/*
var query = new Parse.Query(postModel);
query.find({
  success: function(posts){
    console.log('success')
    console.log(posts)
  }, 
  error: function(error){
    console.log('error' + error.code + " " + error.message)
  }
})
*/

/*
posts.fetch().then(function(p){
  console.log(p)
  console.log('lmao')
})
*/

//
// Activity Feed
// ----------------
// The most recent posts that belong to a neighborhood
// Get all the posts and then get all their comments
//







