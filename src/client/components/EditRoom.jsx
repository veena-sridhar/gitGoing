import React from 'react';
import ReactDom  from 'react-dom';
import BranchView from './BranchingView.jsx';
import Editor from './Editor.jsx';
import RoomNotifications from './RoomNotifications.jsx';
import _ from 'underscore';

export default class EditRoom extends React.Component {
  constructor(props) {
    super(props);
    props.debugModeOn();

    if(_.isEmpty(props.room)) {
      props.getRoom(props.params.roomid);
    }
    if(_.isEmpty(props.user)) {
      props.getUser();
    }

    props.getBranches(props.params.roomid);
    props.initializeSocket(props.params.roomid);
  }

  componentWillReceiveProps (newProps) {
    if (this.props.user.username) {
      newProps.joinRoom(newProps.params.roomid, newProps.user.username);
    }
  }

  render() {
    return (
      <div>
        <RoomNotifications {...this.props}/>
        <BranchView {...this.props} roomid={this.props.params.roomid}/>
        <Editor ui={this.props.ui} 
        commit={this.props.commit} 
        roomid={this.props.params.roomid}
        updateFile = {this.props.updateFile}
        listenToOutwardFileUpdate = {this.props.listenToOutwardFileUpdate}/>
      </div>
    )
  }
}