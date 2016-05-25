using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using iosmart.MyServersApi;
using iosmart.Models;

namespace iosmart.Data {
    public class MyServersApiStore : IServerStore {
        private AuthInfo _credentials;
        private MyServersApiClient _client;
        public void Dispose() { }

        /// <summary>
        /// Initialise the store with a username and password.
        /// </summary>
        /// <param name="username">Username for API access</param>
        /// <param name="password">Password for API access</param>
        public MyServersApiStore(string username, string password) {
            _credentials = new AuthInfo();
            _credentials.Username = username;
            _credentials.Password = password;

            _client = new MyServersApiClient();
        }

        /// <summary>
        /// Initialise the store with the given Authorisation object.
        /// </summary>
        /// <param name="credentials">AuthInfo object containing the username and password credentials</param>
        public MyServersApiStore(AuthInfo credentials) {
            _credentials = credentials;
            _client = new MyServersApiClient();
        }

        /// <summary>
        /// Verify is a login is valid.
        /// </summary>
        /// <returns></returns>
        public bool IsLoginValid() {
            return _client.AreCredentialsValid(_credentials);
        }

        /// <summary>
        /// Get the status of a single server
        /// </summary>
        /// <param name="id">Service ID string of the server.</param>
        /// <returns></returns>
        public string GetServerStatus(string id) {
            return _client.GetServerDetails(_credentials, id).Status;
        }

        /// <summary>
        /// Get a collection representing the status of all found servers.
        /// </summary>
        /// <returns>Dictionary using the ServiceID as the Key and Status as the Value.</returns>
        public Dictionary<string, string> GetAllServerStatuses() {
            Dictionary<string, string> statusDictionary = new Dictionary<string, string>();

            //extract just the ServiceID and Status
            foreach (ServerInfo server in _client.GetAllServerDetails(_credentials))
                statusDictionary.Add(server.ServiceID, server.Status);

            return statusDictionary;
        }

        /// <summary>
        /// Get ServerInfo for the requested server.
        /// </summary>
        /// <param name="id">ServiceID string identifying the server</param>
        /// <returns></returns>
        public ServerInfo GetServerInfo(string id) {
            return _client.GetServerDetails(_credentials, id);
        }

        /// <summary>
        /// Get all possible information about a server.
        /// </summary>
        /// <param name="id">ServiceID string identifying the server</param>
        /// <returns></returns>
        public FullServerInfo GetFullServerInfo(string id) {
            ServerInfo basicInfo = _client.GetServerDetails(_credentials, id);
            MonthlyBandwidthReportEntry[] externalMonthlyBandwidth = _client.GetMonthlyBandwidthReport(_credentials, id, true);
            MonthlyBandwidthReportEntry[] internalMonthlyBandwidth = _client.GetMonthlyBandwidthReport(_credentials, id, false);
            BandwidthReport externalBandwidth = _client.GetServerBandwidthReport(_credentials, id, true);
            BandwidthReport internalBandwidth = _client.GetServerBandwidthReport(_credentials, id, false);
            CurrentMonitorStatus[] monitorStatus = _client.GetServerStatus(_credentials, id);
            ReverseDnsEntry[] reverseDnsEntries = _client.GetReverseDnsEntries(_credentials);

            //reverseDnsEntries contains all entries, pick out those relecant to this servers IPAddresses
            List<ReverseDnsEntry> relevantEntries = new List<ReverseDnsEntry>();
            foreach (ReverseDnsEntry rev in reverseDnsEntries) {
                if (basicInfo.IPAddresses.Contains(rev.IPAddress))
                    relevantEntries.Add(rev);
            }
            basicInfo.ReverseDnsEntries = relevantEntries.ToArray();

            //compile all of this info into one object
            return new FullServerInfo(basicInfo, internalBandwidth, externalBandwidth, internalMonthlyBandwidth, externalMonthlyBandwidth, monitorStatus);
        }
    }
}