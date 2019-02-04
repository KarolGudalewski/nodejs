const fs = require('fs');
const { Config } = require('./configEnum');

/**
 * Gets an array of items form TODOlist from file defined in Config.DATABASE
 * return an object with TODOlist items if file defined in Config.DATABASE is set or empty array if database is empty
 */
let getItems = () => {
	try {
		let items = fs.readFileSync(Config.DATABASE);
		return JSON.parse(items);
	} catch (error) {
		return [];
	}
};

/**
 * Saves Object of items to file defined in Config.DATABASE
 * @param items
 * @return error if catched or void
 */
let saveItems = (items) => {
	try {
		fs.writeFileSync(Config.DATABASE, JSON.stringify(items));
	} catch (error) {
		if (error != null) {
			return error;
		}
	}
};

/**
 * Prepares new item for addition to TODOlist
 * @param newItem
 * @return object
 */
let prepareObjectToAdd = (newItem) => {
	return {
		id: getMaxId()+1,
		status: Config.STATUS_NEW,
		name: newItem.name,
		group: newItem.group,
	}
};

/**
 * Gets ids of all items from TODOlist
 * @return number: max id of all items from TODOList
 */
let getMaxId = () => {
	let itemsIds = getItems().map(items => items.id);
	return Math.max(...itemsIds) === -Infinity ? 0 : Math.max(... itemsIds);
};

/**
 * Gets single item from TODOlist
 * @param item
 * @param info
 * @param messageColor
 * @param itemColor
 * @return string message with single item
 */
let showSingleItem = (item, info, messageColor, itemColor) => {
	return messageColor(info) + '\n' +
		itemColor(Config.ID) + item.id + '\n' +
		itemColor(Config.NAME) + item.name + '\n' +
		itemColor(Config.GROUP) + item.group + '\n' +
		itemColor(Config.STATUS) + item.status + '\n'
};

/**
 * Displays all list of items from TODOlist
 * @param items
 * @param listDescription
 */
let showListOfItems = (items, listDescription) => {
	console.log(Config.BLUE(listDescription));
	items.forEach(p => console.log(showSingleItem(p, Config.SINGLE_ITEM_DESCRIPTION, Config.GREEN, Config.BLUE)));
};

/**
 * Exports common functions
 */
module.exports = {
	getItems,
	saveItems,
	prepareObjectToAdd,
	showSingleItem,
	showListOfItems
};
