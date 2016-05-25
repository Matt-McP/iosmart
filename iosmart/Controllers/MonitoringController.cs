using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using iosmart.Data;
using iosmart.MyServersApi;

namespace iosmart.Controllers {
    [Authorize]
    public class MonitoringController : Controller {
        public ActionResult Summary() {
            return View();
        }

        public ActionResult Details(string id) {
            using (IServerStore store = new MyServersApiStore(Session["apiUsername"].ToString(), Session["apiPassword"].ToString()))
                return View(store.GetFullServerInfo(id));
        }

        public JsonResult GetServerStatus(string id) {
            using (IServerStore store = new MyServersApiStore(Session["apiUsername"].ToString(), Session["apiPassword"].ToString()))
                return Json(store.GetServerStatus(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllServerStatuses() {
            using (IServerStore store = new MyServersApiStore(Session["apiUsername"].ToString(), Session["apiPassword"].ToString()))
                return Json(store.GetAllServerStatuses(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetServerInfo(string id) {
            using (IServerStore store = new MyServersApiStore(Session["apiUsername"].ToString(), Session["apiPassword"].ToString()))
                return Json(store.GetServerInfo(id), JsonRequestBehavior.AllowGet);
        }
    }
}