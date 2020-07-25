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

namespace WebMaterialPOC.Controllers
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


        public string ValidateRoughtingNumber(string aba)
        {
            string bankName = string.Empty;
            try
            {
                ABAServices.ABAService abaWebService = new ABAServices.ABAService();
                string token = abaWebService.Logon(3387, "lacounty".Trim(), "RXdqmYHg".Trim());
                bool validRouting = abaWebService.VerifyABA(token, aba);


                string xml = abaWebService.GetBanksPrimarySortXML(token, aba);
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.LoadXml(xml);
                XmlNodeList nodeList = xmlDoc.SelectNodes("//InstitutionName[@type='M']");

                if (nodeList.Count > 0)
                {
                    XmlNode node = nodeList[0];
                    if (node.InnerText.Length > 40)
                    {
                        bankName = node.InnerText.Substring(0, 40);
                    }
                    else
                    {
                        bankName = node.InnerText;
                    }
                }
            }
            catch (Exception ex){
                //if (ex.Message == "No banks found!")
                bankName = "No banks found";
            }

            return bankName;
        }

        [HttpPost]
        public ActionResult UploadAttachmentFile()
        {
            //string testanddelete = GetIPAddress();

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
                        fname = Path.Combine(Server.MapPath("~/"+ Uploadpath +"/ "), fname);
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



        public string GetIPAddress()
        {
            string ipaddress = string.Empty;
            IPHostEntry Host = default(IPHostEntry);
            string Hostname = null;
            Hostname = System.Environment.MachineName;
            Host = Dns.GetHostEntry(Hostname);
            foreach (IPAddress IP in Host.AddressList)
            {
                if (IP.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                {
                    ipaddress = Convert.ToString(IP);
                }
            }
            return ipaddress;
        }
    }
}
