
import React, { PureComponent } from 'react'

class TabBuilder extends PureComponent {
    constructor (props) {
        super(props)
        this.handleSetKey = this.handleSetKey.bind(this)
    }

    handleSetKey(){
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const launchIdKey = urlParams.get('launchId')

        localStorage[launchIdKey] = `qset-${(parseInt(Math.random() * 1e8)).toString(16)}`
    }

    render () {
        return (
            <>
                <h2>WAS AG Builder Application</h2>
                <button onClick={this.handleSetKey}>Create new AG</button>
            </>
        )
    }
}

export default TabBuilder;