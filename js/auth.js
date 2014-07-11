function check_auth(){
  currentUser = localStorage.getItem('Parse/N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ/currentUser')
  if (currentUser) {
    if(!JSON.parse(currentUser).completed_signup) 
      location.href = "#create_account"
    else if(!JSON.parse(currentUser).address_verified) 
      location.href = "#verification"
    else 
      location.href = "#"             // Feed
  } else {
    if(window.location.hash != "#login")
      location.href = "#signup"
  }
}

function check_fb_auth(){
  currentUser = localStorage.getItem('Parse/N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ/currentUser')
  if(location.search.indexOf("access_token") != -1 || location.hash.indexOf("access_token") != -1) {
    console.log('signup user')
    signup_user()
    // replace panel with some info
  } else {
    console.log('wtf')
    /*
    if (currentUser) {
        location.href = "#"
    } else {
      if(window.location.hash != "#login")
        location.href = "#signup"
    }
    */
  }
}

function signup_user() {
  if(location.hash.indexOf("access_token") != -1){
    tmp   = location.hash.substring(1+"access_token".length+1)
    token = tmp.substring(0, tmp.indexOf('&'))
    exp   = parseInt(location.hash.split('=').slice(-1)[0])
    exp_date=moment.unix(moment().unix()+exp).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")

    $.ajax({
      url:'https://graph.facebook.com/me',
      data: {access_token : token },
      success: function(res) {
        // Create User/ Log In Parse
        $.ajax({
          url: 'https://api.parse.com/1/users', 
          type:'POST',
          headers : {
            "X-Parse-Application-Id" : "jF3MjzUKzF0ag0b0m821ZCqfuQVIwMhI160QQRog",
            "X-Parse-REST-API-Key"   : "HqGVm1hoPxJNxIx7T3RGwvGiTz7mfpJKHbz9EBuE",
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            authData: {
              facebook: {
                id              : res.id,
                access_token    : token,
                expiration_date : exp_date,
              }
            }
          }),
          success: function(res) {
            console.log(res)
            localStorage.setItem('Parse/N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ/currentUser', JSON.stringify(res))
            localStorage.currentUserId = res.objectId
            localStorage.currentNeighborhood = lol.neighborhood.objectId
            localStorage.sessionToken = res.sessionToken
            location.href = "#" // auth token
          },
          error: function(res) {
            console.log(res)
          },
        })
      }
    });
  }
}
