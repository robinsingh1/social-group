/** @jsx React.DOM */

var ParsePost = React.createClass({
  getInitialState: function(){
    var postKeys = [], commentKeys = [], p = this.props.post;

    comments = (typeof p.comments == "undefined") ? [] : p.comments
    u = (typeof p.users_who_commented == "undefined") ? [] : p.users_who_commented

    return { comments   : comments, 
             users      : u,
             user_likes : p.user_likes,
    }
  },

  makeid: function() {
    var a = "", b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        a += b.charAt(Math.floor(Math.random() * b.length));
    return a;
  },

  addComment: function(blah, body){
    var comments = this.state.comments, users = this.state.users;
    console.log(comments)

    new_comment = {
      comment_author_id : "Robin Singh",
      comment_body : body,
      comment_date : new Date().getTime(),
      likes_link: "no_likes",
      key: this.makeid(),
      user_likes: []
    }

    new_user = { }
    if(body != "") {
      comments.push(new_comment); users.push(new_user);
      this.setState({comments: comments, users: users})
    }

    // Persist In Parse
    /*
    data = {
      body   : body,
      user : {
        "__type"    : "Pointer",
        "className" : "_User",
        "objectId"  : "5lgpbcsu6c", //Parse.User.current
      }, 
      from : {
        name : "Robin Singh"
      },
      message: body,
      post_created_at:moment().format('MMMM Do YYYY, h:mm:ss a'),
    }

    console.log(data)

    $.ajax({
      url: "https://api.parse.com/1/classes/Post",
      type: "POST",
      dataType: "JSON",
      contentType: "application/json",
      headers : {
        "X-Parse-Application-Id": "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
       "X-Parse-REST-API-Key": "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
      },
      data: JSON.stringify(data),
    });
    */
  },

  postComment: function(){
    input = $(this.getDOMNode()).find('textarea').focus()
  },

  postLike: function(e){
    user_likes = this.state.user_likes
    text = $(this.getDOMNode()).find('#postLike').text()
    if( text == 'Like'){
      $(this.getDOMNode()).find('#postLike').text('Unlike')
      user_likes.push({})
      this.setState({user_likes : user_likes})
    } else {
      $(this.getDOMNode()).find('#postLike').text('Like')
      user_likes.pop()
      this.setState({user_likes : user_likes })
    }

    // get the key of specific post and modify user_likes
    // 3 states
    // - No one likes
    // - 1 person likes
    //   - Current User
    //   - Other Person
    // - Multiple Likes
  },

  render: function(){
    var post = this.props.post
    comment = { backgroundColor : '#f5f5f5' }
    show_likes = ""

    comments = []
    for(i=0;i<this.state.comments.length;i++) {
      c = this.state.comments[i]
      user_likes = (typeof c.user_likes == "undefined") ? [] : c.user_likes
      comments.push(<Comment comment={this.state.comments[i]} 
                             user_likes = {user_likes}
                             key={this.makeid()}
                             commentLike={this.commentLike}
                             users={this.state.users[i]}/>)
    }

    console.log(post)

    if(typeof post.user_likes != "undefined")
      if(post.user_likes.length > 0)
        show_likes = <LikesAndSeens likes = {this.state.user_likes} />

    /* Display On Web Comments 
         {show_likes}
          <CreateComment addComment={this.addComment}/>
        <div className="panel-footer">
          <a href="#" className="btn btn-primary" style={{width:'48%'}}>
            <i className="fa fa-thumbs-up" />&nbsp;Like
          </a>
        <a href="#" className="btn btn-primary" style={{width:'50%',float:'right'}}>
          <i className="fa fa-comment" />&nbsp;Comment
        </a>
        </div>
    */

    profile_pic = "http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg"
    tstamp = post.post_created_at_timestamp
    tstamp = moment.unix(tstamp).format("MMMM Do [at] h:mm a")
    return (
      <div>
        <div className="panel panel-default">
          <PostAuthor date={tstamp} 
                      author={post.user} 
                      pic={profile_pic}/>
          <PostBody body={post.body} 
                    postComment={this.postComment}
                    postLike={this.postLike}/>
          <ul className="list-group">
            {show_likes}
            {comments}
            <CreateComment addComment={this.addComment}/>
          </ul>
        </div>
      </div>
    );
  }
});

var PostAuthor = React.createClass({
  render: function(){
    author = this.props.author
    if(typeof author == "undefined")
      author = {}

    author_name = author.first_name + " " + author.last_name
    return (
  <div className="panel-heading" style={{backgroundColor:'white',border:'0'}}>
    <div className="media" style={{height:'45px'}}>
      <a href="#" style={{padding:'0',width:'45px'}} className="pull-left thumbnail">
        <img src={this.props.pic} className="media-object"/>
      </a>
      <div className="media-body">
        <h5 className="media-heading" style={{display:'inline'}}>
        <a href="#">{author_name}</a>
        </h5>
        <br/>
        <span className="text-muted" style={{fontSize:'12px'}}>{this.props.date}</span>
      </div>
    </div>
  </div>
    );
  }
});

var PostBody = React.createClass({
  render: function(){
    image = this.props.image

  /*
    if(image.length == 0)
      the_image = ""
    else
      the_image = <img src={image[0]} style={{width:'100%'}}className="thumbnail" />
  */

  /*
   *
        <a href="#" style={{fontSize:'12px'}} onClick={this.postLike}>Like</a>
        &nbsp;
        &nbsp;
        <a href="#" style={{fontSize:'12px'}} onClick={this.postComment}>Comment</a>
        <a href="http://www.facebook.com" style={{textDecoration:'none',color:'black'}}>{this.props.body}</a>
  */
    return (
        <div className="panel-body" style={{paddingBottom:'10px'}}>
        {this.props.body}
        <div style={{paddingTop:'10px'}}>
        <a href="#" id="postLike" style={{fontSize:'12px'}} onClick={this.postLike}>Like</a>
        &nbsp;
        &nbsp;
        <a href="#" style={{fontSize:'12px'}} onClick={this.postComment}>Comment</a>
        </div>
        </div>
    );
  },

  postComment: function(e) {
    e.preventDefault()
    this.props.postComment()
  },

  postLike: function(e) {
    e.preventDefault()
    this.props.postLike()
  }
});

var LikesAndSeens = React.createClass({
  render: function(){
    likes = this.props.likes
    if(typeof likes == "undefined")
      likes = []
    return (
      <div>
        <li className="list-group-item" style={comment}>
          <h6 style={{display:'inline'}}> <a href="#" style={{fontSize:'13px'}}>
          <i className="fa fa-thumbs-up text-primary" />&nbsp; {likes.length} people</a>&nbsp; <span>like this.</span> </h6>

          <div style={{float:'right',display:'none'}}> <h6 style={{display:'inline'}}><a href="#" >
          <i className="fa fa-check text-primary" /> &nbsp; Seen by 29</a></h6>
          </div>
        </li>
      </div>
    );
  }
});

var CreateComment = React.createClass({
  componentDidMount: function(){
    $(this.getDOMNode()).find('textarea').autosize()
  },

  keyPress: function(e){
    if(e.keyCode == 13) {
      e.preventDefault()
      body = $(this.getDOMNode()).find('textarea').val()
      this.props.addComment(Date.now(), body)
      $(this.getDOMNode()).find('textarea').val('')
      $(this.getDOMNode()).find('textarea').focusout()
    }
  },

  render: function(){
    commentStyle = { backgroundColor : '#f5f5f5' }
    return (
      <li className="list-group-item" style={commentStyle}>
        <div className="media" >
          <a href="#" style={{marginBottom:'0px',padding:'0',width:'34px'}} className="pull-left thumbnail">
            <img src="https://pbs.twimg.com/profile_images/2103629538/twit.png" className="media-object" style={{borderRadius:'2px'}}/>
          </a>
          <div className="media-body" style={comment}>
            <form>
              <textarea type="text" className="form-control" 
                onKeyPress={this.keyPress}
                placeholder="Write a comment..."
                rows="1"
                style={{resize:'none'}} />
            </form>
          </div>
        </div>
      </li>
    );
  }
});


var NewSignup = React.createClass({
  render: function(){
    bg = {
      'background-image': 'linear-gradient(#1f2c65,#85bbcd)',
      'color': '#d6e2e9',
      'height': '110%',
      'marginTop':'-20px',
    }
    loginBtn = {
      'background': 'rgba(255,255,255,0.5)',
      'border': '0',
      'borderRadius': '3px',
      'display':'block',
      'marginRight':'auto',
      'marginLeft':'auto',
      'width': '75%'
    }
    return (
      <div style={bg}>
        <br/>
        <br/>
        <h1 style={{fontWeight:'800',textAlign:'center'}}className="pull-center">
          <i className="fa fa-home" />&nbsp; Nextdoor
        </h1>
        <br/> 
        <h5 style={{fontWeight:'300',fontSize:'16px',marginTop:'0px',textAlign:'center'}}>{'Keep up with your neighborhood stuff on the go!'}</h5>
        <br/> <br/> <br/> <br/>
        <br/> <br/>
        <br/> <br/>
        <a href="#" onClick={this.fbLogin} className="btn btn-primary btn-lg" style={loginBtn}> LOGIN</a>
      </div>
    );
  },
  componentDidMount: function(){
    Parse.FacebookUtils.init({
      appId      : '465891630221399', 
      //channelUrl : '//mypath/login_system/channel.html', 
      status     : true, 
      cookie     : true, 
      xfbml      : true,
      version    : 'v2.0'
    });
  },
  fbLogin: function(e){
    e.preventDefault()
    //console.log('fb login')
    Parse.FacebookUtils.logIn(null, {
      success: function(user) {
        if (!user.existed()) {
          alert("User signed up and logged in through Facebook!");
        } else {
          alert("User logged in through Facebook!");
        }
      },
      error: function(user, error) {
        alert("User cancelled the Facebook login or did not fully authorize.");
      }
    });
  }
});
