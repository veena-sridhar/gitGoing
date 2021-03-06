import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/theme/github';
import 'brace/mode/javascript';
import fetch from 'isomorphic-fetch';
import * as $ from 'jquery';


export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.ui.editorText
    };
    props.listenToOutwardFileUpdate(this.outwardEdit.bind(this));
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      text: newProps.ui.editorText
    });
  }

  outwardEdit(message) {
    if(this.props.ui.currentFilePath === message.path &&
      this.props.ui.currentCommitSha === message.sha) {
      this.setState({
        text: message.content,
      })
    }
  }

  commit() {
    const path = {
      roomId: this.props.roomid,
      commitSha: this.props.ui.currentCommitSha,
      fileSha: this.props.ui.currentFileSha,
      filePath: this.props.ui.currentFilePath,
      branch: this.props.ui.currentBranchName 
    }
    this.props.commit(path, 'temp commit message');
  }

  change(newValue) {
    this.props.updateFile(newValue);
  }

  render() {
    return (
      <AceEditor
      width="100%"
      mode="javascript"
      theme="github"
      value={this.state.text} 
      onChange={this.change.bind(this)} />
    );
  }
}
