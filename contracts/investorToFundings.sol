pragma solidity ^0.4.24;

contract InvestorToFundings {

    //参与者所有的合约
    mapping(address => address[]) investorToFundingMap;
    //将参与的众筹合约添加到该用户的map中
    function pushFundingToInvestorMap(address investor, address fundingAddress) public {
        investorToFundingMap[investor].push(fundingAddress);
    }
    //获取指定用户参与的所有众筹
    function getFundingsByInvestorAddress(address investor) public view returns (address[]){
        return investorToFundingMap[investor];
    }
}
