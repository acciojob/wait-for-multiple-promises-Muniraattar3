document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // Add the default loading row with id="loading"
  const loadingRow = document.createElement("tr");
  loadingRow.setAttribute("id", "loading"); // Add the required id
  loadingRow.innerHTML = `
    <td colspan="2">Loading...</td>
  `;
  output.appendChild(loadingRow);

  // Custom function to generate random times (1-3 seconds)
  const getRandomTime = (seed) => {
    let time = (seed % 3) + 1; // Generate a value between 1 and 3
    return time;
  };

  // Function to create a promise that resolves after a custom time
  const createPromise = (promiseName, seed) => {
    const time = getRandomTime(seed);
    return new Promise((resolve) => {
      setTimeout(() => resolve({ name: promiseName, time: time.toFixed(3) }), time * 1000);
    });
  };

  // Create the 3 promises with different seeds for variability
  const promises = [
    createPromise("Promise 1", 5),
    createPromise("Promise 2", 12),
    createPromise("Promise 3", 20),
  ];

  const startTime = performance.now();

  // Use Promise.all to wait for all promises to resolve
  Promise.all(promises).then((results) => {
    // Remove the loading row
    const loadingElement = document.getElementById("loading");
    if (loadingElement) {
      loadingElement.remove();
    }

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
