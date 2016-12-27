using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Repository;
using Repository.UnitOfWork;

namespace Accounting.Controllers.POS_Purchase
{
    public class POS_PurchaseController : BaseController
    {
        public POS_PurchaseController(IUnitOfWork uow)
        {
           Uow = uow;
        }

        public ActionResult PurchaseItem()
        {
            IEnumerable<Bank> listBank = Uow.BankRepository.GetAll();
            var SelectBankList = new SelectList(listBank, "BankID", "BankName", "");
            ViewData["VdBankList"] = SelectBankList;

            IEnumerable<Branch> listBranch = Uow.BranchRepository.GetAll();
            var SelectBranchList = new SelectList(listBranch, "BranchID", "BranchName", "");
            ViewData["VdBranchList"] = SelectBranchList;

            IEnumerable<SupplierInfo> listSuplier = Uow.SupplierInfoRepository.GetAll();
            var SelectListSuplier = new SelectList(listSuplier, "SupplierID", "SupplierName", "");
            ViewData["VdListSuplier"] = SelectListSuplier;

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

        public void Save(MainPurchase mainPurchase)
        {
            string strPurchaseId = Uow.PurchaseRepository.GetNextPurchaseId();
            double dPaidAmount = mainPurchase.accGeneralLedger.Debit;

            //Uow.SupplierInfoRepository.Add(mainPurchase.supplier);

            mainPurchase.purchase.InvoiceDate = System.DateTime.Now;
            mainPurchase.purchase.PurchaseID = strPurchaseId;
            mainPurchase.purchase.Creator = "Rezaul";
            mainPurchase.purchase.CreationDate = System.DateTime.Now;
            mainPurchase.purchase.Modifier = "Rezaul";
            mainPurchase.purchase.ModificationDate = System.DateTime.Now;
            mainPurchase.purchase.Active = 0;
            Uow.PurchaseRepository.Add(mainPurchase.purchase);

            Uow.AccSupplierPaymentRepository.Add(mainPurchase.accSupplierPayment);

            mainPurchase.accGeneralLedger.TrnID = strPurchaseId;
            mainPurchase.accGeneralLedger.Status = true;
            mainPurchase.accGeneralLedger.Creator = "Rezaul";
            mainPurchase.accGeneralLedger.CreationDate = System.DateTime.Now;
            mainPurchase.accGeneralLedger.Modifier = "Rezaul";
            mainPurchase.accGeneralLedger.ModificationDate = System.DateTime.Now;
            Uow.AccGeneralLedgerRepository.Add(mainPurchase.accGeneralLedger);
           
            mainPurchase.accGeneralLedger.Debit = 0;
            mainPurchase.accGeneralLedger.Credit = dPaidAmount;
            Uow.AccGeneralLedgerRepository.Add(mainPurchase.accGeneralLedger);

            if (mainPurchase.purchaseDetail != null)
            {
                foreach (var item in mainPurchase.purchaseDetail)
                {
                    Uow.PurchaseDetailsRepository.Add(item);
                }
            }

            if (mainPurchase.accChequePaymentDetail != null)
            {
                foreach (var item in mainPurchase.accChequePaymentDetail)
                {
                    item.TrnID = strPurchaseId;
                    Uow.AccChequePaymentRepository.Add(item);
                }
            }
            
        }

        public ActionResult GetSuppierById(int intSupplierId)
        {
            SupplierInfo supplierList = Uow.SupplierInfoRepository.GetById(intSupplierId);
            supplierList.VATRegNo = Uow.AccSupplierPaymentRepository.GetAmountBySupplierId(intSupplierId).ToString();
            return Json(supplierList);
        }
        
        public ActionResult GetProductById(int intProductValue)
        {
            ProductInfo productList = Uow.ProductInfoRepository.GetById(intProductValue);
            ProductInfoSingle objProduct = new ProductInfoSingle();
            objProduct.CostPrice = productList.CostPrice;
            objProduct.ProductID = productList.ProductID;
            objProduct.ProductCode = productList.ProductCode;
            objProduct.ProductName = productList.ProductName;
            objProduct.RegularMRP = productList.RegularMRP;
            return Json(objProduct);
        }
        
        public ActionResult PurchaseReturn()
        {
            IEnumerable<SupplierInfo> listSuplier = Uow.SupplierInfoRepository.GetAll();
            var SelectListSuplier = new SelectList(listSuplier, "SupplierID", "SupplierName", "");
            ViewData["VdListSuplier"] = SelectListSuplier;

            IEnumerable<Purchase> listPurchase = Uow.PurchaseRepository.GetAll();
            var SelectlistPurchase = new SelectList(listPurchase, "PurchaseID", "InvoiceNo", "");
            ViewData["VdListPurchase"] = SelectlistPurchase;            

            IEnumerable<ProductInfo> listProduct = Uow.ProductInfoRepository.GetAll();
            var SelectListProduct = new SelectList(listProduct, "ProductID", "ProductName", "");
            ViewData["VdListProduct"] = SelectListProduct;
            
            return View();
        }

        public void SavePurChaseReturn(MainPurchaseReturn mainPurchase)
        {
            string strPurchaseId = Uow.PurchaseRepository.GetNextPurchaseId();
            double dPaidAmount = mainPurchase.accGeneralLedger.Debit;

            mainPurchase.purchase.InvoiceDate = System.DateTime.Now;
            mainPurchase.purchase.PurchaseID = strPurchaseId;
            mainPurchase.purchase.Creator = "Rezaul";
            mainPurchase.purchase.CreationDate = System.DateTime.Now;
            mainPurchase.purchase.Modifier = "Rezaul";
            mainPurchase.purchase.ModificationDate = System.DateTime.Now;
            mainPurchase.purchase.Active = 0;
            Uow.PurchaseRepository.Add(mainPurchase.purchase);

            Uow.AccSupplierPaymentRepository.Add(mainPurchase.accSupplierPayment);

            mainPurchase.accGeneralLedger.TrnID = strPurchaseId;
            mainPurchase.accGeneralLedger.Status = true;
            mainPurchase.accGeneralLedger.Creator = "Rezaul";
            mainPurchase.accGeneralLedger.CreationDate = System.DateTime.Now;
            mainPurchase.accGeneralLedger.Modifier = "Rezaul";
            mainPurchase.accGeneralLedger.ModificationDate = System.DateTime.Now;
            Uow.AccGeneralLedgerRepository.Add(mainPurchase.accGeneralLedger);

            mainPurchase.accGeneralLedger.Debit = 0;
            mainPurchase.accGeneralLedger.Credit = dPaidAmount;
            Uow.AccGeneralLedgerRepository.Add(mainPurchase.accGeneralLedger);

            if (mainPurchase.purchaseReturnDetail != null)
            {
                foreach (var item in mainPurchase.purchaseReturnDetail)
                {
                    Uow.PurchaseReturnDetailRepository.Add(item);
                }
            }

        }
    }

    public class ProductInfoSingle
    {        
        public decimal? CostPrice { get; set; }
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public decimal? RegularMRP { get; set; }
    }
}
