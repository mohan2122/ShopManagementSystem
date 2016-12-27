using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Common
{
    public class SalesReturnRepository : GenericRepository<SalesReturn>
    {
        public SalesReturnRepository(eBusinessEntities context) : base(context) { }
        public string GetNextSalesReturnInvoice()
        {
            //var result = Convert.ToInt32((from p in context.PurchaseRetruns
            //                              select p.PurchaseReturnID).Max().Split('-').Last());
            var result1 = context.SalesReturns.Max(s => s.SalesReturnInvoice);
            if (result1 != null)
                result1 = result1.Split('-').Last();
            else
                result1 = "0";

            var res = "SRET-" + DateTime.Now.Year.ToString() + "-" + Convert.ToString(result1 + 1).PadLeft(4, '0');
            return res.ToString();
        }
    }
}
