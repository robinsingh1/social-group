/** @jsx React.DOM */

var RequestMembership = React.createClass({
  render: function(){
    return (
      <div>
        <NavBar/>
        <div className="container">
      <p className="lead">
        Nearby Neighborhoods
      </p>
          <div className="row well">
            <div className="col-md-6">
              <neighborhoods />
            </div>
            <div className="col-md-6">
              <maps />
            </div>
          </div>
        </div>
      </div>
    );
  },
});

var neighborhoods = React.createClass({
  render: function(){
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <h5>{'Shandon Neighborhood Community & Students'}</h5>
          <h6>Open Group - 614 members.</h6>
          <p className="text-muted">
          Our goal is to create a Facebook group that acts as a place for Shandon neighbors (and our surrounding neighbors) to connect in as many ways as possible! We encourage you to post about community news and events, safety and crime concerns, missing pets, curb alerts, for sale by owner, locally owned businesses, neighborhood real estate, etc. 
          </p>
          <a href="#" className="btn-sm btn btn-success">Request To Join</a>
        </div>
      </div>
    );
  }
});

var maps = React.createClass({
  componentDidMount: function(){
     new GMaps({
         div: '#the_map',
         lat: -12.043333,
         lng: -77.028333
     });
  },

  render: function(){
    return (
      <div id="the_map" style={{height:'400px'}}className="panel panel-default">
        <div className="panel-body">
        </div>
      </div>
    );
  }
});

