import React from 'react';
import {ReactDOM} from "react-dom"
import {Dimmer, Form, Label, Loader, Segment} from 'semantic-ui-react'
import {investFunding} from "../../eth/controller"


export default class FundingForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projectName: '',
            supportBalance: '',
            targetBalance: '',
            duration: '',
            active: false,
        }
    }

    //监听数据变化
    handleChange = (e, {name, value}) => this.setState({[name]: value})

    //参与众筹
    handleInvest = async () => {
        this.setState({active: true});
        try {
            const {fundingAddress, supportBalance} = this.props.detail
            let result = await investFunding(fundingAddress, supportBalance)

            this.setState({
                active: false
            })


        } catch (e) {
            this.setState({active: false});
            console.log('handleInvest error :', e);
        }
    }


    render() {
        const {active} = this.state

        return (
            <div style={{marginTop: "100px"}}>
                <h3>参与众筹</h3>
                <div>
                    <Dimmer.Dimmable as={Segment} dimmed={active}>
                        <Dimmer active={active} inverted>
                            <Loader>Loading</Loader>
                        </Dimmer>
                        <Form onSubmit={this.handleInvest}>
                            <Form.Input required type='text' placeholder='项目名称' name='projectName'
                                        value={this.props.detail.projectName || ""} label='项目名称:'
                                        onChange={this.handleChange}/>
                            <Form.Input required type='text' placeholder='项目地址' name='supportBalance'
                                        value={this.props.detail.fundingAddress || ""} label='项目地址:'
                                        onChange={this.handleChange}>
                                <input/>
                            </Form.Input>

                            <Form.Input required type='text' placeholder='参与金额' name='targetBalance'
                                        value={this.props.detail.supportBalance || ""}
                                        label='参与金额:'
                                        labelPosition='left'
                                        onChange={this.handleChange}>
                                <Label basic>￥</Label>
                                <input/>
                            </Form.Input>
                            <Form.Button primary content='参与众筹'/>
                        </Form>
                    </Dimmer.Dimmable>
                </div>
            </div>
        )
    }
}