using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using iosmart.MyServersApi;
using System.Security.Claims;
using Microsoft.AspNet.Identity;
using iosmart.Models;

namespace iosmart.Controllers {
    public class AccountController : Controller {
        [HttpGet]
        public ActionResult Login() {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string username, string password) {
            if (UserAuthenticator.TryLogIn(username, password, HttpContext.GetOwinContext()))
                return RedirectToAction("Summary", "Monitoring");
            else
                return View();
        }
    }
}