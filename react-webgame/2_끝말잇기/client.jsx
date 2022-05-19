const React = require('react');
const ReactDOM = require('react-dom');
// class 버전
// const WordRelay = require('./WordRelay');

// hooks 버전
const WordRelay_hooks = require('./WordRelay_hooks');

// ReactDOM.render(<WordRelay />, document.querySelector('#root'));
ReactDOM.render(<WordRelay_hooks />, document.querySelector('#root'));