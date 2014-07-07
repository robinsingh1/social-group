/** @jsx React.DOM */

var CreateAccount = React.createClass({
  render: function(){
    return (
      <div>
        <NavBar />
        <div className="container">
          <p className="lead" style={{display:'inline'}}>Good news! We found your address.</p>
    &nbsp;
    &nbsp;
    &nbsp;
          <h5 style={{display:'inline'}}>Sign up for your free NeighborsCircle account</h5>
        <br/>
        <br/>
        <div className="row well">
        <div className="col-md-6 panel panel-default">
        <div className="panel-body">
        <br/>
        <form>
          <div style={{marginBottom:'10px'}}>
          <span style={{display:'inline'}}>First Name:</span> <input style={{width:'300px',display:'inline',marginLeft:'50px'}}className="form-control" placeholder=""/>
          </div>

          <div style={{marginBottom:'10px'}}>
          <span style={{display:'inline'}}>Last Name:</span> <input style={{width:'300px',display:'inline',marginLeft:'50px'}}className="form-control" placeholder=""/>
          </div>

          
          <div style={{marginBottom:'10px'}}>
            <span style={{display:'inline'}}>Gender:</span> 
          <div style={{display:'inline',marginLeft:'78px'}}>
   Male &nbsp;<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1"/>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
   Female &nbsp;<input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" />
          </div>
          </div>
          

          <div style={{marginBottom:'10px'}}>
          <span style={{display:'inline'}}>Password:</span> <input style={{width:'300px',display:'inline',marginLeft:'57px'}} type="password" className="form-control" placeholder=""/>
          </div>

          <div style={{marginBottom:'10px'}}>
          <span style={{display:'inline'}}>Repeat Password:</span> <input style={{width:'300px',display:'inline',marginLeft:'7px'}} type="password" className="form-control" placeholder=""/>
          </div>
          <br/>
          <a href="javascript:" onClick={this.createAccount} className="btn btn-success"> Create My Account</a>
          <br/>
          <br />
        </form>
        </div>
        </div>
        <div className="col-md-6">
          <geocode_maps />
        </div>
        </div>
      </div>
</div>
    );
  },
  createAccount: function() {
    console.log('create account')
    // TODO
    // -------------------------
    // Add Introduction paragraph
  }
});

var geocode_maps = React.createClass({
  componentDidMount: function(){
    console.log(localStorage.user_location)

    GMaps.geocode({
      address: localStorage.user_location,
      callback: function(results, status) {
        console.log(status)
        if (status == 'OK') {
          var latlng = results[0].geometry.location;
          //map.setCenter(latlng.lat(), latlng.lng());

          map = new GMaps({
             div: '#the_map',
             lat: latlng.lat(),
             lng: latlng.lng(),
          });

          map.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng()
          });
        } else {
          //console.log(status)
        }
      }
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

