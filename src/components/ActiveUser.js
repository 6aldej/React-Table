import React from 'react';

const ActiveUser  = ({ data, active }) => {
	if (!data || !data[active]) {
		return '';
	}

	const user = data[active];

	return (
		<table className="user-info table table-responsive" id="user-active">
			<thead>
				<tr className="index_table">
					<td>The selected user: </td>
					<td><b>{user.firstName} {user.lastName}</b></td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colSpan="2">
						<p>Description:</p>
						<textarea
							rows="7"
							cols="50"
							readOnly="readonly"
							value={user.description}
						/>
					</td>
				</tr>
				<tr>
					<td>Residential address:</td>
					<td><b>{user.address.streetAddress}</b></td>
				</tr>
				<tr>
					<td>City:</td>
					<td><b>{user.address.city}</b></td>
				</tr>
				<tr>
					<td>Province/state:</td>
					<td><b>{user.address.state}</b></td>
				</tr>
				<tr>
					<td>index:</td>
					<td><b>{user.address.zip}</b></td>
				</tr>
			</tbody>
		</table>
	);
};

export default ActiveUser;