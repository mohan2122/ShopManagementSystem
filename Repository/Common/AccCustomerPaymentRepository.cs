using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Common
{
    public class AccCustomerPaymentRepository : GenericRepository<AccCustomerPayment>
    {
        public AccCustomerPaymentRepository(eBusinessEntities context) : base(context) { }
        public decimal? GetAmountByCustomerId(int intCustomerId)
        {
            var crAmount = context.AccCustomerPayments.Where(p => p.CustomerID == intCustomerId).Sum(p => p.CrAmount);
            var drAmount = context.AccCustomerPayments.Where(p => p.CustomerID == intCustomerId).Sum(p => p.DrAmount);
            var result = crAmount - drAmount;
            return result;
        }
    }
}
