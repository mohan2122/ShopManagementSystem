using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Repository;
using Repository.Common;
using Repository.UnitOfWork;

namespace Accounting.Controllers.POS.Setup
{
    public class POS_SetupController : BaseController
    {
        public POS_SetupController(IUnitOfWork uow)
        {
           Uow = uow;
        }

        #region Customerinfo

        public ActionResult CustomerInfo()
        {
            IEnumerable<DistrictInfo> listDistrict = Uow.DistrictInfoRepository.GetAll();
            var SelectDistrictList = new SelectList(listDistrict, "DistrictID", "DistrictName", "");
            ViewData["VdDistrictList"] = SelectDistrictList;

            IEnumerable<CountryInfo> listCountry = Uow.CountryInfoRepository.GetAll();
            var SelectCountryList = new SelectList(listCountry, "CountryID", "CountryName", "");
            ViewData["VdCountryList"] = SelectCountryList;

            return View();
        }

        public void CusAdd(CustomerInfo Customer)
        {
            Customer.Status = true;
            Customer.Creator = "Rezaul";
            Customer.CreationDate = System.DateTime.Now;
            Customer.Modifier = "Rezaul";
            Customer.ModificationDate = System.DateTime.Now;
            Uow.CustomerInfoRepository.Add(Customer);
        }
        public void CusUpdate(CustomerInfo Customer)
        {
            Customer.Status = true;
            Customer.Creator = "Rezaul";
            Customer.CreationDate = System.DateTime.Now;
            Customer.Modifier = "Rezaul";
            Customer.ModificationDate = System.DateTime.Now;
            Uow.CustomerInfoRepository.Update(Customer);
        }
        public void CusDelete(int CustomerID)
        {
            Uow.CustomerInfoRepository.Delete(CustomerID);
        }

        public JsonResult GetAllCustomer()
        {
            IEnumerable<CustomerInfo> listCustomerInfo = Uow.CustomerInfoRepository.GetAll();
            return Json(listCustomerInfo);
        }

        public JsonResult GetCustomerInfoByID(int CustomerID)
        {
            CustomerInfo info = Uow.CustomerInfoRepository.GetById(CustomerID);
            return Json(info);
        }

        public JsonResult CustomerInfoDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<CustomerInfo> listCustomerInfo = Uow.CustomerInfoRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listCustomerInfo.Count();
            int totalPages = totalrecords / pagesize + 1;
            var Cu = listCustomerInfo.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(C => C.CustomerID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from C in Cu
                        select new
                        {
                            id = C.CustomerID,
                            cell = new object[]
                           {   C.CustomerID,
                               C.CustomerCode,
                               C.CustomerName,
                               C.CustomerType,
                               C.Propietor,
                               C.ContactPerson,
                               C.Address,
                               C.DistrictID,
                               C.CountryID,
                               C.Phone,
                               C.Mobile,
                               C.eMail,
                               C.VATRegNo,
                               C.DiscountPercent,
                               C.DistributorPoint
                              
                        }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }
        
        #endregion

        #region ProductCategory start

        public ActionResult ProductCategory()
        {
            return View();
        }
        public void addProductCategory(ProductCategory productcategory)
        {

            productcategory.Creator = "Rezaul";
            productcategory.CreationDate = System.DateTime.Now;
            productcategory.Modifier = "Rezaul";
            productcategory.ModificationDate = System.DateTime.Now;
            Uow.ProductCategoryRepository.Add(productcategory);
        }
        public void updateProductCategory(ProductCategory productcategory)
        {
            productcategory.Creator = "Rezaul";
            productcategory.CreationDate = System.DateTime.Now;
            productcategory.Modifier = "Rezaul";
            productcategory.ModificationDate = System.DateTime.Now;
            Uow.ProductCategoryRepository.Update(productcategory);
        }
        public void deleteProductCategory(int ProductCategoryID)
        {
            Uow.ProductCategoryRepository.Delete(ProductCategoryID);
        }
        public JsonResult GetAllProductCategory()
        {
            IEnumerable<ProductCategory> listProductCategory = Uow.ProductCategoryRepository.GetAll();
            return Json(listProductCategory);
        }
        public JsonResult GetProductCategoryByID(int ProductCategoryID)
        {
            ProductCategory objProductCategory = Uow.ProductCategoryRepository.GetById(ProductCategoryID);
            return Json(objProductCategory);
        }

        public JsonResult ProductCategoryDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<ProductCategory> listProductCategory = Uow.ProductCategoryRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listProductCategory.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listProductCategory.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.ProductCategoryID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.ProductCategoryID,
                            cell = new object[]
                           {   
                               p.ProductCategoryID,
                               p.ProductCategory1
                               
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }

        #endregion  ProductCategory  end

        #region ProductInfo start
        
        public ActionResult ProductInfo()
        {
            IEnumerable<ProductCategory> listProductCategory = Uow.ProductCategoryRepository.GetAll();
            var SelectProductCategoryList = new SelectList(listProductCategory, "ProductCategoryID", "ProductCategory1", "");
            ViewData["VdProductCategoryList"] = SelectProductCategoryList;

            IEnumerable<InvBrand> listInvBrand = Uow.InvBrandRepository.GetAll();
            var SelectInvBrandList = new SelectList(listInvBrand, "BrandID", "BrandName", "");
            ViewData["VdBrandList"] = SelectInvBrandList;

            IEnumerable<Inv_ColorInfo> listInvColor = Uow.ColorInfoRepository.GetAll();
            var SelectInvColorList = new SelectList(listInvColor, "ColorID", "ColorName", "");
            ViewData["VdColorList"] = SelectInvColorList;

            IEnumerable<Inv_SizeInfo> listInvSize = Uow.SizeInfoRepository.GetAll();
            var SelectInvSizeList = new SelectList(listInvSize, "SizeID", "SizeName", "");
            ViewData["VdSizeList"] = SelectInvSizeList;

            IEnumerable<TarrifType> listTarrifType = Uow.TarrifTypeRepository.GetAll();
            var SelectTarrifTypeList = new SelectList(listTarrifType, "TarrifTypeID", "TarrifType1", "");
            ViewData["VdTarrifTypeList"] = SelectTarrifTypeList;

            IEnumerable<Unit> listUnit = Uow.UnitRepository.GetAll();
            var SelectUnitList = new SelectList(listUnit, "UnitID", "UnitName", "");
            ViewData["VdUnitList"] = SelectUnitList;

            IEnumerable<VATType> listVATType = Uow.VATTypeRepository.GetAll();
            var SelectVATTypeList = new SelectList(listVATType, "VATTypeID", "VATType1", "");
            ViewData["VdVAtList"] = SelectVATTypeList;
            return View();
        }

        [HttpPost]
        public WrappedJsonResult UploadImage(ProductInfo productinfo)
        {
            //http://20fingers2brains.blogspot.com/2013/07/upload-images-to-database-in-mvc3-razor.html
            //if (ModelState.IsValid)
            //{
                Gallary gallary = new Gallary();
                productinfo.Creator = "Rezaul";
                productinfo.CreationDate = System.DateTime.Now;
                productinfo.Modifier = "Rezaul";
                productinfo.EffectiveDate = System.DateTime.Now;
                productinfo.ModificationDate = System.DateTime.Now;
                productinfo.Status = true;
                gallary.SavePlayerImage(productinfo);
                //return RedirectToAction("GetImages", new { album = imageViewModel.AlbumName.ToString() });
                
            return new WrappedJsonResult
                {
                    Data = new
                    {
                        IsValid = true,
                        Message = string.Empty,
                        ImagePath = Url.Content(String.Format("~/import/{0}", ""))
                    }
                };
            //}
            //else
            //{
            //    TempData["InvalidImage"] = "Upload images only";
            //    //return RedirectToAction("GetImages", new { album = imageViewModel.AlbumName.ToString() });
            //    return View();
            //}
        }

        public void AddProductInfo(ProductInfo productinfo)
        {
            productinfo.Creator = "Rezaul";
            productinfo.CreationDate = System.DateTime.Now;
            productinfo.Modifier = "Rezaul";
            productinfo.ModificationDate = System.DateTime.Now;
            productinfo.Status = true;
            Uow.ProductInfoRepository.Add(productinfo);
        }
        public void UpdateProductInfo(ProductInfo productinfo)
        {
            productinfo.Creator = "Rezaul";
            productinfo.CreationDate = System.DateTime.Now;
            productinfo.Modifier = "Rezaul";
            productinfo.ModificationDate = System.DateTime.Now;
            productinfo.Status = true;
            Uow.ProductInfoRepository.Update(productinfo);
        }
        public void DeleteProductInfo(int ProductID)
        {
            Uow.ProductInfoRepository.Delete(ProductID);
        }
        public JsonResult GetAllProductInfo()
        {
            IEnumerable<ProductInfo> listProductInfo = Uow.ProductInfoRepository.GetAll();
            return Json(listProductInfo);
        }
        public JsonResult GetProductInfoByID(int ProductID)
        {
            ProductInfo objProductInfo = Uow.ProductInfoRepository.GetById(ProductID);
            return Json(objProductInfo);
        }

        public JsonResult ProductInfoDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<ProductInfo> listProductInfo = Uow.ProductInfoRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listProductInfo.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listProductInfo.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.ProductID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.ProductID,
                            cell = new object[]
                           {   
                               p.ProductID,
                               p.ProductCode,
                               p.ProductName,
                               p.ProductType,
                               p.ProductCategoryID,
                               p.BrandID,
                               p.TarrifTypeID,
                               p.UnitID,
                               p.UnitIDOut,
                               p.ConversionRate,
                               p.VATTypeID,
                               p.WeightPerUnit,
                               p.RatePerUnit,
                               p.VATableRate,
                               p.VATPercent,
                               p.RebatePercent,
                               p.SDPercent,
                               p.SupTaxPercent,
                               p.ApprovedPrice,
                               p.ReorderLevel,
                               p.ProductImage,
                               p.Note,
                               //p.Creator,
                               //p.CreationDate,
                               //p.Modifier,
                               //p.ModificationDate,
                              p.EffectiveDate.ToShortDateString()
                              // p.Status
                               
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            json.MaxJsonLength = int.MaxValue;
            return json;
        }

        #endregion

        #region Brand

        public ActionResult Brand()
        {
            return View();
        }

        public void AddBrand(InvBrand invbrand)
        {
            invbrand.Creator = "mohsin";
            invbrand.CreationDate = System.DateTime.Now;
            invbrand.Modifier = "mohsin";
            invbrand.ModificationDate = System.DateTime.Now;
            Uow.InvBrandRepository.Add(invbrand);
        }
        public void UpdateBrand(InvBrand invbrand)
        {
            invbrand.Creator = "mohsin";
            invbrand.CreationDate = System.DateTime.Now;
            invbrand.Modifier = "mohsin";
            invbrand.ModificationDate = System.DateTime.Now;
            Uow.InvBrandRepository.Update(invbrand);
        }
        public void DeleteBrand(int BrandID)
        {
            Uow.InvBrandRepository.Delete(BrandID);
        }
        public JsonResult GetAllInvBrand()
        {
            IEnumerable<InvBrand> listInvBrand = Uow.InvBrandRepository.GetAll();
            return Json(listInvBrand);
        }
        public JsonResult GetInvBrandByID(int BrandID)
        {
            InvBrand objInvBrand = Uow.InvBrandRepository.GetById(BrandID);
            return Json(objInvBrand);
        }

        public JsonResult InvBrandDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<InvBrand> listInvBrand = Uow.InvBrandRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listInvBrand.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listInvBrand.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.BrandID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.BrandID,
                            cell = new object[]
                           {   
                               p.BrandID,
                               p.BrandName
                               
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }

        #endregion

           
       

        #region SupplierInfo

        public ActionResult SupplierInfo()
        {
            IEnumerable<CountryInfo> listCountry = Uow.CountryInfoRepository.GetAll();
            var SelectCountryList = new SelectList(listCountry, "CountryID", "CountryName", "");
            ViewData["VdCountryList"] = SelectCountryList;

            return View();
        }

        public void AddSup(SupplierInfo supplierInfo)
        {
            supplierInfo.Status = true;
            //supplierInfo.Creator = "Rezaul";
            //supplierInfo.CreationDate = System.DateTime.Now;
            //supplierInfo.Modifier = "Rezaul";
            //supplierInfo.ModificationDate = System.DateTime.Now;
            Uow.SupplierInfoRepository.Add(supplierInfo);
        }
        public void UpdateSup(SupplierInfo supplierInfo)
        {
            //supplierInfo.Status = true;
            //supplierInfo.Creator = "Rezaul";
            //supplierInfo.CreationDate = System.DateTime.Now;
            //supplierInfo.Modifier = "Rezaul";
            //supplierInfo.ModificationDate = System.DateTime.Now;
            Uow.SupplierInfoRepository.Update(supplierInfo);
        }
        public void DeleteSup(int SupplierID)
        {
            Uow.SupplierInfoRepository.Delete(SupplierID);
        }

        public JsonResult GetAllSupplier()
        {
            IEnumerable<SupplierInfo> listSupplierInfo = Uow.SupplierInfoRepository.GetAll();
            return Json(listSupplierInfo);
        }

        public JsonResult GetSupplierInfoByID(int SupplierID)
        {
            SupplierInfo info = Uow.SupplierInfoRepository.GetById(SupplierID);
            return Json(info);
        }

        public JsonResult SupplierInfoDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<SupplierInfo> listSupplierInfo = Uow.SupplierInfoRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listSupplierInfo.Count();
            int totalPages = totalrecords / pagesize + 1;
            var Cu = listSupplierInfo.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(C => C.SupplierID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from C in Cu
                        select new
                        {
                            id = C.SupplierID,
                            cell = new object[]
                           {   C.SupplierID,
                               C.SupplierCode,
                               C.SupplierName,
                               C.VATRegNo,
                               C.ContactPerson,
                               C.Address,
                               C.SupplierType,   
                               C.Country,
                               C.Phone,
                               C.Mobile,
                               C.eMail
                        }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }

        #endregion

    }
}
