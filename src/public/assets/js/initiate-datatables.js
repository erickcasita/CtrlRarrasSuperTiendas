// Initiate datatables in roles, tables, users page
(function() {
    'use strict';
    
    $('#dataTables-example').DataTable({
        
        responsive: true,
        pageLength: 20,
        lengthChange: false,
        searching: true,
        ordering: false,
        
        columnDefs: [
      	 { type: 'formatted-num',targets: 0 }
     	]
  	
    });
    $('#data-tables-store').DataTable({
        responsive: true,
        pageLength: 20,
        lengthChange: false,
        searching: true,
        ordering: false,
        
  	
    });
})();
