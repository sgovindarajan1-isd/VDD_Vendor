using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebMaterialPOC.Models;
using Microsoft.Reporting.WebForms;
using System.IO;
using System.Data;

namespace WebMaterialPOC.Controllers
{
    public class ReportController : Controller
    {

        public ActionResult _partialReport()
        {
            //string ssrsuri = ConfigurationManager.AppSettings["SSRSREportUrl"].ToString();

            //ReportViewer viewer = new ReportViewer();
            //viewer.ProcessingMode = ProcessingMode.Local;
            //viewer.SizeToReportContent = true;
            //viewer.SizeToReportContent = true;
            //viewer.AsyncRendering = true;
            //viewer.ServerReport.ReportServerUrl = new Uri(ssrsuri);
            //viewer.ServerReport.ReportPath = "/Report1";
            //ViewBag.ReportViewer = viewer;

            ////reportViewer.Width = Unit.Percentage(900);
            ////reportViewer.Height = Unit.Percentage(900);
            ////var connectionString = ConfigurationManager.ConnectionStrings["DbEmployeeConnectionString"].ConnectionString;
            ////SqlConnection conx = new SqlConnection(connectionString); SqlDataAdapter adp = new SqlDataAdapter("SELECT * FROM Employee_tbt", conx);
            ////adp.Fill(ds, ds.Employee_tbt.TableName);
            ////viewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\Reports1.rdlc";
            ////viewer.LocalReport.ReportPath = @"C:\VDD\VendorReports\VendorDetailsRpt.rdl";
            //////reportViewer.LocalReport.DataSources.Add(new ReportDataSource("MyDataSet", ds.Tables[0]));
            ////ViewBag.ReportViewer = reportViewer;
            return View();
        }

        private string PDFExport(LocalReport report, string rptPathandFileName, string rptFileName)
        {
            try
            {
                string[] streamids;
                string minetype;
                string encod;
                string fextension;
                string deviceInfo =
                  "<DeviceInfo>" +
                  "  <OutputFormat>EMF</OutputFormat>" +
                  "  <PageWidth>8.5in</PageWidth>" +
                  "  <PageHeight>11in</PageHeight>" +
                  "  <MarginTop>0.25in</MarginTop>" +
                  "  <MarginLeft>0.25in</MarginLeft>" +
                  "  <MarginRight>0.25in</MarginRight>" +
                  "  <MarginBottom>0.25in</MarginBottom>" +
                  "</DeviceInfo>";
                Warning[] warnings;
                byte[] rpbybe = report.Render("PDF", deviceInfo, out minetype, out encod, out fextension, out streamids,
                   out warnings);
                using (FileStream fs = new FileStream(rptPathandFileName, FileMode.Create))
                {
                    fs.Write(rpbybe, 0, rpbybe.Length);
                }
                return rptFileName;
            }
            catch (Exception ex)
            {
                return "error";
            }
        }

        public DataTable createVendorDataTable(VM_VendorDetails vendordetails)
        {
            DataTable dt = new DataTable();
            dt.Clear();
            dt.Columns.Add("VendorNumber");
            dt.Columns.Add("VendorName");
            dt.Columns.Add("ssn");
            dt.Columns.Add("DDNotifiEmail");
            dt.Columns.Add("AccountType");
            dt.Columns.Add("BankAccountNumber");
            dt.Columns.Add("BankRoutingNo");
            dt.Columns.Add("FinancialIns");
            dt.Columns.Add("Signeremail");
            dt.Columns.Add("Signername");
            dt.Columns.Add("Signerphone");
            dt.Columns.Add("Signertitle");
            dt.Columns.Add("VendorAttachmentFileName");
            dt.Columns.Add("SubmittedDate");
            dt.Columns.Add("TotalAttachment");
            dt.Columns.Add("ConfirmationNumber");
            DataRow dr = dt.NewRow();
            dr["VendorNumber"] = vendordetails.Vendorname;
            dr["VendorName"] = vendordetails.Payeename;

            dr["ssn"] = getMaskedSSN(vendordetails.Ssn);
            dr["DDNotifiEmail"] = vendordetails.DDNotifiEmail;
            if (vendordetails.AccountType == 1)
                dr["AccountType"] = "Checking";
            else if (vendordetails.AccountType == 2)
                dr["AccountType"] = "Saving";
            else
                dr["BankAccountType"] = "Error";
            dr["BankAccountNumber"] = vendordetails.BankAccountNumber;
            dr["BankRoutingNo"] = vendordetails.BankRoutingNo;
            dr["FinancialIns"] = vendordetails.FinancialIns;
            dr["Signeremail"] = vendordetails.Signeremail;
            dr["Signername"] = vendordetails.Signername;
            dr["Signerphone"] = vendordetails.Signerphone;
            dr["Signertitle"] = vendordetails.Signertitle;
            dr["VendorAttachmentFileName"] = vendordetails.VendorAttachmentFileName;

            dr["TotalAttachment"] = "Total: 1";
            dr["SubmittedDate"] = "SubmittedDate: " + vendordetails.SubmitDateTime.ToString();
            dr["ConfirmationNumber"] = vendordetails.Confirmation;
            dt.Rows.Add(dr);
            return dt;
        }

        public string getMaskedSSN(string ssn)
        {
            string retValue = "***-**-" + ssn.Substring(ssn.Length - 4, 4);
            return retValue;
        }


        public DataTable createLocationDataTable(VM_VendorDetails vendordetails)
        {
            if (vendordetails.LocationAddressDescList.Count <= 0)
                return null;
            DataTable dt = new DataTable();
            dt.Clear();
            dt.Columns.Add("LocationAddress");
            //DataRow _ravi = dt.NewRow();
            //_ravi["LocationAddress"] = "SriniLocation1";
            //dt.Rows.Add(_ravi);
            int cnt = 1;
            foreach (string locadd in vendordetails.LocationAddressDescList)
            {
                if (locadd != null && locadd != string.Empty)
                {
                    DataRow dr = dt.NewRow();
                    dr["LocationAddress"] = cnt.ToString() + ". " + locadd;
                    cnt++;
                    dt.Rows.Add(dr);
                }
            }

            return dt;
        }



        public ActionResult ShowReport(VM_VendorDetails vendordetails)
        {
            //string ssrsuri = ConfigurationManager.AppSettings["SSRSREportUrl"].ToString();

            string uploadPath = System.Configuration.ConfigurationManager.AppSettings["Uploadpath"];  //  here is the path where  vendorreport file will be saved
            //string uploadFileName = uploadPath + "\" + fileName.Text + ".PDF";

            // string uploadFileName = Path.Combine(Server.MapPath("~/" + uploadPath + "/ "), "tmp.PDF");
            string uploadFileName = Path.Combine(Server.MapPath("~/" + uploadPath + "/ "), vendordetails.VendorReportFileName);

            ReportViewer viewer = new ReportViewer();
            viewer.ProcessingMode = ProcessingMode.Local;
            viewer.SizeToReportContent = true;
            viewer.SizeToReportContent = true;
            viewer.AsyncRendering = true;
            // viewer.ServerReport.ReportServerUrl = new Uri(ssrsuri);
            viewer.LocalReport.ReportPath = "VendorAuthorizationForm.rdlc";

            // viewer.LocalReport.DataSources.Clear();
            DataTable vdt = createVendorDataTable(vendordetails);
            //Providing DataSource for the Report  
            ReportDataSource rds = new ReportDataSource("VendorDataSet", vdt);

            // location ds
            DataTable ldt = createLocationDataTable(vendordetails);
            //Providing DataSource for the Report  
            ReportDataSource lds = new ReportDataSource("VendorDataLocDataSet", ldt);

            viewer.LocalReport.DataSources.Clear();
            //Add ReportDataSource  
            viewer.LocalReport.DataSources.Add(rds);
            viewer.LocalReport.DataSources.Add(lds);

            //ReportDataSource rs = new ReportDataSource("rds", new List<VM_VendorDetails> { vendordetails });
            //viewer.LocalReport.DataSources.Add(rs);

            //ReportParameter[] param = new ReportParameter[1];
            //param[0] = new ReportParameter("ConfirmationNum", vendordetails.Confirmation);  //  ***** sending the confirmation number in Idtext field
            //viewer.LocalReport.SetParameters(param);

            //   viewer.LocalReport.Refresh();
            string retFileName = PDFExport(viewer.LocalReport, uploadFileName, vendordetails.VendorReportFileName);
            //ViewBag.ReportViewer = viewer;
            return Json(retFileName);

            //var shipment = _inboundShipmentService.GetInboundShipmentById(shipmentId);

            //Warning[] warnings;
            //string mimeType;
            //string[] streamids;
            //string encoding;
            //string filenameExtension;

            //var viewer = new ReportViewer();
            //viewer.LocalReport.ReportPath = @"Labels\PackingSlip.rdlc";

            //var shipLabel = new ShippingLabel { ShipmentId = shipment.FBAShipmentId, Barcode = GetBarcode(shipment.FBAShipmentId) };

            //viewer.LocalReport.DataSources.Add(new ReportDataSource("ShippingLabel", new List<ShippingLabel> { shipLabel }));
            //viewer.LocalReport.Refresh();

            //var bytes = viewer.LocalReport.Render("PDF", null, out mimeType, out encoding, out filenameExtension, out streamids, out warnings);

            //return new FileContentResult(bytes, mimeType);

            //return File(bytes, mimeType, shipment.FBAShipmentId + "_PackingSlip.pdf");


            //reportViewer.Width = Unit.Percentage(900);
            //reportViewer.Height = Unit.Percentage(900);
            //var connectionString = ConfigurationManager.ConnectionStrings["DbEmployeeConnectionString"].ConnectionString;
            //SqlConnection conx = new SqlConnection(connectionString); SqlDataAdapter adp = new SqlDataAdapter("SELECT * FROM Employee_tbt", conx);
            //adp.Fill(ds, ds.Employee_tbt.TableName);
            //viewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\Reports1.rdlc";
            //viewer.LocalReport.ReportPath = @"C:\VDD\VendorReports\VendorDetailsRpt.rdl";
            ////reportViewer.LocalReport.DataSources.Add(new ReportDataSource("MyDataSet", ds.Tables[0]));
            //ViewBag.ReportViewer = reportViewer;
            //return View();
        }
    }
}

//        //[HttpGet]
//        //public async void GetContractReportPDF(int contractId)
//        //{
//        //    Warning[] warnings;
//        //    string[] streamIds;
//        //    string mimeType = string.Empty;
//        //    string encoding = string.Empty;
//        //    string extension = "pdf";

//        //    var viewer = new ReportViewer();

//        //    viewer.ProcessingMode = ProcessingMode.Remote;
//        //    IReportServerCredentials irsc = new CustomReportCredentials("bocdev", "RbK6@GMm", "IDMZSWNA");
//        //    viewer.ServerReport.ReportServerCredentials = irsc;
//        //    ReportParameter[] reportParams = new ReportParameter[1];
//        //    reportParams[0] = new ReportParameter("contract_id", contractId.ToString());

//        //    viewer.ServerReport.ReportServerUrl = new Uri("http://bmnckdsv0058.idmzswna.idmz.disney.com/WS_CAST_ADMIN");
//        //    viewer.ServerReport.ReportPath = "/CastAdminReports/ReportDealPlayerContract";
//        //    viewer.ServerReport.Refresh();
//        //    viewer.ServerReport.SetParameters(reportParams);

//        //    byte[] bytes = viewer.ServerReport.Render("PDF", null, out mimeType, out encoding, out extension,
//        //        out streamIds, out warnings);

//        //    Response.Buffer = true;
//        //    Response.Clear();
//        //    Response.ContentType = mimeType;
//        //    Response.AddHeader("content-disposition", "attachment; filename=" + "ContractReport" + "." + extension);
//        //    Response.BinaryWrite(bytes);
//        //    Response.Flush();
//        //}


//        // GET: Report
//        public ActionResult Index()
//        {
//            ////var id = jsonResult.Id;
//            //ReportWriter reportWriter = new ReportWriter();
//            //reportWriter.ReportPath = Server.MapPath("~/Data/GroupingAgg.rdl");
//            //reportWriter.ReportProcessingMode = ProcessingMode.Remote;
//            ////List<ReportParameter> parameters = new List<ReportParameter>();
//            ////parameters.Add(new ReportParameter() { Name = "OrderId", Labels = new List<string>() { id }, Values = new List<string>() { id } });
//            ////reportWriter.SetParameters(parameters);
//            //var format = WriterFormat.PDF;
//            //MemoryStream ms = new MemoryStream();
//            ////To save the report as memory stream
//            //reportWriter.Save(ms, format);
//            ////Converts memory stream into base64 string
//            //string base64 = "data:application/pdf;base64," + Convert.ToBase64String(ms.ToArray());
//            //var json = new { data = base64 };
//            ////return Json(json);
//            return View();
//        }

//        public ActionResult ReportTemplate(string ReportName, string ReportDescription, int Width, int Height)
//        {
//            var rptInfo = new ReportInfo
//            {
//                ReportName = ReportName,
//                ReportDescription = ReportDescription,
//                ReportURL = String.Format("../../Reports/ReportTemplate.aspx?ReportName={0}&Height={1}", ReportName, Height),
//                Width = Width,
//                Height = Height
//            };

//            return View(rptInfo);
//        }


//        public ActionResult ReportVendor()
//        {
//            ReportViewer reportViewer = new ReportViewer();
//            reportViewer.ProcessingMode = ProcessingMode.Local;
//            reportViewer.SizeToReportContent = true;
//            //reportViewer.Width = Unit.Percentage(900);
//            //reportViewer.Height = Unit.Percentage(900);

//            //var connectionString = ConfigurationManager.ConnectionStrings["DbEmployeeConnectionString"].ConnectionString;


//            //SqlConnection conx = new SqlConnection(connectionString); SqlDataAdapter adp = new SqlDataAdapter("SELECT * FROM Employee_tbt", conx);

//            //adp.Fill(ds, ds.Employee_tbt.TableName);

//            //reportViewer.LocalReport.ReportPath = Request.MapPath(Request.ApplicationPath) + @"Reports\MyReport.rdlc";
//            reportViewer.LocalReport.ReportPath = @"C:\VDD\VendorReports\VendorDetailsRpt.rdl";

//            //reportViewer.LocalReport.DataSources.Add(new ReportDataSource("MyDataSet", ds.Tables[0]));


//            ViewBag.ReportViewer = reportViewer;

//            return View();
//        }

//        //public bool SaveConfirmPDF()
//        //{
//        //     byte[] bytes;
//        //    string mimetype, extension;
//        //    Warning[] warnings;
//        //    string[] streamIds;
//        //    string encoding = string.Empty;
//        //    mimetype = string.Empty;
//        //    extension = string.Empty;
//        //    string pSenderId = "btnPrint";

//        //    ReportParameterCollection objParams = new ReportParameterCollection();
//        //    if ((PayeetoVendorID == null) || (PayeetoVendorID == 0))
//        //    {
//        //        objParams.Add(new ReportParameter("ConfirmNum", ConfirmationNum));
//        //    }
//        //    else
//        //    {
//        //        objParams.Add(new ReportParameter("PayeeToVendorID", PayeetoVendorID.ToString()));
//        //    }

//        //    ReportViewer viewer = new ReportViewer()
//        //    {
//        //        ProcessingMode = ProcessingMode.Remote
//        //    };
//        //    viewer.ServerReport.ReportPath = GetReportPath(pSenderId, PayeetoVendorID);
//        //    viewer.ServerReport.SetParameters(objParams);
//        //    bytes = viewer.ServerReport.Render("PDF", null, out mimetype, out encoding, out extension, out streamIds, out warnings);

//        //    string environment = System.Configuration.ConfigurationManager.AppSettings["eCAPDDEnvironment"];
//        //    if (environment == "Local")
//        //    {
//        //        FileStream fs = new FileStream(@"C:\VDD\vendor\PDFReports\");

//        //        fs.Write(bytes, 0, bytes.Length);
//        //        fs.Close();
//        //    }
//        //    else
//        //    {
//        //        FileStream fs = new FileStream(@"D:\Website\Internet\DD_VCM_TEST\DD_Output\CLAIM\VCM_DDOL" + ConfirmationNum.ToString() + "_" + DateTime.Today.ToString("yyyyMMdd") + ".pdf", FileMode.Create);
//        //        fs.Write(bytes, 0, bytes.Length);
//        //        fs.Close();
//        //    }
//        //    return true;

//        //}


//        //private string GetReportPath(string pSenderId, int PayeetoVendorID)
//        //{
//        //    if ((PayeetoVendorID == null) || (PayeetoVendorID == 0))
//        //    {
//        //        return "/ReportProject/Report_eCAPDDPrintPreviewByConfirmNum";
//        //    }
//        //    else
//        //    {
//        //        return "/ReportProject/Report_eCAPDDPrintPreview";
//        //    }

//        //}
//    }
//}