using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Common
{
    public class AccSupplierPaymentRepository : GenericRepository<AccSupplierPayment>
    {
        public AccSupplierPaymentRepository(eBusinessEntities context) : base(context) { }
        public decimal? GetAmountBySupplierId(int intSupplierId)
        {
            var crAmount = context.AccSupplierPayments.Where(p => p.SupplierID == intSupplierId).Sum(p => p.CrAmount);
            var drAmount = context.AccSupplierPayments.Where(p => p.SupplierID == intSupplierId).Sum(p => p.DrAmount);
            var result = crAmount - drAmount;
            return result;
        }
    }
}
