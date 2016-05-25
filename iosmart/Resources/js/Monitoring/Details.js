document.addEventListener("DOMContentLoaded", function (e) {
    //add click event handeling for expanding accordian sections
    var accordianHeads = document.querySelectorAll(".accordian .head");
    for (var i = 0; i < accordianHeads.length; i++) {
        accordianHeads[i].addEventListener("click", function (e) {
            this.parentElement.classList.toggle("open");
        }, false);
    }

    window.setInterval(pollServerStatus, 30000);

    function pollServerStatus() {
        var pollRequest = new XMLHttpRequest();
        pollRequest.onreadystatechange = function () {
            if (pollRequest.readyState == 4 && pollRequest.status == 200) {
                updatePolledTime();
                var status = JSON.parse(pollRequest.responseText);

                document.getElementById("iconContainer").setAttribute("data-status", status);
                document.getElementById("statusText").textContent = status;
            }
        };
        pollRequest.open("GET", "/Monitoring/GetServerStatus/" + document.getElementById("serviceId").textContent, true);
        pollRequest.send();
    }

    function updatePolledTime() {
        var now = new Date();
        var timeText = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
        document.getElementById("lastPolledTimeText").textContent = timeText;
    }

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawCharts);

    function drawCharts() {
        drawExternalBandwidthChart();
        drawInternalBandwidthChart();
    }

    function drawExternalBandwidthChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Month');
        data.addColumn('number', 'In');
        data.addColumn('number', 'Out');
        data.addColumn('number', 'Total');

        var tableRows = document.querySelectorAll("#externalBandwidthTable tbody tr");
        //only take last 12 entries, could have a toggle to show all history? Messy data
        for (var i = tableRows.length > 12 ? tableRows.length - 12 : tableRows; i < tableRows.length; i++) {
            //add row of data, convert cell 0 in a Date object and cells 1, 2 and 3 into integers
            data.addRow([new Date(tableRows[i].children[0].textContent), parseInt(tableRows[i].children[1].textContent), parseInt(tableRows[i].children[2].textContent), parseInt(tableRows[i].children[3].textContent)]);
        }

        var options = {
            'title': 'External bandwidth over the last 12 months'
        };

        var chart = new google.visualization.LineChart(document.getElementById('externalBandwidthChartContainer'));
        chart.draw(data, options);
    }

    function drawExternalBandwidthChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Month');
        data.addColumn('number', 'In');
        data.addColumn('number', 'Out');
        data.addColumn('number', 'Total');

        var tableRows = document.querySelectorAll("#externalBandwidthTable tbody tr");
        for (var i = tableRows.length > 12 ? tableRows.length - 12 : tableRows; i < tableRows.length; i++) {
            //add row of data, convert cell 0 in a Date object and cells 1, 2 and 3 into integers
            data.addRow([new Date(tableRows[i].children[0].textContent), parseInt(tableRows[i].children[1].textContent), parseInt(tableRows[i].children[2].textContent), parseInt(tableRows[i].children[3].textContent)]);
        }

        var options = {
            'title': 'External bandwidth over the last 12 months'
        };

        var chart = new google.visualization.LineChart(document.getElementById('externalBandwidthChartContainer'));
        chart.draw(data, options);
    }

    function drawInternalBandwidthChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Month');
        data.addColumn('number', 'In');
        data.addColumn('number', 'Out');
        data.addColumn('number', 'Total');

        var tableRows = document.querySelectorAll("#internalBandwidthTable tbody tr");
        for (var i = tableRows.length - 12; i < tableRows.length; i++) {
            data.addRow([new Date(tableRows[i].children[0].textContent), parseInt(tableRows[i].children[1].textContent), parseInt(tableRows[i].children[2].textContent), parseInt(tableRows[i].children[3].textContent)]);
        }

        var options = {
            'title': 'Internal bandwidth over the last 12 months'
        };

        var chart = new google.visualization.LineChart(document.getElementById('internalBandwidthChartContainer'));
        chart.draw(data, options);
    }
}, false);

