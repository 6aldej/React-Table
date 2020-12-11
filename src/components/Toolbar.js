import React, { Component } from 'react';

export default class Toolbar extends Component {
	constructor(props) {
		super(props);
		this.sorted = {
			id: false,
			firstName: true,
			lastName: true,
			email: true,
			phone: true,
		};
		this.sortColl = '';
		this.sortDirection = 1;
	}

	sort(type) {
		const { update, data } = this.props;
		const isSorted = this.sorted[type];

		let direction = isSorted ? 1 : -1;

		const sorted = [].slice.call(data).sort((a, b) => {
			if (a[type] === b[type]) {
				return 0;
			}
			return a[type] > b[type] ? direction : direction * -1;
		});

		this.sorted[type] = !isSorted;
		this.sortColl = type;
		this.sortDirection = direction;

		update({
			currentData: sorted,
			active: null,
			isSorted: true,
		});
	}

	drowSortTreangle(type) {
		if (this.sortColl === type && this.props.isSortedFlag) {
			return this.sortDirection === -1 ? '▼' : '▲';
		}
		return '';
	}

	render() {
		return (
			<thead>
				<tr>
					<th onClick={() => this.sort('id')}>
						id {this.drowSortTreangle('id')}
					</th>
					<th onClick={() => this.sort('firstName')}>
						firstName {this.drowSortTreangle('firstName')}
					</th>
					<th onClick={() => this.sort('lastName')}>
						lastName {this.drowSortTreangle('lastName')}
					</th>
					<th onClick={() => this.sort('email')}>
						email {this.drowSortTreangle('email')}
					</th>
					<th onClick={() => this.sort('phone')}>
						phone {this.drowSortTreangle('phone')}
					</th>
				</tr>
			</thead>
		);
	}
}