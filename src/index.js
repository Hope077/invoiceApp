
/*
    Welcome to the Xero technical exercise!
    ---------------------------------------------------------------------------------
    The test consists of a small invoice application that has a number of issues.
    Your job is to fix them and make sure you can perform the functions in each method below.
    Note your first job is to get the solution to execute! 
	
    Rules
    ---------------------------------------------------------------------------------
    * The entire solution must be written in Javascript or TypeScript.
    * Feel free to use ECMA2015 (ES6) syntax
    * You can modify any of the code in this solution, split out classes etc
    * You can modify Invoice and InvoiceLine, rename and add methods, change property types (hint) 
    * Feel free to use any libraries or frameworks you like
    * Feel free to write tests (hint) 
    * Show off your skills! 
    Good luck :) 
    When you have finished the solution please zip it up and email it back to the recruiter or developer who sent it to you
*/

const Invoice = require('./invoice.js');
const InvoiceLine = require('./invoiceLine.js');

function main() {
    console.log("Welcome to Xero Tech Test!");

    createInvoiceWithOneItem();
    createInvoiceWithMultipleItemsAndQuantities();
    removeItem();
    mergeInvoices();
    cloneInvoice();
    invoiceToString();    
}

function createInvoiceWithOneItem() {
    console.log("Creating a invoice with one item...");
    const invoice = new Invoice();
    invoice.addInvoiceLine(new InvoiceLine(1, 6.99, 1, "Apple"));     
    invoice.printPrettyInvoice();
}

function createInvoiceWithMultipleItemsAndQuantities() {
    console.log("Creating a invoice with multiple items...");
    const invoice = new Invoice();
    invoice.addInvoiceLine(new InvoiceLine(1, 10.21, 4, "Banana"));
    invoice.addInvoiceLine(new InvoiceLine(2, 5.21, 1, "Orange"));
    invoice.addInvoiceLine(new InvoiceLine(3, 6.21, 5, "Pineapple"));
    invoice.printPrettyInvoice();
}

function removeItem() {
    const invoice = new Invoice();
    invoice.addInvoiceLine(new InvoiceLine(1, 10.21, 1, "Orange"));
    invoice.addInvoiceLine(new InvoiceLine(2, 10.99, 5, "Banana"));
    console.log("Old invoice");
    invoice.printPrettyInvoice();
    console.log("Removing item from invoice...");
    invoice.removeInvoiceLine(1);
    console.log("New invoice");
    invoice.printPrettyInvoice();
}

function mergeInvoices() {
    console.log("Merging two invoices...");
    const invoice1 = new Invoice();
    invoice1.addInvoiceLine(new InvoiceLine(1, 10.21, 1, "Blueberries"));
    const invoice2 = new Invoice();
    invoice2.addInvoiceLine(new InvoiceLine(2, 5.29, 4, "Orange"));
    invoice2.addInvoiceLine(new InvoiceLine(3, 9.99, 1, "Banana"));
    invoice1.mergeInvoices(invoice2);
    console.log("Merged result: ");
    invoice1.printPrettyInvoice();
}

function cloneInvoice() {
    console.log("Cloning invoice...");
    const invoice = new Invoice();

    invoice.addInvoiceLine(new InvoiceLine(1, 0.99, 5, "Onion"));
    invoice.addInvoiceLine(new InvoiceLine(2, 10.49, 2, "Watermelon"));

    const clonedInvoice = invoice.cloneInvoice();
    console.log("Clone result: ");
    clonedInvoice.printPrettyInvoice();
}

function invoiceToString() {
    const invoice = new Invoice(
        new Date(),
        "1000",
        [
            new InvoiceLine(1, 1.99, 20, "Pear")
        ]
    );

    console.log("Converting a invoice object to string...\n", JSON.stringify(invoice));
}

main();
