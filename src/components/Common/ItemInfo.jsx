import { Form, FormGroup, Label, Input, Col } from 'reactstrap'
import React from 'react'
import toastr from 'toastr';
import './style.css'

function get_ev(pot, bet, call, equity, foldeq) {
    pot = Number(pot)
    bet = Number(bet)
    call = Number(call)
    equity= Number(equity)
    foldeq = Number(foldeq)
    console.log('get_ev ', pot, bet, call, equity, foldeq);
    let eq_vil = 1 - equity;
    let pct_vil_call = 1 - foldeq;
    let ev = foldeq * pot + (1 - foldeq) * (equity * (pot + call) - (1 - equity) * bet);
    return Math.round(ev*100)/100 ;
}


class EVCalc extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pot: 100,
            bet: 60,
            call: 60,
            bet_call: true,
            equity: 0.3,
            fold_equity: 0.55,
            ev: 0
        }
    }

    componentDidMount() {
        this.handleChange()
    }

    handleChange(event) {
        let s = {}
        if (event) {
            console.log(event.target.value)
            if (event.target.name == 'bet_call') {
                this.setState({ bet_call: event.target.checked })
                return
            }
            let value = event.target.value
            s[event.target.name] = value
            if (event.target.name == 'bet' && this.state.bet_call) {
                s['call'] = value
            }
        }
        console.log(s)
        this.setState(s)
        console.log(this.state)
        let ev = get_ev(this.state.pot, this.state.bet, this.state.call, this.state.equity, this.state.fold_equity)
        //ev = Math.round(ev * 100) / 100
        console.log(ev)
        this.setState({ ev: ev })
    }

    render() {
        let ev = get_ev(this.state.pot, this.state.bet, this.state.call, this.state.equity, this.state.fold_equity)
        if(isNaN(ev)){
            ev = ''
        }
        return <div><table>
            <tr>
                <td>
                    <Col sm={4}>
                        <dl className="ev">
                            <dt>Pot</dt>
                            <dd>
                                <Input name="pot" value={this.state.pot} onChange={this.handleChange.bind(this)} />
                            </dd>
                            <dt>Bet</dt>
                            <dd>
                                <Input name="bet" value={this.state.bet} onChange={this.handleChange.bind(this)} />
                            </dd>
                            <dt>Call</dt>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" defaultChecked={this.state.bet_call} name="bet_call" onChange={this.handleChange.bind(this)} />Equal to Bet
                            </Label>
                            </FormGroup>
                            <dd>
                                <Input name="call" value={this.state.call} onChange={this.handleChange.bind(this)} />

                            </dd>

                            <dt>Equity</dt>
                            <dd>
                                <Input name="equity" value={this.state.equity} onChange={this.handleChange.bind(this)} />

                            </dd>
                            <dt>FoldEq</dt>
                            <dd>
                                <Input name="fold_equity" value={this.state.fold_equity} onChange={this.handleChange.bind(this)} />
                            </dd>
                        </dl>
                        <div>
                        </div>
                    </Col>
                </td>
                <td>
                    <Col sm={4} className="result">EV=
                        {ev}
                    </Col>
                </td>
        </tr>
        
        </table>
        <div>
            foldeq * pot + ( 1 - foldeq ) * ( equity * ( pot + call ) - ( 1 - equity ) * bet) = ev
            <br />
        {this.state.fold_equity} * {this.state.pot} + ( 1- {this.state.fold_equity} ) * ( {this.state.equity}
        * ( {this.state.pot} + {this.state.call}) - ( 1 - {this.state.equity} ) * {this.state.bet} ) = {this.state.ev}
        </div>
        </div>
    }
}

class ItemView extends React.Component {

    render() {
        return <pre>{JSON.stringify(this.props, null, 2)}</pre>
    }
}


class ItemInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = { item: null }

        let item_id = this.props.match.params.itemId
        this.props.action.getSingleAction(this.props.objectKey, this.props.match.params.itemId).then(() => {
            for (let item of this.props.api_data[this.props.objectKey].data) {
                if (item.id === item_id) {
                    this.setState({ item: item })
                    break;
                }
            }
        })
    }

    render() {

        if (!this.state.item) {
            return <div><EVCalc /></div>
        }
        return <ItemView item={this.state.item} />
    }
}

export default ItemInfo