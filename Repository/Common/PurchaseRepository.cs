using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Common
{
    public class PurchaseRepository : GenericRepository<Purchase>
    {
        public PurchaseRepository(eBusinessEntities context) : base(context) { }
        public string GetNextPurchaseId()
        {
            //var result = Convert.ToInt32((from p in context.Purchases
            //              select p.PurchaseID).Max().Split('-').Last());
            var result1 = context.Purchases.Max(s => s.PurchaseID);
            if (result1 != null)
                result1 = result1.Split('-').Last();
            else
                result1 = "0";
            var res = "PUR-" + DateTime.Now.Year.ToString() + "-" + Convert.ToString(result1 + 1).PadLeft(4, '0');
            return res.ToString();
        }
    }
}
