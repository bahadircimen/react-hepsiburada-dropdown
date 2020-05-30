import React, {Component} from 'react';
import styles from "./styles.scss";
import selectDownOrange from "../../containers/svg/selectboxdownorange.svg"
import dropdownStar from "../../containers/svg/dropdownstar.svg"
import selectDown from "../../containers/svg/selectboxdown.svg"
import selectUpOrange from "../../containers/svg/selectboxuporange.svg"
import {DropdownContainer} from "@cosmos/dropdown/src/Dropdown.styled";
import CheckBox from "../CheckBox";



class Dropdown extends Component {

    render() {
        const {children, labelText} =this.props
        return (
            <div className={styles.dropdownContainer}>
                {
                    labelText && <label className={styles.dropdownLabel}>{labelText}</label>
                }
                <div className={styles.dropdownMainContainer}>
                    {children}
                </div>
            </div>
        );
    }
}

export default Dropdown;