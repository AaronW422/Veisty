import React, { Component } from 'react'
import { Menu, Button, Image, Icon, Container } from 'semantic-ui-react'
import axios from 'axios'

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = () => {
        console.log(Hello)
    }

    render() {

        return (
            <div>
                <Container>
                    <Menu fixed="top" borderless>
                        <Menu.Item header name="home" >
                            <Image
                                size="small"
                                src="/veist_logo.jpg"
                                style={{ marginRight: '1.5em' }}
                            />
                            <h2>Veisty</h2>
                        </Menu.Item>

                        <Menu.Menu position="right">
                            <Menu.Item className="item">
                                <Button compact onClick={this.handleClick}>Log In</Button>
                            </Menu.Item>
                        </Menu.Menu>

                    </Menu>
                </Container>
            </div >
        )
    }
}
