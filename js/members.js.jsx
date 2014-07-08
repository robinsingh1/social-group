/** @jsx React.DOM */

var Members = React.createClass({
  render: function(){
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="col-md-12">
            <div className="panel panel-default">
              <MembersDetails />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var MembersDetails = React.createClass({
  getInitialState: function(){
    return { users : [] }
  },

  componentDidMount: function(){
    id = this.props.neighborhood
    //console.log(id)
    thisss = this;

    $.ajax({
      url:"https://api.parse.com/1/classes/_User?limit=1000",
      headers:{
        "X-Parse-Application-Id": "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog", 
        "X-Parse-REST-API-Key": "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
      },
      type:"GET",
      data:'where={"neighborhood": {"__type":"Pointer","className":"Neighborhood","objectId":"'+id+'"}}',
    }).success(function(lol){
      //thiss.setState({profile_pics: profile_pics})
      //console.log(lol)
      thisss.setState({ users: lol.results})
    });
  },

  render: function(){
    users = []
    var i, j, temparray, chunk = this.props.facesPerRow;
    for (i=0,j=this.state.users.length; i<j; i+=chunk) {
      temparray = this.state.users.slice(i,i+chunk);
      //if(temparray.length > this.props.facesPerRow-1)
      users.push(<userRow users={temparray} imageWidth={this.props.imageWidth}/>)
    }

    //console.log(this.state.users)
    return (
              <div className="panel panel-default">
                <div className="panel-heading">
                {this.state.users.length + ' Members'}
                </div>
        <div style={{height:this.props.height, overflowY:'auto'}}>
              <table className="table table-responsive">
                <tbody>
                    {users}
                </tbody>
              </table>
        </div>
        </div>
    )
  }
});

var userRow = React.createClass({
  render: function(){
    users = this.props.users
    rows = []
    for(i=0;i<users.length;i++){
        //users[i].fb_profile_pic 
      profile_pic = "http://www.faithlineprotestants.org/wp-content/uploads/2010/12/facebook-default-no-profile-pic.jpg"
        rows.push(
          <td>
            <img style={{marginRight:'auto', width:this.props.imageWidth, marginLeft:'auto',borderRadius:'60px'}}className="thumbnail" src={profile_pic}/>
            <h6 style={{textAlign:'center'}}>{users[i].first_name + ' ' +users[i].last_name}</h6>
          </td>
        )
    }
    return (
        <tr>
          {rows}
        </tr>
    );
  }
});
