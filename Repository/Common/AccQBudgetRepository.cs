using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Common
{
    public class AccQuarterBudgetRepository : GenericRepository<AccQuarterBudget>
    {
        public AccQuarterBudgetRepository(eBusinessEntities context) : base(context) { }

        public int GetNextQBudgetId()
        {
            var result = context.AccQuarterBudgets.Max(s => s.QBudgetID);
            if (result == null)
                result = 0;
            return result;
        }
    }
}