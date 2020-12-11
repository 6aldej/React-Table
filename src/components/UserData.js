import React from 'react';

const UserData = ({ user, update, index }) => {
	return (
		<tr className="user" onClick={() => update({ active: index })}>
			<td>{user.id}</td>
			<td>{user.firstName}</td>
			<td>{user.lastName}</td>
			<td>{user.email}</td>
			<td>{user.phone}</td>
		</tr>
	);
};

export default UserData;