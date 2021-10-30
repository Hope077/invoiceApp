class Invoice {
    static initInvoiceNumber = 1;
    constructor(invoiceDate = new Date(), invoiceNumber = "", lineItems = []) {
        this.invoiceDate = invoiceDate;
        this.invoiceNumber = invoiceNumber? invoiceNumber : Invoice.initInvoiceNumber++;
        this.lineItems = lineItems;
    }

    // Add a lineItem to invoice
    addInvoiceLine(newline) {
        this.checkId(newline.invoiceLineId);
        this.checkPrice(newline.unitPrice);
        this.checkQuantity(newline.quantity);        

        /* If the line item already exists(with the same description and same unitPrice),
         * add the new line item to the existed one, else push a new line. */
        let existedLine = this.lineItems.find(line =>
            line.description === newline.description && line.unitPrice === newline.unitPrice
        );
        if (existedLine) {
            existedLine.quantity += newline.quantity;
            existedLine.total += newline.unitPrice * newline.quantity;
        } else {
            this.lineItems.push(newline);
        }        
    };

    // Remove a line
    removeInvoiceLine(id) {        
        const foundIndex = this.lineItems.findIndex(line => line.invoiceLineId === id);
        if (foundIndex === -1) {
            throw new Error("Item not found");
        }
        this.lineItems.splice(foundIndex, 1);
    };

    // Return the sum of total cost for each line item
    getTotal() {
        return parseFloat(this.lineItems.reduce((total, line) => total + line.total, 0).toFixed(2));
    };

    // Append the items from the sourceInvoice to the current invoice
    mergeInvoices(sourceInvoice) {
        for (let lineItem of sourceInvoice.lineItems) {
            this.addInvoiceLine(lineItem);
        }
    }

    // Create a deep clone of the current invoice (all fields and properties)
    cloneInvoice() {
        const clonedInvoice = new Invoice(
            this.invoiceDate,
            this.invoiceNumber,
            this.lineItems.map(line => line.cloneLineItem())
        );
        return clonedInvoice;
    };

    // Check if the id is duplicated
    checkId(id) {
        if (this.lineItems.some(line => line.invoiceLineId === id)) {            
            throw new Error(`ID "${id}" already exists`);
        }
    }

    // Check if the price is valid
    checkPrice(price) {
        if (price <= 0) {
            throw new Error("Unit price should be more than 0");
        }
    }

    // Check if the quantity is valid
    checkQuantity(quantity) {
        if (quantity <= 0) {
            throw new Error("Quantity should be more than 0");
        }
    }

    // Print better formatted result
    printPrettyInvoice() {
        console.log(`\nInvoice Number: ${this.invoiceNumber}\nDate: ${this.invoiceDate.toDateString()}\nItems:`)
        console.table(this.lineItems);
        console.log(`Total: ${this.getTotal()}\n`);
    }
}

module.exports = Invoice;
