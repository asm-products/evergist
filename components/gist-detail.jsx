var React = require('react'),
im = require('immutable'),
mui = require('material-ui'),
Paper = mui.Paper
var Map = im.Map;
var gist = require('../stores/gist')
var EditorToolbar = require('./edit-toolbar')
var loadingState = {
  loading: true,
	gist: im.fromJS({
    description: 'untitled',
    files: [{
      filename: "",
      content: "Loading"
    }]
  })
};
var GistDetail = React.createClass({
  getInitialState: function() {
		return loadingState
	},
  componentDidMount: function(){
    this._fetchGist(this.props.gistId)
  },
  render: function(){
    return (
      <div>
        <div className={"loading " + (this.state.loading?"":"hidden") }>
          <img width="100%" src="http://jxnblk.com/loading/loading-cylon-red.svg"/>
        </div>
        <div dangerouslySetInnerHTML={{
            __html: this.state.gist.get('div')
          }}>
        </div>
      </div>
    )
  },
  componentWillReceiveProps: function(nextProps){
    this.setState(loadingState)
    this._fetchGist(nextProps.gistId)
  },
  _fetchGist: function(id){
    return gist.view(id).then((data)=>{
      this.setState({
        gist: data,
        loading: false
      })
    })
  }
  
});

module.exports = GistDetail;
