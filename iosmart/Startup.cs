using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(iosmart.Startup))]
namespace iosmart
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
