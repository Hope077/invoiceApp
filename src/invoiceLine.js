class InvoiceLine {
    constructor(invoiceLineId, unitPrice, quantity, description) {
        this.invoiceLineId = invoiceLineId;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.description = description;
        this.total = unitPrice * quantity;
    }

    cloneLineItem() {
        return new InvoiceLine(this.invoiceLineId, this.unitPrice, this.quantity, this.description, this.total);
    }
}

module.exports = InvoiceLine;
