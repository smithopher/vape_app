var UserLogin = React.createClass({
  getInitialState: function() {
    return {token: ''};
  },
  componentDidMount: function(e) {
    this.setState({token: $('meta[name=csrf-token]').attr('content')});
  },
  render: function() {
    return (
      <div className = 'container'>
        <h2>Please Sign In</h2>
        <form role='form' className='form-horizontal' method="post" action="/login_attempt">
          <input name="authenticity_token" type="hidden" value={this.state.token}/>
            <div className="form-group">
              <label for="email" className='control-label'>Email:</label>
              <input type="text" name="email"/>
            </div>
            <div className='form-group'>
              <label for="password" className='control-label'>Password:</label>
              <input type="password" name="password"/>
            </div>
            <div className='form-group'>
              <input className="btn btn-default" type="submit" value="Log In" />
            </div>
        </form>
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
    return (
      <div className='container'>
        <h1>Welcome, {this.props.first_name}</h1>
        <CurrentlyVaping/>
        <FriendsVapingList status={this.props.friend_status}/>
        <FriendPostList posts={this.props.friend_post}/>
        <SubmitNewPost/>
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
        <h5>Your post has been submitted!</h5>
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
      <form className='currentlyVaping' onSubmit={this.handleSubmit}>
        <input name="authenticity_token" type="hidden" value={this.props.token}/>
        <h5>What are you vaping right now?</h5>
        <input type="text" ref="currentVape" placeholder="We want to know!"/>
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
        <h5>Your status has been posted!</h5>
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
        <h5>Write a new post!</h5>
        <input type="text" ref="newPostTitle" placeholder="Title"/><br/>
        <input type="text" className="contentInput" ref="newPostContent" placeholder="Content"/><br/>
        <input type="submit" value="Post it!" className='btn btn-primary'/>
      </form>
    );
  }
});

var FriendPostList = React.createClass({
  render: function() {
    var friendPostNodes;
    var headline;
    if (this.props.posts.length > 0) {
      headline=<h5>Recent posts by your friends</h5>;
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
        <ul>
          {friendPostNodes}
        </ul>
      </div>
    );
  }
});

var FriendPost = React.createClass({
  render: function() {
    var postLink = "/posts/" + this.props.data.id
    var authorLink = "/users/" + this.props.data.user_id
    return(
      <li><a href={postLink}>{this.props.data.title}</a> posted by <a href={authorLink}>{this.props.data.author_fname} {this.props.data.author_lname}</a></li>
    );
  }
});

var FriendsVapingList = React.createClass({
  render: function() {
    var statusNodes;
    var headline;
    if (this.props.status.length > 0) {
      headline=<h5>What your friends are vaping right now</h5>
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
        <ul>
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
      <li><a href={friendLink}>{this.props.data.author_fname} {this.props.data.author_lname}</a> is vaping {this.props.data.title}.</li>
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
      <div className="Container">
        <h1 className="userNameHeader">{this.props.first_name} {this.props.last_name}</h1>
        <div>{this.props.user.email}</div>
        <FollowUser user={this.props.user} userFollow={this.props.user_follow}/>
        <UserStatuses data = {this.props.statuses} firstName = {this.props.first_name}/>
        <UserPosts data = {this.props.posts} firstName={this.props.first_name}/>
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
          <p>You follow this user.</p>
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
        <button className='followButton btn btn-primary' ref='newFollow' onClick={this.handleClick}>Follow this user!</button>
      );
    }
});

var UserStatuses = React.createClass({
  render: function() {
    var statusNodes = this.props.data.map(function(status){
      return (
        <li>{status.article}</li>
      );
    });
    return (
      <div>
        <h5>{this.props.firstName} has recently vaped:</h5>
        <ul>
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
      <li><a href={postLink}>{post.title}</a></li>
      );
    });
    return(
      <div>
      <h5>{this.props.firstName}&apos;s posts</h5>
        <ul>
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
      <div>
        {searchNodes}
      </div>
    )
  }
});

var SearchResult = React.createClass({
  render: function() {
    var userLink = '/users/'+this.props.data.id
    return (
      <div><a href={userLink}>{this.props.data.first_name} {this.props.data.last_name}</a></div>
    );
  }
});
