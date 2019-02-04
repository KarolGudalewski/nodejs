const axios = require('axios');
const { Config } = require('./configEnum');

const axiosOptions = {
	headers: {
		'Content-Type': 'application/json'
	}
};

async function postData(items) {
	const response = await axios.post(`${Config.API_ADDRESS}/${Config.UNIQUE_AUTH_CODE}`, items, axiosOptions);
	return response.data;
}

async function deleteData() {
	const response = await axios.post(`${Config.API_ADDRESS}/${Config.UNIQUE_AUTH_CODE}`, "", axiosOptions);
	return response;
}


async function getData() {
	const response = await axios.get(`${Config.API_ADDRESS}/${Config.UNIQUE_AUTH_CODE}`, axiosOptions);
	return response.data;
}

module.exports = {
	postData,
	deleteData,
	getData
};
