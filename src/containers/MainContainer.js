import React, {Component, Fragment} from 'react';
import Dropdown from "../components/Dropdown";
import selectUpOrange from "./svg/selectboxuporange.svg";
import selectDown from "./svg/selectboxdown.svg";
import selectDownOrange from "./svg/selectboxdownorange.svg";
import dropdownStar from "./svg/dropdownstar.svg";
import styles from "./styles.scss";
import CheckBox from "../components/CheckBox";
import Search from "../components/Search";


class MainContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[
				{mid:1,merchant:"hepsiburada",merchantRating:"9,5",comments:[
						{content:"1",date:23,mostRating:2111,rating:5},
						{content:"2",date:223,mostRating:221,rating:5},
						{content:"3",date:3,mostRating:231,rating:4}
					]},
				{mid:2,merchant:"merchant1",merchantRating:"9,1",comments:[
						{content:"4",date:1,mostRating:241,rating:1},
						{content:"5",date:2,mostRating:2511,rating:3},
						{content:"6",date:21213,mostRating:216,rating:5},
						{content:"7",date:2143,mostRating:271,rating:2},
						{content:"8",date:2153,mostRating:281,rating:4}
					]},
				{mid:3,merchant:"merchant2",merchantRating:"8,8",comments:[
						{content:"9",date:2163,mostRating:291,rating:1},
						{content:"10",date:2173,mostRating:210,rating:1}
					]},
			],
			visibleRating:false,
			visibleMerchant:false,
			rateFilter:[],
			merchantFilter:[],
			merchantSearchValue:"",
		};
	}

	changeVisible = (visible) => {
		const {visibleMerchant,visibleRating} = this.state;
		if (visible==="rating") {
			this.setState({visibleRating:!visibleRating, visibleMerchant: false})
		}
		else if (visible==="merchant") {
			this.setState({visibleRating:false, visibleMerchant: !visibleMerchant})
		}
	};

	changeMerchantSearchValue=(e)=>{
		this.setState({[e.target.name]:e.target.value})
	};

	merchantSearch = () => {
		const {merchantSearchValue,data}=this.state;
		return data.filter(data => new RegExp(`${merchantSearchValue}`,"i").test(data.merchant));
	};


	filterRating=()=>{
		const {rateFilter} = this.state;
		if (rateFilter.length>0) {
			return this.filterMerchant().map(data=>data.comments.filter(comments=>rateFilter.includes(comments.rating)))
		}
		else {
			return this.filterMerchant()
		}
	};

	filterMerchant=()=>{
		const {data,merchantFilter} = this.state;
		if (merchantFilter.length>0){
			return data.filter(data=>merchantFilter.includes(data.mid))
		}
		else {
			return data
		}
	};

	changeRatingFilterCheckbox=(e)=>{
		const {rateFilter} = this.state;
		if (e.target.checked) {
			rateFilter.push(e.target.value*1)
		}
		else {
			rateFilter.pop(e.target.value*1)
		}
		this.setState({rateFilter: rateFilter})
	};

	changeMerchantFilterCheckbox=(e)=>{
		const {merchantFilter} = this.state;
		if (e.target.checked) {
			merchantFilter.push(e.target.value*1)
		}
		else {
			merchantFilter.pop(e.target.value*1)
		}
		this.setState({merchantFilter: merchantFilter})
	};

	render() {
		const {visibleMerchant, visibleRating, labelText, data, merchantSearchValue, rateFilter, merchantFilter} = this.state;
		const rating=[
			{rating:5,text:"Çok iyi"},
			{rating:4,text:"İyi"},
			{rating:3,text:"Ne iyi / Ne kötü"},
			{rating:2,text:"Kötü"},
			{rating:1,text:"Çok kötü"}
		];
		console.log(this.filterRating());
		return (
			<Fragment>
				<Dropdown labelText={"Filtrele"}>
					<div key={0} className={styles.dropdownMain}>
						<div className={styles.dropdownFilter} onClick={()=>this.changeVisible("rating")}>
							<div style={visibleRating || rateFilter.length>0 ? {color:"#ff6000"}:null} className={styles.dropdownTextFilter}>Ürün Puanı</div>
							<div style={rateFilter.length>0?{visibility:"visible"}:null} className={styles.dropdownCount}>{rateFilter.length}</div>
							<img className={styles.dropdownImgFilter} src={visibleRating ? selectUpOrange : rateFilter.length>0 ? selectDownOrange : selectDown} alt=""/>
						</div>
						<div style={visibleRating ? {display:"flex"}:null} className={styles.dropdownFilterContentContainer}>
							{
								rating.map((data, index)=>{
									return (
										<label key={index} className={styles.dropdownFilterContent}>
											<div className={styles.dropdownFilterContentCheckBox}>
												<CheckBox
													onchange={this.changeRatingFilterCheckbox}
													value={data.rating}
												/>
											</div>
											<div className={styles.dropdownFilterContentText}>{data.text}</div>
											<div className={styles.dropdownFilterContentImgContainer}>
												<img className={styles.dropdownFilterContentImg} src={dropdownStar} alt=""/>
												{data.rating}
											</div>
										</label>
									)
								})
							}
						</div>
					</div>
					<div key={1} className={styles.dropdownMain}>
						<div className={styles.dropdownFilter} onClick={()=>this.changeVisible("merchant")}>
							<div style={visibleMerchant || merchantFilter.length>0 ? {color:"#ff6000"}:null} className={styles.dropdownTextFilter}>Satıcı</div>
							<div style={merchantFilter.length>0?{visibility:"visible"}:null} className={styles.dropdownCount}>{merchantFilter.length}</div>
							<img className={styles.dropdownImgFilter} src={visibleMerchant ? selectUpOrange : merchantFilter.length>0 ? selectDownOrange : selectDown} alt=""/>
						</div>
						<div style={visibleMerchant ? {display:"flex",height:"288px",width:"326px"}:{height:"288px",width:"326px"}} className={styles.dropdownFilterContentContainer}>
							<Search
								value={merchantSearchValue}
								placeholder={"Filtrele"}
								onChange={this.changeMerchantSearchValue}
								name={"merchantSearchValue"}
							/>
							{
								this.merchantSearch().map((data, index)=>{
									return (
										<label style={{height:"24px",width:"296px"}} key={index} className={styles.dropdownFilterContent}>
											<div className={styles.dropdownFilterContentCheckBox}>
												<CheckBox
													onchange={this.changeMerchantFilterCheckbox}
													value={data.mid}
												/>
											</div>
											<div style={{width:"209px"}} className={styles.dropdownFilterContentText}>{data.merchant} ({data.comments.length})</div>
											<div className={styles.dropdownFilterContentMerchantRate}>
												{data.merchantRating}
											</div>
										</label>
									)
								})
							}
							<div style={{minHeight:"500px"}}>sad</div>
						</div>
					</div>
				</Dropdown>
			</Fragment>
		);
	}
}

export default MainContainer;