﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebMaterialPOC.Controllers
{
    public class DepositController : Controller
    {
        // GET: Deposit
        public ActionResult Index()
        {
            return View();
            //return PartialView(@"~/views/Shared/Deposit/Index.cshtml");
        }


    }
}
