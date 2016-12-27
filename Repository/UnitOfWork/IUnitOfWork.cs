using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.Common;

namespace Repository.UnitOfWork
{
    public interface IUnitOfWork
    {
        IRepository<PaymentType> PaymentTypeRepository { get; }
        AccBudgetRepository AccBudgetRepository { get; }
        IRepository<AccBudgetDetail> AccBudgetDetailRepository { get; }
        AccQuarterBudgetRepository AccQuarterBudgetRepository { get; }
        IRepository<AccQuarterBudgetDetail> AccQuarterBudgetDetailRepository { get; }
        AccGeneralLedgerRepository AccGeneralLedgerRepository { get; }
        IRepository<AccGroup> AccGroupRepository { get; }
        IRepository<AccHead> AccHeadRepository { get; }
        IRepository<AccType> AccTypeRepository { get; }

        IRepository<AdjustmentType> AdjustmentTypeRepository { get; }
        IRepository<Adjustment> AdjustmentRepository { get; }
        IRepository<AccProject> AccProjectRepository { get; }
        IRepository<CheckInfo> CheckInfoRepository { get; }
        IRepository<ChequeRegister> ChequeRegisterRepository { get; }

        //IRepository<Bank> BankRepository { get; }
        BankRepository BankRepository{get;}
        IRepository<Branch> BranchRepository { get; }
        IRepository<CompanyInfo> CompanyInfoRepository { get; }
        IRepository<CountryInfo> CountryInfoRepository { get; }
        IRepository<DistrictInfo> DistrictInfoRepository { get; }
        IRepository<TblDivision> TblDivisionRepository { get; }
        IRepository<UpojillaInfo> UpojillaInfoRepository { get; }
        IRepository<UnionInfo> UnionInfoRepository { get; }
        IRepository<tblWard> tblWardRepository { get; }
        IRepository<VillageInfo> VillageInfoRepository { get; }
        IRepository<Department> DepartmentRepository { get; }
        IRepository<TblDesignation> TblDesignationRepository { get; }
        IRepository<Inv_ColorInfo> Inv_ColorInfoRepository { get; }
        IRepository<Inv_SizeInfo> Inv_SizeInfoRepository { get; }

        IRepository<CustomerInfo> CustomerInfoRepository { get; }       
        IRepository<ExpenseInfo> ExpenseInfoRepository { get; }
        IRepository<InvBrand> InvBrandRepository { get; }
        IRepository<ProductCategory> ProductCategoryRepository { get; }
        IRepository<ProductInfo> ProductInfoRepository { get; }
        IRepository<TarrifType> TarrifTypeRepository { get; }
        IRepository<Unit> UnitRepository { get; }
        IRepository<TaxSource> TaxSourceRepository { get; }
        IRepository<VATType> VATTypeRepository { get; }
        IRepository<VoucherType> VoucherTypeRepository { get; }
        IRepository<ProductionConsum> ProductionConsumRepository { get; }
        IRepository<SupplierInfo> SupplierInfoRepository { get; }

        IRepository<Inv_ColorInfo> ColorInfoRepository { get; }
        IRepository<Inv_SizeInfo> SizeInfoRepository { get; }
        IRepository<AccChequePayment> AccChequePaymentRepository { get; }
        AccSupplierPaymentRepository AccSupplierPaymentRepository { get; }
        AccCustomerPaymentRepository AccCustomerPaymentRepository { get; }
        PurchaseRepository PurchaseRepository { get; }
        IRepository<PurchaseDetail> PurchaseDetailsRepository { get; }
        SaleRepository SaleRepository { get; }
        IRepository<SalesDetail> SalesDetailRepository { get; }
        PurchaseRetrunRepository PurchaseRetrunRepository { get; }
        IRepository<PurchaseReturnDetail> PurchaseReturnDetailRepository { get; }
        SalesReturnRepository SalesReturnRepository { get; }
        IRepository<SalesReturnDetail> SalesReturnDetailRepository { get; }
        TblUserRegRepository TblUserRegRepository { get; }
    }
}
