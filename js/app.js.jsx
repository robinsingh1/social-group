/** @jsx React.DOM */

//TODO
//- make lists CRUD work
//- make subfields work ie click and more details appear underneath
//- make profile and www links work
//- make click on cloud say feature under construction
//- make delete work
//- make download as csv work
//- make dropdown choose between lists work

var NavBar = React.createClass({
  render: function() {
            /* 
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-bell" /> &nbsp;<span className="badge">0</span></a>
            <ul className="dropdown-menu">
              <li><a href="#">Settings</a></li>
              <li><a href="#">Subscription</a></li>
              <li><a href="#">Support</a></li>
              <li className="divider"></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-cog" /> &nbsp;<b className="caret"></b></a>
            <ul className="dropdown-menu">
              <li><a href="#">Settings</a></li>
              <li><a href="#">Subscription</a></li>
              <li><a href="#">Support</a></li>
              <li className="divider"></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
             */
    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
        <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#">
        <i className="fa fa-home" />&nbsp;
        Nextdoor</a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li><a href="#"></a></li>
        </ul>
        </div>
        </div>
        </nav>
      </div>
    );
  },
});

var Home = React.createClass({
  render: function(){
             //<Categories />
            //<MembersBox />
    return (
      <div>
        <NavBar />
        <div className="container" style={{width:'auto'}}>
          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-offset-1 col-md-5">
              <Feed />
            </div>
            <div className="col-md-offset-1 col-md-3">
            </div>
            <div className="col-md-1">
            </div>
          </div>
        </div>
      </div>
    )
  }
});

var MembersBox = React.createClass({
  render: function(){
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Members
        </div>
          <MembersDetails facesPerRow={3} imageWidth={'50px'} height={'300px'}/>
      </div>
    )
  }
});

var Categories = React.createClass({
  /*
      <div className="panel panel-default">
        <div className="panel-heading">
          Categories
        </div>
          <ul className="list-group">
            <a className="list-group-item">Classifieds</a>
            <a className="list-group-item">{'Crime & Safety'}</a>
            <a className="list-group-item">Free Items</a>
            <a className="list-group-item">General</a>
            <a className="list-group-item">{'Lost & Found'}</a>
            <a className="list-group-item">Recommendations</a>
          </ul>
      </div>
  */
  render: function(){
    menuStyle = {fontSize:'12px',fontWeight:'500'}
    return (
      <ul className="nav nav-pills nav-stacked">
        <li className="active" style={menuStyle}><a href="#">General</a></li>
        <li style={menuStyle}> <a href="#">Classifieds<span className="badge" style={{float:'right'}}>98</span></a>
        </li>
        
        <li style={menuStyle}><a href="#">Free Items<span className="badge" style={{float:'right'}}>98</span></a></li>
        <li style={menuStyle}><a href="#">Recommendations<span className="badge" style={{float:'right'}}>98</span></a></li>
        <li style={menuStyle}><a href="#">{'Crime & Safety'}<span className="badge" style={{float:'right'}}>98</span></a></li>
        <li style={menuStyle}><a href="#">{'Lost & Found'}<span className="badge" style={{float:'right'}}>98</span></a></li>
      </ul>
    );
  }
});

var ProspectSearch = React.createClass({
  render: function(){
    return (
      <div className="panel panel-default">
      </div>
    );
  }
});

var Feed = React.createClass({
  getInitialState: function(){
    return {posts: [] , profile_pics:[], next:""}
  },
  
  componentWillUpdate: function(){
  },

  componetDidUpdate: function(){
  },

  loadMoreItems: function(paging_url){
    thiss = this;
    //console.log('load more items')
    $.ajax({
      url: paging_url
    }).success(function(the_lol) {
      lol = the_lol
      profile_pic = "http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg"
      profile_pics = []
      for(i=0;i<lol.data.length;i++)
        profile_pics.push(profile_pic)

      thiss.setState({posts: thiss.state.posts.concat(lol.data), profile_pics: profile_pics, next: lol.paging.next})
      //console.log('set state')
      localStorage.loaded = true
    })
  },

  componentDidMount: function(){
    thiss = this;
    localStorage.loaded = true
    $(document).scroll(function(){
      var scrollPercent = $(window).scrollTop() / ($(document).height() - $(window).height())

      if(scrollPercent > 0.750 && scrollPercent < 0.751){
      //if(scrollPercent == 0.753){
        console.log('load more stuff')
        thiss.loadMoreItems(thiss.state.next)
      }
    })

    Parse.initialize("aIHDo506A6fdlZ7YZB6n93EZQeBvV8wBFsArgIYB", "wWQnUcWjA7ARW2s5n6zSfv52ypp1d7PmyMSoLxDh")
  /*
    $.ajax({
      url: "https://api.parse.com/1/classes/Post?limit=20&include=user,comments,users_who_commented",
      headers:{"X-Parse-Application-Id": "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
       "X-Parse-REST-API-Key": "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
      },
      data:'order=-post_created_at_timestamp',
      //data:'order=-updatedAt',
    }).success(function(lol) {
      thiss.setState({posts: lol.results})
    })
  */
    access_token = "CAACEdEose0cBAGP5f20PLef2p3j4LNaaMPeG5LAXaABgVzPJuBaZAx2IoIMvwDULjZC2EvJmZBLarMiybMA66JJXqZBCPEeSBI2RMwKspzcxS1eldhWM9XCZAJIZBrLN5RUjbppu0buEUDax8pPZCJ7SacL3K889X4dlVNZARZBUF4rcLkMA1DFZAuu2bUjEgYf69MgUFUtyJWYQZDZD"
    $.ajax({
      url: "https://graph.facebook.com/595943383784905/feed?access_token="+access_token
    }).success(function(lol) {
      profile_pic = "http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg"
      profile_pics = []
      for(i=0;i<lol.data.length;i++)
        profile_pics.push(profile_pic)

      thiss.setState({posts: lol.data, profile_pics: profile_pics, next: lol.paging.next})

      profile_pics = []
      for(i=0;i<lol.data.length;i++){
        $.ajax({
          url:"https://api.parse.com/1/classes/_User",
          headers:{"X-Parse-Application-Id": "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog", "X-Parse-REST-API-Key": "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
          },
          data:'where={"fb_id":'+lol.data[i].from.id+'}',
        }).success(function(lol){
          profile_pics[i] = lol.results[0]
          //thiss.setState({profile_pics: profile_pics})
        });
      }
    }).then(function(){
      console.log(profile_pics)
    });
  },

  render: function(){
    posts = []
    for(i=0;i<this.state.posts.length;i++){
      posts.push(<Post post={this.state.posts[i]} 
                       fb_profile_pic={this.state.profile_pics[i]}
                       key={this.state.posts[i].objectId} />)
    }
    /*
     * Not In MVP
        <createPost createPost={this.createPost}/>
    */
    return (
      <div>
        {posts}
      </div>
    )
  },

  createPost: function(body){
    the_data = {
      body   : body,
      user : {
        "__type"    : "Pointer",
        "className" : "_User",
        "objectId"  : "5lgpbcsu6c",
      }, 
      post_created_at:moment().format('MMMM Do YYYY, h:mm:ss a'),
    }

    console.log(the_data)

    $.ajax({
      url: "https://api.parse.com/1/classes/Post",
      type: "post",
      dataType: "json",
      contentType: "application/json",
      headers:{"X-Parse-Application-Id": "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
       "X-Parse-REST-API-Key": "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
      },
      data: JSON.stringify(the_data),
    })

    tmp = this.state.posts
    tmp.unshift(the_data)
    this.setState({posts: tmp})
  },

});

var createPost = React.createClass({
/*
        <div className="panel-heading">
          <ul className="nav nav-justified nav-pills">
            <li className="active"><a href="#" style={{padding:'2px'}}>Home</a></li>
            <li><a href="#" style={{padding:'2px'}}>Profile</a></li>
            <li><a href="#" style={{padding:'2px'}}>Messages</a></li>
            <li><a href="#" style={{padding:'2px'}}>Messages</a></li>
          </ul>
        </div>
*/
  componentDidMount: function(){
    //console.log($(this.getDOMNode()).find('input'))
  },

  fetch: function(){
    posts.fetch()
  },

  render: function(){
  inputStyle ={
    border:'0',
    outline: 'none',
    border:'none !important',
    boxShadow:'none !important',
    resize:'none'
  }
  tagStyle={
    position: 'absolute',
    right: '-10px',
    top:'-10px'
  }
  dropdown = {
    fontSize:'12px',
    fontWeight:'500'
  }
    return (
      <div className="panel panel-default">
        <div className="panel-body">
        <div className="dropdown">
          <a href="#" style={tagStyle} className="btn-xs btn btn-primary" data-toggle="dropdown" ><i className="fa fa-tag" /></a>
          <ul className="dropdown-menu" style={{position:'absolute',left:'322px',top:'11px' }}>
            <li><a href="#" style={dropdown}>Classifieds</a></li>
            <li><a href="#" style={dropdown}>Free Items</a></li>
            <li><a href="#" style={dropdown}>Recommendations</a></li>
            <li><a href="#" style={dropdown}>{'Crime & Safety'}</a></li>
            <li><a href="#" style={dropdown}>{'Lost & Found'}</a></li>
          </ul>
        </div>
          <form onSubmit={this.createPost}>
          <textarea type="text" placeholder="Write something..." className="form-control" rows="3" style={inputStyle}/>
          </form>
        </div>

        <div className="panel-footer" style={{height:'44px'}}>
          <div style={{float:'right'}}>
          <a href="#" onClick={this.fetch} className="btn btn-primary btn-xs" style={{width:'100px',marginRight:'10px'}}>Upload Image</a>
          <a href="#" className="btn btn-primary btn-xs" style={{width:'60px'}} onClick={this.createPost}>Post</a>
          </div>
        </div>
      </div>
    );
  },
  createPost: function(){
    this.props.createPost($('textarea').val())
    $('textarea').val('')
  }
});

/*
-------------------------------------------------------
*/

var Workspace = Backbone.Router.extend({

  routes: {
    "": "main",
    "members" : "members",
    "request_membership" : "request_membership",
    "signup": "signup",
    "newsignup": "newsignup",
  },

  main: function() {
    //console.log('main')
    React.renderComponent(Home(), document.getElementById('content'));
  },

  members: function() {
    React.renderComponent(Members(), document.getElementById('content'));
  },

  request_membership: function(){
    React.renderComponent(RequestMembership(), document.getElementById('content'));
  },

  signup: function(){
    React.renderComponent(Auth(), document.getElementById('content'));
  },

  profile: function(){
    React.renderComponent(Profile(), document.getElementById('content'));
  },

  settings: function(){
    React.renderComponent(Settings(), document.getElementById('content'));
  },

  newsignup: function(){
    React.renderComponent(NewSignup(), document.getElementById('content'));
  },


  /*
  : function(){
    React.renderComponent(Settings(), document.getElementById('content'));
  },
  */
});

$(document).ready(function(){
  var workspace = new Workspace;
  Backbone.history.start();
});
