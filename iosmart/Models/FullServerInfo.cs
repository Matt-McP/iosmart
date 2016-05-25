using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using iosmart.MyServersApi;

namespace iosmart.Models {
    public class FullServerInfo {
        public ServerInfo BaseInfo { get; set; }
        public BandwidthReport InternalBandwidthReport { get; set; }
        public BandwidthReport ExternalBandwidthReport { get; set; }
        public MonthlyBandwidthReportEntry[] InternalMonthlyBandwidthReport { get; set; }
        public MonthlyBandwidthReportEntry[] ExternalMonthlyBandwidthReport { get; set; }
        public CurrentMonitorStatus[] MonitorStatuses { get; set; }

        public FullServerInfo() { }

        public FullServerInfo(ServerInfo baseInfo, BandwidthReport internalBandwidthReport, BandwidthReport externalBandwidthReport, MonthlyBandwidthReportEntry[] internalMonthlyBandwidthReport, MonthlyBandwidthReportEntry[] externalMonthlyBandwidthReport,CurrentMonitorStatus[] monitorStatuses) {
            this.BaseInfo = baseInfo;
            this.InternalBandwidthReport = internalBandwidthReport;
            this.InternalMonthlyBandwidthReport = internalMonthlyBandwidthReport;
            this.ExternalBandwidthReport = externalBandwidthReport;
            this.ExternalMonthlyBandwidthReport = externalMonthlyBandwidthReport;
            this.MonitorStatuses = monitorStatuses;
        }
    }
}