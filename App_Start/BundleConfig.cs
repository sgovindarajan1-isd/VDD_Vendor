using System.Web;
using System.Web.Optimization;

namespace WebMaterialPOC
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/materialize.js"
                        //,"~/Scripts/App/login.js"
                        //, "~/Scripts/App/dashboard.js"
                        ));

   
            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/App/DataTable/dataTables.bootstrap4.min.js",
                      "~/Scripts/App/DataTable/jquery.dataTables.min.js",
                      "~/Scripts/App/DataTable/dataTables.select.min.js"
                      ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      //DataTable and Material
           //           "~/Content/DataTable/dataTables.material.min.css",
                      "~/Content/DataTable/jquery.dataTables.min.css",
               //       "~/Content/DataTable/material.min.css",
                      "~/Content/DataTable/select.dataTables.min.css",
                      //
                      "~/Content/site.css",
                    //  "~/Content/materialize.css",
                      "~/Content/landing-page.css",
                      "~/Content/login.css",
                      "~/Content/main2.css"

                       ));

            bundles.Add(new ScriptBundle("~/jsbundles/jquery").Include(
              "~/Scripts/App/VDDMain.js"
              ));
        }
    }
}
