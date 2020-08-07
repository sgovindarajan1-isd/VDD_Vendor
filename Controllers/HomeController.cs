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


        [HttpPost]
        public JsonResult IsSessionAlive()
        {
            if (Session.Contents.Count == 0)
            {
                return this.Json(new { IsAlive = false }, JsonRequestBehavior.AllowGet);
            }
            return this.Json(new { IsAlive = true }, JsonRequestBehavior.AllowGet);
}

        public ActionResult LoginExternalVendor()
        {
             return this.RedirectToAction("Index", "Deposit");
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
