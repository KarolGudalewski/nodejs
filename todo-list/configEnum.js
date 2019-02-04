const chalk = require('chalk');

/**
 * Enum list of properties used in project
 * @return object of Enum list of properties used in project
 */
let Config = {
	DATABASE: "database.json",
	API_ADDRESS: "http://api.quuu.linuxpl.eu/todo",
	UNIQUE_AUTH_CODE: "wvyxgzqd",
	UPLOAD_SUCCEEDED: "TODO list upload to server succeeded.",
	DOWNLOAD_SUCCEEDED: "TODO list successfully downloaded from server to local database.",
	REMOVE_SUCCESS: "TODO list deleted from the server successfully.",
	ID: "id: ",
	NAME: "name: ",
	GROUP: "group: ",
	STATUS: "status: ",
	STATUS_NEW: "new",
	STATUS_IN_PROGRESS: "progress",
	STATUS_DONE: "done",
	NEW_ITEM_ADDED: "New item was added to TODO list:",
	ITEM_DELETED: "Item deleted from TODO list:",
	ITEM_STATUS_CHANGED: "Status of item was successfully changed.",
	ITEM_STATUS_NOT_CHANGED: "There was no need to change the status. It was already set.",
	LIST_OF_ALL_ITEMS: "List of all items in TODO list: \n",
	LIST_OF_FILTERED_ITEMS: "List of filtered items in TODO list: \n",
	SINGLE_ITEM_DESCRIPTION: "Single item: ",
	ERROR_DUPLICATE_ENTRY_FOUND: "Item already exists in TODO list. ITEM WAS NOT ADDED TO LIST:",
	ERROR_WRITE_TO_FILE: "Error while writing data to file",
	ERROR_INPUT_PARAMETERS: "Error parsing expression. Correct call: ",
	ERROR_INPUT_PARAMETERS_ADD: "node todolist add --name=\"NAME OF NEW TASK\" --group=\"GROUP NAME\"",
	ERROR_INPUT_PARAMETERS_DELETE: "node todolist delete --id=ID",
	ERROR_ITEM_TO_DELETE_NOT_FOUND: "Item not Found. Error while deleting item with id=",
	ERROR_ITEM_TO_CHANGE_STATUS_NOT_FOUND: "Item not Found. Error while changing status in item with id=",
	ERROR_INPUT_PARAMETERS_FILTER: "node todolist list --filter=FILTER (FILTER: new, done)",
	ERROR_INPUT_PARAMETERS_STATUS_CHANGE: "node todolist status --id=ID --status=STATUS (STATUS: new, progress, done)",
	ERROR_EMPTY_LIST: "There are no items in TODO list",
	ERROR_SYNC: "Requested message returned error in response: ",
	RED: chalk.red,
	GREEN: chalk.green,
	BLUE: chalk.blue,
	GRAY: chalk.gray
};

module.exports = {
	Config
};
