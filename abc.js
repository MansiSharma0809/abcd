function handleFormSubmit(event) {
    event.preventDefault();

    // Get form field values
    const amount = document.getElementById('text').value;
    const category = document.querySelector('select').value;
    const description = document.getElementById('choosedescription').value;

    // Create an object to store the expense
    const expense = {
        amount,
        category,
        description,
    };

    // Save to localStorage using a unique key
    const key = `${category}-${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(expense));

    // Display the expense on the screen
    showExpenseOnScreen(expense, key);
}

function showExpenseOnScreen(expense, key) {
    const parentE = document.getElementById('listOfItem');
    const childE = document.createElement('li');

    // Display expense details
    childE.textContent = `${expense.amount} - ${expense.category} - ${expense.description}`;

    // Delete button
    const dltbtn = document.createElement('input');
    dltbtn.type = 'button';
    dltbtn.value = 'Delete';
    dltbtn.onclick = () => {
        localStorage.removeItem(key);
        parentE.removeChild(childE);
    };

    // Edit button
    const editbtn = document.createElement('input');
    editbtn.type = 'button';
    editbtn.value = 'Edit';
    editbtn.onclick = () => {
        // Populate the form with current values
        document.getElementById('text').value = expense.amount;
        document.querySelector('select').value = expense.category;
        document.getElementById('choosedescription').value = expense.description;

        // Remove the current expense from localStorage and UI
        localStorage.removeItem(key);
        parentE.removeChild(childE);
    };

    // Add buttons to the list item
    childE.appendChild(dltbtn);
    childE.appendChild(editbtn);

    // Append the list item to the parent element
    parentE.appendChild(childE);
}
