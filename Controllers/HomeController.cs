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
            return View();
        }

        //public ActionResult PartialViewExample()
        //{
        //    return PartialView();
        //}
        public ActionResult LoginExternalVendor()
        {
            //return PartialView(@"~/views/Shared/_partialDDLanding.cshtml");
            //return View(@"~/views/Deposit/Index.cshtml");
            //return PartialView(@"~/views/Shared/_partialPaymentInformation.cshtml");


            return this.RedirectToAction("Index", "Deposit");
            //return RedirectToAction("Index", "Deposit");
            //return View("Index", "Deposit");
            //return View("Deposit", "Index");
            //return PartialView(@"~/views/Shared/_partialDDLanding.cshtml");
            //return PartialView(@"~/views/Shared/_partialPaymentInformation.cshtml");
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




//LoginExternalVendor()
    //call api
    // if pass 
    // newtonsoft -receive parse
    // 
    //return this.RedirectToAction("Index", "Deposit");
    //return RedirectToAction("Index", "Deposit");
    //return View("Index", "Deposit");
    //return View("Deposit", "Index");
    //return PartialView(@"~/views/Shared/_partialDDLanding.cshtml");
            //return PartialView(@"~/views/Shared/_partialPaymentInformation.cshtml");