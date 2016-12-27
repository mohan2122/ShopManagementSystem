using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public partial class Mainledger
    {
        public AccChequePayment accChequePayment { get; set; }
        public AccGeneralLedger accGeneralLedger { get; set; }
        public int AccountHeadID1 { get; set; }
        public AccType accType { get; set; }
        public AccGroup accGroup { get; set; }
    }
}
