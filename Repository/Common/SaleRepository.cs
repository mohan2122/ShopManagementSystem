using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Common
{
 public class SaleRepository : GenericRepository<Sale>
    {
        public SaleRepository(eBusinessEntities context) : base(context) { }
        public string GetNextSalesInvoiceId()
        {
            //var result = Convert.ToInt32((from p in context.Sales
            //                              select p.SalesInvoiceID));
            var result1 = context.Sales.Max(s => s.SalesInvoiceID);
            if (result1 != null)
                result1 = result1.Split('-').Last();
            else
                result1 = "0";
            var res = "SID-" + DateTime.Now.Year.ToString() + "-" + Convert.ToString(Convert.ToInt32(result1) + 1).PadLeft(4, '0');
            return res.ToString();
        }
    }
}
