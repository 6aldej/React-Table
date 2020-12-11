const LoadF = async (type) => {
	const DataMin =
		'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
	const DataBig =
		'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
	let url = '';

	if (type === 'min') {
		url = DataMin;
	} else if (type === 'big') {
		url = DataBig;
	}

	const res = await fetch(url);
		
	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	};
	
	return await res.json();
};

export default LoadF;