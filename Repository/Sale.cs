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
    
    public partial class Sale
    {
        public int SalesID { get; set; }
        public string SalesInvoiceID { get; set; }
        public string VATNo { get; set; }
        public string OrderNo { get; set; }
        public string CustomerID { get; set; }
        public System.DateTime InvoiceDate { get; set; }
        public System.DateTime DeliveryDate { get; set; }
        public string CurrentTime { get; set; }
        public string Deliime { get; set; }
        public string Destination { get; set; }
        public string VehicleInfo { get; set; }
        public string Remarks { get; set; }
        public string Creator { get; set; }
        public System.DateTime CreationDate { get; set; }
        public string Modifier { get; set; }
        public System.DateTime ModificationDate { get; set; }
        public int Active { get; set; }
    }
}
