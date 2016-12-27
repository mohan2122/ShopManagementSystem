using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Repository;
using Repository.Common;
using Repository.UnitOfWork;

namespace Accounting.Controllers
{
    public class BaseController : Controller
    {
        protected IUnitOfWork Uow { get; set; }        
    }
}
