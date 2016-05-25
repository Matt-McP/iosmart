using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iosmart.MyServersApi;
using iosmart.Models;

namespace iosmart.Data {
    //Technically redundant making an interface for this as the return types are tied to the API objects. Its for examples sake
    interface IServerStore : IDisposable {
        bool IsLoginValid();
        string GetServerStatus(string id);
        Dictionary<string, string> GetAllServerStatuses();
        ServerInfo GetServerInfo(string id);
        FullServerInfo GetFullServerInfo(string id);
    }
}
