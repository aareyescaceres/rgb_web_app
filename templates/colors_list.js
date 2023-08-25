// Fetch colors from the server
function fetchColors() {
  fetch('/colors')
    .then(response => response.json())
    .then(colors => {
      const colorTable = document.getElementById('color-table');
      const tbody = colorTable.getElementsByTagName('tbody')[0];
      tbody.innerHTML = ''; // Clear existing rows in the table

      colors.forEach(color => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${color.R}</td>
          <td>${color.G}</td>
          <td>${color.B}</td>
          <td><div style="background-color: rgb(${color.R}, ${color.G}, ${color.B}); width: 50px; height: 50px;"></div></td>
          <td>
            <button onclick="editColor(${color.id})">Edit</button>
            <button onclick="deleteColor(${color.id})">Delete</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    });
}

// Update color
function editColor(colorID) {
  var R = document.getElementById("R").value;
  var G = document.getElementById("G").value;
  var B = document.getElementById("B").value;

  var data = { "R": R, "G": G, "B": B };

  fetch(`/colors/${colorID}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.text())
  .then(text => {
    if (text === "SUCCESS") {
      location.reload(); // Refresh the page
      console.log(`Color with ID ${colorID} edited successfully`);
    }
  })
}

// Delete color
function deleteColor(colorId) {
  fetch(`/colors/${colorId}`, {
    method: 'DELETE'
  })
  .then(response => response.text())
  .then(text => {
    if (text === "SUCCESS") {
      location.reload(); // Refresh the page
      console.log(`Color with ID ${colorId} deleted successfully`);
    }
  });
}

// Create color
function addColor() {
  var R = document.getElementById('R').value;
  var G = document.getElementById('G').value;
  var B = document.getElementById('B').value;

  var data = { 'R': R, 'G': G, 'B': B };

  fetch('/colors', {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.text())
  .then(text => {
    if (text === "SUCCESS") {
      fetchColors()
    }
  });
}

// Start loading the existing colors page
fetchColors();
