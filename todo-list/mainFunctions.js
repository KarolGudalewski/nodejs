const { getItems, saveItems, prepareObjectToAdd, showSingleItem,showListOfItems } = require('./common');
const { postData, getData, deleteData } = require('./service');
const { Config } = require('./configEnum');

/**
 * Adding new item to TODOlist
 * @param newItem
 * return new added item if succeed or error message if failed
 */
let addItem = (newItem) => {

	if(newItem.name && newItem.group) {
		let items = getItems();
		let duplicateItem = items.filter((singleItem) =>
			(singleItem.name === newItem.name && singleItem.group === newItem.group && singleItem.status === Config.STATUS_NEW));

		if (duplicateItem.length === 0) {
			let preparedObject = prepareObjectToAdd(newItem);
			items.push(preparedObject);
			if (saveItems(items) instanceof Error) {
				return Config.RED(`${Config.ERROR_WRITE_TO_FILE}: ${Config.DATABASE}`);
			} else {
				return showSingleItem(preparedObject, Config.NEW_ITEM_ADDED, Config.GREEN, Config.BLUE);
			}
		} else {
			return showSingleItem(...duplicateItem, Config.ERROR_DUPLICATE_ENTRY_FOUND, Config.RED, Config.RED);
		}
	} else return Config.RED(Config.ERROR_INPUT_PARAMETERS + Config.ERROR_INPUT_PARAMETERS_ADD);
};

/**
 * Delete item from TODOlist
 * @param itemId
 * return result of operation
 */
let deleteItem = (itemId) => {

	if(itemId) {
		try {
			let items = getItems();
			let itemToDelete = items.filter((item) => item.id === itemId);
			let itemsNotToDelete = items.filter((item) => item.id !== itemId);
			if (saveItems(itemsNotToDelete) instanceof Error) {
				return Config.RED(`${Config.ERROR_WRITE_TO_FILE}: ${Config.DATABASE}`);
			} else
				return showSingleItem(...itemToDelete, Config.ITEM_DELETED, Config.GREEN, Config.GRAY);
		} catch (error) {
			return Config.RED(Config.ERROR_ITEM_TO_DELETE_NOT_FOUND + itemId);
		}
	} else return Config.RED(Config.ERROR_INPUT_PARAMETERS + Config.ERROR_INPUT_PARAMETERS_DELETE);
};

/**
 * Sets status of single item
 * @param itemParams
 * return result of operation
 */
let setStatusOfSingleItem = (itemParams) => {
	if(itemParams.id && itemParams.status &&
		(itemParams.status === Config.STATUS_NEW ||
			itemParams.status === Config.STATUS_DONE ||
			itemParams.status === Config.STATUS_IN_PROGRESS)) {
		let items = getItems();
		let itemToChangeStatus = items.filter((item) => item.id === itemParams.id);
		let statusAlreadyChanged = items.filter((item) => (item.id === itemParams.id && item.status === itemParams.status));
		if (itemToChangeStatus.length !== 0) {
			if (statusAlreadyChanged.length === 0) {
				items.forEach(item => {
					if (item.id === itemParams.id) {
						item.status = itemParams.status
					}
				});
				if (saveItems(items) instanceof Error) {
					return Config.RED(`${Config.ERROR_WRITE_TO_FILE}: ${Config.DATABASE}`);
				} else {
					return showSingleItem(...itemToChangeStatus, Config.ITEM_STATUS_CHANGED, Config.GREEN, Config.BLUE);
				}
			} else {
				return showSingleItem(...itemToChangeStatus, Config.ITEM_STATUS_NOT_CHANGED, Config.GREEN, Config.BLUE);
			}
		} else {
			return Config.RED(Config.ERROR_ITEM_TO_CHANGE_STATUS_NOT_FOUND + itemParams.id);
		}
	} else return Config.RED(Config.ERROR_INPUT_PARAMETERS + Config.ERROR_INPUT_PARAMETERS_STATUS_CHANGE);
};

/**
 * List all items from TODOlist or filtered items from TODOList
 * @param filter
 * @param group
 * return list of all items or filtered list of items
 */
let listItems = (filter, group) => {
	let items = getItems();

	if (items.length !== 0) {
		if (filter && !group) {
			if (filter === Config.STATUS_NEW || filter === Config.STATUS_DONE || filter === Config.STATUS_IN_PROGRESS) {
				let filteredItems = items.filter(item => item.status === filter);
				if (filteredItems != null) {
					return showListOfItems(filteredItems, Config.LIST_OF_FILTERED_ITEMS);
				} else {
					return Config.RED(Config.ERROR_EMPTY_LIST);
				}
			}
			else return Config.RED(Config.ERROR_INPUT_PARAMETERS + Config.ERROR_INPUT_PARAMETERS_FILTER);
		} else if (filter && group) {
			let filteredItems = items.filter(item => item.group === filter);
			if (filteredItems.length !== 0) {
				return showListOfItems(filteredItems, Config.LIST_OF_FILTERED_ITEMS);
			} else {
				return Config.RED(Config.ERROR_EMPTY_LIST);
			}
		}
		else {
			return showListOfItems(items, Config.LIST_OF_ALL_ITEMS);
		}
	} else return Config.RED(Config.ERROR_EMPTY_LIST);
};

/**
 * Uploads data to server using methods from service
 *
 */
let uploadItems = async () => {
	let items = getItems();
	try {
		await postData(items);
		return Config.GREEN(Config.UPLOAD_SUCCEEDED);
	} catch (error) {
		return Config.RED(Config.ERROR_SYNC + error.message);
	}
};

/**
 * Download data from server using methods from service
 *
 */
let downloadItems = async () => {
	try {
		let items = await getData();
		if (saveItems(items) instanceof Error) {
			return Config.RED(`${Config.ERROR_WRITE_TO_FILE}: ${Config.DATABASE}`);
		} else {
			return Config.GREEN(Config.DOWNLOAD_SUCCEEDED);
		}
	} catch (error) {
		return Config.RED(Config.ERROR_SYNC + error.message);
	}
};

/**
 * Removes data from the server using methods from service
 *
 */
let removeItems = async () => {
	try {
		await deleteData();
		return Config.RED(Config.REMOVE_SUCCESS);
	} catch (error) {
		return Config.RED(Config.ERROR_SYNC + error.message);
	}
};

/**
 * Exports main functions
 */
module.exports = {
	addItem,
	deleteItem,
	setStatusOfSingleItem,
	listItems,
	uploadItems,
	downloadItems,
	removeItems
};
