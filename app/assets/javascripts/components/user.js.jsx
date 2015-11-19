var UserLogin = React.createClass({
  getInitialState: function() {
    return {token: ''};
  },
  componentDidMount: function(e) {
    this.setState({token: $('meta[name=csrf-token]').attr('content')});
  },
  render: function() {
    return (
      <div className = 'container-fluid'>
        <h1>Welcome to VapeStack</h1>
        <h2>Please Sign In</h2>
        <div>
          <form id="login-form" role='form' className='form-horizontal' method="post" action="/login_attempt">
            <input name="authenticity_token" type="hidden" value={this.state.token}/>
              <div className="form-group">
                <div className="row-fluid">
                  <label for="email" className='control-label col-lg-1 col-lg-offset-4 col-md-2 col-md-offset-3 col-sm-2 col-sm-offset-2'>User&nbsp;email:</label>
                  <input type="text" name="email" className="col-lg-3 col-md-3 col-sm-4"/>
                </div>
              </div>
              <div className='form-group'>
                <div className="row-fluid">
                  <label for="password" className='control-label col-lg-1 col-lg-offset-4 col-md-2 col-md-offset-3 col-sm-2 col-sm-offset-2'>Password:</label>
                  <input type="password" name="password" className="col-lg-3 col-md-3 col-sm-4"/>
                </div>
              </div>
              <div className='form-group'>
                <input className="btn btn-default" type="submit" value="Sign In" />
              </div>
          </form>
        </div>
      </div>
    );
  }
});

var UserSignup = React.createClass({
  getInitialState: function() {
    return {token: ''};
  },
  componentDidMount: function(e) {
    this.setState({token: $('meta[name=csrf-token]').attr('content')});
  },
  render: function () {
    return(
      <div className = 'container'>
        <h2>Fill out form to sign up!</h2>
        <form role='form' method="post" action="/signup_post">
          <input name="authenticity_token" type="hidden" value={this.state.token}/>
            <div className="form-group">
              <label for="firstName">First Name:</label>
              <input type="text" name="firstName" className='form-control'/>
            </div>
            <div className='form-group'>
              <label for="lastName">Last Name:</label>
              <input type="text" name="lastName" className='form-control'/>
            </div>
            <div className='form-group'>
              <label for="email">E-mail Address:</label>
              <input type="text" name="email" className='form-control'/>
            </div>
            <div className='form-group'>
              <label for="password">Password:</label>
              <input type="password" id='password1' name="password1" className='form-control'/>
            </div>
            <div className='form-group'>
              <label for="password">Please re-enter password:</label>
              <input type="password" id='password2' name="password2" className='form-control'/>
            </div>
            <div className='form-group'>
              <input className="btn btn-default" type="submit" value="Sign Up!" />
            </div>
        </form>
      </div>
    );
  }
});

var UserHomeContainer = React.createClass({
  render: function() {
    var currentUserLink = '/users/'+this.props.user.id
    return (
      <div className="container-fluid">
        <h1 id="user-greeting"><strong>Welcome, {this.props.first_name}</strong></h1>
        <div id="current-profile"><a href={currentUserLink}><h4>Click here to view your profile!</h4></a></div>
        <div className="row-fluid">
          <div className="col-md-5">
            <div id="home-vaping">
              <CurrentlyVaping/>
              <FriendsVapingList status={this.props.friend_status}/>
            </div>
          </div>
          <div className="col-md-5 col-md-offset-2" id="home-posts">
            <SubmitNewPost/>
            <FriendPostList posts={this.props.friend_post}/>
          </div>
        </div>
      </div>
    )
  }
});

var CurrentlyVaping = React.createClass({
  getInitialState: function() {
    return { post: '',
             status: '',
             token: ''
           };
  },
  componentDidMount: function() {
    this.setState({token: $('meta[name=csrf-token]').attr('content')})
  },
  postStatus: function(newStatus) {
    $.ajax({
      url: '/status/new',
      method: 'POST',
      data: { article: newStatus,
              token: this.state.token},
      success: function (data) {
        this.setState({ status: 'submitted' });
      }.bind(this),
      error: function(xhr, error, status) {
        console.log('There is an error: '+error);
      }.bind(this)
    })
  },
  handleNewStatus: function(newStatus) {
    this.postStatus(newStatus);
  },
  render: function() {
    if (this.state.status == 'submitted') {
      return (
        <h5>Your status has been submitted!</h5>
      )} else {
        return (
          <NewStatusForm token={this.state.token} onNewStatus={this.handleNewStatus}/>
        );
      }
    }
});

var NewStatusForm = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var newStatus=React.findDOMNode(this.refs.currentVape).value;
    if (!newStatus) {
      return;
    }
    this.props.onNewStatus(newStatus);
    React.findDOMNode(this.refs.currentVape).value='';
    return;
  },
  render: function() {
    return (
      <form className='currentlyVaping form-inline' onSubmit={this.handleSubmit}>
        <input name="authenticity_token" type="hidden" value={this.props.token}/>
        <h3>What are you vaping right now?</h3>
        <input type="text" ref="currentVape" id="current-vape-form" className="form-control" placeholder="We want to know!"/>&nbsp;&nbsp;
        <input type="submit" value="Share it!" className='btn btn-primary'/>
      </form>
    );
  }
});

var SubmitNewPost = React.createClass({
  getInitialState: function() {
    return { post: '',
             status: '',
             token: ''
           };
  },
  componentDidMount: function() {
    this.setState({token: $('meta[name=csrf-token]').attr('content')})
  },
  postStatus: function(newPostTitle, newPostContent) {
    $.ajax({
      url: '/posts/new',
      method: 'POST',
      data: { title: newPostTitle,
              content: newPostContent,
              token: this.state.token},
      success: function (data) {
        this.setState({ status: 'submitted' });
      }.bind(this),
      error: function(xhr, error, status) {
        console.log('There is an error: '+error);
      }.bind(this)
    })
  },
  handleNewPost: function(newPostTitle, newPostContent) {
    this.postStatus(newPostTitle, newPostContent);
  },
  render: function() {
    if (this.state.status == 'submitted') {
      return (
        <h5>Your post has been submitted!</h5>
      )} else {
        return (
          <NewPostForm token={this.state.token} onNewPost={this.handleNewPost}/>
        );
      }
    }
});

var NewPostForm = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var newPostTitle=React.findDOMNode(this.refs.newPostTitle).value;
    var newPostContent=React.findDOMNode(this.refs.newPostContent).value;
    if (!newPostTitle || !newPostContent) {
      return;
    }
    this.props.onNewPost(newPostTitle, newPostContent);
    React.findDOMNode(this.refs.newPostTitle).value='';
    React.findDOMNode(this.refs.newPostContent).value='';
    return;
  },
  render: function() {
    return (
      <form className='newPost' onSubmit={this.handleSubmit}>
        <input name="authenticity_token" type="hidden" value={this.props.token}/>
        <h3>Write a new post!</h3>
        <div>
          <input className="form-control" id="new-post-title" type="text" ref="newPostTitle" placeholder="Title"/><br/>
        </div>
        <div className="form-horizontal">
          <textarea rows="5" id="new-post-content" type="text" ref="newPostContent" placeholder="Content"/><br/>
          <input type="submit" value="Post it!" className='btn btn-primary'/>
        </div>
      </form>
    );
  }
});

var FriendPostList = React.createClass({
  render: function() {
    var friendPostNodes;
    var headline;
    if (this.props.posts.length > 0) {
      headline=<h3>Recent posts by your friends</h3>;
      friendPostNodes = this.props.posts.map(function(post) {
        return (
          <FriendPost data={post}/>
        );
      });
    } else {
      headline=<div></div>
      friendPostNodes = <div></div>
    }
    return (
      <div>
      {headline}
        <div className="list-group" id="post-group">
          {friendPostNodes}
        </div>
      </div>
    );
  }
});

var FriendPost = React.createClass({
  render: function() {
    var postLink = "/posts/" + this.props.data.id
    var authorLink = "/users/" + this.props.data.user_id
    return(
      <a href={postLink} className='list-group-item user-posts'>{this.props.data.title} posted by {this.props.data.author_fname} {this.props.data.author_lname}{this.props.data.created_at}</a>
    );
  }
});

var FriendsVapingList = React.createClass({
  render: function() {
    var statusNodes;
    var headline;
    if (this.props.status.length > 0) {
      headline=<h3>What your friends have been vaping</h3>
      statusNodes = this.props.status.map(function(status) {
        return(
          <FriendsVaping data={status}/>
        );
      });
    } else {
      headline=<div></div>
      statusNodes = <div></div>
    }
    return (
      <div>
        {headline}
        <ul className="list-group" id="status-group">
          {statusNodes}
        </ul>
      </div>
    );
  }
});

var FriendsVaping = React.createClass({
  render: function() {
    var friendLink = "/users/"+this.props.data.user_id
    return (
      <li className="list-group-item"><a href={friendLink}><strong>{this.props.data.author_fname} {this.props.data.author_lname}</strong></a> has vaped {this.props.data.title} </li>
    );
  }
});

var UserIndexContainer = React.createClass({
  render: function() {
    return (
      <UserIndexList data={this.props.users}/>
    );
  }
});

var UserIndexList = React.createClass({
  render: function() {
    var userNodes = this.props.data.map(function(user) {
      return (
        <UserListing data = {user}/>
      );
    });
    return (
      <div className="container">
        <br/>
        {userNodes}
      </div>
    );
  }
});

var UserListing = React.createClass({
  render: function() {
    var userLink = "/users/"+this.props.data.id
    return (
      <div>
        <h5><a href={userLink}>{this.props.data.first_name} {this.props.data.last_name}</a></h5>
        <br/>
      </div>
    );
  }
});

var UserShow = React.createClass({
  render: function() {
    return(
      <div>
        <div className="container-fluid">
          <div className="row-fluid">
            <h1 className="userNameHeader col-lg-12">{this.props.first_name} {this.props.last_name}</h1>
            <FollowUser user={this.props.user} userFollow={this.props.user_follow}/>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row-fluid">
            <UserStatuses data = {this.props.statuses} firstName = {this.props.first_name}/>
            <UserPosts data = {this.props.posts} firstName={this.props.first_name}/>
          </div>
        </div>
      </div>
    );
  }
});

var FollowUser = React.createClass({
  getInitialState: function() {
    return { followed: this.props.userFollow,
             token: ''
           };
  },
  componentDidMount: function() {
    this.setState({token: $('meta[name=csrf-token]').attr('content')})
  },
  newFollower: function(newFollow) {
    $.ajax({
      url: '/following/new',
      method: 'POST',
      data: { follow_id: this.props.user.id,
              token: this.state.token},
      success: function (data) {
        console.log('success', data);
        this.setState({ followed: true });
      }.bind(this),
      error: function(xhr, status, error) {
        console.log('There is an error: ', error);
      }.bind(this)
    })
  },
  handleSubmit: function(newFollow) {
    this.newFollower(newFollow);
  },
  render: function() {
    if (this.state.followed == false) {
      return (
        <FollowUserButton clicked={this.state.clicked} token={this.state.token} onFollowClick={this.handleSubmit}/>
    )} else {
      return (
        <p className="followButton">You follow this user.</p>
      );
    }
  }
});

var FollowUserButton = React.createClass({
  handleClick: function(event) {
    event.preventDefault();
    var newFollow=React.findDOMNode(this.refs.newFollow);
    this.props.onFollowClick(newFollow);
    return;
  },
  render: function() {
    return (
      <button className='btn btn-primary col-lg-2 col-lg-offset-5' ref='newFollow' onClick={this.handleClick}>Follow this user!</button>
    );
  }
});

var UserStatuses = React.createClass({
  render: function() {
    var statusNodes = this.props.data.map(function(status){
      return (
        <li className="list-group-item">{status.article}</li>
      );
    });
    return (
      <div className="col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-4 col-sm-offset-1">
        <h4>{this.props.firstName} has recently vaped:</h4>
        <ul className="list-group">
          {statusNodes}
        </ul>
      </div>
    );
  }
});

var UserPosts = React.createClass({
  render: function() {
    var postNodes = this.props.data.map(function(post) {
      var postLink = '/posts/'+post.id
      return (
        <a href={postLink} className="list-group-item"><li>{post.title}</li></a>
      );
    });
    return(
      <div className="col-lg-4 col-lg-offset-2 col-md-4 col-md-offset-2 col-sm-4 col-sm-offset-2">
      <h4>{this.props.firstName}&apos;s posts</h4>
        <ul className="list-group">
          {postNodes}
        </ul>
      </div>
    );
  }
});

var UserSearchContainer = React.createClass({
  render: function() {
    if (this.props.search_users.length > 0) {
      return(
        <div>
          <h1>Search results:</h1>
          <SearchResultsList data={this.props.search_users}/>
        </div>
      );
    } else {
      return (
        <h1>There are no users that match your criteria</h1>
      );
    }
  }
});

var SearchResultsList = React.createClass({
  render: function() {
    var searchNodes = this.props.data.map(function(user) {
      return (
        <SearchResult data={user}/>
      );
    });
    return (
      <div className='list-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3'>
        {searchNodes}
      </div>
    )
  }
});

var SearchResult = React.createClass({
  render: function() {
    var userLink = '/users/'+this.props.data.id
    return (
      <div><a href={userLink} className="list-group-item">{this.props.data.first_name} {this.props.data.last_name}</a></div>
    );
  }
});
