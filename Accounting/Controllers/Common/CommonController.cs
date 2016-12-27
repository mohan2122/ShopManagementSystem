using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Repository;
using Repository.Common;
using Repository.UnitOfWork;


namespace Accounting.Controllers.Common
{
    public class CommonController : BaseController
    {
        public CommonController(IUnitOfWork uow)
        {
           Uow = uow;
        }
       
        #region for Bank

        public ActionResult Bank()
        {
            IEnumerable<CompanyInfo> listcompany = Uow.CompanyInfoRepository.GetAll();
            var SelectCopmpanyList = new SelectList(listcompany, "CompanyID", "CompanyName", "");
            ViewData["VdCompanyList"] = SelectCopmpanyList;
            return View();
        }
        
        public void Bankadd(Bank bank)
        {
            bank.Creator = Session["UserID"].ToString();
            bank.CreationDate = System.DateTime.Now;
            bank.Modifier = "Rezaul";
            bank.ModificationDate = System.DateTime.Now;

           Uow.BankRepository.Add(bank);
        }
        public void Bankupdate(Bank bank)
        {
            bank.Creator = Session["UserID"].ToString();
            bank.CreationDate = System.DateTime.Now;
            bank.Modifier = Session["UserID"].ToString();
            bank.ModificationDate = System.DateTime.Now;
            Uow.BankRepository.Update(bank);
        }

        public void Bankdelete(int BankID)
        {
            Uow.BankRepository.Delete(BankID);
        }

        public JsonResult GetAllBank()
        {
            IEnumerable<Bank> listBank = Uow.BankRepository.GetAll();
            return Json(listBank);
        }
        public JsonResult GetBankByID(int BankID)
        {
            Bank bank = Uow.BankRepository.GetById(BankID);
            return Json(bank);
        }
        
        public JsonResult BankDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<Bank> listBank = Uow.BankRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listBank.Count();
            int totalPages = totalrecords / pagesize + 1;
            var Bu = listBank.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(B => B.BankID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from B in Bu
                        select new
                        {
                            id = B.BankID,
                            cell = new object[]
                           {   
                               B.BankID,
                               B.CompanyID,
                               B.BankName,
                               B.Note
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }

        #endregion For Bank

        #region Branch start

        public ActionResult Branch()
        {
            IEnumerable<CompanyInfo> listcompany = Uow.CompanyInfoRepository.GetAll();
            var SelectCopmpanyList = new SelectList(listcompany, "CompanyID", "CompanyName", "");
            ViewData["VdCompanyList"] = SelectCopmpanyList;

            IEnumerable<Bank> listBank = Uow.BankRepository.GetAll();
            var SelectBankList = new SelectList(listBank, "BankID", "BankName", "");
            ViewData["VdBankList"] = SelectBankList;

            return View();
        }

        public void AddBranch(Branch branch)
        {
            branch.Creator = Session["UserID"].ToString();
            branch.CreationDate = System.DateTime.Now;
            branch.Modifier = "Rezaul";
            branch.ModificationDate = System.DateTime.Now;
            Uow.BranchRepository.Add(branch);
        }
        public void UpdateBranch(Branch branch)
        {
            branch.Creator = Session["UserID"].ToString();
            branch.CreationDate = System.DateTime.Now;
            branch.Modifier = Session["UserID"].ToString();
            branch.ModificationDate = System.DateTime.Now;
            Uow.BranchRepository.Update(branch);
        }
        public void DelectBranch(int BranchID)
        {
            Uow.BranchRepository.Delete(BranchID);
        }
        public JsonResult GetAllBranch()
        {
            IEnumerable<Branch> listBranch = Uow.BranchRepository.GetAll();
            return Json(listBranch);
        }
        public JsonResult GetBranchByID(int BranchID)
        {
            Branch objBranch = Uow.BranchRepository.GetById(BranchID);
            return Json(objBranch);
        }

        public JsonResult BranchDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<Branch> listBranch = Uow.BranchRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listBranch.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listBranch.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.BranchID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.BranchID,
                            cell = new object[]
                           {   
                               p.BranchID,
                               p.CompanyID,
                               p.BankID,
                               p.BranchName,
                               p.Address,
                               p.Phone,
                               p.Mobile,
                               p.Email,
                               p.Note
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }


        #endregion

        #region CompanyInfo start

        public ActionResult Companyinfo()
        {
            IEnumerable<DistrictInfo> listDistrict = Uow.DistrictInfoRepository.GetAll();
            var SelectDistrictList = new SelectList(listDistrict, "DistrictID", "DistrictName", "");
            ViewData["VdDistrictList"] = SelectDistrictList;

            IEnumerable<CountryInfo> listCountry = Uow.CountryInfoRepository.GetAll();
            var SelectCountryList = new SelectList(listCountry, "CountryID", "CountryName", "");
            ViewData["VdCountryList"] = SelectCountryList;
           
            return View();
        }

        public void comAdd(CompanyInfo companyInfo)
        {
            companyInfo.IssueDate = System.DateTime.Now;
            companyInfo.Status = true;
            companyInfo.Creator = Session["UserID"].ToString();
            companyInfo.CreationDate = System.DateTime.Now;
            companyInfo.Modifier = "Rezaul";
            companyInfo.ModificationDate = System.DateTime.Now;
            Uow.CompanyInfoRepository.Add(companyInfo);
        }

        public void comUpdate(CompanyInfo companyInfo)
        {
            companyInfo.IssueDate = System.DateTime.Now;
            companyInfo.Status = true;
            companyInfo.Creator = Session["UserID"].ToString();
            companyInfo.CreationDate = System.DateTime.Now;
            companyInfo.Modifier = Session["UserID"].ToString();
            companyInfo.ModificationDate = System.DateTime.Now;
            Uow.CompanyInfoRepository.Update(companyInfo);

        }
        public void comDelete(int CompanyID)
        {
            Uow.CompanyInfoRepository.Delete(CompanyID);
        }
        public JsonResult GetAllCompanyInfo()
        {
            IEnumerable<CompanyInfo> listCompanyInfo = Uow.CompanyInfoRepository.GetAll();
            return Json(listCompanyInfo);
        }
        public JsonResult GetCompanyInfoByID(int CompanyID)
        {
            CompanyInfo obCompanyInfo = Uow.CompanyInfoRepository.GetById(CompanyID);
            return Json(obCompanyInfo);
        }

        public JsonResult CompanyInfoDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<CompanyInfo> listCompanyInfo = Uow.CompanyInfoRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listCompanyInfo.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listCompanyInfo.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.CompanyID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.CompanyID,
                            cell = new object[]
                           {   
                               p.CompanyID,
                               p.CompanyName,
                                p.Address,
                                 p.DistrictID,
                                  p.PostCode,
                                   p.CountryID,
                                   p.VATRegNo,
                                    p.Phone,
                                     p.Mobile,
                                      p.Fax,
                                      p.eMail,
                                      p.Note
                                     
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }

        #endregion company info

        #region Country Info
        public ActionResult CountryInfo()
        {
            return View();
        }
        public void AddCountry(CountryInfo countryinfo)
        {
            countryinfo.Creator = "Rezaul";
            countryinfo.CreationDate = System.DateTime.Now;
            countryinfo.Modifier = "Rezaul";
            countryinfo.ModificationDate = System.DateTime.Now;
            Uow.CountryInfoRepository.Add(countryinfo);
        }
        public void Updatecountry(CountryInfo countryinfo)
        {
            countryinfo.Creator = "Rezaul";
            countryinfo.CreationDate = System.DateTime.Now;
            countryinfo.Modifier = "Rezaul";
            countryinfo.ModificationDate = System.DateTime.Now;
            Uow.CountryInfoRepository.Update(countryinfo);
        }
        public void DelectCountry(int CountryID)
        {
            Uow.CountryInfoRepository.Delete(CountryID);
        }
        public JsonResult GetAllCountryinfo()
        {
            IEnumerable<CountryInfo> listCountry = Uow.CountryInfoRepository.GetAll();
            return Json(listCountry);
        }
        public JsonResult GetCountryByID(int CountryID)
        {
            CountryInfo objcountry = Uow.CountryInfoRepository.GetById(CountryID);
            return Json(objcountry);
        }


        public JsonResult CountryDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<CountryInfo> listCountry = Uow.CountryInfoRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listCountry.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listCountry.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.CountryID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.CountryID,
                            cell = new object[]
                           {   
                               p.CountryID,
                               p.CountryCode,
                               p.CountryName                           
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }
        #endregion

        #region for District
        public ActionResult District()
        {
            IEnumerable<TblDivision> listDivision = Uow.TblDivisionRepository.GetAll();
            var SelectDivisionList = new SelectList(listDivision, "DivisionID", "DivisionName", "");
            ViewData["VdDivisionList"] = SelectDivisionList;

            return View();
        }

        public void DisAdd(DistrictInfo districtInfo)
        {
            districtInfo.Creator = "Rezaul";
            districtInfo.CreationDate = System.DateTime.Now;
            districtInfo.Modifier = "Rezaul";
            districtInfo.ModificationDate = System.DateTime.Now;
            Uow.DistrictInfoRepository.Add(districtInfo);
        }

        public void DisUpdate(DistrictInfo districtInfo)
        {
            districtInfo.Creator = "Rezaul";
            districtInfo.CreationDate = System.DateTime.Now;
            districtInfo.Modifier = "Rezaul";
            districtInfo.ModificationDate = System.DateTime.Now;
            Uow.DistrictInfoRepository.Update(districtInfo);
        }

        public void DisDelete(int DistrictID)
        {
            Uow.DistrictInfoRepository.Delete(DistrictID);
        }

        public JsonResult GetAllDistrictInfo()
        {
            IEnumerable<DistrictInfo> listDistrictInfo = Uow.DistrictInfoRepository.GetAll();
            return Json(listDistrictInfo);
        }

        public JsonResult GetDistrictInfoById(int intDistrictID)
        {
            DistrictInfo district = Uow.DistrictInfoRepository.GetById(intDistrictID);
            return Json(district);
        }

        public JsonResult DistrictInfoDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<DistrictInfo> listDistrictInfo = Uow.DistrictInfoRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listDistrictInfo.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listDistrictInfo.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.DistrictID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.DistrictID,
                            cell = new object[]
                           {   
                               p.DistrictID,
                               p.DivisionID,
                                p.DistrictName
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }
        #endregion

       

        #region ColorInfo

        public ActionResult ColorInfo()
        {
            return View();
        }

        public void AddColor(Inv_ColorInfo inv_ColorInfo)
        {
            //inv_ColorInfo.Creator = "Rezaul";
            //inv_ColorInfo.CreationDate = System.DateTime.Now;
            //inv_ColorInfo.Modifier = "Rezaul";
            //inv_ColorInfo.ModificationDate = System.DateTime.Now;
            Uow.Inv_ColorInfoRepository.Add(inv_ColorInfo);

        }
        public void UpdateColor(Inv_ColorInfo inv_ColorInfo)
        {
            //inv_ColorInfo.Creator = "Rezaul";
            //inv_ColorInfo.CreationDate = System.DateTime.Now;
            //inv_ColorInfo.Modifier = "Rezaul";
            //inv_ColorInfo.ModificationDate = System.DateTime.Now;
            Uow.Inv_ColorInfoRepository.Update(inv_ColorInfo);
        }
        public void DeleteColor(int ColorID)
        {
            Uow.Inv_ColorInfoRepository.Delete(ColorID);
        }
        public JsonResult GetAllInv_ColorInfo()
        {
            IEnumerable<Inv_ColorInfo> listInv_ColorInfo = Uow.Inv_ColorInfoRepository.GetAll();
            return Json(listInv_ColorInfo);
        }

        public JsonResult GetInv_ColorInfoByID(int ColorID)
        {
            Inv_ColorInfo objInv_ColorInfo = Uow.Inv_ColorInfoRepository.GetById(ColorID);
            return Json(objInv_ColorInfo);
        }

        public JsonResult Inv_ColorInfoDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<Inv_ColorInfo> listInv_ColorInfo = Uow.Inv_ColorInfoRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listInv_ColorInfo.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listInv_ColorInfo.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.ColorID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.ColorID,
                            cell = new object[]
                           {   
                               p.ColorID,
                               p.ColorName,
                                p.Note
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }


        #endregion ColorInfo

        #region SizeInfo

        public ActionResult SizeInfo()
        {
            return View();
        }

        public void AddSize(Inv_SizeInfo inv_SizeInfo)
        {
            //inv_SizeInfo.Creator = "Rezaul";
            //inv_SizeInfo.CreationDate = System.DateTime.Now;
            //inv_SizeInfo.Modifier = "Rezaul";
            //inv_SizeInfo.ModificationDate = System.DateTime.Now;
            Uow.Inv_SizeInfoRepository.Add(inv_SizeInfo);

        }
        public void UpdateSize(Inv_SizeInfo inv_SizeInfo)
        {
            //inv_SizeInfo.Creator = "Rezaul";
            //inv_SizeInfo.CreationDate = System.DateTime.Now;
            //inv_SizeInfo.Modifier = "Rezaul";
            //inv_SizeInfo.ModificationDate = System.DateTime.Now;
            Uow.Inv_SizeInfoRepository.Update(inv_SizeInfo);
        }
        public void DeleteSize(int SizeID)
        {
            Uow.Inv_SizeInfoRepository.Delete(SizeID);
        }
        public JsonResult GetAllInv_SizeInfo()
        {
            IEnumerable<Inv_SizeInfo> listInv_SizeInfo = Uow.Inv_SizeInfoRepository.GetAll();
            return Json(listInv_SizeInfo);
        }

        public JsonResult GetInv_SizeInfoByID(int SizeID)
        {
            Inv_SizeInfo objInv_SizeInfo = Uow.Inv_SizeInfoRepository.GetById(SizeID);
            return Json(objInv_SizeInfo);
        }

        public JsonResult Inv_SizeInfoDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<Inv_SizeInfo> listInv_SizeInfo = Uow.Inv_SizeInfoRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listInv_SizeInfo.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listInv_SizeInfo.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.SizeID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.SizeID,
                            cell = new object[]
                           {   
                               p.SizeID,
                               p.SizeName,
                                p.Note
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }


        #endregion SizeInfo



        
    }
}
