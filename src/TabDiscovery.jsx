import React, { PureComponent } from 'react'

class TabDiscovery extends PureComponent {
    constructor (props) {
        super(props)
        
        this.state = {count: 0, tabCommunucation: undefined};
        this.handleStorageEvent = this.handleStorageEvent.bind(this)
        this.handleAgBulderWindow = this.handleAgBulderWindow.bind(this)
    }

    componentDidMount () {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        let launchId = `lid-${(parseInt(Math.random() * 1e8)).toString(16)}`

        if (urlParams.has('launchId')) {
            launchId = urlParams.get('launchId')
        }

        window.addEventListener('storage', this.handleStorageEvent, false)
        this.setState({listener: true, launchId})
        
    }

    componentWillUnmount (){
        if (this.builderWindow){
            this.builderWindow.close()
        }
        window.removeEventListener('storage', this.handleStorageEvent, false);
    }

    handleStorageEvent({key, newValue}) {
        const { count, launchId } = this.state

        if (key === launchId){
            const iCount = count + 1
            const tabCommunucationData = JSON.parse(newValue)
            console.log(tabCommunucationData)
            this.setState({completed: true, count: iCount, tabCommunucationData})


            // remove from storage
            // localStorage.removeItem (launchId);

            // close ag builder window 
            if (tabCommunucationData.status === 'cancel' || tabCommunucationData.status === 'ok'){
                this.builderWindow.close()
            }
        }
    }

    handleAgBulderWindow(){
        const { launchId } = this.state
        localStorage[launchId] = JSON.stringify({status: 'initial'})
        this.builderWindow = window.open(`/?launchId=${launchId}#builder`, "AG_BUILDER")
    }

    render () {
        const {
            tabCommunucation
        } = this.state

        return (
            <>
            <h2>WAS AG Discovery Application</h2>
            <hr />

            { (!tabCommunucation || !tabCommunucation.status) &&
                <button onClick={this.handleAgBulderWindow}>Open AG Builder</button>
            }

            {!!tabCommunucation && tabCommunucation.status === 'initial' &&
                <div>Assessment Builder: [1] INIT</div>
            }

            {!!tabCommunucation && tabCommunucation.status === 'progress' &&
                <div>Assessment Builder: [2] IN PROGRESS</div>
            }

            {!!tabCommunucation && tabCommunucation.status === 'cancel' &&
                <div>Assessment Builder: [3] CANCEL</div>
            }

            {!!tabCommunucation && tabCommunucation.status === 'ok' &&
                <div>Assessment Builder: [4] OK - `New Ag Id: ${this.state.newValue.masterAssessmentId}`}</div>
            }
        </>
        )
    }
}

export default TabDiscovery;