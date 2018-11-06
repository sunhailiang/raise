import React from 'react';
import {ReactDOM} from "react-dom"
import {Dimmer, Form, Label, Loader, Segment} from 'semantic-ui-react'
import {createFunding} from "../../eth/controller"


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

    //创建众筹
    handleCreate = async () => {
        this.setState({active: true});
        try {
            const {projectName, supportBalance, targetBalance, duration} = this.state
            let result = await createFunding(projectName, supportBalance, targetBalance, duration)
            console.table(result)
            this.setState({
                active: false
            })

        } catch (e) {
            this.setState({active: false});
            console.log('handleCreate error :', e);
        }
    }

    async componentDidMount() {

    }

    //
    render() {
        const {active, projectName, supportBalance, targetBalance, duration} = this.state

        return (
            <div style={{marginTop: "100px"}}>
                <h3>发起众筹</h3>
                <div>
                    <Dimmer.Dimmable as={Segment} dimmed={active}>
                        <Dimmer active={active} inverted>
                            <Loader>Loading</Loader>
                        </Dimmer>
                        <Form onSubmit={this.handleCreate}>
                            <Form.Input required type='text' placeholder='项目名称' name='projectName'
                                        value={projectName} label='项目名称:'
                                        onChange={this.handleChange}/>
                            <Form.Input required type='text' placeholder='支持金额' name='supportBalance'
                                        value={supportBalance} label='支持金额:'
                                        labelPosition='left'
                                        onChange={this.handleChange}>
                                <Label basic>￥</Label>
                                <input/>
                            </Form.Input>

                            <Form.Input required type='text' placeholder='目标金额' name='targetBalance'
                                        value={targetBalance}
                                        label='目标金额:'
                                        labelPosition='left'
                                        onChange={this.handleChange}>
                                <Label basic>￥</Label>
                                <input/>
                            </Form.Input>
                            <Form.Input required type='text' placeholder='目标金额' name='duration' value={duration}
                                        label='众筹时间:'
                                        labelPosition='left'
                                        onChange={this.handleChange}>
                                <Label basic>S</Label>
                                <input/>
                            </Form.Input>
                            <Form.Button primary content='创建众筹'/>
                        </Form>
                    </Dimmer.Dimmable>
                </div>
            </div>
        )
    }
}