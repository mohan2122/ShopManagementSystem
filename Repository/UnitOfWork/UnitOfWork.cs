using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.Common;

namespace Repository.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private eBusinessEntities context = new eBusinessEntities();

        #region PaymentType

        private GenericRepository<PaymentType> paymentTypeRepository;
        public IRepository<PaymentType> PaymentTypeRepository
        {
            get
            {
                if (this.paymentTypeRepository == null)
                    this.paymentTypeRepository = new GenericRepository<PaymentType>(context);
                return paymentTypeRepository;
            }
        }

        #endregion PaymentType
        //public GenericRepository<PaymentType> PaymentTypeRepository
        //{
        //    get
        //    {
        //        if (this.paymentTypeRepository == null)
        //            this.paymentTypeRepository = new GenericRepository<PaymentType>(context);
        //        return paymentTypeRepository;
        //    }
        //} 

        #region AccBudget

        private AccBudgetRepository accBudgetRepository;
        public AccBudgetRepository AccBudgetRepository
        {
            get
            {
                if (this.accBudgetRepository == null)
                    this.accBudgetRepository = new AccBudgetRepository(context);
                return accBudgetRepository;
            }
        }

        #endregion AccBudget

        #region AccBudgetDetail

        private GenericRepository<AccBudgetDetail> accBudgetDetailRepository;
        public IRepository<AccBudgetDetail> AccBudgetDetailRepository
        {
            get
            {
                if (this.accBudgetDetailRepository == null)
                    this.accBudgetDetailRepository = new GenericRepository<AccBudgetDetail>(context);
                return accBudgetDetailRepository;
            }
        }


        #endregion AccBudgetDetail

        #region AccQuarterBudget

        private AccQuarterBudgetRepository accQuarterBudgetRepository;
        public AccQuarterBudgetRepository AccQuarterBudgetRepository
        {
            get
            {
                if (this.accQuarterBudgetRepository == null)
                    this.accQuarterBudgetRepository = new AccQuarterBudgetRepository(context);
                return accQuarterBudgetRepository;
            }
        }

        #endregion AccQuarterBudget

        #region AccQuarterBudgetDetail

        private GenericRepository<AccQuarterBudgetDetail> accQuarterBudgetDetailRepository;
        public IRepository<AccQuarterBudgetDetail> AccQuarterBudgetDetailRepository
        {
            get
            {
                if (this.accQuarterBudgetDetailRepository == null)
                    this.accQuarterBudgetDetailRepository = new GenericRepository<AccQuarterBudgetDetail>(context);
                return accQuarterBudgetDetailRepository;
            }
        }


        #endregion AccQuarterBudgetDetail

        #region AccGeneralLedger

        private AccGeneralLedgerRepository accGeneralLedgerRepository;
        public AccGeneralLedgerRepository AccGeneralLedgerRepository
        {
            get
            {
                if (this.accGeneralLedgerRepository == null)
                    this.accGeneralLedgerRepository = new AccGeneralLedgerRepository(context);
                return accGeneralLedgerRepository;
            }
        }

        #endregion AccGeneralLedger

        #region AccGroup

        private GenericRepository<AccGroup> accGroupRepository;
        public IRepository<AccGroup> AccGroupRepository
        {
            get
            {
                if (this.accGroupRepository == null)
                    this.accGroupRepository = new GenericRepository<AccGroup>(context);
                return accGroupRepository;
            }
        }

        #endregion AccGroup

        #region AccHead

        private GenericRepository<AccHead> accHeadRepository;
        public IRepository<AccHead> AccHeadRepository
        {
            get
            {
                if (this.accHeadRepository == null)
                    this.accHeadRepository = new GenericRepository<AccHead>(context);
                return accHeadRepository;
            }
        }

        #endregion AccHead

        #region AccType

        private GenericRepository<AccType> accTypeRepository;
        public IRepository<AccType> AccTypeRepository
        {
            get
            {
                if (this.accTypeRepository == null)
                    this.accTypeRepository = new GenericRepository<AccType>(context);
                return accTypeRepository;
            }
        }

        #endregion AccType

        #region AdjustmentType

        private GenericRepository<AdjustmentType> adjustmentTypeRepository;
        public IRepository<AdjustmentType> AdjustmentTypeRepository
        {
            get
            {
                if (this.adjustmentTypeRepository == null)
                    this.adjustmentTypeRepository = new GenericRepository<AdjustmentType>(context);
                return adjustmentTypeRepository;
            }
        }

        #endregion AdjustmentType

        #region Adjustment

        private GenericRepository<Adjustment> adjustmentRepository;
        public IRepository<Adjustment> AdjustmentRepository
        {
            get
            {
                if (this.adjustmentRepository == null)
                    this.adjustmentRepository = new GenericRepository<Adjustment>(context);
                return adjustmentRepository;
            }
        }

        #endregion Adjustment

        #region AccProject

        private GenericRepository<AccProject> accProjectRepository;
        public IRepository<AccProject> AccProjectRepository
        {
            get
            {
                if (this.accProjectRepository == null)
                    this.accProjectRepository = new GenericRepository<AccProject>(context);
                return accProjectRepository;
            }
        }

        #endregion AccProject

        #region CheckInfo

        private GenericRepository<CheckInfo> checkInfoRepository;
        public IRepository<CheckInfo> CheckInfoRepository
        {
            get
            {
                if (this.checkInfoRepository == null)
                    this.checkInfoRepository = new GenericRepository<CheckInfo>(context);
                return checkInfoRepository;
            }
        }

        #endregion CheckInfo

        #region ChequeRegister

        private GenericRepository<ChequeRegister> chequeRegisterRepository;
        public IRepository<ChequeRegister> ChequeRegisterRepository
        {
            get
            {
                if (this.chequeRegisterRepository == null)
                    this.chequeRegisterRepository = new GenericRepository<ChequeRegister>(context);
                return chequeRegisterRepository;
            }
        }

        #endregion ChequeRegister

        #region Bank

        private BankRepository bankRepository;
        public BankRepository BankRepository
        {
            get
            {
                if (this.bankRepository == null)
                {
                    this.bankRepository = new BankRepository(context);
                }
                return this.bankRepository;
            }
        }

        #endregion Bank

        #region Branch

        private GenericRepository<Branch> branchRepository;
        public IRepository<Branch> BranchRepository
        {
            get
            {
                if (this.branchRepository == null)
                    this.branchRepository = new GenericRepository<Branch>(context);
                return branchRepository;
            }
        }

        #endregion Branch

        #region CompanyInfo

        private GenericRepository<CompanyInfo> companyInfoRepository;
        public IRepository<CompanyInfo> CompanyInfoRepository
        {
            get
            {
                if (this.companyInfoRepository == null)
                    this.companyInfoRepository = new GenericRepository<CompanyInfo>(context);
                return companyInfoRepository;
            }
        }

        #endregion CompanyInfo

        #region CustomerInfo

        private GenericRepository<CustomerInfo> customerInfoRepository;
        public IRepository<CustomerInfo> CustomerInfoRepository
        {
            get
            {
                if (this.customerInfoRepository == null)
                    this.customerInfoRepository = new GenericRepository<CustomerInfo>(context);
                return customerInfoRepository;
            }
        }

        #endregion CustomerInfo

        #region ExpenseInfo

        private GenericRepository<ExpenseInfo> expenseInfoRepository;
        public IRepository<ExpenseInfo> ExpenseInfoRepository
        {
            get
            {
                if (this.expenseInfoRepository == null)
                    this.expenseInfoRepository = new GenericRepository<ExpenseInfo>(context);
                return expenseInfoRepository;
            }
        }

        #endregion ExpenseInfo

        #region InvBrand

        private GenericRepository<InvBrand> invBrandRepository;
        public IRepository<InvBrand> InvBrandRepository
        {
            get
            {
                if (this.invBrandRepository == null)
                    this.invBrandRepository = new GenericRepository<InvBrand>(context);
                return invBrandRepository;
            }
        }

        #endregion InvBrand

        #region ProductCategory

        private GenericRepository<ProductCategory> productCategoryRepository;
        public IRepository<ProductCategory> ProductCategoryRepository
        {
            get
            {
                if (this.productCategoryRepository == null)
                    this.productCategoryRepository = new GenericRepository<ProductCategory>(context);
                return productCategoryRepository;
            }
        }

        #endregion ProductCategory

        #region ProductInfo

        private GenericRepository<ProductInfo> productInfoRepository;
        public IRepository<ProductInfo> ProductInfoRepository
        {
            get
            {
                if (this.productInfoRepository == null)
                    this.productInfoRepository = new GenericRepository<ProductInfo>(context);
                return productInfoRepository;
            }
        }

        #endregion ProductInfo

        #region TarrifType

        private GenericRepository<TarrifType> tarrifTypeRepository;
        public IRepository<TarrifType> TarrifTypeRepository
        {
            get
            {
                if (this.tarrifTypeRepository == null)
                    this.tarrifTypeRepository = new GenericRepository<TarrifType>(context);
                return tarrifTypeRepository;
            }
        }

        #endregion TarrifType

        #region Unit

        private GenericRepository<Unit> unitRepository;
        public IRepository<Unit> UnitRepository
        {
            get
            {
                if (this.unitRepository == null)
                    this.unitRepository = new GenericRepository<Unit>(context);
                return unitRepository;
            }
        }

        #endregion Unit

        #region TaxSource

        private GenericRepository<TaxSource> taxSourceRepository;
        public IRepository<TaxSource> TaxSourceRepository
        {
            get
            {
                if (this.taxSourceRepository == null)
                    this.taxSourceRepository = new GenericRepository<TaxSource>(context);
                return taxSourceRepository;
            }
        }

        #endregion TaxSource

        #region VATType

        private GenericRepository<VATType> vATTypeRepository;
        public IRepository<VATType> VATTypeRepository
        {
            get
            {
                if (this.vATTypeRepository == null)
                    this.vATTypeRepository = new GenericRepository<VATType>(context);
                return vATTypeRepository;
            }
        }

        #endregion VATType

        #region VoucherType

        private GenericRepository<VoucherType> voucherTypeRepository;
        public IRepository<VoucherType> VoucherTypeRepository
        {
            get
            {
                if (this.voucherTypeRepository == null)
                    this.voucherTypeRepository = new GenericRepository<VoucherType>(context);
                return voucherTypeRepository;
            }
        }

        #endregion VoucherType

        #region ProductionConsum

        private GenericRepository<ProductionConsum> productionConsumRepository;
        public IRepository<ProductionConsum> ProductionConsumRepository
        {
            get
            {
                if (this.productionConsumRepository == null)
                    this.productionConsumRepository = new GenericRepository<ProductionConsum>(context);
                return productionConsumRepository;
            }
        }
        #endregion ProductionConsum

        #region CountryInfo

        private GenericRepository<CountryInfo> countryInfoRepository;
        public IRepository<CountryInfo> CountryInfoRepository
        {
            get
            {
                if (this.countryInfoRepository == null)
                    this.countryInfoRepository = new GenericRepository<CountryInfo>(context);
                return countryInfoRepository;
            }
        }

        #endregion CountryInfo

        #region DistrictInfo

        private GenericRepository<DistrictInfo> districtInfoRepository;
        public IRepository<DistrictInfo> DistrictInfoRepository
        {
            get
            {
                if (this.districtInfoRepository == null)
                    this.districtInfoRepository = new GenericRepository<DistrictInfo>(context);
                return districtInfoRepository;
            }
        }

        #endregion DistrictInfo

        #region TblDivision

        private GenericRepository<TblDivision> tblDivisionRepository;
        public IRepository<TblDivision> TblDivisionRepository
        {
            get
            {
                if (this.tblDivisionRepository == null)
                    this.tblDivisionRepository = new GenericRepository<TblDivision>(context);
                return tblDivisionRepository;
            }
        }

        #endregion TblDivision

        #region UpojillaInfo

        private GenericRepository<UpojillaInfo> upojillaInfoRepository;
        public IRepository<UpojillaInfo> UpojillaInfoRepository
        {
            get
            {
                if (this.upojillaInfoRepository == null)
                    this.upojillaInfoRepository = new GenericRepository<UpojillaInfo>(context);
                return upojillaInfoRepository;
            }
        }
        #endregion UpojillaInfo

        #region UnionInfo

        private GenericRepository<UnionInfo> unionInfoRepository;
        public IRepository<UnionInfo> UnionInfoRepository
        {
            get
            {
                if (this.unionInfoRepository == null)
                    this.unionInfoRepository = new GenericRepository<UnionInfo>(context);
                return unionInfoRepository;
            }
        }

        #endregion UnionInfo

        #region tblWard

        private GenericRepository<tblWard> TblWardRepository;
        public IRepository<tblWard> tblWardRepository
        {
            get
            {
                if (this.TblWardRepository == null)
                    this.TblWardRepository = new GenericRepository<tblWard>(context);
                return TblWardRepository;
            }
        }

        #endregion tblWard

        #region VillageInfo

        private GenericRepository<VillageInfo> villageInfoRepository;
        public IRepository<VillageInfo> VillageInfoRepository
        {
            get
            {
                if (this.villageInfoRepository == null)
                    this.villageInfoRepository = new GenericRepository<VillageInfo>(context);
                return villageInfoRepository;
            }
        }

        #endregion VillageInfo

        #region ColorInfo

        private GenericRepository<Inv_ColorInfo> inv_ColorInfoRepository;
        public IRepository<Inv_ColorInfo> Inv_ColorInfoRepository
        {
            get
            {
                if (this.inv_ColorInfoRepository == null)
                    this.inv_ColorInfoRepository = new GenericRepository<Inv_ColorInfo>(context);
                return inv_ColorInfoRepository;
            }
        }

        #endregion ColorInfo

        #region SizeInfo

        private GenericRepository<Inv_SizeInfo> inv_SizeInfoRepository;
        public IRepository<Inv_SizeInfo> Inv_SizeInfoRepository
        {
            get
            {
                if (this.inv_SizeInfoRepository == null)
                    this.inv_SizeInfoRepository = new GenericRepository<Inv_SizeInfo>(context);
                return inv_SizeInfoRepository;
            }
        }

        #endregion SizeInfo

        #region Department

        private GenericRepository<Department> departmentRepository;
        public IRepository<Department> DepartmentRepository
        {
            get
            {
                if (this.departmentRepository == null)
                    this.departmentRepository = new GenericRepository<Department>(context);
                return departmentRepository;
            }
        }

        #endregion Department

        #region TblDesignation

        private GenericRepository<TblDesignation> tblDesignationRepository;
        public IRepository<TblDesignation> TblDesignationRepository
        {
            get
            {
                if (this.tblDesignationRepository == null)
                    this.tblDesignationRepository = new GenericRepository<TblDesignation>(context);
                return tblDesignationRepository;
            }
        }

        #endregion TblDesignation

        #region SupplierInfo

        private GenericRepository<SupplierInfo> supplierInfoRepository;
        public IRepository<SupplierInfo> SupplierInfoRepository
        {
            get
            {
                if (this.supplierInfoRepository == null)
                    this.supplierInfoRepository = new GenericRepository<SupplierInfo>(context);
                return supplierInfoRepository;
            }
        }

        #endregion SupplierInfo

        #region Inv_ColorInfo

        private GenericRepository<Inv_ColorInfo> colorInfoRepository;
        public IRepository<Inv_ColorInfo> ColorInfoRepository
        {
            get
            {
                if (this.colorInfoRepository == null)
                    this.colorInfoRepository = new GenericRepository<Inv_ColorInfo>(context);
                return colorInfoRepository;
            }
        }

        #endregion Inv_ColorInfo

        #region Inv_SizeInfo

        private GenericRepository<Inv_SizeInfo> sizeInfoRepository;
        public IRepository<Inv_SizeInfo> SizeInfoRepository
        {
            get
            {
                if (this.sizeInfoRepository == null)
                    this.sizeInfoRepository = new GenericRepository<Inv_SizeInfo>(context);
                return sizeInfoRepository;
            }
        }

        #endregion Inv_SizeInfo

        #region AccChequePayment

        private GenericRepository<AccChequePayment> accChequePaymentRepository;
        public IRepository<AccChequePayment> AccChequePaymentRepository
        {
            get
            {
                if (this.accChequePaymentRepository == null)
                    this.accChequePaymentRepository = new GenericRepository<AccChequePayment>(context);
                return accChequePaymentRepository;
            }
        }

        #endregion AccChequePayment

        #region AccCustomerPayment

        private AccCustomerPaymentRepository accCustomerPaymentRepository;
        public AccCustomerPaymentRepository AccCustomerPaymentRepository
        {
            get
            {
                if (this.accCustomerPaymentRepository == null)
                    this.accCustomerPaymentRepository = new AccCustomerPaymentRepository(context);
                return accCustomerPaymentRepository;
            }
        }

        #endregion AccCustomerPayment

        #region AccSupplierPayment

        private AccSupplierPaymentRepository accSupplierPaymentRepository;
        public AccSupplierPaymentRepository AccSupplierPaymentRepository
        {
            get
            {
                if (this.accSupplierPaymentRepository == null)
                    this.accSupplierPaymentRepository = new AccSupplierPaymentRepository(context);
                return accSupplierPaymentRepository;
            }
        }

        #endregion AccSupplierPayment

        #region Purchase

        private PurchaseRepository purchaseRepository;
        public PurchaseRepository PurchaseRepository
        {
            get
            {
                if (this.purchaseRepository == null)
                    this.purchaseRepository = new PurchaseRepository(context);
                return purchaseRepository;
            }
        }

        #endregion Purchase

        #region PurchaseDetail

        private GenericRepository<PurchaseDetail> purchaseDetailsRepository;
        public IRepository<PurchaseDetail> PurchaseDetailsRepository
        {
            get
            {
                if (this.purchaseDetailsRepository == null)
                    this.purchaseDetailsRepository = new GenericRepository<PurchaseDetail>(context);
                return purchaseDetailsRepository;
            }
        }

        #endregion PurchaseDetail

        #region Sale

        private SaleRepository saleRepository;
        public SaleRepository SaleRepository
        {
            get
            {
                if (this.saleRepository == null)
                    this.saleRepository = new SaleRepository(context);
                return saleRepository;
            }
        }

        #endregion Sale

        #region SalesDetail

        private GenericRepository<SalesDetail> salesDetailRepository;
        public IRepository<SalesDetail> SalesDetailRepository
        {
            get
            {
                if (this.salesDetailRepository == null)
                    this.salesDetailRepository = new GenericRepository<SalesDetail>(context);
                return salesDetailRepository;
            }
        }


        #endregion SalesDetail

        #region PurchaseRetrun

        private PurchaseRetrunRepository purchaseRetrunRepository;
        public PurchaseRetrunRepository PurchaseRetrunRepository
        {
            get
            {
                if (this.purchaseRetrunRepository == null)
                    this.purchaseRetrunRepository = new PurchaseRetrunRepository(context);
                return purchaseRetrunRepository;
            }
        }

        #endregion PurchaseRetrun

        #region PurchaseReturnDetail

        private GenericRepository<PurchaseReturnDetail> purchaseReturnDetailRepository;
        public IRepository<PurchaseReturnDetail> PurchaseReturnDetailRepository
        {
            get
            {
                if (this.purchaseReturnDetailRepository == null)
                    this.purchaseReturnDetailRepository = new GenericRepository<PurchaseReturnDetail>(context);
                return purchaseReturnDetailRepository;
            }
        }

        #endregion PurchaseReturnDetail

        #region SalesReturn

        private SalesReturnRepository salesReturnRepository;
        public SalesReturnRepository SalesReturnRepository
        {
            get
            {
                if (this.salesReturnRepository == null)
                    this.salesReturnRepository = new SalesReturnRepository(context);
                return salesReturnRepository;
            }
        }

        #endregion SalesReturn

        #region SalesReturnDetail
        private GenericRepository<SalesReturnDetail> salesReturnDetailRepository;
        public IRepository<SalesReturnDetail> SalesReturnDetailRepository
        {
            get
            {
                if (this.salesReturnDetailRepository == null)
                    this.salesReturnDetailRepository = new GenericRepository<SalesReturnDetail>(context);
                return salesReturnDetailRepository;
            }
        }
        #endregion SalesReturnDetail

        #region UserReg
        private TblUserRegRepository tblUserRegRepository;
        public TblUserRegRepository TblUserRegRepository
        {
            get
            {
                if (this.tblUserRegRepository == null)
                    this.tblUserRegRepository = new TblUserRegRepository(context);
                return tblUserRegRepository;
            }
        }
        #endregion

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
