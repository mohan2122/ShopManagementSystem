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
    
    public partial class PurchaseReturnDetail
    {
        public int PriID { get; set; }
        public int ProductID { get; set; }
        public double ReturnQty { get; set; }
        public decimal RatePerUnit { get; set; }
        public decimal SD { get; set; }
        public decimal CD { get; set; }
        public decimal RD { get; set; }
        public decimal AMTExamVAT { get; set; }
        public decimal AIT { get; set; }
        public decimal ATV { get; set; }
        public decimal CFDuties { get; set; }
        public decimal PSI { get; set; }
    }
}
