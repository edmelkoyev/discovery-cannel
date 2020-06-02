
import React, { PureComponent } from 'react'

const getLaunchId = () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get('launchId')
}

class TabBuilder extends PureComponent {
    constructor (props) {
        super(props)
        this.handleSetKey = this.handleSetKey.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    componentDidMount(){
        const launchIdKey = getLaunchId()
        localStorage[launchIdKey] = JSON.stringify({status: 'progress'})
    }

    handleSetKey(){
        const launchIdKey = getLaunchId()

        const masterAssessmentId = `qset-${(parseInt(Math.random() * 1e8)).toString(16)}`
        const masterAssessmentTitle = `Title for ${launchIdKey}`

        localStorage[launchIdKey] = JSON.stringify({masterAssessmentId, masterAssessmentTitle, status: 'ok'})
    }

    handleCancel(){
        const launchIdKey = getLaunchId()
        localStorage[launchIdKey] = JSON.stringify({status: 'cancel'})
    }

    render () {
        return (
            <>
                <h2>WAS AG Builder Application</h2>
                <button onClick={this.handleSetKey}>Create new AG</button>
                <button onClick={this.handleCancel}>Cancel</button>
            </>
        )
    }
}

export default TabBuilder;