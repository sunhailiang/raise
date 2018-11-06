import React from 'react';
import {ReactDOM} from "react-dom"
import {getAllFundingDetailArray} from "../../eth/controller";
import CardExampleColored from "../common/CartList";
import JoinFundingForm from "../common/JoinFundingForm"

export default class AllFundingTab extends React.Component {
    constructor() {
        super()
        this.state = {
            AllFundingDetailArray: [],
            selectedFunding: {}
        }

    }

    async componentDidMount() {

        try {
            let AllFundingDetailArray = await getAllFundingDetailArray()
            this.setState({
                AllFundingDetailArray
            })

        } catch (e) {
            console.log("CreatorFundingTab err", e)
        }
    }

    onItemClick = (detail) => {
        this.setState({
            selectedFunding: detail
        })
    }

    render() {
        return (
            <div>
                <CardExampleColored details={this.state.AllFundingDetailArray} onItemClick={this.onItemClick}/>
                <JoinFundingForm detail={this.state.selectedFunding}/>
            </div>
        )
    }
}