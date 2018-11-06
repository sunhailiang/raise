import Web3 from "web3";

let web3;

if (typeof  window.web3 !== 'undefined') {
    console.log('found injected web3');
    web3 = new Web3(window.web3.currentProvider);
} else {
    console.log('found local web3');
    web3 = new Web3('http://localhost:7545');
}
export default web3;