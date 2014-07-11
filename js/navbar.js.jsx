/** @jsx React.DOM */

var NavBar = React.createClass({
  render: function() {
      /* 
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
             */
    if(location.hash == "")
      navbar = <NavBarOptions />
    else
      navbar = ""

    // TODO 
    // --------
    // Show neighborhoods that a user is a part of
    // 
    menuIcon = (this.props.screen == "mobile") ? <i className="fa fa-bars" style={{fontSize:'30px',color:'white'}}/> : ""
    return (
      <div>
        <nav id="navbar" className="navbar navbar-default navbar-fixed-top" role="navigation" style={{'backgroundColor':'#5cb85c',border:'0',borderRadius:'0'}}>
        <div className="container-fluid">
        <div className="navbar-header" style={{marginTop:'-4px'}}>
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a href="#" onClick={this.props.toggleMenu} style={{float:'left',marginTop:'15px',marginLeft:'12px'}}>{menuIcon}</a>
        <a className="navbar-brand" href="#" style={{color:'#306d30'}}>
          <span style={{fontSize:'30px'}}>
          <i className="fa fa-home"/>
          <span style={{fontFamily:'museo-sans-rounded',marginLeft:'7px'}}>NeighborsCircle</span>
          </span>
        </a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><a href="#"></a></li>
          </ul>
          {navbar }
            </div>
          </div>
        </nav>
      </div>
    );
  },
});

var NavBarOptions = React.createClass({
  render: function() {
    /*
      <li><a href="#" id="XzDHTk60bi" onClick={this.changeNeighborhood}>Test Neighborhood</a></li>
      <li><a href="#" id="RtBDGScY6d" onClick={this.changeNeighborhood}>Shandon Neighborhood</a></li>
    */
    return (
      <div>
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" style={{color:'#306d30'}} className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-cubes" /> &nbsp;Change Neighborhood &nbsp; <b className="caret"></b></a>
            <ul className="dropdown-menu">
              <li><a href="#" id="XzDHTk60bi" onClick={this.changeNeighborhood}>Test Neighborhood</a></li>
              <li><a href="#" id="RtBDGScY6d" onClick={this.changeNeighborhood}>Shandon Neighborhood</a></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#"  style={{color:'#306d30'}} className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-cog" /> &nbsp;<b className="caret"></b></a>
            <ul className="dropdown-menu">
              <li><a href="javascript:" onClick={this.logout}>Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  },
  logout: function() {
    // logout 
    console.log('logout')
    localStorage.clear();
    location.reload()
  },
  changeNeighborhood: function(e) {
    localStorage.currentNeighborhood = $(e.target).attr('id')
    location.reload()
  }
});
