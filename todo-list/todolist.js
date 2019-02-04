const yargs = require('yargs');
const { addItem, deleteItem, setStatusOfSingleItem, listItems, uploadItems, downloadItems, removeItems } = require('./mainFunctions');

const addItemToList = {
	command: 'add',
	describe: 'Add new item to the list, call: node todolist --name="name" --group="group"',
	handler: async args => {
		const result = await addItem(args);
		console.log(result);
	}
};

const deleteItemFromList = {
	command: 'delete',
	describe: 'Delete single item from the list using id, call: node todolist --id=ID',
	handler: async args => {
		const result = await deleteItem(args.id);
		console.log(result);
	}
};

const setStatusOfItem = {
	command: 'status',
	describe: 'Sets status of single item, call: node todolist --id=ID --status=STATUS (STATUS: new, progress, done)',
	handler: async args => {
		const result = await setStatusOfSingleItem(args);
		console.log(result);
	}
};

const displayItemsFromList = {
	command: 'list',
	describe: 'Displays items from the list, call: node todolist list OR node todolist list --filter=FILTER  (FILTER: new, done)',
	handler: async args => {
		const result = await listItems(args.filter);
		result ? console.log(result) : false;
	}
};

const displayItemsFromListGrouped = {
	command: 'listgroup',
	describe: 'Displays items from the list by given group name, call: node todolist listgroup --filter="GROUP"',
	handler: async args => {
		let group;
		const result = await listItems(args.filter, group = true);
		result ? console.log(result) : false;
	}
};

const uploadDataToService = {
	command: 'upload',
	describe: 'Upload items from the local TODO list to service',
	handler: async () => {
		const result = await uploadItems();
		console.log(result);
	}
};

const downloadDataFromService = {
	command: 'download',
	describe: 'Download TODO list from the service to local database',
	handler: async () => {
		const result = await downloadItems();
		console.log(result);
	}
};

const deleteDataOnTheServer = {
	command: 'remove',
	describe: 'Remove all data from TODO list on the server',
	handler: async () => {
		const result = await removeItems();
		console.log(result);
	}
};

yargs
	.command(addItemToList)
	.command(deleteItemFromList)
	.command(setStatusOfItem)
	.command(displayItemsFromList)
	.command(displayItemsFromListGrouped)
	.command(uploadDataToService)
	.command(downloadDataFromService)
	.command(deleteDataOnTheServer)
	.argv;
