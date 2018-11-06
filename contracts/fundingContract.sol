pragma solidity ^0.4.24;

import "./investorToFundings.sol";

contract FundingContract {

    //发起人
    address public creator;
    //项目名称
    string public projectName;
    //参与的众筹金额
    uint public supportBalance;
    //众筹目标金额
    uint public targetBalance;
    //截止日期
    uint public endTime;
    //参与的投资人
    address[] public investors;

    //========引用自investorToFundings==========
    InvestorToFundings itf;
    //========引用自investorToFundings==end==========

    //=======初始化=========
    constructor(string _projectName, uint _supportBalance, uint _targetBalance, uint _durationInseconds, address _creator, InvestorToFundings _itf)public{

        creator = _creator;
        //创建工厂时传进来当前的
        projectName = _projectName;
        supportBalance = _supportBalance;
        targetBalance = _targetBalance;
        //传进剩余的秒-假如30天:30*24*60*60=2592000
        endTime = now + _durationInseconds;
        //将传过来的变量赋值
        itf = _itf;
    }

    //mapping的特点是所有的key都默认存在，只不过默认值是false
    mapping(address => bool) public investorExistMap;//标记一个人是否参与了当前的众筹
    function invest() public payable {
        //支持固定金额
        require(!investorExistMap[msg.sender]);
        //众筹一次
        //将参与用户添加到参与者数组中
        investors.push(msg.sender);
        //  标记当前账户为参与人
        investorExistMap[msg.sender] = true;
        //将当此合约添加到当前参与者的数组中
        itf.pushFundingToInvestorMap(msg.sender,this);

    }

    //众筹失败退款
    function drawBack() public onlyCreator {
        for (uint i = 0; i < investors.length; i++) {
            investors[i].transfer(supportBalance);
        }
    }
    //查看当前合约余额
    function getCurrentBalance() public view returns (uint){
        //this代表当前的合约
        return address(this).balance;
    }
    //返回所有参与者
    function getInvestors() public view returns (address[]){
        return investors;
    }

    //资金消费请求
    enum RequestStatus {Voting, Approved, Completed}//用枚举定义当前请求的状态//投票中，已批准，已完成

    struct Request {
        string purpose;//用途
        uint cost;//花费多少
        address shopAddress;//跟谁交易
        uint voteCount;//投票数量
        mapping(address => bool) investorVotedMap;//投票人的集合，mapping的作用key不重复，防止多次投票
        RequestStatus status;
    }

    //可能多次请求
    Request[] public requests;
    //请求消费的函数
    function createRequest(string _purpose, uint _cost, address _shopAddress) onlyCreator public {
        Request memory request = Request({
            purpose : _purpose,
            cost : _cost,
            shopAddress : _shopAddress,
            voteCount : 0,
            status : RequestStatus.Voting //初始化状态：默认投票中
            });
        //添加到交易请求集合
        requests.push(request);
    }

    //批准支付申请
    function approveRequest(uint index) public {
        //先确保是参与者
        require(investorExistMap[msg.sender]);
        //所引到特定的交易请求
        //storage指针传递
        Request storage request = requests[index];
        //确保每人一票
        require(!request.investorVotedMap[msg.sender]);
        //如果当前投票活动没有完成，继续投票
        require(request.status == RequestStatus.Voting);
        //票数+1
        request.voteCount++;
        //将当前用户标记成已经投票
        request.investorVotedMap[msg.sender] = true;

    }

    //执行花费请求
    function finalizeRequest(uint index) public onlyCreator {
        Request storage request = requests[index];
        //判断金额是否充足
        require(address(this).balance > request.cost);
        //赞成人数过半
        require(request.voteCount * 2 > investors.length);
        //转账
        request.shopAddress.transfer(request.cost);
        //更新状态，已完成
        request.status = RequestStatus.Completed;

    }

    //权限控制：1,创建花费申请。2，完成花费申请。3,完成花费申请
    modifier onlyCreator(){
        require(msg.sender == creator);
        _;
    }


    //========辅助函数==========
    //返回参与人数
    function getInvotestorsCount() public view returns (uint){
        return investors.length;
    }
    //返回众筹剩余时间
    function getRemainTime() public view returns (uint){
        return (endTime - now) / 60 / 60 / 24;
        //天数
    }
    //返回花费申请数量
    function getRequestsCount() public view returns (uint){
        return requests.length;
    }
    //返回某一个花费的具体信息
    function getRequestDetailByIndex(uint index) public view returns (string, uint, address, bool, uint, uint){
        //索引数据不越界
        require(index < requests.length);
        Request storage req = requests[index];
        bool isVoted = req.investorVotedMap[msg.sender];
        return (req.purpose, req.cost, req.shopAddress, isVoted, req.voteCount, uint(req.status));
    }

}
