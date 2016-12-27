using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository;
using Repository.Common;

namespace Repository.Common
{
     public class BankRepository : GenericRepository<Bank>
     {
         public BankRepository(eBusinessEntities context) : base(context) { }

         // Now the Bank repository has all the methods of the Generic Repository
         // with addition to something a bit more specific
         public Bank GetByName(string BankName)
         {
             return dbSet.Find(BankName);
         }
     }
}
