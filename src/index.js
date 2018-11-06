import React from 'react';
import ReactDOM from 'react-dom';
import web3 from "./utils/getWeb3";
import contracts from "./eth/contract"
import {Tab} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import AllFundingTab from "./component/allfunding/AllFundingTab"
import CreatorFundingTab from "./component/creatorfunding/CreatorFundingTab"
import InvestorFundingTab from "./component/investorfunding/InvestorFundingTab"

const panes = [
    {menuItem: '所有项目', render: () => <Tab.Pane><AllFundingTab/></Tab.Pane>},
    {menuItem: '我发起的项目', render: () => <Tab.Pane><CreatorFundingTab/></Tab.Pane>},
    {menuItem: '我参与的项目', render: () => <Tab.Pane><InvestorFundingTab/></Tab.Pane>},
]

const TabExampleBasic = () => <Tab panes={panes}/>

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            currentAccount: ""
        }
    }

    mounted = false

    async componentDidMount() {
        try {
            this.mounted = true
            let accounts = await  web3.eth.getAccounts()
            if (!this.mounted) return;
            this.setState({
                currentAccount: accounts
            })

            let fundingArray = await contracts.fundingFactoryContract.methods.getAllFunding().call({
                from: accounts[0]
            })
        } catch (e) {

        }

    }

    componentWillUnmount() {
        this.mounted = false
    }

    render() {
        return (
            <div>
                <TabExampleBasic/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));

