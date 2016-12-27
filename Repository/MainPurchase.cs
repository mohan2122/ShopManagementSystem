using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public partial class MainPurchase
    {
        public string ChequeNo { get; set; }
        public decimal Amount { get; set; }
        public System.DateTime MaturityDate { get; set; }

        public virtual ProductInfo productInfo { get; set; }
        public decimal Quantity { get; set; }
        public decimal Total { get; set; }

        public decimal SubTotal { get; set; }
        public decimal PreviousDue { get; set; }
        public decimal AmountPayable { get; set; }
        public decimal PaidByCash { get; set; }
        public decimal PaidByCheque { get; set; }
        public decimal AmountPaid { get; set; }
        public decimal BalanceDue { get; set; }

        public virtual AccSupplierPayment accSupplierPayment { get; set; }
        public AccChequePayment accChequePayment { get; set; }
        public virtual ICollection<AccChequePayment> accChequePaymentDetail { get; set; }
        public Purchase purchase { get; set; }
        public virtual ICollection<PurchaseDetail> purchaseDetail { get; set; }
        public virtual AccGeneralLedger accGeneralLedger { get; set; }
        public InvBrand brand { get; set; }
        public SupplierInfo supplier { get; set; }
        public Inv_ColorInfo colorInfo { get; set; }
        public Inv_SizeInfo sizeInfo { get; set; }
        public PaymentType paymentType { get; set; }
    }
    
    public partial class MainPurchaseReturn
    {
        public virtual ProductInfo productInfo { get; set; }
        public decimal Quantity { get; set; }
        public decimal Total { get; set; }
        public decimal Price { get; set; }   
        public decimal PurchaseDetails { get; set; }
        public decimal Reason { get; set; }

        public Purchase purchase { get; set; }
        public virtual AccSupplierPayment accSupplierPayment { get; set; }
        public AccChequePayment accChequePayment { get; set; }
        public PurchaseRetrun purchaseRetrun { get; set; }
        public virtual ICollection<PurchaseReturnDetail> purchaseReturnDetail { get; set; }
        public virtual AccGeneralLedger accGeneralLedger { get; set; }
        public InvBrand brand { get; set; }
        public SupplierInfo supplier { get; set; }
        public Inv_ColorInfo colorInfo { get; set; }
        public Inv_SizeInfo sizeInfo { get; set; }
    }

}
