using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Windows.Forms;
using System.Xml;
using WebMaterialPOC.Models;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using System.Text;

namespace VDDVendor.Controllers
{
    public class DepositController : Controller
    {
        // GET: Deposit
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult _partialLogin()
        {
            return View();
        }

        public ActionResult _partialBankDetails()
        {
            return View();
        }

        public ActionResult _partialAttachment()
        {
            return View();
        }

        public ActionResult _partialBankVerify()
        {
            return View();
        }

        public ActionResult _partialCertify()
        {
            return View();
        }

        public ActionResult _partialSubmit()
        {
            return View();
        }


        public ActionResult _partialConfirmation()
        {
            return View();
        }

        public ActionResult _partialAppStatus()
        {
            return View();
        }

        public ActionResult _partialReport()
        {
            return View();
        }

        //public string ValidateRoughtingNumber(string aba)
        //{
        //    string bankName = string.Empty;
        //    try
        //    {
        //        ABAServices.ABAService abaWebService = new ABAServices.ABAService();
        //        string token = abaWebService.Logon(3387, "lacounty".Trim(), "RXdqmYHg".Trim());
        //        bool validRouting = abaWebService.VerifyABA(token, aba);

        //        string xml = abaWebService.GetBanksPrimarySortXML(token, aba);
        //        XmlDocument xmlDoc = new XmlDocument();
        //        xmlDoc.LoadXml(xml);

        //        XmlNodeList iNodeList = xmlDoc.SelectNodes("//Institutions");

        //        if (iNodeList.Count > 0)
        //        {
        //            XmlNode node = iNodeList[0];
        //            bankName = node.InnerText;
        //        }

        //        ////XmlNodeList nodeList = xmlDoc.SelectNodes("//InstitutionName[@type='M']");
        //        //XmlNodeList nodeList = xmlDoc.SelectNodes("//InstitutionName[@type='B']");

        //        //if (nodeList.Count > 0)
        //        //{
        //        //    XmlNode node = nodeList[0];
        //        //    if (node.InnerText.Length > 40)
        //        //    {
        //        //        bankName = node.InnerText.Substring(0, 40);
        //        //    }
        //        //    else
        //        //    {
        //        //        bankName = node.InnerText;
        //        //    }
        //        //}
        //    }
        //    catch (Exception ex){
        //        //if (ex.Message == "No banks found!")
        //        bankName = "No banks found";  
        //    }

        //    return bankName;
        //}


        //[HttpPost]
        //public FileResult openPDF(){
        //    string path = @"C:\test\vddtest.pdf";
        //    return File(path, "application/pdf", "pdf_download_name.pdf");
        //}


        [HttpPost]
        public ActionResult UploadAttachmentFile()
        {
            string fname = string.Empty;
            string Uploadpath = string.Empty;
            // Checking no of files injected in Request object  
            if (Request.Files.Count > 0)
            {
                string modifiedFilename = Request.Form["modifiedFilename"];
                try
                {
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFileBase file = files[i];

                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = modifiedFilename;
                        }

                        Uploadpath = System.Configuration.ConfigurationManager.AppSettings["Uploadpath"];
                        fname = Path.Combine(Server.MapPath("~/" + Uploadpath + "/"), fname);
                        file.SaveAs(fname);
                    }
                    // Returns message that successfully uploaded  
                    return Json(modifiedFilename);
                }
                catch (Exception ex)
                {
                    return Json("Error");
                }
            }
            else
            {
                return Json("No files selected.");
            }
        }

        [HttpPost]
        public ActionResult showReport()
        {
            ReportViewer viewer = new ReportViewer();
            viewer.ProcessingMode = ProcessingMode.Local;
            viewer.SizeToReportContent = true;
            viewer.SizeToReportContent = true;
            viewer.AsyncRendering = true;
            viewer.LocalReport.ReportPath = "Report1.rdlc";
            viewer.LocalReport.Refresh();
            ViewBag.ReportViewer = viewer;
            return View();
        }

        [HttpPost]
        public ActionResult check_applicationinUATMode(VM_VendorDetails vendordetails)
        {
            string localPath = AppDomain.CurrentDomain.BaseDirectory;

            bool goProductionBool = true;
            bool userExistsinEligibilityList = false;
            string returnEmailValue = "";

            if (System.Configuration.ConfigurationManager.AppSettings["ProductionVDDUserList"] != null)
            {
                //string ProductionUserAndEmailList = System.Configuration.ConfigurationManager.AppSettings["ProductionUserAndEmailList"];


                string ProductionVDDUserList = System.Configuration.ConfigurationManager.AppSettings["ProductionVDDUserList"];
                string ProductionVDDEmailList = System.Configuration.ConfigurationManager.AppSettings["ProductionVDDEmailList"];

                string userTextFilePath = localPath + ProductionVDDUserList;
                string emailTextFilePath = localPath + ProductionVDDEmailList;


                string[] lines;
                var list = new List<string>();
                if (System.IO.File.Exists(userTextFilePath))
                {
                    var fileStream = new FileStream(userTextFilePath, FileMode.Open, FileAccess.Read);
                    using (var streamReader = new StreamReader(fileStream, Encoding.UTF8))
                    {
                        string line;
                        while ((line = streamReader.ReadLine()) != null)
                        {
                            goProductionBool = false;
                            list.Add(line.Trim().ToLower());
                        }
                    }
                    lines = list.ToArray();

                    string str = vendordetails.Vendornumber.Trim().ToLower();
                    userExistsinEligibilityList = Array.Exists(lines, E => E == str);
                }
            }

            if (userExistsinEligibilityList == true)
            {
                if (System.Configuration.ConfigurationManager.AppSettings["ProductionVDDEmailList"] != null)
                {
                    string ProductionVDDEmailList = System.Configuration.ConfigurationManager.AppSettings["ProductionVDDEmailList"];

                    string emailTextFilePath = localPath + ProductionVDDEmailList;
                    if (System.IO.File.Exists(emailTextFilePath))
                    {
                        string[] EmailLine;
                        var emaillist = new List<string>();
                        var fileStream = new FileStream(emailTextFilePath, FileMode.Open, FileAccess.Read);
                        using (var streamReader = new StreamReader(fileStream, Encoding.UTF8))
                        {
                            string Emailline;
                            while ((Emailline = streamReader.ReadLine()) != null)
                            {
                                if (Emailline.Trim().ToLower() != "")
                                {
                                    returnEmailValue = Emailline.Trim().ToLower();
                                    break;
                                }
                            }
                        }
                        EmailLine = emaillist.ToArray();
                    }
                }
            }


            VM_VendorDetails retProdEligibilityUser = new VM_VendorDetails();
            retProdEligibilityUser.goProductionBool = goProductionBool;  //  this  checks user list is not avilable so, going full production
            retProdEligibilityUser.restrictProdEligibilityUser = userExistsinEligibilityList;
            retProdEligibilityUser.Signeremail = returnEmailValue;
            return Json(retProdEligibilityUser);
        }
                //return Request.CreateResponse(HttpStatusCode.OK, new { data = retProdEligibilityUser }); 
        

        //public VM_VendorDetails check_applicationinUATMode(VM_VendorDetails vendordetails)
        //{
        //    string localPath = AppDomain.CurrentDomain.BaseDirectory;
        //    string jsonFilePath = localPath + "ProductionUserAndEmailList.json";

        //    string json = System.IO.File.ReadAllText(jsonFilePath);
        //    VM_VendorDetails v = JsonConvert.DeserializeObject<VM_VendorDetails>(json);
        //    return v;// Json(json);
        //}
    }
}
