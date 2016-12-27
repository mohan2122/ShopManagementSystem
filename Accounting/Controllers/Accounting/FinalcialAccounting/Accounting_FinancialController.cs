using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Repository;
using Repository.Common;
using Repository.UnitOfWork;

namespace Accounting.Controllers.Accounting.FinalcialAccounting
{
    public class Accounting_FinancialController : BaseController
    {
        public Accounting_FinancialController(IUnitOfWork uow)
        {
           Uow = uow;
        }
        
     

        #region AcGeneralLedger start

        public ActionResult AccGeneralLedger()
        {
            IEnumerable<CompanyInfo> listCompany = Uow.CompanyInfoRepository.GetAll();
            var SelectCompanyList = new SelectList(listCompany, "CompanyID", "CompanyName", "");
            ViewData["VdCompanyList"] = SelectCompanyList;

            IEnumerable<AccProject> listAccProject = Uow.AccProjectRepository.GetAll();
            var SelectAccProjectList = new SelectList(listAccProject, "AccProjectID", "ProjectName", "");
            ViewData["VdAccProjectList"] = SelectAccProjectList;

            IEnumerable<VoucherType> listVoucherType = Uow.VoucherTypeRepository.GetAll();
            var SelectVoucherTypeList = new SelectList(listVoucherType, "VoucherTypeID", "VoucherTypeName", "");
            ViewData["VdVoucherTypeList"] = SelectVoucherTypeList;

            IEnumerable<PaymentType> listPaymentType = Uow.PaymentTypeRepository.GetAll();
            var SelectPaymentTypeList = new SelectList(listPaymentType, "PaymentTypeID", "PaymentTypeName", "");
            ViewData["VdPaymentTypeList"] = SelectPaymentTypeList;

            IEnumerable<Bank> listBank = Uow.BankRepository.GetAll();
            var SelectBankList = new SelectList(listBank, "BankID", "BankName", "");
            ViewData["VdBankList"] = SelectBankList;

            IEnumerable<Branch> listBranch = Uow.BranchRepository.GetAll();
            var SelectBranchList = new SelectList(listBranch, "BranchID", "BranchName", "");
            ViewData["VdBranchList"] = SelectBranchList;

            IEnumerable<AccHead> listAccount = Uow.AccHeadRepository.GetAll();
            var SelectAccountList = new SelectList(listAccount, "AccHeadID", "AccountName", "");
            ViewData["VdAccountList"] = SelectAccountList;

            IEnumerable<AccHead> listAccountCredit = Uow.AccHeadRepository.GetAll();
            var SelectAccountCreditList = new SelectList(listAccount, "AccHeadID", "AccountName", "");
            ViewData["VdAccountList"] = SelectAccountCreditList;

            IEnumerable<AccType> listAcc = Uow.AccTypeRepository.GetAll();
            var SelectAccList = new SelectList(listAcc, "AccTypeID", "AccTypeName", "");
            ViewData["VdAccTypeList"] = SelectAccList;

            IEnumerable<AccGroup> listAccGroup = Uow.AccGroupRepository.GetAll();
            var SelectAccGroupList = new SelectList(listAccGroup, "AccGroupID", "AccGroupName", "");
            ViewData["VdAccGroupList"] = SelectAccGroupList;



            return View();
        }

        public void Save(Mainledger mainledger)
        {
            string strVoucherNo = Uow.AccGeneralLedgerRepository.GetNextVoucherNo();
            string strTrnID = Uow.AccGeneralLedgerRepository.GetNextTrnID();
            double dPaidAmount = mainledger.accGeneralLedger.Debit;
            mainledger.accGeneralLedger.TrnDate = System.DateTime.Now;
            // mainledger.accGeneralLedger.Voucher = 0;
            mainledger.accGeneralLedger.VoucherNo = strVoucherNo;
            mainledger.accGeneralLedger.TrnID = strTrnID;
            mainledger.accGeneralLedger.Creator = Session["UserID"].ToString(); ;
            mainledger.accGeneralLedger.CreationDate = System.DateTime.Now;
            mainledger.accGeneralLedger.Modifier = "Rezaul";
            mainledger.accGeneralLedger.ModificationDate = System.DateTime.Now;
            // mainledger.accGeneralLedger.Active = 0;
            Uow.AccGeneralLedgerRepository.Add(mainledger.accGeneralLedger);

            mainledger.accGeneralLedger.VoucherNo = strVoucherNo.Replace("DR", "CR");
            mainledger.accGeneralLedger.Debit = 0;
            mainledger.accGeneralLedger.Credit = dPaidAmount;
            mainledger.accGeneralLedger.AccountHeadID = mainledger.accGeneralLedger.AccountHeadID1;
             Uow.AccGeneralLedgerRepository.Add(mainledger.accGeneralLedger);

            mainledger.accChequePayment.TrnID = strTrnID;
            Uow.AccChequePaymentRepository.Add(mainledger.accChequePayment);
        }

        #endregion AcGeneralLedger

        #region PaymentType

        public ActionResult PaymentType()
        {
            return View();
        }

        public int add(PaymentType paymentType)
        {
            IEnumerable<PaymentType> listPaymentType = Uow.PaymentTypeRepository.FindBy(p => p.PaymentTypeName == paymentType.PaymentTypeName);
            if (listPaymentType.Count() > 0)
            {
                return 1;
            }
            else
            {
                paymentType.Creator = Session["UserID"].ToString(); ;
                paymentType.CreationDate = System.DateTime.Now;
                paymentType.Modifier = "Rezaul";
                paymentType.ModificationDate = System.DateTime.Now;
                Uow.PaymentTypeRepository.Add(paymentType);
            }
            return 0;
        }

        public int update(PaymentType paymentType)
        {
            IEnumerable<PaymentType> listPaymentType = Uow.PaymentTypeRepository.FindBy(p => p.PaymentTypeName == paymentType.PaymentTypeName);
            if (listPaymentType.Count() > 0)
            {
                return 1;
            }
            else
            {
                paymentType.Creator = Session["UserID"].ToString();
                paymentType.CreationDate = System.DateTime.Now;
                paymentType.Modifier = Session["UserID"].ToString();
                paymentType.ModificationDate = System.DateTime.Now;
                Uow.PaymentTypeRepository.Update(paymentType);
            }
            return 0;
        }
        public void delete(int paymentTypeID)
        {
            Uow.PaymentTypeRepository.Delete(paymentTypeID);
        }
        public JsonResult GetAllPaymentType()
        {
            IEnumerable<PaymentType> listPaymentType = Uow.PaymentTypeRepository.GetAll();
            return Json(listPaymentType);
        }
        public JsonResult GetPaymentTypeByID(int paymentTypeID)
        {
            PaymentType objPaymentType = Uow.PaymentTypeRepository.GetById(paymentTypeID);
            return Json(objPaymentType);
        }

        public JsonResult PaymentTypeDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<PaymentType> listPaymentType = Uow.PaymentTypeRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listPaymentType.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listPaymentType.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.PaymentTypeID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.PaymentTypeID,
                            cell = new object[]
                           {   
                               p.PaymentTypeID,
                               p.PaymentTypeName
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }

        #endregion

        #region for Check Info

        public ActionResult CheckInfo()
        {
            IEnumerable<CompanyInfo> listCompany = Uow.CompanyInfoRepository.GetAll();
            var SelectCopmpanyList = new SelectList(listCompany, "CompanyID", "CompanyName", "");
            ViewData["VdCompanyList"] = SelectCopmpanyList;

            IEnumerable<Bank> listBank = Uow.BankRepository.GetAll();
            var SelectBankList = new SelectList(listBank, "BankID", "BankName", "");
            ViewData["VdBankList"] = SelectBankList;

            return View();
        }

        public void Checkadd(CheckInfo checkInfo)
        {
            checkInfo.TakenDate = System.DateTime.Now;
            checkInfo.Creator = "Rezaul";
            checkInfo.CreationDate = System.DateTime.Now;
            checkInfo.Modifier = "Rezaul";
            checkInfo.ModificationDate = System.DateTime.Now;
            Uow.CheckInfoRepository.Add(checkInfo);
        }
        public void Checkupdate(CheckInfo checkInfo)
        {
            checkInfo.TakenDate = System.DateTime.Now;
            checkInfo.Creator = "Rezaul";
            checkInfo.CreationDate = System.DateTime.Now;
            checkInfo.Modifier = "Rezaul";
            checkInfo.ModificationDate = System.DateTime.Now;
            Uow.CheckInfoRepository.Update(checkInfo);
        }
        public void Checkdelete(int CheckID)
        {
            Uow.CheckInfoRepository.Delete(CheckID);
        }
        public JsonResult GetAllCheckInfo()
        {
            IEnumerable<CheckInfo> list = Uow.CheckInfoRepository.GetAll();
            return Json(list);

        }
        public JsonResult GetCheckInfoByID(int CheckID)
        {
            CheckInfo check = Uow.CheckInfoRepository.GetById(CheckID);
            return Json(check);
        }

        public JsonResult CheckInfoDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<CheckInfo> listCheckInfo = Uow.CheckInfoRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listCheckInfo.Count();
            int totalPages = totalrecords / pagesize + 1;
            var Cu = listCheckInfo.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(C => C.CheckID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from C in Cu
                        select new
                        {
                            id = C.CheckID,
                            cell = new object[]
                           {   
                               C.CheckID,
                               C.CompanyID,
                               C.BankID,
                               C.ChequeStart,
                               C.ChequeEnd,
                               //C.TakenDate,
                               C.TotalPage   
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }

        #endregion for CheckInfo

        #region vouchertype

        public ActionResult VoucherType()
        {
            return View();
        }

        public int VouchAdd(VoucherType voucherType)
        {
            IEnumerable<VoucherType> listVoucherType = Uow.VoucherTypeRepository.FindBy(p => p.VoucherTypeName == voucherType.VoucherTypeName);
            if (listVoucherType.Count() > 0)
            {
                return 1;
            }
            else
            {
                voucherType.Creator = Session["UserID"].ToString();
                voucherType.CreationDate = System.DateTime.Now;
                voucherType.Modifier = "Rezaul";
                voucherType.ModificationDate = System.DateTime.Now;
                Uow.VoucherTypeRepository.Add(voucherType);
            }
            return 0;
        }
       
        public int VouchUpdate(VoucherType voucherType)
        {
             IEnumerable<VoucherType> listVoucherType = Uow.VoucherTypeRepository.FindBy(p => p.VoucherTypeName == voucherType.VoucherTypeName);
            if (listVoucherType.Count() > 0)
            {
                return 1;
            }
            else
            {
                voucherType.Creator = Session["UserID"].ToString();
            voucherType.CreationDate = System.DateTime.Now;
            voucherType.Modifier = Session["UserID"].ToString();
            voucherType.ModificationDate = System.DateTime.Now;
            Uow.VoucherTypeRepository.Update(voucherType);
        }
            return 0;
        }
        public void vouchDelete(int voucherTypeID)
        {
            Uow.VoucherTypeRepository.Delete(voucherTypeID);
        }
        public JsonResult GetAllVoucherType()
        {
            IEnumerable<VoucherType> listVoucherType = Uow.VoucherTypeRepository.GetAll();
            return Json(listVoucherType);
        }

        public JsonResult GetVoucherTypeByID(int voucherTypeID)
        {
            VoucherType obVoucherType = Uow.VoucherTypeRepository.GetById(voucherTypeID);
            return Json(obVoucherType);
        }
        
        public JsonResult VoucherTypeDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<VoucherType> listVoucherType = Uow.VoucherTypeRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listVoucherType.Count();
            int totalPages = totalrecords / pagesize + 1;
            var pu = listVoucherType.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(p => p.VoucherTypeID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from p in pu
                        select new
                        {
                            id = p.VoucherTypeID,
                            cell = new object[]
                           {   
                               p.VoucherTypeID,
                               p.VoucherTypeName,
                                p.Note
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }


        #endregion vouchertype

        #region for AccChequePayment

        public ActionResult AccChequePayment()
        {
            //IEnumerable<CompanyInfo> listCompany = Uow.CompanyInfoRepository.GetAll();
            //var SelectCopmpanyList = new SelectList(listCompany, "CompanyID", "CompanyName", "");
            //ViewData["VdCompanyList"] = SelectCopmpanyList;

            //IEnumerable<AccGroup> listAccGroup = Uow.AccGroupRepository.GetAll();
            //var SelectAccGroupList = new SelectList(listAccGroup, "AccGroupID", "AccGroupName", "");
            //ViewData["VdAccGroup"] = SelectAccGroupList;

            return View();
        }


        public void AccChequePaymentadd(AccChequePayment accChequePayment)
        {
            //accChequePayment. = "Rezaul";
            //accChequePayment.CreateDate = System.DateTime.Now;
            //accChequePayment.ModifyBy = "Rezaul";
            //accChequePayment.ModifyDate = System.DateTime.Now;
            //Uow.AccHeadRepository.Add(accChequePayment);
        }

        public void AccChequePaymentupdate(AccChequePayment accChequePayment)
        {
            //accChequePayment.CreateBy = "Rezaul";
            //accChequePayment.CreateDate = System.DateTime.Now;
            //accChequePayment.ModifyBy = "Rezaul";
            //accChequePayment.ModifyDate = System.DateTime.Now;
            //Uow.AccHeadRepository.Update(accChequePayment);
        }

        public void AccChequePaymentdelete(int ChequePayID)
        {
            Uow.AccChequePaymentRepository.Delete(ChequePayID);
        }

        public JsonResult GetAllAccChequePayment()
        {
            IEnumerable<AccChequePayment> listAccHead = Uow.AccChequePaymentRepository.GetAll();
            return Json(listAccHead);
        }

        public JsonResult GetAccChequePaymentByID(int ChequePayID)
        {
            AccChequePayment Head = Uow.AccChequePaymentRepository.GetById(ChequePayID);
            return Json(Head);
        }

        public JsonResult AccChequePaymentDetails(string sidx, string sord, int page, int rows, string filter)
        {
            IEnumerable<AccChequePayment> listAccChequePayment = Uow.AccChequePaymentRepository.GetAll();

            int pageIndex = (page - 1);
            int pagesize = rows;
            int totalrecords = listAccChequePayment.Count();
            int totalPages = totalrecords / pagesize + 1;
            var Hu = listAccChequePayment.AsQueryable()
               .Skip(pageIndex * pagesize)
               .Take(pagesize)
               .OrderBy(H => H.ChequePayID);

            string sort = string.Empty;
            var json = Json(new
            {
                total = totalPages,
                page = page,
                records = totalrecords,
                rows = (from H in Hu
                        select new
                        {
                            id = H.ChequePayID,
                            cell = new object[]
                           {   
                               H.ChequePayID,
                               H.Issue_Date,
                               H.TrnID,
                               H.BankID,
                               H.BranchID,
                               H.ChequeNo,
                               H.Cheque_Amount,
                               H.IsVoid,
                               H.MaturityDate
                               
                               
                           }
                        }).ToArray()
            }, JsonRequestBehavior.AllowGet);
            return json;
        }

        #endregion for AccHead

      

      
    }
}
