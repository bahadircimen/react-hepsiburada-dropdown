import React, {Component} from 'react';
import styles from "./styles.scss"
import search from "./search.svg"

class Search extends Component {
    render() {
        const {value, placeholder, name, onChange} =this.props;
        return (
            <label className={styles.searchContainer}>
                <img className={styles.searchIcon} src={search} alt=""/>
                <input className={styles.search} placeholder={placeholder} value={value} name={name} onChange={onChange} type="text"/>
            </label>
        );
    }
}

export default Search;