using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Common
{
    public class PaymentTypeRepository : GenericRepository<PaymentType>
    {
        public PaymentTypeRepository(eBusinessEntities context) : base(context) { }

        public int IsNameExists(string strPaymentTypeName)
        {
            int RetValue = 0;
            var result = from p in context.PaymentTypes
                         where p.PaymentTypeName == strPaymentTypeName
                         select p;
            if (result.Count() > 0)
            {
                RetValue = 1;
            }
            return RetValue;
        }

    }
}
