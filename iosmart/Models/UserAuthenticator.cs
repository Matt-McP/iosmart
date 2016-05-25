using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using iosmart.Data;
using System.Security.Claims;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;

namespace iosmart.Models {
    public class UserAuthenticator {
        public static bool TryLogIn(string username, string password, IOwinContext context) {
            bool valid;
            using (IServerStore store = new MyServersApiStore(username, password))
                valid = store.IsLoginValid();

            if (valid) {
                //http://stackoverflow.com/questions/31584506/how-to-implement-custom-authentication-in-asp-net-mvc-5
                List<Claim> claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.NameIdentifier, username));
                claims.Add(new Claim(ClaimTypes.Name, username));
                claims.Add(new Claim("http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider", "ASP.NET Identity", "http://www.w3.org/2001/XMLSchema#string"));

                ClaimsIdentity identity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);
                context.Authentication.SignIn(identity);
            }

            return valid;
        }
    }
}