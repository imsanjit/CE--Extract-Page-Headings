document.addEventListener('DOMContentLoaded', function() {
    // Request headings from the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: extractHeadings
      }, function(results) {
        if (results && results[0]) {
          const headingsContainer = document.getElementById('headingsContainer');
          const headingCount = document.getElementById('headingCount');
          const noHeadingsMsg = document.getElementById('noHeadingsMsg');
          const searchInput = document.getElementById('searchInput');
          const copyButton = document.getElementById('copyButton');
          const exportButton = document.getElementById('exportButton');
          
          const headingData = JSON.parse(results[0].result); // Receive the headings data with IDs
  
          // Check if no headings were found
          if (headingData.length === 0) {
            noHeadingsMsg.style.display = 'block'; // Show "No headings" message
            headingsContainer.style.display = 'none'; // Hide headings container
            headingCount.style.display = 'none'; // Hide heading count
            searchInput.style.display = 'none'; // Hide search input
            copyButton.style.display = 'none'; // Hide "Copy to Clipboard" button
            exportButton.style.display = 'none'; // Hide "Export Headings" button
          } else {
            noHeadingsMsg.style.display = 'none'; // Hide "No headings" message
            headingsContainer.style.display = 'block'; // Show headings container
            headingCount.style.display = 'block'; // Show heading count
            searchInput.style.display = 'block'; // Show search input
            copyButton.style.display = 'block'; // Show "Copy to Clipboard" button
            exportButton.style.display = 'block'; // Show "Export Headings" button
  
            // Populate and display heading counts
            let h1Count = 0, h2Count = 0, h3Count = 0, h4Count = 0, h5Count = 0, h6Count = 0;
            
            headingData.forEach((heading) => {
              if (heading.tagName === 'H1') h1Count++;
              if (heading.tagName === 'H2') h2Count++;
              if (heading.tagName === 'H3') h3Count++;
              if (heading.tagName === 'H4') h4Count++;
              if (heading.tagName === 'H5') h5Count++;
              if (heading.tagName === 'H6') h6Count++;
            });
  
            headingCount.textContent = `H1: ${h1Count}, H2: ${h2Count}, H3: ${h3Count}, H4: ${h4Count}, H5: ${h5Count}, H6: ${h6Count}`;
  
            // Function to display headings in plain text
            function populateHeadings(filteredHeadings) {
              headingsContainer.innerHTML = ''; // Clear previous list
              const headingText = filteredHeadings.map(heading => `${heading.tagName}: ${heading.headingText}`).join('\n');
              headingsContainer.textContent = headingText; // Set plain text in the container
            }
  
            // Populate all headings initially
            populateHeadings(headingData);
  
            // Filter headings based on search input
            searchInput.addEventListener('input', function() {
              const searchTerm = searchInput.value.toLowerCase();
              const filteredHeadings = headingData.filter(heading => heading.headingText.toLowerCase().includes(searchTerm));
              populateHeadings(filteredHeadings);
            });
          }
  
          // Export headings to a .txt file
          document.getElementById('exportButton').addEventListener('click', function() {
            const headingsText = headingData.map(heading => `${heading.tagName}: ${heading.headingText}`).join('\n');
            
            const blob = new Blob([headingsText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'headings.txt';
            a.click();
            URL.revokeObjectURL(url);
          });
  
        }
      });
    });
  
    // Copy headings to clipboard
    document.getElementById('copyButton').addEventListener('click', function() {
      const output = document.getElementById('headingsContainer').textContent;
      if (output !== 'No headings found on this page.') {
        navigator.clipboard.writeText(output).then(() => {
          alert('Headings copied to clipboard');
        });
      }
    });
  });
  
  // Function to extract headings from the page (to be injected)
  function extractHeadings() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let output = [];
    headings.forEach((heading, index) => {
      const headingID = `heading-${index}`;
      heading.setAttribute('id', headingID); // Set a unique ID for each heading (not used for scrolling, just for identification)
      output.push({ tagName: heading.tagName, headingText: heading.innerText.trim(), id: headingID });
    });
    return JSON.stringify(output); // Return as a JSON string
  }
  