/** @jsx React.DOM */

//TODO
//- make lists CRUD work
//- make subfields work ie click and more details appear underneath
//- make profile and www links work
//- make click on cloud say feature under construction
//- make delete work
//- make download as csv work
//- make dropdown choose between lists work

var Home = React.createClass({
  getInitialState: function() {
    neighborhood = ""
    if(typeof localStorage.currentNeighborhood != "undefined")
      neighborhood = localStorage.currentNeighborhood

    return {
      name : "",
      id : neighborhood,
      description : ""
    }
  },

  componentWillMount: function() {
    $('body').css({'overflow':'auto'})
    currentUser = localStorage.getItem('Parse/N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ/currentUser')

    if (currentUser) {
      if(!JSON.parse(currentUser).completed_signup) 
        location.href = "#create_account"
      else if(!JSON.parse(currentUser).address_verified) 
        location.href = "#verification"
      else 
        location.href = "#"             // Feed
    } else {
      location.href = "#signup"
    }
  },

  componentDidMount: function() {
    currentUserId = localStorage.currentUserId
    the_this = this;

    if(typeof localStorage.currentNeighborhood == "undefined") {
      console.log('undefined')
      $.ajax({
        url: "https://api.parse.com/1/classes/_User/"+currentUserId+'?include=neighborhood',
        headers : {
          "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
          "X-Parse-REST-API-Key"   : "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
        },
      }).success(function(lol){
        the_this.setState({
          name: lol.neighborhood.name,
          id: lol.objectId,
          description: lol.neighborhood.description
        })
      })
    } else {
      //console.log(localStorage.currentNeighborhood)
      $.ajax({
        url: "https://api.parse.com/1/classes/Neighborhood/"+localStorage.currentNeighborhood,
        headers : {
          "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
          "X-Parse-REST-API-Key"   : "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
        },
      }).success(function(lol){
        //console.log(lol)
        the_this.setState({
          name: lol.name,
          id: lol.objectId,
          description: lol.description
        })
      })
    }
  },

  render: function(){
    // //<MembersBox />
    // <AboutNeighborhood description={this.state.description}/>
    sideMenu = {
      top: '50px',
      borderRadius: '0px',
      height: '100%',
      position: 'fixed'
    }
    return (
      <div>
        <NavBar name={this.state.name}/>
        <div className="container" style={{width:'auto',marginTop:'70px'}}>
          <div className="row">
            <div className="col-md-3 well col-sm-5" style={sideMenu}>
              <h5 style={{display:'inline',fontSize:'18px'}} className="lead">{this.state.name}</h5>
              <br/>
              <br/>
              <Categories />        
            </div>
            <div className="col-md-offset-5 col-md-6 col-sm-offset-5 col-sm-6">
              <Feed />
              <div id="the_progress_bar" style={{display:'none'}}>
                <div className="progress progress-striped active">
                  <div className="progress-bar"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width:"100%"}}>
                    <span className="sr-only">45% Complete</span>
                  </div>
                </div>
              </div> 
                <div className="alert alert-info" id="no_more_posts" style={{display:'none'}}>
                  <div style={{textAlign:'center'}}>There are no more posts to load.</div>
                </div>
            </div>
            <div className="col-md-offset-1 col-md-4 col-sm-offset-1 col-sm-4"> 
                <MembersDetails facesPerRow={3} 
                                imageWidth={'50px'} 
                                height={'300px'}
                                neighborhood={this.state.id} />
            </div>
          </div>
        </div>
      </div>
    )
  }
});

var AboutNeighborhood = React.createClass({
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h6 style={{fontWeight:'bold',margin:'0px'}} className="text-muted">
            <i className="fa fa-globe" />&nbsp; &nbsp;ABOUT</h6>
        </div>
        <div className="panel-body">
        <span style={{fontSize:'12px'}}>
          {this.props.description}
        </span>
        </div>
      </div>
    )
  }
});

var Categories = React.createClass({
  getInitialState: function() {
    // Get Counts Of Neighborhood Posts
    return {
      classifieds : "",
      free_items : "",
      recommendations : "",
      crime_and_safety : "",
      lost_and_found : "",
      events : ""
    }
  },

  componentDidMount : function() {
    tags = ["Classifieds","Free Items", "Recommendations", "Crime and Safety",
              "Lost and Found", "Events"]
    tags = ["classifieds","free_items", "recommendations", "crime_and_safety",
              "lost_and_found", "events"]
    cat_this = this;
    counts = []
    for(i=0;i<tags.length;i++){
      neighborhood = {
        "neighborhood" : {
          "__type" : "Pointer",
          "className" : "Neighborhood",
          "objectId" : localStorage.currentNeighborhood
        },
        "tags": tags[i]
      }

      $.ajax({
        url: "https://api.parse.com/1/classes/Post",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json",
        async: false,
        headers : {
          "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
          "X-Parse-REST-API-Key"   : "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
        },
        //data: "where="+JSON.stringify(neighborhood)+"&tags=['Classifieds']",
        //data: "where={__type:'Pointer',className:'Neighborhood',objectId:'RtBDGScY6d'}",
        data: "where="+JSON.stringify(neighborhood)+"&count=1",
        success: function(lol){
          counts.push(lol.count)
          if(counts.length == 6) {
            console.log(counts)
            cat_this.setState({
              classifieds      :  counts[0],
              free_items       :  counts[1], 
              recommendations  :  counts[2], 
              crime_and_safety :  counts[3],
              lost_and_found   :  counts[4], 
              events           :  counts[5] 
            })
          }
        },
        error: function(error){
          console.log('error')
        }
      });
    }
  },

  render: function(){
    classifieds = this.state.classifieds
    free_items = this.state.free_items
    recommendations = this.state.recommendations
    crime_and_safety = this.state.crime_and_safety
    lost_and_found = this.state.lost_and_found
    events = this.state.events

    menuStyle = {fontSize:'12px',fontWeight:'500'}
    //console.log(classifieds)
    console.log(this.state)
    return (
      <ul className="nav nav-pills nav-stacked">
        <li style={menuStyle}> <a href="#"><i className="fa fa-tags" /> &nbsp; Classifieds<span className="badge" style={{float:'right'}}>{classifieds}</span></a> </li>
        <li style={menuStyle}><a href="#"><i className="fa fa-cube" />&nbsp; Free Items<span className="badge" style={{float:'right'}}>{free_items}</span></a></li>
        <li style={menuStyle}><a href="#"><i className="fa fa-comments" />&nbsp; Recommendations<span className="badge" style={{float:'right'}}>{recommendations}</span></a></li>
        <li style={menuStyle}><a href="#"><i className="fa fa-taxi" />&nbsp; {'Crime & Safety'}<span className="badge" style={{float:'right'}}>{crime_and_safety}</span></a></li>
        <li style={menuStyle}><a href="#"><i className="fa fa-crosshairs" /> &nbsp; {'Lost & Found'}<span className="badge" style={{float:'right'}}>{lost_and_found}</span></a></li>
        <li style={menuStyle}><a href="#"><i className="fa fa-calendar-o" /> &nbsp;{'Events'}<span className="badge" style={{float:'right'}}>{events}</span></a></li>
      </ul>
    );
  }
});

/* Router */

var Workspace = Backbone.Router.extend({

  routes: {
    "": "main",
    "members" : "members",
    "request_membership" : "request_membership",
    "signup": "signup",
    "newsignup": "newsignup",
    "offline": "offline",
    "create_account": "create_account",
    "verification": "verification",
    "login": "login",
  },

  main: function() {
    //console.log('main')
    React.renderComponent(Home(), document.getElementById('content'));
  },

  create_account: function() {
    //console.log('main')
    React.renderComponent(CreateAccount(), document.getElementById('content'));
  },

  verification: function() {
    //console.log('main')
    React.renderComponent(Verification(), document.getElementById('content'));
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

  offline: function(){
    React.renderComponent(Offline(), document.getElementById('content'));
  },

  login: function(){
    React.renderComponent(Login(), document.getElementById('content'));
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
