using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public partial class MainSale
    {
        public string ChequeNo { get; set; }
        public decimal Amount { get; set; }
        public System.DateTime MaturityDate { get; set; }

        public ProductInfo productInfo { get; set; }
        public decimal Quantity { get; set; }
        public decimal Total { get; set; }

        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        public decimal TotalDiscount { get; set; }
        public decimal RemainingTotal { get; set; }
        public decimal VAT { get; set; }
        public decimal TotalVAT { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal PreviousDue { get; set; }
        public decimal AmountPayable { get; set; }
        public decimal PaidByCash { get; set; }
        public decimal PaidByCheque { get; set; }
        public decimal AmountPaid { get; set; }
        public decimal BalanceDue { get; set; }
        
        public virtual AccCustomerPayment accCustomerPayment { get; set; }
        public AccChequePayment accChequePayment { get; set; }
        public virtual ICollection<AccChequePayment> accChequePaymentDetail { get; set; }
        public Sale sale { get; set; }
        public virtual ICollection<SalesDetail> salesDetail { get; set; }
        public virtual AccGeneralLedger accGeneralLedger { get; set; }
        public InvBrand brand { get; set; }
        public CustomerInfo customer { get; set; }
        public Inv_ColorInfo colorInfo { get; set; }
        public Inv_SizeInfo sizeInfo { get; set; }
        public PaymentType paymentType { get; set; }

    }

    public partial class MainSaleReturn
    {
        public ProductInfo productInfo { get; set; }
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Description { get; set; }
        public virtual AccCustomerPayment accCustomerPayment { get; set; }

        public decimal Discount { get; set; }
        public decimal TotalDiscount { get; set; }
        public decimal Amount { get; set; }

        public SalesReturn salesReturn { get; set; }
        public virtual ICollection<SalesReturnDetail> salesReturnDetail { get; set; }
        public Sale sale { get; set; }
        public virtual AccGeneralLedger accGeneralLedger { get; set; }
    }
}
