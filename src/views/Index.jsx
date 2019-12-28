import React, {Component} from 'react'
class Card extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            selectedKey: this.props.location.pathname, //选中
            openKey: '' //展开
        };
    }

    render() {
        return (
            <div>Index</div>
        )
    }
}

export default Card;
