using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Common
{
    public class PurchaseRetrunRepository : GenericRepository<PurchaseRetrun>
    {
        public PurchaseRetrunRepository(eBusinessEntities context) : base(context) { }
        public string GetNextPurchaseReturnId()
        {
            //var result = Convert.ToInt32((from p in context.PurchaseRetruns
            //                              select p.PurchaseReturnID).Max().Split('-').Last());
            var result1 = context.PurchaseRetruns.Max(s => s.PurchaseReturnID);
            if (result1 != null)
                result1 = result1.Split('-').Last();
            else
                result1 = "0";
            var res = "PRI-" + DateTime.Now.Year.ToString() + "-" + Convert.ToString(result1 + 1).PadLeft(4, '0');
            return res.ToString();
        }
    }
}
