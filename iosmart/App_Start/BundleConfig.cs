using System.Web;
using System.Web.Optimization;

namespace iosmart {
    public class BundleConfig {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles) {
            bundles.Add(new StyleBundle("~/css/default").Include(
                      "~/Resources/css/reset.css",
                      "~/Resources/css/layout.css"));
        }
    }
}
