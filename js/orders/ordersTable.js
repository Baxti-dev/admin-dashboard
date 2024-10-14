let dataTable = new DataTable('#allOrdersTable', {
    scrollX: true,
    fixedColumns: {
        start: 3
    },
});

// Event listener for the "Click me" button
$('#submitFilter').on('click', function () {
    // Fetch values from the date inputs
    let fromDate = $('#fromDate').val();
    let toDate = $('#toDate').val();
    let confirmationStatus = $('#confirmationStatus').val(); // Fetch value from confirmation status select

    // Clear any previous search filters for columns 9 and 10 (if applicable)
    dataTable.column(9).search('');
    dataTable.column(10).search('');

    // Add a custom date and status filter function
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            // Parse the date from the table (column 4)
            let paymentDate = new Date(data[4].split('.').reverse().join('-')); // dd.mm.yyyy to yyyy-mm-dd
            let minDate = fromDate ? new Date(fromDate) : null;
            let maxDate = toDate ? new Date(toDate) : null;

            // Parse the confirmation status from the table (column 7)
            let productStatus = data[7];

            // Date range filter
            if ((minDate && paymentDate < minDate) || (maxDate && paymentDate > maxDate)) {
                return false;
            }

            // Confirmation status filter
            if (confirmationStatus && productStatus !== confirmationStatus) {
                return false;
            }

            return true;
        }
    );

    // Redraw the table with the applied filters
    dataTable.draw();

    // Remove the custom search function after the table redraw
    $.fn.dataTable.ext.search.pop();

    // Calculate sums for filtered rows
    let totalIncome = 0;
    let totalExpense = 0;

    // Iterate over each row in the filtered results
    dataTable.rows({ filter: 'applied' }).every(function (rowIdx, tableLoop, rowLoop) {
        let rowData = this.data();
        // Assuming income is in column 9 and expense in column 10
        totalIncome += parseFloat(rowData[9]) || 0;
        totalExpense += parseFloat(rowData[10]) || 0;
    });

    // Output the calculated totals (adjust according to your requirements)
    console.log("Total Income:", totalIncome);
    console.log("Total Expense:", totalExpense);

    console.log("Filtering from:", fromDate, "to:", toDate);
    console.log("Using confirmation status:", confirmationStatus);

    // Debugging: log payment date for each row
    console.log("Checking payment date:", paymentDate);
});


