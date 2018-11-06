import React from 'react';
import {ReactDOM} from "react-dom"
import {getCreatorFundingDetailArray} from "../../eth/controller"
import CardExampleColored from "../common/CartList";
import FundingForm from "../common/FundingForm"
export default class CreatorFundingTab extends React.Component {
    constructor() {
        super()
        this.state={
            CreatorFundingDetailArray:[]
        }

    }

    async componentDidMount() {
       try{
           let CreatorFundingDetailArray=await getCreatorFundingDetailArray()
           this.setState({
               CreatorFundingDetailArray
           })

       }catch(e){
           console.log("CreatorFundingTab err",e)
       }

    }

    render() {
        return (
            <div>
                <CardExampleColored details={this.state.CreatorFundingDetailArray}/>
                <FundingForm/>
            </div>
        )
    }
}