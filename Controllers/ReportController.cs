using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMaterialPOC.Models;

namespace WebMaterialPOC.Controllers
{
    public class ReportController : Controller
    {
        // GET: Report
        public ActionResult Index()
        {
            ////var id = jsonResult.Id;
            //ReportWriter reportWriter = new ReportWriter();
            //reportWriter.ReportPath = Server.MapPath("~/Data/GroupingAgg.rdl");
            //reportWriter.ReportProcessingMode = ProcessingMode.Remote;
            ////List<ReportParameter> parameters = new List<ReportParameter>();
            ////parameters.Add(new ReportParameter() { Name = "OrderId", Labels = new List<string>() { id }, Values = new List<string>() { id } });
            ////reportWriter.SetParameters(parameters);
            //var format = WriterFormat.PDF;
            //MemoryStream ms = new MemoryStream();
            ////To save the report as memory stream
            //reportWriter.Save(ms, format);
            ////Converts memory stream into base64 string
            //string base64 = "data:application/pdf;base64," + Convert.ToBase64String(ms.ToArray());
            //var json = new { data = base64 };
            ////return Json(json);
            return View();
        }

        public ActionResult ReportTemplate(string ReportName, string ReportDescription, int Width, int Height)
        {
            var rptInfo = new ReportInfo
            {
                ReportName = ReportName,
                ReportDescription = ReportDescription,
                ReportURL = String.Format("../../Reports/ReportTemplate.aspx?ReportName={0}&Height={1}", ReportName, Height),
                Width = Width,
                Height = Height
            };

            return View(rptInfo);
        }

        //public bool SaveConfirmPDF()
        //{
        //     byte[] bytes;
        //    string mimetype, extension;
        //    Warning[] warnings;
        //    string[] streamIds;
        //    string encoding = string.Empty;
        //    mimetype = string.Empty;
        //    extension = string.Empty;
        //    string pSenderId = "btnPrint";

        //    ReportParameterCollection objParams = new ReportParameterCollection();
        //    if ((PayeetoVendorID == null) || (PayeetoVendorID == 0))
        //    {
        //        objParams.Add(new ReportParameter("ConfirmNum", ConfirmationNum));
        //    }
        //    else
        //    {
        //        objParams.Add(new ReportParameter("PayeeToVendorID", PayeetoVendorID.ToString()));
        //    }

        //    ReportViewer viewer = new ReportViewer()
        //    {
        //        ProcessingMode = ProcessingMode.Remote
        //    };
        //    viewer.ServerReport.ReportPath = GetReportPath(pSenderId, PayeetoVendorID);
        //    viewer.ServerReport.SetParameters(objParams);
        //    bytes = viewer.ServerReport.Render("PDF", null, out mimetype, out encoding, out extension, out streamIds, out warnings);

        //    string environment = System.Configuration.ConfigurationManager.AppSettings["eCAPDDEnvironment"];
        //    if (environment == "Local")
        //    {
        //        FileStream fs = new FileStream(@"C:\VDD\vendor\PDFReports\");

        //        fs.Write(bytes, 0, bytes.Length);
        //        fs.Close();
        //    }
        //    else
        //    {
        //        FileStream fs = new FileStream(@"D:\Website\Internet\DD_VCM_TEST\DD_Output\CLAIM\VCM_DDOL" + ConfirmationNum.ToString() + "_" + DateTime.Today.ToString("yyyyMMdd") + ".pdf", FileMode.Create);
        //        fs.Write(bytes, 0, bytes.Length);
        //        fs.Close();
        //    }
        //    return true;

        //}


        //private string GetReportPath(string pSenderId, int PayeetoVendorID)
        //{
        //    if ((PayeetoVendorID == null) || (PayeetoVendorID == 0))
        //    {
        //        return "/ReportProject/Report_eCAPDDPrintPreviewByConfirmNum";
        //    }
        //    else
        //    {
        //        return "/ReportProject/Report_eCAPDDPrintPreview";
        //    }

        //}
    }
}