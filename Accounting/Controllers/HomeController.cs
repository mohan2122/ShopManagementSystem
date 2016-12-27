using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Repository.UnitOfWork;

namespace Accounting.Controllers
{
    public class HomeController : BaseController
    {
       
        public HomeController(IUnitOfWork uow)
        {
           Uow = uow;
        }
        public ActionResult Login()
        {
            return View();
        }
        public int LoginTest(string UserID, String Password)
        {
            int success = Uow.TblUserRegRepository.Login(UserID, Password);
            Session["UserID"] = UserID;
            return success;
        }
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";
            return RedirectToAction("Login", "Home");
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            return View();
        }
    }
}
