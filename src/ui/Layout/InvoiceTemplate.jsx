import { forwardRef } from "react";

const InvoiceTemplate = forwardRef(({ order }, ref) => {
  return (
    <div className="invoice_template" ref={ref}>
      <h2>Invoice</h2>
      <p>Order ID: #{order?.id}</p>
      <p>Customer Name: {order?.customer?.name}</p>
      <p>
        Total Amount: {order?.total} {order?.currency}
      </p>
    </div>
  );
});

InvoiceTemplate.displayName = "InvoiceTemplate";

export default InvoiceTemplate;
