document.addEventListener("DOMContentLoaded", function (e) {
    //run once manually then indefinitly poll for server details every 30 seconds
    pollServerStatuses();
    window.setInterval(pollServerStatuses, 30000);

    function pollServerStatuses() {
        var pollRequest = new XMLHttpRequest();
        pollRequest.onreadystatechange = function () {
            if (pollRequest.readyState == 4 && pollRequest.status == 200) {
                updatePolledTime();

                var serverStatusDictionary = JSON.parse(pollRequest.responseText);

                for (var serverId in serverStatusDictionary) {
                    var serverStatus = serverStatusDictionary[serverId];

                    var serverContainer = document.querySelector("#summaryContainer .server[data-serviceId='" + serverId + "']");
                    if (serverContainer) {
                        //if the server is already displayed, update its status
                        serverContainer.setAttribute("data-status", serverStatus);
                        serverContainer.querySelector(".statusText").textContent = serverStatus;
                    } else {
                        //if the server is not yet displayed, add its basic information to the summary then AJAX for the extra data
                        createServerHTML(serverId, serverStatus);
                        populateExtraData(serverId);
                    }
                }
            }
        };
        pollRequest.open("GET", "GetAllServerStatuses", true);
        pollRequest.send();
    }

    function updatePolledTime() {
        var now = new Date();
        var timeText = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
        document.getElementById("lastPolledTimeText").textContent = timeText;
    }

    function createServerHTML(serverId, serverStatus) {
        var summaryContainer = document.getElementById("summaryContainer");

        //build basic structure
        serverContainer = document.createElement("div");
        serverContainer.classList.add("server");
        serverContainer.setAttribute("data-serviceId", serverId);
        serverContainer.setAttribute("data-status", serverStatus);
        summaryContainer.appendChild(serverContainer);

        var mainInfoContainer = document.createElement("div");
        mainInfoContainer.classList.add("main");
        mainInfoContainer.addEventListener("click", function (e) {
            this.parentElement.classList.toggle("open");
        }, false);
        serverContainer.appendChild(mainInfoContainer);

        var icon = document.createElement("i");
        icon.classList.add("fa");
        icon.classList.add("fa-desktop");
        mainInfoContainer.appendChild(icon);

        var yourReference = document.createElement("div");
        yourReference.classList.add("yourReferenceText");
        yourReference.textContent = serverId;
        mainInfoContainer.appendChild(yourReference);

        var statusContainer = document.createElement("div");
        statusContainer.textContent = "Status: ";
        mainInfoContainer.appendChild(statusContainer);

        var statusText = document.createElement("span");
        statusText.classList.add("statusText");
        statusText.textContent = serverStatus;
        statusContainer.appendChild(statusText);

        var extraInfoContainer = document.createElement("div");
        extraInfoContainer.classList.add("extra");
        serverContainer.appendChild(extraInfoContainer);

        var title = document.createElement("h3");
        title.textContent = "Quick Details";
        extraInfoContainer.appendChild(title);

        var serviceIdContainer = document.createElement("div");
        serviceIdContainer.classList.add("propertyContainer");
        extraInfoContainer.appendChild(serviceIdContainer);

        var serviceIdName = document.createElement("div");
        serviceIdName.classList.add("serviceIdText");
        serviceIdName.textContent = "Service ID";
        serviceIdContainer.appendChild(serviceIdName);

        var serviceIdValue = document.createElement("div");
        serviceIdValue.classList.add("serviceIdText");
        serviceIdValue.textContent = serverId;
        serviceIdContainer.appendChild(serviceIdValue);

        var serviceDescriptionContainer = document.createElement("div");
        serviceDescriptionContainer.classList.add("propertyContainer");
        extraInfoContainer.appendChild(serviceDescriptionContainer);

        var serviceDescriptionName = document.createElement("div");
        serviceDescriptionName.textContent = "Service Description";
        serviceDescriptionContainer.appendChild(serviceDescriptionName);

        var serviceDescriptionValue = document.createElement("div");
        serviceDescriptionValue.classList.add("serviceDescriptionText");
        serviceDescriptionContainer.appendChild(serviceDescriptionValue);

        var primaryIpContainer = document.createElement("div");
        primaryIpContainer.classList.add("propertyContainer");
        extraInfoContainer.appendChild(primaryIpContainer);

        var primaryIpName = document.createElement("div");
        primaryIpName.textContent = "Primary IP Address";
        primaryIpContainer.appendChild(primaryIpName);

        var primaryIpText = document.createElement("div");
        primaryIpText.classList.add("primaryIpText");
        primaryIpContainer.appendChild(primaryIpText);

        var suspendedContainer = document.createElement("div");
        suspendedContainer.classList.add("propertyContainer");
        extraInfoContainer.appendChild(suspendedContainer);

        var suspendedName = document.createElement("div");
        suspendedName.textContent = "Suspended: ";
        suspendedContainer.appendChild(suspendedName);

        var suspendedText = document.createElement("div");
        suspendedText.classList.add("suspendedText");
        suspendedContainer.appendChild(suspendedText);

        var detailsLink = document.createElement("a");
        detailsLink.classList.add("button");
        detailsLink.textContent = "Full Details";
        detailsLink.href = "/Monitoring/Details/" + serverId;
        extraInfoContainer.appendChild(detailsLink);
    }

    function populateExtraData(serviceId) {
        var serverInfoRequest = new XMLHttpRequest();
        serverInfoRequest.onreadystatechange = function () {
            if (serverInfoRequest.readyState == 4 && serverInfoRequest.status == 200) {
                var serverInfo = JSON.parse(serverInfoRequest.responseText);

                var serverContainer = document.querySelector("#summaryContainer .server[data-serviceId='" + serverInfo.ServiceID + "']");
                serverContainer.querySelector(".yourReferenceText").textContent = serverInfo.YourReference;
                serverContainer.querySelector(".serviceDescriptionText").textContent = serverInfo.ServiceDescription;
                serverContainer.querySelector(".primaryIpText").textContent = serverInfo.PrimaryIP;
                serverContainer.querySelector(".suspendedText").textContent = serverInfo.Suspended;
            }
        };
        serverInfoRequest.open("GET", "GetServerInfo/" + serviceId, true);
        serverInfoRequest.send();
    }
}, false);