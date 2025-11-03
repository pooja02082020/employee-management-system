// Employee Management System Script

const form = document.querySelector(".form");
const tableBody = document.querySelector("table tbody");
const searchInput = document.querySelector(".search-bar input");
const searchButton = document.querySelector(".search-bar button");

let employees = [
  { id: 1, name: "Pooja Lohani", email: "pooja@info.com", position: "QA Engineer", department: "IT", salary: "100000" },
  { id: 2, name: "Samjhana KC", email: "sam@info.com", position: "Manager", department: "HR", salary: "75000" }
];

// --- Flag to detect programmatic reset ---
let skipResetConfirm = false;

// --- Render Table ---
function renderTable(data) {
  tableBody.innerHTML = "";

  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6">No employees found</td></tr>`;
    return;
  }

  data.forEach((emp) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.position}</td>
      <td>${emp.department}</td>
      <td>$${emp.salary}</td>
      <td><button class="delete-btn" data-id="${emp.id}">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// --- Confirm + Submit Form ---
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!confirm("Are you sure you want to submit this employee?")) return;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const position = document.getElementById("position").value.trim();
  const department = document.getElementById("department").value;
  const salary = document.getElementById("salary").value.trim();

  if (!name || !email || !position || department === "Select department" || !salary) {
    alert(" Please fill out all fields before submitting!");
    return;
  }

  const newEmployee = { id: Date.now(), name, email, position, department, salary };
  employees.push(newEmployee);

  //  Skip reset confirmation for this one
  skipResetConfirm = true;
  form.reset();
  skipResetConfirm = false;

  renderTable(employees);
  alert("Employee added successfully!");
});

// --- Confirm Reset Form ---
form.addEventListener("reset", (e) => {
  // Only show confirm when manually clicked
  if (skipResetConfirm) return;
  const confirmReset = confirm("Are you sure you want to reset the form?");
  if (!confirmReset) e.preventDefault();
});

// --- Confirm Delete Row ---
tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");
    const confirmDelete = confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    employees = employees.filter((emp) => emp.id != id);
    renderTable(employees);
    alert("🗑️ Employee deleted successfully!");
  }
});

// --- Search Function ---
searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    alert("🔍 Please enter a keyword to search!");
    return;
  }

  const filtered = employees.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(searchTerm) ||
      emp.department.toLowerCase().includes(searchTerm) ||
      emp.position.toLowerCase().includes(searchTerm)
    );
  });

  renderTable(filtered);
});

// ✅ --- Handle Clearing Search Input ---
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm === "") {
    renderTable(employees); // Reset table when user clears search
  }
});

// --- Initialize Table ---
renderTable(employees);
