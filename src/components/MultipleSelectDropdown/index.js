import React, {Component} from 'react';
import styles from "./styles.scss"

class MultipleSelectDropdown extends Component {
    constructor(props) {
        super(props);
        this.multipleSelectDropdown = React.createRef();
        this.state = {
            visibleContent:false,
        };
    }

    changeVisible = () => {
        const {onClick} = this.props;
        const {visibleContent} = this.state;
        this.setState({visibleContent : !visibleContent});
        onClick();
    };

    render() {
        const {visibleContent} = this.state;
        const {dropdownButton} = this.props;
        return (
            <div className={styles.multipleSelectDropdown}>
                <div onClick={this.changeVisible} ref={this.multipleSelectDropdown}>
                    {dropdownButton}
                </div>
                {visibleContent ? this.props.children :null}
            </div>
        );
    }
}

export default MultipleSelectDropdown;