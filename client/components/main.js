import React, { Component } from 'react'
import { Container, Divider, Form, Image, Menu, Progress } from 'semantic-ui-react'
import axios from 'axios'
// import Navbar from './navbar'

const config = {
    headers: {
        'X-API-KEY': ''
    }
}

const rating = (stat) => {
    const group = Math.ceil(stat/20)
    switch (group) {
        case 1:
            return 'red'
        case 2:
            return 'orange'
        case 3:
            return 'yellow'
        case 4:
            return 'olive'
        case 5:
            return 'green'
    }
}

const fake_account = {
    Gevurztraminer: {
        name: 'Gevurztraminer',
        characters: []
    }
}
const fake_items = {
    riskrunner: {
        name: 'Riskrunner',
        rarity: 'Exotic',
        type: 'Submachine Gun',
        color: 'yellow',
        elemental: true,
        attack: [10, 300],
        impact: 20,
        rof: 900,
        range: 55,
        stability: 55,
        reload: 42,
        handling: 51,
        img: '/weapons/riskrunner.jpg'
    },
    enigmas_draw: {
        name: 'Enigma\'s Draw',
        rarity: 'Legendary',
        type: 'Sidearm',
        color: 'purple',
        elemental: false,
        attack: [10, 300],
        impact: 51,
        rof: 260,
        range: 55,
        stability: 54,
        reload: 28,
        handling: 39,
        img: '/weapons/enigmasdraw.jpg'
    },
    sunshot: {
        name: 'Sunshot',
        rarity: 'Exotic',
        type: 'Hand Cannon',
        color: 'yellow',
        elemental: true,
        attack: [10, 300],
        impact: 92,
        rof: 150,
        range: 38,
        stability: 46,
        reload: 75,
        handling: 83,
        img: '/weapons/sunshot.jpg'
    }
}

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            network: '',
            selected_weapon: 'riskrunner'
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleItemClick = this.handleItemClick.bind(this)

    }

    isDisabled = () => !this.state.username && !this.state.network
    handleChange = (evt, { name, value }) => this.setState({ [name]: value })
    handleItemClick = (e, { name }) => {
        this.setState({ selected_weapon: name })
        console.log(this.state)
    }
    handleSubmit = evt => {
        evt.preventDefault()
        const SEARCH_PLAYER = `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/${this.state.network}/${this.state.username}/`
        axios.get(SEARCH_PLAYER, config)
            .then(res => console.log(res))
    }

    render = () => {
        const {name, rarity, type, color, elemental, attack, impact, rof, range, stability, reload, handling, img } = fake_items[this.state.selected_weapon]

        return (
            <div >
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input label='Search for your username:' name='username' onChange={this.handleChange} />
                        <Form.Group label='Select your platform:'  >
                            <Form.Radio name='network' label='Xbox Live' value='1' checked={this.state.network === '1'} onChange={this.handleChange} />
                            <Form.Radio name='network' label='PlayStation Network' value='2' checked={this.state.network === '2'} onChange={this.handleChange} />
                            <Form.Radio name='network' label='Battle.net' value='4' checked={this.state.network === '4'} onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Button type='submit' positive>Submit</Form.Button>
                    </Form >
                    <Divider />
                    <h2>Equipment</h2>
                    <Menu >
                        <Menu.Item name='riskrunner' onClick={this.handleItemClick}>
                            <Image src={fake_items.riskrunner.img} />
                        </Menu.Item> 

                        <Menu.Item name='enigmas_draw' onClick={this.handleItemClick}>
                            <Image src={fake_items.enigmas_draw.img} />
                        </Menu.Item> 

                        <Menu.Item name='sunshot' onClick={this.handleItemClick}>
                            <Image src={fake_items.sunshot.img} />
                        </Menu.Item> 
                    </Menu> 
                        <h2>{name}</h2>
                        <h3>{rarity} {type}</h3>
                        <h4>Rounds Per Minute: {rof}</h4>

                        <div> 
                            <Progress color={rating(impact)} percent={impact}>Impact: {impact}</Progress>
                            <Progress color={rating(range)} percent={range}>Range: {range}</Progress>
                            <Progress color={rating(stability)} percent={stability}>Stability: {stability}</Progress>
                            <Progress color={rating(reload)} percent={reload}>Reload Speed: {reload}</Progress>
                            <Progress color={rating(handling)} percent={handling}>Handling: {handling}</Progress>
                        </div>
                </Container>
            </div>
        )
    }
}