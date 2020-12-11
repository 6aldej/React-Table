import React, { Component } from 'react';
import UserData from './UserData';
import load from '../img/load.gif';

export default class Pagination extends Component {
	constructor(props) {
		super(props);

		this.currentPage = this.props.currentPage;
		this.currentSetOfItems = this.props.data;
		this.handleClick = this.handleClick.bind(this);
		this.pageNumbers = [];
		this.renderPageNumbers = [];
		this.users = [];
		this.dataPerPage = 50;
	}

	updateCurrentSet() {
		const { data, currentPage, update } = this.props;

		if (data != null) {
			const indexOfLastItem = currentPage * this.dataPerPage;
			const indexOfFirstItem = indexOfLastItem - this.dataPerPage;

			this.currentSetOfItems = data.slice(indexOfFirstItem, indexOfLastItem);

			this.pageNumbers = [];
			this.renderPageNumbers = [];
			for (let i = 1; i <= Math.ceil(data.length / this.dataPerPage); i++) {
				this.pageNumbers.push(i);
			}

			this.renderPageNumbers = this.pageNumbers.map(number => {
				return (
					<li
						className={number === currentPage ? 'page_item_active' : 'page_item'}
						key={number}
						id={number}
						onClick={this.handleClick}
					>
						{number}
					</li>
				);
			});

			this.users = this.currentSetOfItems.map((user, index) => {
				return (
					<UserData
						user={user}
						index={index}
						key={`user-${index}`}
						update={update}
					/>
				);
			});
		}
	}

	handleClick(event) {
		this.currentPage = Number(event.target.id);
		this.props.update({
			activePage: this.currentPage,
		});
	}

	render() {		
		if (this.props.flagLoad) {
			return (
				<tbody>
					<tr>
						<td colSpan="5" id='loading'>
							<img id="load" src={load} alt="loading..." />
							<p>Please stand by</p>
						</td>
					</tr>
				</tbody>
			);
		}

		this.updateCurrentSet();
		return (
			<tbody>
				{this.users}
				<tr>
					<td colSpan="5" className="index_pagin">
						<ul id="page-numbers" className="pagination">
							{this.renderPageNumbers}
						</ul>
					</td>
				</tr>
			</tbody>
		);
	}
}
