//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Repository
{
    using System;
    using System.Collections.Generic;
    
    public partial class vAccAccountDetail
    {
        public int AccHeadID { get; set; }
        public string AccountName { get; set; }
        public int AccGroupID { get; set; }
        public string AccGroupName { get; set; }
        public int AccTypeID { get; set; }
        public double OpenDebitBalance { get; set; }
        public double OpenCreditBalance { get; set; }
        public bool Active { get; set; }
        public string Note { get; set; }
    }
}
