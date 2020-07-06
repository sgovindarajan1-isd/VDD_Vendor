//using Microsoft.Reporting.WebForms;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;

//namespace WebMaterialPOC.Models
//{
//    public class ReportingServicesReportViewModel_TEST
//    {
//        #region Constructor
//        public ReportingServicesReportViewModel_TEST(String reportPath, List<ReportParameter> Parameters)
//        {
//            ReportPath = reportPath;
//            parameters = Parameters.ToArray();
//        }

//        public ReportingServicesReportViewModel_TEST()
//        {
//        }
//        #endregion Constructor

//        #region Public Properties
//     //   public ReportServerCredentials ServerCredentials { get { return new ReportServerCredentials(); } }
//        public String ReportPath { get; set; }
//        public Uri ReportServerURL { get { return new Uri(WebConfigurationManager.AppSettings["ReportServerUrl"]); } }
//        public ReportParameter[] parameters { get; set; }
//        private string UploadDirectory = HttpContext.Current.Server.MapPath("~/App_Data/UploadTemp/");
//        private string TempDirectory = HttpContext.Current.Server.MapPath("~/tempFiles/");
//    }
//}