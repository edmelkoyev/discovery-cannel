import React, { PureComponent } from 'react'

class TabDiscovery extends PureComponent {
    constructor (props) {
        super(props)
        
        this.state = {count: 0};
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
            this.setState({completed: true, count: iCount, newValue})

            // remove from storage
            localStorage.removeItem (launchId);
            // close ag builder window 
            this.builderWindow.close()
        }
    }

    handleAgBulderWindow(){
        const { launchId } = this.state
        this.builderWindow = window.open(`/?launchId=${launchId}#builder`, "AG_BUILDER")
    }

    render () {
        return (
            <>
            <h2>WAS AG Discovery Application</h2>

            <button onClick={this.handleAgBulderWindow}>open AG Builder</button>
            {this.state.newValue && 
                <>
                    <hr />
                        <div>{`New Ag Id: ${this.state.newValue}`}<hr />
                    </div>
                </>
            }
        </>
        )
    }
}

export default TabDiscovery;