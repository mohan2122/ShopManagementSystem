using Repository;
using Repository.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Accounting.Controllers.POS
{
    public class POS_SalesController : BaseController
    {
       public POS_SalesController(IUnitOfWork uow)
        {
           Uow = uow;
        }
        
        public ActionResult SalesItem()
        {
             IEnumerable<Bank> listBank = Uow.BankRepository.GetAll();
            var SelectBankList = new SelectList(listBank, "BankID", "BankName", "");
            ViewData["VdBankList"] = SelectBankList;

            IEnumerable<Branch> listBranch = Uow.BranchRepository.GetAll();
            var SelectBranchList = new SelectList(listBranch, "BranchID", "BranchName", "");
            ViewData["VdBranchList"] = SelectBranchList;

            IEnumerable<CustomerInfo> listCustomeer = Uow.CustomerInfoRepository.GetAll();
            var SelectlistCustomeer = new SelectList(listCustomeer, "CustomerID", "CustomerName", "");
            ViewData["VdListCustomer"] = SelectlistCustomeer;

            IEnumerable<ProductInfo> listProduct = Uow.ProductInfoRepository.GetAll();
            var SelectListProduct = new SelectList(listProduct, "ProductID", "ProductName", "");
            ViewData["VdListProduct"] = SelectListProduct;

            IEnumerable<InvBrand> listBrand = Uow.InvBrandRepository.GetAll();
            var SelectListBrand = new SelectList(listBrand, "BrandID", "BrandName", "");
            ViewData["VdListBrand"] = SelectListBrand;

            IEnumerable<Inv_ColorInfo> listColorInfo = Uow.ColorInfoRepository.GetAll();
            var SelectListColorInfo = new SelectList(listColorInfo, "ColorID", "ColorName", "");
            ViewData["VdListColorInfo"] = SelectListColorInfo;

            IEnumerable<Inv_SizeInfo> ListSizeInfo = Uow.SizeInfoRepository.GetAll();
            var SelectListSizeInfo = new SelectList(ListSizeInfo, "SizeID", "SizeName", "");
            ViewData["VdListSizeInfo"] = SelectListSizeInfo;

            IEnumerable<PaymentType> ListPaymentMode = Uow.PaymentTypeRepository.GetAll();
            var SelectListPaymentMode = new SelectList(ListPaymentMode, "PaymentTypeID", "PaymentTypeName", "");
            ViewData["VdListPaymentMode"] = SelectListPaymentMode;
            return View();
        }

        public void Save(MainSale mainSale)
        {
            string strSalesInvoiceID = Uow.SaleRepository.GetNextSalesInvoiceId();
            double dPaidAmount = mainSale.accGeneralLedger.Debit;

            mainSale.sale.InvoiceDate = System.DateTime.Now;
            mainSale.sale.SalesInvoiceID = strSalesInvoiceID;
            mainSale.sale.Creator = "Rezaul";
            mainSale.sale.CreationDate = System.DateTime.Now;
            mainSale.sale.Modifier = "Rezaul";
            mainSale.sale.ModificationDate = System.DateTime.Now;
            mainSale.sale.Active = 0;
            Uow.SaleRepository.Add(mainSale.sale);

            Uow.AccCustomerPaymentRepository.Add(mainSale.accCustomerPayment);

            mainSale.accGeneralLedger.TrnID = strSalesInvoiceID;
            mainSale.accGeneralLedger.Status = true;
            mainSale.accGeneralLedger.Creator = "Rezaul";
            mainSale.accGeneralLedger.CreationDate = System.DateTime.Now;
            mainSale.accGeneralLedger.Modifier = "Rezaul";
            mainSale.accGeneralLedger.ModificationDate = System.DateTime.Now;
            Uow.AccGeneralLedgerRepository.Add(mainSale.accGeneralLedger);

            mainSale.accGeneralLedger.Debit = 0;
            mainSale.accGeneralLedger.Credit = dPaidAmount;
            Uow.AccGeneralLedgerRepository.Add(mainSale.accGeneralLedger);

            if (mainSale.salesDetail != null)
            {
                foreach (var item in mainSale.salesDetail)
                {
                    Uow.SalesDetailRepository.Add(item);
                }
            }

            if (mainSale.accChequePaymentDetail != null)
            {
                foreach (var item in mainSale.accChequePaymentDetail)
                {
                    item.TrnID = strSalesInvoiceID;
                    Uow.AccChequePaymentRepository.Add(item);
                }
            }

        }
        

        public ActionResult GetCustomerById(int intCustomerId)
        {
            CustomerInfo customerList = Uow.CustomerInfoRepository.GetById(intCustomerId);
            customerList.VATRegNo = Uow.AccCustomerPaymentRepository.GetAmountByCustomerId(intCustomerId).ToString();
            return Json(customerList);
        }
        public ActionResult GetProductById(int intProductValue)
        {
            ProductInfo productList = Uow.ProductInfoRepository.GetById(intProductValue);
            ProductInfoSingle objProduct = new ProductInfoSingle();
            objProduct.ProductID = productList.ProductID;
            objProduct.ProductName = productList.ProductName;
            objProduct.ProductCode = productList.ProductCode;
            objProduct.RegularMRP = productList.RegularMRP;
            return Json(objProduct);
        }
        public ActionResult SalesReturn()
        {
            //IEnumerable<SupplierInfo> listSuplier = Uow.SupplierInfoRepository.GetAll();
            //var SelectListSuplier = new SelectList(listSuplier, "SupplierID", "SupplierName", "");
            //ViewData["VdListSuplier"] = SelectListSuplier;

            IEnumerable<Sale> listSale = Uow.SaleRepository.GetAll();
            var SelectlistSale = new SelectList(listSale, "SalesID", "SalesInvoiceID", "");
            ViewData["VdListSale"] = SelectlistSale;

            IEnumerable<ProductInfo> listProduct = Uow.ProductInfoRepository.GetAll();
            var SelectListProduct = new SelectList(listProduct, "ProductID", "ProductName", "");
            ViewData["VdListProduct"] = SelectListProduct;

            return View();
         }
        public void Save(MainSaleReturn mainSaleReturn)
        {
            string strSalesReturnInvoice = Uow.SaleRepository.GetNextSalesInvoiceId();
            double dPaidAmount = mainSaleReturn.accGeneralLedger.Debit;

            mainSaleReturn.salesReturn.InvoiceDate = System.DateTime.Now;
            mainSaleReturn.salesReturn.SalesReturnInvoice = strSalesReturnInvoice;
            mainSaleReturn.salesReturn.Creator = "Rezaul";
            mainSaleReturn.salesReturn.CreationDate = System.DateTime.Now;
            mainSaleReturn.salesReturn.Modifier = "Rezaul";
            mainSaleReturn.salesReturn.ModificationDate = System.DateTime.Now;
            mainSaleReturn.salesReturn.Active = 0;
            Uow.SalesReturnRepository.Add(mainSaleReturn.salesReturn);

            Uow.AccCustomerPaymentRepository.Add(mainSaleReturn.accCustomerPayment);

            mainSaleReturn.accGeneralLedger.TrnID = strSalesReturnInvoice;
            mainSaleReturn.accGeneralLedger.Status = true;
            mainSaleReturn.accGeneralLedger.Creator = "Rezaul";
            mainSaleReturn.accGeneralLedger.CreationDate = System.DateTime.Now;
            mainSaleReturn.accGeneralLedger.Modifier = "Rezaul";
            mainSaleReturn.accGeneralLedger.ModificationDate = System.DateTime.Now;
            Uow.AccGeneralLedgerRepository.Add(mainSaleReturn.accGeneralLedger);

            mainSaleReturn.accGeneralLedger.Debit = 0;
            mainSaleReturn.accGeneralLedger.Credit = dPaidAmount;
            Uow.AccGeneralLedgerRepository.Add(mainSaleReturn.accGeneralLedger);

            if (mainSaleReturn.salesReturnDetail != null)
            {
                foreach (var item in mainSaleReturn.salesReturnDetail)
                {
                    Uow.SalesReturnDetailRepository.Add(item);
                }
            }
        }
    }

    public class ProductInfoSingle
    {       
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public decimal? RegularMRP { get; set; }
    }

}
