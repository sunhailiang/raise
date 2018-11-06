import React from 'react';
import {ReactDOM} from "react-dom"
import {getAllFundingDetailArray} from "../../eth/controller";
import CardExampleColored from "../common/CartList";

export default class InvestorFundingTab extends React.Component {
    constructor() {
        super()
        this.state = {
            AllFundingDetailArray: [],
            selectedFunding: {}
        }

    }

    async componentDidMount() {
        try {
            let flag = true
            let AllFundingDetailArray = await getAllFundingDetailArray(flag)
            this.setState({
                AllFundingDetailArray
            })

        } catch (e) {
            console.log("CreatorFundingTab err", e)
        }

    }

    render() {
        return (
            <div>
                <div>
                    <CardExampleColored details={this.state.AllFundingDetailArray}/>
                </div>
            </div>
        )
    }
}