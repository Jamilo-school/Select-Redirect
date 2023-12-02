
const pdfArray = [
  {
    index: 2023,
    files: [
      { name: 'Clement Joseph', url: './Pdf/slip 2023/Clement Joseph.pdf', password: 'password1' },
      { name: 'Clement Joseph', url: './Pdf/slip 2023/Clement Joseph.pdf', password: 'password1' },
      { name: 'Clement Joseph', url: './Pdf/slip 2023/Clement Joseph.pdf', password: 'password1' },
      { name: 'Clement Joseph', url: './Pdf/slip 2023/Clement Joseph.pdf', password: 'password1' },
      { name: 'Clement Joseph', url: './Pdf/slip 2023/Clement Joseph.pdf', password: 'password1' },
      { name: 'Clement Joseph', url: './Pdf/slip 2023/Clement Joseph.pdf', password: 'password1' },
      { name: 'Clement Joseph', url: './Pdf/slip 2023/Clement Joseph.pdf', password: 'password1' },
      { name: 'Clement Joseph', url: './Pdf/slip 2023/Clement Joseph.pdf', password: 'password1' },
      { name: 'Clement Joseph', url: './Pdf/slip 2023/Clement Joseph.pdf', password: 'password1' },
      { name: 'Clement Joseph', url: './Pdf/slip 2023/Clement Joseph.pdf', password: 'password1' },
      { name: 'Clement Joseph', url: './Pdf/slip 2023/Clement Joseph.pdf', password: 'password1' },
      { name: 'Clement Joseph', url: './Pdf/slip 2023/Clement Joseph.pdf', password: 'password1' },
      { name: 'Clement Joseph', url: './Pdf/slip 2023/Clement Joseph.pdf', password: 'password1' },
      { name: 'Clement Joseph', url: './Pdf/slip 2023/Clement Joseph.pdf', password: 'password1' },
      { name: 'Clement Joseph', url: './Pdf/slip 2023/Clement Joseph.pdf', password: 'password1' },
      { name: 'Sample File 2.pdf', url: 'sample_pdf_2.pdf', password: 'password2' }
    ],
  },
  {
    index: 2022,
    files: [
      { name: 'Another File 1.pdf', url: 'sample_pdf_3.pdf', password: 'password3' },
      { name: 'Another File 2.pdf', url: 'sample_pdf_4.pdf', password: 'password4' },
      { name: 'Another File 3.pdf', url: 'sample_pdf_5.pdf', password: 'password5' }
    ],
  },
  // Add more objects as needed
];

const adminPassword = 'admin'; // Admin password to override individual learner passwords
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', function() {
  const inputValue = searchInput.value.toLowerCase();
  const filteredPDFs = pdfArray.filter(item => {
    return String(item.index).includes(inputValue);
  });

  displaySearchResults(filteredPDFs);
});

function displaySearchResults(results) {
  if (results.length > 0) {
    searchResults.innerHTML = '';
    searchResults.style.display = 'block';

    const ul = document.createElement('ul');

    results.forEach(item => {
      const { index, files } = item;
      const li = document.createElement('li');
      li.textContent = `Online Result slips ${index}:`;

      const filesList = document.createElement('ul');
      files.forEach((file, idx) => {
        const fileLi = document.createElement('li');
        fileLi.textContent = `${idx + 1}: ${file.name}`;
        fileLi.addEventListener('click', () => downloadPDF(index, idx, file.name, file.url, file.password));
        filesList.appendChild(fileLi);
      });

      li.appendChild(filesList);
      ul.appendChild(li);
    });

    searchResults.appendChild(ul);
  } else {
    searchResults.innerHTML = '';
    searchResults.style.display = 'none';
    handleNoDataFound();
  }
}

function downloadPDF(index, fileIndex, fileName, fileUrl, filePassword) {
  Swal.fire({
    title: 'Enter Authentication password to download',
    input: 'password',
    showCancelButton: true,
    confirmButtonText: 'Download',
    cancelButtonText: 'Cancel',
    inputAttributes: {
      autocapitalize: 'off',
      autocorrect: 'off'
    },
    preConfirm: (password) => {
      if (password === adminPassword) {
        triggerDownload(fileUrl, fileName);
      } else if (password === filePassword) {
        triggerDownload(fileUrl, fileName);
      } else {
        Swal.showValidationMessage('Incorrect password entered.Download Denied');
      }
    }
  });
}

function triggerDownload(fileUrl, fileName) {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.setAttribute('download', fileName);
  link.click();
  Swal.close();
}

function handleNoDataFound() {
  Swal.fire({
    icon: 'error',
    title: 'File not found!',
    text: 'No files found for the searched index.',
    showConfirmButton: false,
    timer: 3000
  });
}
