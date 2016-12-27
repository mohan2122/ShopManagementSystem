using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public partial class MainBudget
    {
        public AccBudget accBudget { get; set; }
        public AccBudgetDetail accBudgetDetail { get; set; }
        public virtual ICollection<AccBudgetDetail> accBudgetDetails { get; set; }
    }
    public partial class MainQuarterBudget
    {
        public AccQuarterBudget accQuarterBudget { get; set; }
        public AccQuarterBudgetDetail accQuarterBudgetDetail { get; set; }
        public virtual ICollection<AccQuarterBudgetDetail> accQuarterBudgetDetails { get; set; }
    }
    public partial class MainAdjustment
    {
        public Adjustment adjustment { get; set; }
        public ProductInfo productInfo { get; set; }
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }
       
    }
}
