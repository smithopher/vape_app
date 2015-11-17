var PostContainer = React.createClass({
  render: function() {
    return(
      <div className="container">
        <PostContent post={this.props.post} comments={this.props.comments} firstName={this.props.first_name} lastName={this.props.last_name}/>
      </div>
    );
  }
});

var PostContent = React.createClass({
  render: function() {
    var authorLink = "/users/"+this.props.post.user_id
    return (
      <div>
        <div className="panel panel-default">
          <div id="post-heading"className="panel-heading">{this.props.post.title}&nbsp;&nbsp;posted by: <strong><a href = {authorLink}>{this.props.firstName} {this.props.lastName}</a></strong></div>
          <div id="post-body" className="panel-body">
            <p>{this.props.post.content}</p>
          </div>
        </div>
          <CommentList post = {this.props.post} comments={this.props.comments}/>
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var headline;
    var commentNodes;
    if (this.props.comments.length > 0) {
      headline = <h4>Comments:</h4>;
      commentNodes = this.props.comments.map(function(comment) {
        return (
          <CommentItem data={comment}/>
        );
      })
    } else {
      headline = <h4>There are no comments yet. Post the first one!</h4>
      commentNodes = <div></div>
    }
    return (
      <div>
        {headline}
        {commentNodes}
        <SubmitNewComment post={this.props.post}/>
      </div>
    );
  }
});

var CommentItem = React.createClass({
  render: function() {
    var authorLink = '/users/'+this.props.data.user_id
    return(
      <div className="panel panel-default">
        <p className="panel-body">
        <a href={authorLink}><strong>{this.props.data.author_fname} {this.props.data.author_lname}</strong></a>:&nbsp;&nbsp;
        {this.props.data.content}</p>
      </div>
    );
  }
});

var SubmitNewComment = React.createClass({
  getInitialState: function() {
    return { status: '', token: '' };
  },
  componentDidMount: function() {
    this.setState({token: $('meta[name=csrf-token]').attr('content')})
  },
  postComment: function(newComment) {
    $.ajax({
      url: '/comments/new',
      method: 'POST',
      data: { content: newComment,
              post_id: this.props.post.id,
              token: this.state.token},
      success: function (data) {
        this.setState({ status: 'submitted' });
      }.bind(this),
      error: function(xhr, error, status) {
        console.log('There is an error: '+error);
      }.bind(this)
    })
  },
  handleNewComment: function(newComment) {
    this.postComment(newComment);
  },
  render: function() {
    if (this.state.status == 'submitted') {
      return (
        <h5>Your comment has been submitted!</h5>
      )} else {
        return (
          <NewCommentForm token={this.state.token} onNewComment={this.handleNewComment}/>
        );
      }
    }
});

var NewCommentForm = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var newComment=React.findDOMNode(this.refs.newComment).value;
    if (!newComment) {
      return;
    }
    this.props.onNewComment(newComment);
    React.findDOMNode(this.refs.newPostTitle).value='';
    return;
  },
  render: function() {
    return (
      <form className='newComment' onSubmit={this.handleSubmit}>
        <input name="authenticity_token" type="hidden" value={this.props.token}/>
        <textarea rows="4" className="contentBox" id="newComment" ref="newComment" placeholder="Write a comment on this post!"/><br/>
        <input type="submit" value="Post it!" className='btn btn-primary'/>
      </form>
    );
  }
});
