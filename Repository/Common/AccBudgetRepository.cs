using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Common
{
    public class AccBudgetRepository : GenericRepository<AccBudget>
    {
        public AccBudgetRepository(eBusinessEntities context) : base(context) { }

        public int GetNextBudgetId()
        {
            var result = 0;       
            var count1 = context.AccBudgets.Count();
            if (count1 > 0)
            {
                result = context.AccBudgets.Max(s => s.BudgetID);
                if (result == null)
                    result = 0 + 1;
                else
                    result = result + 1;
            }
            else
                return 1;
            return result;
        }
    }
}

