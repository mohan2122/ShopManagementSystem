using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Common
{
    public class AccGeneralLedgerRepository : GenericRepository<AccGeneralLedger>
    {
        public AccGeneralLedgerRepository(eBusinessEntities context) : base(context) { }
        
        public string GetNextVoucherNo()
        {
            //var res = (from p in context.AccGeneralLedgers
            //              select p.VoucherNo).ToString();
            //if (res == "" || res == "0")
            //{
            //    res = "0";
            //}
            //Int32 result = Convert.ToInt32(res.Split('-').Max());


            var result1 = context.AccGeneralLedgers.Max(s => s.VoucherNo);
            if (result1 != null)
                result1 = result1.Split('-').Last();
            else
                result1 = "0";

            var retRes = "DR-" + Convert.ToString(Convert.ToInt32(result1) + 1).PadLeft(5, '0');
            return retRes.ToString();
        }

        public string GetNextTrnID()
        {
            string strTrn="TRN-";
            var result1 = context.AccGeneralLedgers.Where(s => s.TrnID.Contains(strTrn)).Max(s => s.VoucherNo);
            if (result1 != null)
                result1 = result1.Split('-').Last();
            else
                result1 = "0";

            var retRes = "TRN-" + Convert.ToString(Convert.ToInt32(result1) + 1).PadLeft(5, '0');
            return retRes.ToString();
        }
    }
}
