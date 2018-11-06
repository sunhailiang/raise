import web3 from "../utils/getWeb3"
import contracts from "./contract"

//获取当前用户创建的合约的集合
const getCreatorFundingDetailArray = async () => {
    try {
        let accounts = await web3.eth.getAccounts();
        //获取当前用户创建的所有众筹
        let fundingArray = await  contracts.fundingFactoryContract.methods.getCreatorFundingArray().call({from: accounts[0]});
        let fundingDetailArr = []
        for (let i = 0; i < fundingArray.length; i++) {
            fundingDetailArr.push(await getFundingDetail(fundingArray[i]))
        }
        //返回获取到的数组
        return fundingDetailArr
    } catch (e) {
        console.log("getCreatorFundingArray err", e);
    }
}
//获取所有合约
const getAllFundingDetailArray = async (investorAddress) => {
    try {

        let fundingDetailArr = []
        let accounts = await web3.eth.getAccounts();
        if (investorAddress) {
            let VestefundingArray = await  contracts.fundingFactoryContract.methods.getInvestorFundings().call({from: accounts[0]})
            for (let i = 0; i < VestefundingArray.length; i++) {
                fundingDetailArr.push(await getFundingDetail(VestefundingArray[i]))
            }
        } else {
            let fundingArray = await  contracts.fundingFactoryContract.methods.getAllFunding().call()
            for (let i = 0; i < fundingArray.length; i++) {
                fundingDetailArr.push(await getFundingDetail(fundingArray[i]))
            }
        }

        //返回获取到的数组
        return fundingDetailArr

    } catch (e) {

    }
}
//获取集合的详细信息---根据检索出的地址查询详细数据
let getFundingDetail = async (fundingAddress) => {
    try {
        let contractInstance = contracts.NewFundingContract();
        contractInstance.options.address = fundingAddress;
        let projectName = await  contractInstance.methods.projectName().call()
        let creator = await  contractInstance.methods.creator().call()
        let supportBalance = await contractInstance.methods.supportBalance().call()
        let targetBalance = await  contractInstance.methods.targetBalance().call()
        let endTime = await contractInstance.methods.endTime().call()
        let currentBalance = await  contractInstance.methods.getCurrentBalance().call()
        let investorCount = await  contractInstance.methods.getInvotestorsCount().call()
        return {
            projectName,
            creator,
            supportBalance,
            targetBalance,
            endTime,
            currentBalance,
            investorCount,
            fundingAddress
        }

    } catch (e) {
        console.log("getFundingDetail err", e)
    }

}
//创建众筹
const createFunding = async (projectName, supportBalance, targetBalance, duration) => {
    try {
        let accounts = await  web3.eth.getAccounts();
        let res = await contracts.fundingFactoryContract.methods.createFunding(projectName, supportBalance, targetBalance, duration).send({
            from: accounts[0]
        })
        return res

    } catch (e) {
        console.log("createFunding", e)
    }
}

//参与众筹
const investFunding = async (fundingAddress, supportBalace) => {
    console.log("那栋收据？", fundingAddress, supportBalace)
    try {
        let accounts = await web3.eth.getAccounts();
        let fundingContract = contracts.NewFundingContract()
        //根据address指向固定合约
        fundingContract.options.address = fundingAddress;
        //调用合约方法，发起众筹
        let res = await  fundingContract.methods.invest().send({
            from: accounts[0],
            value: supportBalace
        })
        return res

    } catch (e) {

    }
}
export {
    getCreatorFundingDetailArray,
    getAllFundingDetailArray,
    createFunding,
    investFunding

}