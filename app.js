// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  //hide results
  document.getElementById('results').style.display = 'none';
  
  //show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});


// Calculate Results
function calculateResults(e){
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  //calculate
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // computer monthly payments
  const x = Math.pow(1+ calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest) / (x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    //show results
    document.getElementById('results').style.display = 'block';

    
  } else {
    console.log('Please check your numbers...');

    showError('Please check your numbers');
  }

  //hide loader
  document.getElementById('loading').style.display = 'none';

}

function showError(error) {
  // create a div
  const errorDiv = document.createElement('div');

  // get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // add classes
  errorDiv.className = 'alert alert-danger';

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // insert above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3 seconds, milliseconds
  setTimeout(clearError, 3000);

}

// Clear error
function clearError() {
  document.querySelector('.alert').remove();
}