const contactsApp = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const constacts = await contactsApp.listContacts();
      console.log(constacts);
      break;

    case "get":
      const contact = await contactsApp.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const result = await contactsApp.addContact(name, email, phone);
      if (result === null) {
        console.log("Something wrong");
      }
      break;

    case "remove":
      contactsApp.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
