import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }
        // const [component, setComponent] = useState(null);

        componentDidMount () {
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        };

        // useEffect(() => {
            //         importComponent()
            //             .then(cmp => {
            //                 setComponent(cmp.default);
            //             });
            //     }, []);
        
        render () {
            const C = this.state.component;
            // const C = component;

            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;