using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMaterialPOC.Models;

namespace WebMaterialPOC.Controllers
{

    public class HomeController : Controller
    {
      
        public ActionResult Index()
        {
            try
            {
                int i = 0;
                int k = 100 / i;
                i = k;
            }
            catch ( DivideByZeroException ex)
            {
                LogManager.log.Info("Info: connecting database failed !");
                LogManager.log.Error("Error connecting Database!");
                //log4net.LogManager.GetLogger("EmailLogger").Error("Error connecting Database!");
            }
            return View();
        }

        public ActionResult PartialViewExample()
        {
            return PartialView();
        }
    ////    [ValidateAntiForgeryToken]
        public ActionResult LoginExternalVendor()
        {
            //call api
            // if pass 
            // newtonsoft -receive parse
            // 
            // return RedirectToAction("Index", "Deposit");
            return PartialView(@"~/views/Shared/_partialDDLanding.cshtml");
        }

        public ActionResult DDStatus()
        {
            return PartialView(@"~/views/Shared/_partialDDStatus.cshtml");
        }

        public ActionResult DDNew()
        {
            return PartialView(@"~/views/Deposit/index.cshtml");
        }


        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult NewDeposit()
        {
            return PartialView(@"~/views/Shared/_partialNewDeposit.cshtml");

        }

        public ActionResult UnAuthorized()
        {
            ViewBag.Message = "UnAuthorized Page!";

            return View();
        }

        public ActionResult GeneralInfo()
        {
            ViewBag.Message = "General Infoformation";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Contact Us";

            return View();
        }



    }
}