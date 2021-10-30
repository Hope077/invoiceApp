const Invoice = require('./src/invoice.js');
const InvoiceLine = require('./src/invoiceLine.js');

test('Test addInvoiceLine', () => {
    const invoice = new Invoice();
    invoice.addInvoiceLine(new InvoiceLine(1, 6.99, 1, "Apple"));    
    expect(invoice.getTotal()).toBe(6.99);
    expect(invoice.lineItems.length).toBe(1);

    invoice.addInvoiceLine(new InvoiceLine(2, 5.21, 1, "Orange"));
    invoice.addInvoiceLine(new InvoiceLine(3, 6.21, 5, "Pineapple"));
    expect(invoice.getTotal()).toBe(43.25);
    expect(invoice.lineItems[2].description).toBe("Pineapple");
    expect(invoice.lineItems.length).toBe(3);

    invoice.addInvoiceLine(new InvoiceLine(4, 6.99, 1, "Apple"));    
    expect(invoice.lineItems.length).toBe(3);
    expect(invoice.lineItems[0].quantity).toBe(2);
    expect(invoice.getTotal()).toBe(50.24); 
});

test('Test removeInvoiceLine', () => {
    const invoice = new Invoice();
    invoice.addInvoiceLine(new InvoiceLine(1, 10.21, 1, "Orange"));
    invoice.addInvoiceLine(new InvoiceLine(2, 10.99, 5, "Banana"));
    invoice.removeInvoiceLine(1);   
    expect(invoice.getTotal()).toBe(54.95);    
    expect(invoice.lineItems.length).toBe(1);
});

test('Test getTotal', () => {
    const invoice = new Invoice();
    invoice.addInvoiceLine(new InvoiceLine(1, 10.21, 1, "Orange"));
    invoice.addInvoiceLine(new InvoiceLine(2, 10.99, 5, "Banana"));    
    expect(invoice.getTotal()).toBe(65.16);    
});

test('Test mergeInvoices', () => {
    const invoice1 = new Invoice();
    invoice1.addInvoiceLine(new InvoiceLine(1, 10.21, 1, "Blueberries"));

    const invoice2 = new Invoice();
    invoice2.addInvoiceLine(new InvoiceLine(2, 5.29, 4, "Orange"));
    invoice2.addInvoiceLine(new InvoiceLine(3, 9.99, 1, "Banana"));

    invoice1.mergeInvoices(invoice2);
    expect(invoice1.getTotal()).toBe(41.36);
    expect(invoice1.lineItems.length).toBe(3);
    expect(invoice1.lineItems[1].description).toBe("Orange");
});

test('Test cloneInvoice', () => {
    const invoice = new Invoice();
    invoice.addInvoiceLine(new InvoiceLine(1, 0.99, 5, "Onion"));
    invoice.addInvoiceLine(new InvoiceLine(2, 10.49, 2, "Watermelon"));

    const clonedInvoice = invoice.cloneInvoice();
    expect(clonedInvoice.invoiceDate).toBe(invoice.invoiceDate);
    expect(clonedInvoice.invoiceNumber).toBe(invoice.invoiceNumber);
    expect(clonedInvoice.lineItems.length).toBe(invoice.lineItems.length);
    expect(clonedInvoice.lineItems.join(',')).toBe(invoice.lineItems.join(','));
    
    invoice.lineItems[0].quantity = 1;
    expect(invoice.lineItems[0].quantity).toBe(1);
    expect(clonedInvoice.lineItems[0].quantity).toBe(5);
});
