import { connect } from 'react-redux';
import * as getBranches from '../actions/getBranches.js';
import * as getCommits from '../actions/getCommits.js';
import * as user from '../actions/user.js'; 
import * as ui from '../actions/ui.js';
import * as fileTree from '../actions/getFileTree.js';
import * as fileAction from '../actions/file.js';
import BranchingView from '../components/BranchingView.jsx';
import * as debug from '../actions/debugMode.js';
import * as recursiveFileTree from '../actions/getFileTreeRecursively.js';

const mapStatetoProps = function (state) {
  const { user, branches, commits, room, ui, fileTree, file } = state;
  return {
    user,
    branches,
    commits,
    room,
    ui,
    fileTree,
    file,
  };
};

const mapDispatchtoProps = function(dispatch, ownProps) {
	return {
		getUser: function() {
		  dispatch(user.get());
		},
		getBranches: function(roomid) {
		  dispatch(getBranches.get(roomid));
		},
		getCommits: function(roomid){
			dispatch(getCommits.get(roomid));
		},
    getFileTree: function (roomid, sha) {
      dispatch(fileTree.get(roomid, sha));
    },
    getFile: function(roomid, sha, file) {
      dispatch(fileAction.get(roomid, sha, file));
    },
    getFileTreeRecursively: function (roomid, sha) {
      dispatch(recursiveFileTree.get(roomid, sha));
    },
    showBranches: function(display) {
      dispatch(ui.showBranches(display));
    },
    showCommits: function(display) {
      dispatch(ui.showCommits(display));
    },
    showFileStructure: function(display, commitSha) {
      dispatch(ui.showFileStructure(display, commitSha));
    },
    debugModeOn: function() {
      dispatch(debug.on());
    }
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(BranchingView);


