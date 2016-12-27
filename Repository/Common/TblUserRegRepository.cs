using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Common
{
    public class TblUserRegRepository : GenericRepository<tblUserReg>
    {
        public TblUserRegRepository(eBusinessEntities context) : base(context) { }

        public int Login(string strUserName, String strPassword)
        {
            int RetValue = 0;
            var result = from u in context.tblUserRegs
                         where u.UserID == strUserName && u.Password == strPassword
                         select u;
            if (result.Count() > 0)
            {
                RetValue = 1;
            }
            return RetValue;
        }

    }
}
