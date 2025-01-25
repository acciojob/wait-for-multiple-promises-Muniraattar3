document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // Add the default loading row
  const loadingRow = document.createElement("tr");
  loadingRow.innerHTML = `
    <td colspan="2">Loading...</td>
  `;
  output.appendChild(loadingRow);

  // Function to create a promise that resolves after a random time between 1-3 seconds
  const createPromise = (promiseName) => {
    const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
    return new Promise((resolve) => {
      setTimeout(() => resolve({ name: promiseName, time: time.toFixed(3) }), time * 1000);
    });
  };

  // Create the 3 promises
  const promises = [
    createPromise("Promise 1"),
    createPromise("Promise 2"),
    createPromise("Promise 3"),
  ];

  const startTime = performance.now();

  // Use Promise.all to wait for all promises to resolve
  Promise.all(promises).then((results) => {
    // Remove the loading row
    output.innerHTML = "";

    // Populate the table with promise results
    results.forEach((result) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${result.name}</td>
        <td>${result.time}</td>
      `;
      output.appendChild(row);
    });

    // Calculate the total time
    const endTime = performance.now();
    const totalTime = ((endTime - startTime) / 1000).toFixed(3);

    // Add the total row
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
      <td>Total</td>
      <td>${totalTime}</td>
    `;
    output.appendChild(totalRow);
  });
});
