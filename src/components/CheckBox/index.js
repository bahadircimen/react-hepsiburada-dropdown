import React, {Component} from 'react';
import styles from "./styles.scss";
import checkboxSelect from "./checkbox.svg"
import checkbox from "./checkbox1.svg"

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked:false,
        }
    }

    onChange = (event) =>{
        this.setState({ checked: event.target.checked})
        this.props.onchange(event);
    };

    render() {
        const {value}=this.props;
        const {checked}=this.state;
        return (
                <label className={styles.checkBox}>
                    <input className={styles.checkBoxInput} type="checkbox" value={value} checked={checked} onChange={this.onChange}/>
                    <img className={styles.checkBoxImg} src={checked ? checkboxSelect : checkbox} alt=""/>
                </label>
        );
    }
}

export default CheckBox;