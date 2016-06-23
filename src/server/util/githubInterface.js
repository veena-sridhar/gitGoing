//var Promise = require('es6-promise').polyfill();
var Promise = require('bluebird');
var fetch = require('isomorphic-fetch');

exports.getUsername = function (accessToken) {
  var userTokenURL = 'https://api.github.com/user?access_token=' + accessToken;
  fetch(userTokenURL)
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error('There was an error recognizing your username');
      }
      return response;
    });
};

exports.getRepositoryData = function (username) {
  var repositoryEndpoint = 'https://api.github.com/users/' + username + '/repos';
  return fetch(repositoryEndpoint)
    .then(function (response) {
      if (response.status >= 400) {
        return Promise.reject('There was an error in retrieving your repos from the server.');
      }
      return response.json();
    })
    .then(function(json) {
      return Promise.resolve(json);
    });
};

exports.getBranchesData = function (username, repo, path) {
  var endpoint = 'https://api.github.com/repos/'+username +'/'+repo +'/branches';
  fetch(endpoint)
    .then(function (response) {
      if (response.status >= 400) {
        return Promise.reject('There was an error in retrieving your branches from the server.');
      }
      return response.json();
    })
    .then(function (json) {
      return Promise.resolve(json);
    });
};

exports.getBranchData = function (username, repo, path) {
  var { branch } = path;
  var endpoint = 'https://api.github.com/repos/'+username +'/'+repo +'/branches/' + branch;
  fetch(endpoint)
    .then(function (response) {
      if (response.status >= 400) {
        return Promise.reject('There was an error in retrieving your branches from the server.');
      }
      return response.json();
    })
    .then(function (json) {
      return Promise.resolve(json);
    });
};

exports.getFileTreeData = function (username, repo, path) {
  var {sha} = path;
  var endpoint = 'https://api.github.com/repos/' + username + '/' + repo + '/git/trees/' + sha;
  fetch(endpoint)
    .then(function (response) {
      if (response.status >= 400) {
        return Promise.reject('There was an error in getting your files from GitHub.');
      }
      return response.json();
    })
    .then(function (json) {
      return Promise.resolve(json);
    });
};

exports.getFileContents = function (username, repo, path) {
  var {repo, file} = path
  var endpoint = 'https://api.github.com/repos/' + username + '/' + repo + '/contents/' + file;
  fetch(endpoint)
    .then(function () {
      if (response.status >= 400) {
        return Promise.reject('There was an error loading the file contents.');
      }
      return response.json();
    })
    .then(function(json) {
      return Promise.resolve(json);
    });
};