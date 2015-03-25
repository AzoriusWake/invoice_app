var app = angular.module('steelbrick', []);

app.controller('InvoiceController', function($scope, $http){

  $scope.invoice = { date: "", customer: "", id: "", items: [{description:"", qty: 0, cost: 0}] }
  // Hard-coded in products. Could otherwise connect with backend using $http to retrieve information from db/endpoint/api
  $scope.products = [
    { name: "Chair", cost: 64.99},
    { name: "Cabinet", cost: 84.99},
    { name: "Futon", cost: 249.99},
    { name: "Sofa", cost: 389.99},
    { name: "Couch", cost: 584.99},
    { name: "Desk", cost: 224.99},
    { name: "Hutch", cost: 154.99},
    { name: "Bookcase", cost: 239.99},
    { name: "Bench", cost: 109.99},
    { name: "Cart", cost: 59.99},
    { name: "Bed", cost: 864.99},
    { name: "Nightstand", cost: 94.99},
    { name: "Dresser", cost: 259.99},
    { name: "Mattress", cost: 304.99},
    { name: "Panel", cost: 84.99},
    { name: "Mirror", cost: 54.99},
    { name: "Stool", cost: 49.99},
    { name: "Bean Bag", cost: 89.99},
    { name: "Crib", cost: 204.99}
  ];

  // Add in item from the table line
  $scope.addItem = function(){
    $scope.invoice.items.push({description:"", qty: 0, cost: 0});
  }

  // Add in product from the products list, with name, cost, and default quantity of 1
  $scope.addProduct = function(product){
    $scope.invoice.items.push({description: product.name, qty: 1, cost: product.cost});
  }

  // Calculates total of all line items
  $scope.calculate_total = function() {
    var total = 0.00;
    angular.forEach($scope.invoice.items, function(item, key){
      total += (item.qty * item.cost);
    });
    return total;
  }

  // Removes the line item
  $scope.removeItem = function(item) {
    $scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);
  }

  // After the confirmation, empties all fields (leaving one empty row)
  $scope.resetInvoice = function(){
    var resetConfirmation = confirm("Are you sure you would like to reset the invoice?");
    if(resetConfirmation){
      $scope.invoice = { date: "", customer: "", id: "", items: [{description:"", qty: 0, cost: 0}] };
    }
  }

  // Submits the invoice
  $scope.submitInvoice = function(){
    // Quick confirmation
    var submitConfirmation = confirm("Are you sure you would like to submit the invoice?");
    // Shows you the params that are being sent to the back-end
    console.log($.param($scope.invoice))
    if(submitConfirmation){
      $http({
        method: 'POST', // Following RESTful API, POST request is made
        url: '/invoices',
        data: $.param($scope.invoice), // Data passed to be processed in the back-end
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).
      success(function(data){
        // Upon success response from back-end
        $scope.invoice = { date: "", customer: "", id: "", items: [{description:"", qty: 0, cost: 0}] };
        alert("Invoice was successfully submitted. You can submit a new invoice.");
      }).
      error(function(data){
        // Upon error response from back-end
        console.log(data);
        alert("There was an error with the invoice submission. Please try again.");
      });
    }
  };

});

$(document).ready(function(){
  // Only a single button to start the invoice
  $("#invoice-container").hide();
  $("#begin-button").on("click", function(){
    // Upon click, show the container and hide the initial button
    $(this).hide();
    $("#invoice-container").show();
  });
})