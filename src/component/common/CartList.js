import React from 'react'
import {Card, Image, List, Progress} from 'semantic-ui-react'

const CardExampleCard = (props) => {
    const {detail, onItemClick} = props;

    const {funding, projectName, creator, supportBalance, targetBalance, endTime, currentBalance, investorCount} = detail;
    let percentage = (currentBalance / targetBalance) * 100;
    return (
        <div>
            <Card onClick={() => onItemClick && onItemClick(detail)}>
                <Image src='/images/bg.png'/>
                <Card.Content>
                    <Card.Header>{projectName}</Card.Header>
                    <Card.Meta>
                        <span>剩余时间:{endTime}秒</span>
                        <Progress indicating percent={percentage} size='small' progress/>
                    </Card.Meta>
                    <Card.Description>不容错过</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <List divided horizontal style={{display: 'flex', justifyContent: 'space-around'}}>
                        <List.Item>
                            <List.Content>
                                <List.Header>已筹</List.Header>
                                <List.Description>{currentBalance}wei</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>已达</List.Header>
                                <List.Description>{percentage}%</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>参与人数</List.Header>
                                <List.Description>{investorCount}人</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
        </div>
    )
}


const CardExampleColored = (props) => {

    //注意let不行！！！
    // let {details} = props;
    const {details, onItemClick} = props;
    let cardsFinal = details.map(detail => {
        return <CardExampleCard key={detail.fundingAddress} detail={detail} onItemClick={onItemClick}/>
    })

    return (
        <Card.Group itemsPerRow={4}>
            {
                cardsFinal
            }
        </Card.Group>
    )
}


export default CardExampleColored;