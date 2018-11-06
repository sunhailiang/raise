pragma solidity ^0.4.24;

import "./fundingContract.sol";
import "./investorToFundings.sol";
//对外只暴露工厂
contract FundingFactory {
    //众筹项目的地址的集合
    address[] public fundingContractArray;
    //当前账户发起多个众筹的集合
    mapping(address => address[]) public creatorFundingMap;
    //众筹平台的提供者
    address public platformProvider; //部署使用

    //========引用自investorToFundings==========
    InvestorToFundings itf;
    //========引用自investorToFundings==end==========

    constructor()public{
        platformProvider = msg.sender;
        //实例化investorToFundings
        address itfAddress = new InvestorToFundings();
        //显式类型转换
        itf = InvestorToFundings(itfAddress);
    }
    //创建合约
    function createFunding(string _pName, uint _sBalance, uint _tBalance, uint _dInseconds) public {
        //创建新合约
        address fundingAddress = new FundingContract(_pName, _sBalance, _tBalance, _dInseconds, msg.sender,itf);
        //添加到合约几何中
        fundingContractArray.push(fundingAddress);
        //添加到当前创建者的合约集合中
        creatorFundingMap[msg.sender].push(fundingAddress);
    }
    //返回该众筹平台所有的合约
    function getAllFunding() public view returns (address[]){
        return fundingContractArray;
    }
    //返回当前账户的所有的合约
    function getCreatorFundingArray() public view returns(address[]) {
        return creatorFundingMap[msg.sender];
    }
    //获取当前参与者参与的所有的合约地址
    function getInvestorFundings() public view returns (address[]){
        return itf.getFundingsByInvestorAddress(msg.sender);
    }


}
