// Data as JavaScript objects for easy access
const data = {
    juneVsMay: {
        overallActivity: [
            { metric: "Signups", prev: 79764, curr: 84627, change: 6.1, status: "growth" },
            { metric: "Logged In Visits", prev: 47505, curr: 48287, change: 1.6, status: "growth" },
            { metric: "Total Website Visits", prev: 2230070, curr: 2242967, change: 0.58, status: "stable" },
            { metric: "Indian Visits", prev: 1415204, curr: 1389195, change: -1.84, status: "stable" },
            { metric: "International Visits", prev: 814866, curr: 853772, change: 4.77, status: "growth" },
        ],
        funnel: [
            { metric: "Initiate Payment (Yearly)", prev: 1760, curr: 2927, change: 66.3, status: "excellent" },
            { metric: "Initiate Payment (Monthly)", prev: 1262, curr: 1200, change: -4.9, status: "decline" },
            { metric: "Initiate Conversion Rate", prev: 6.36, curr: 8.55, change: 34.4, status: "growth" },
            { metric: "Total Purchase Conversion Rate", prev: 21.67, curr: 15.36, change: -29.1, status: "concern" },
            { metric: "Purchase Conv. (Yearly)", prev: 20.6, curr: 12.4, change: -39.5, status: "major" },
            { metric: "Purchase Conv. (Monthly)", prev: 23.2, curr: 22.5, change: -3.1, status: "stable" },
        ],
        purchaseCount: [
            { metric: "Indian Yearly Purchases", prev: 299, curr: 292, change: -2.3, status: "stable" },
            { metric: "Indian Monthly Purchases", prev: 188, curr: 181, change: -3.7, status: "stable" },
            { metric: "International Yearly Purchases", prev: 63, curr: 72, change: 14.3, status: "growth" },
            { metric: "International Monthly Purchases", prev: 105, curr: 89, change: -15.2, status: "decline" },
        ],
        revenue: [
            { metric: "Indian Yearly Revenue", prev: 1134206, curr: 1117695, change: -1.5, status: "stable" },
            { metric: "Indian Monthly Revenue", prev: 280998, curr: 271500, change: -3.4, status: "stable" },
            { metric: "International Yearly Revenue", prev: 480320, curr: 576420, change: 20.0, status: "excellent" },
            { metric: "International Monthly Revenue", prev: 334545, curr: 277353, change: -17.1, status: "concern" },
        ],
        funnelHealth: [
            { metric: "Signup -> Pro Page Visit", prev: 59.6, curr: 57.1, change: -4.2, status: "decline" },
        ],
        insights: [
            "Signups continue to grow, and there's a fantastic surge in *yearly* payment initiations, especially internationally.",
            "The most critical issue is the **significant drop in overall purchase conversion (-29.1%)**, primarily driven by a steep decline in yearly purchase conversion (-39.5%). This means more people are starting the payment process, but fewer are completing it.",
            "Monthly purchases and revenue (both Indian and International) saw declines, suggesting potential issues with this specific plan type or its appeal.",
            "International yearly plans are a clear success story, showing strong growth in both purchases and revenue.",
            "The Indian market generally remained stable or saw slight dips across most metrics for both yearly and monthly plans."
        ]
    },
    mayVsApr: {
        // You would populate this with May vs April data from your original tables
        // For demonstration, let's put some dummy data or extrapolate from given % changes.
        // For brevity, I'll just put one example for now.
        overallActivity: [
            { metric: "Signups", prev: 85372, curr: 79764, change: -6.6, status: "decline" },
            // ... more data for May vs April
        ],
        funnel: [
            { metric: "Initiate Payment (Yearly)", prev: 1396, curr: 1760, change: 26.1, status: "growth" },
            // ... more data for May vs April
        ],
        purchaseCount: [
            { metric: "Indian Yearly Purchases", prev: 203, curr: 299, change: 47.3, status: "excellent" },
            // ... more data for May vs April
        ],
        revenue: [
            { metric: "Indian Yearly Revenue", prev: 776283, curr: 1134206, change: 46.1, status: "excellent" },
            // ... more data for May vs April
        ],
        funnelHealth: [
            { metric: "Signup -> Pro Page Visit", prev: 60.1, curr: 59.6, change: -1.0, status: "stable" },
            // ... more data for May vs April
        ],
        insights: [
            "May saw growth in some areas but decline in others compared to April.",
            "Initiate Payment (Yearly) showed good growth.",
            // ... more insights
        ]
    }
};

// Function to populate a table
function populateTable(tableId, dataArray, prevMonthName, currMonthName) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    const tableHeader = document.querySelector(`#${tableId} thead tr`);

    // Update header text based on selected months
    tableHeader.children[1].textContent = prevMonthName;
    tableHeader.children[2].textContent = currMonthName;


    tableBody.innerHTML = ''; // Clear existing rows
    dataArray.forEach(item => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = item.metric;
        row.insertCell().textContent = (item.metric.includes('Revenue') ? '$' : '') + item.prev.toLocaleString(); // Format numbers
        row.insertCell().textContent = (item.metric.includes('Revenue') ? '$' : '') + item.curr.toLocaleString(); // Format numbers

        const changeCell = row.insertCell();
        const changeText = item.change > 0 ? `+${item.change}%` : `${item.change}%`;
        changeCell.textContent = changeText;
        // Add color based on status
        if (item.status === 'growth' || item.status === 'excellent') {
            changeCell.style.color = '#27ae60';
            changeCell.style.fontWeight = 'bold';
        } else if (item.status === 'decline' || item.status === 'concern' || item.status === 'major') {
            changeCell.style.color = '#e74c3c';
            changeCell.style.fontWeight = 'bold';
        }

       const statusCell = row.insertCell();
        // Use a more concise text for status to save space
        if (item.status === 'growth') statusCell.innerHTML = '<span class="status-icon growth"></span> Growth';
        else if (item.status === 'excellent') statusCell.innerHTML = '<span class="status-icon excellent"></span> Excellent';
        else if (item.status === 'stable') statusCell.innerHTML = '<span class="status-icon stable"></span> Stable';
        else if (item.status === 'decline') statusCell.innerHTML = '<span class="status-icon decline"></span> Decline';
        else if (item.status === 'concern') statusCell.innerHTML = '<span class="status-icon concern"></span> Concern';
        else if (item.status === 'major') statusCell.innerHTML = '<span class="status-icon major"></span> Major';
        else statusCell.innerHTML = `<span class="status-icon ${item.status}"></span> ${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`; // Fallback
    });
}

// Function to populate insights
function populateInsights(insightsArray) {
    const insightsList = document.getElementById('insightsList');
    insightsList.innerHTML = ''; // Clear existing
    insightsArray.forEach(insight => {
        const li = document.createElement('li');
        li.innerHTML = insight; // Use innerHTML to allow bold tags if present
        insightsList.appendChild(li);
    });
}

// Main render function
function renderDashboard(comparisonKey) {
    const currentData = data[comparisonKey];
    let prevMonthName = "";
    let currMonthName = "";

    if (comparisonKey === "juneVsMay") {
        prevMonthName = "May (Actual)";
        currMonthName = "June (Actual)";
    } else if (comparisonKey === "mayVsApr") {
        prevMonthName = "April (Actual)";
        currMonthName = "May (Actual)";
    }

    populateTable('overallActivityTable', currentData.overallActivity, prevMonthName, currMonthName);
    populateTable('funnelTable', currentData.funnel, prevMonthName, currMonthName);
    populateTable('purchaseCountTable', currentData.purchaseCount, prevMonthName, currMonthName);
    populateTable('revenueTable', currentData.revenue, prevMonthName, currMonthName);
    populateTable('funnelHealthTable', currentData.funnelHealth, prevMonthName, currMonthName);
    populateInsights(currentData.insights);
}

// Event Listeners for buttons
document.getElementById('btnJuneVsMay').addEventListener('click', function() {
    document.querySelectorAll('.month-selector button').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    renderDashboard('juneVsMay');
});

document.getElementById('btnMayVsApr').addEventListener('click', function() {
    document.querySelectorAll('.month-selector button').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    renderDashboard('mayVsApr');
});

// Initial render on page load
document.addEventListener('DOMContentLoaded', () => {
    renderDashboard('juneVsMay'); // Default to June vs May
});

// Optional: Add basic table sorting (more complex, but illustrative)
// This is a simplified example, a full sorting function would be more robust
document.querySelectorAll('table thead th').forEach(headerCell => {
    headerCell.addEventListener('click', () => {
        const table = headerCell.closest('table');
        const tbody = table.querySelector('tbody');
        const columnIndex = Array.from(headerCell.parentNode.children).indexOf(headerCell);
        const rows = Array.from(tbody.querySelectorAll('tr'));

        // Simple sorting for numbers or text
        const sortedRows = rows.sort((a, b) => {
            const aText = a.children[columnIndex].textContent;
            const bText = b.children[columnIndex].textContent;

            // Try converting to number, otherwise compare as string
            const aValue = parseFloat(aText.replace(/[^0-9.-]/g, '')) || aText;
            const bValue = parseFloat(bText.replace(/[^0-9.-]/g, '')) || bText;

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return aValue - bValue;
            } else {
                return aValue.localeCompare(bValue);
            }
        });

        // Toggle sort direction
        tbody.innerHTML = ''; // Clear
        if (headerCell.classList.contains('asc')) {
            sortedRows.reverse().forEach(row => tbody.appendChild(row));
            headerCell.classList.remove('asc');
            headerCell.classList.add('desc');
        } else {
            sortedRows.forEach(row => tbody.appendChild(row));
            headerCell.classList.remove('desc');
            headerCell.classList.add('asc');
        }
        // Remove 'asc'/'desc' from other headers
        Array.from(headerCell.parentNode.children).forEach(th => {
            if (th !== headerCell) {
                th.classList.remove('asc', 'desc');
            }
        });
    });
});