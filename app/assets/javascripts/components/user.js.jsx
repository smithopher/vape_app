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
        <form role='form' method="post" action="/login_attempt">
          <input name="authenticity_token" type="hidden" value={this.state.token}/>
            <div className="form-group">
              <label for="email">Email:</label>
              <input type="text" name="email" className='form-control'/>
            </div>
            <div className='form-group'>
              <label for="password">Password:</label>
              <input type="password" name="password" className='form-control'/>
            </div>
            <div className='form-group'>
              <input className="btn btn-default" type="submit" value="Log In" />
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
        <FriendPostList posts={this.props.friend_post}/>
        <FriendsVapingList status={this.props.friend_status}/>
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

var FriendPostList = React.createClass({
  render: function() {
    var friendPostNodes;
    if (this.props.posts.length > 0) {
      friendPostNodes = this.props.posts.map(function(post) {
        return (
          <FriendPost data={post}/>
        );
      });
    } else {
      friendPostNodes = <div></div>
    }
    return (
      <div>
        {friendPostNodes}
      </div>
    );
  }
});

var FriendPost = React.createClass({
  render: function() {
    var postLink = "/posts/" + this.props.data.id
    var authorLink = "/users/" + this.props.data.user_id
    return(
      <h5><a href={postLink}>{this.props.data.title}</a> posted by <a href={authorLink}>{this.props.data.author_fname} {this.props.data.author_lname}</a></h5>
    );
  }
});

var FriendsVapingList = React.createClass({
  render: function() {
    var statusNodes;
    if (this.props.status.length > 0) {
      statusNodes = this.props.status.map(function(status) {
        return(
          <FriendsVaping data={status}/>
        );
      });
    } else {
      statusNodes = <div></div>
    }
    return (
      <div>
        <h4>What your friends are vaping right now:</h4>
        {statusNodes}
      </div>
    );
  }
});

var FriendsVaping = React.createClass({
  render: function() {
    var friendLink = "/users/"+this.props.data.user_id
    return (
      <p><a href={friendLink}>{this.props.data.author_fname} {this.props.data.author_lname}</a> is vaping {this.props.data.title}.</p>
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
        <h4><a href={userLink}>{this.props.data.first_name} {this.props.data.last_name}</a></h4>
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
        <h4>{this.props.first_name}&apos;s posts </h4>
        <UserPosts data = {this.props.posts}/>
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
      <ul>
        {postNodes}
      </ul>
    );
  }
});
