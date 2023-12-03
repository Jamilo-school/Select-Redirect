const learners = {
  ClassEight2023: [
    // { Name: "learner not selected", AdmNo: "learner not selected", Index: "learner not selected", UPI: "learner not selected",  imageUrl:  "selection", Status: "learner not selected", fileURL: "./Pdf/slip2023/ClementJoseph.pdf", fileURL2: "./Pdf/slip2023/ClementJoseph.pdf", fileURL3: "./Pdf/slip2023/ClementJoseph.pdf", password: "ass" },
    { Name: "Edward Benard Abeka",AdmNo: "23/001", Index: 39701064001, UPI: 39701064001,  imageUrl: "./img/abeka.jpg", Status:"course Completed", fileURL: "./Pdf/slip2023/ClementJoseph.pdf", fileURL2: "./Pdf/slip2023/ClementJoseph.pdf", fileURL3: "./Pdf/slip2023/ClementJoseph.pdf", password: "ass" },
    { Name: "Edward Benard Abeka", Index: 3970106401, Year: "2023", imageUrl: "./img/lex.jpg", fileURL: "./Pdf/slip2023/ClementJoseph.pdf", fileURL2: "./Pdf/slip2023/ClementJoseph.pdf", fileURL3: "./Pdf/Cleoseph.pdf", password: "ass" },
    { Name: "Lizzyo Smith", age: 17, grade: "B", imageUrl: "url/to/image3.jpg", fileURL: "./Pdf/slip2023/LizzyAchieng.pdf", fileURL2: "./Pdf/slip2023/Joseph.pdf", password: "learner2Pass" },
    // Add more learners for Class Eight 2023
  ],
  GradeFive: [
    { Name: "Alice Johnson", age: 16, grade: "A+", imageUrl: "url/to/image4.jpg", password: "learner3Pass" },
    { Name: "Edward Benard Abeka", Index: 39701064001, Year: "2023", imageUrl: "url/to/image5.jpg", fileURL: "./Pdf/slip2023/ClementJoseph.pdf", password: "learner4Pass" },
    // Add more learners for Grade Five
  ],
  // Add more classes with learners as needed
};

const adminPassword = "admin";
let enteredPassword = ""; // Variable to store the entered password

function promptForDownloadPassword(learner, fileKey = "fileURL") {
  if (enteredPassword === "") {
    Swal.fire({
      title: "Enter Download Password:",
      input: "password",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        return password;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        enteredPassword = result.value;
        handleDownload(learner, fileKey);
      }
    });
  } else {
    handleDownload(learner, fileKey);
  }
}

function handleDownload(learner, fileKey) {
  const password = enteredPassword;

  if (password === learner.password || password === adminPassword) {
    window.location.href = learner[fileKey];
  } else {
    Swal.fire("Access Denied", "Incorrect password", "error");
  }
}

function displayLearners() {
  const selectedClass = document.getElementById("classSelect").value;
  const learnerSelect = document.getElementById("learnerSelect");
  learnerSelect.innerHTML = "";

  learners[selectedClass].forEach((learner, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = learner.Name;
    learnerSelect.appendChild(option);
  });

  displayBiodata();
}

function displayBiodata() {
  const selectedClass = document.getElementById("classSelect").value;
  const selectedLearnerIndex = document.getElementById("learnerSelect").value;
  const biodataDiv = document.getElementById("learnerBiodata");
  const selectedLearner = learners[selectedClass][selectedLearnerIndex];

  biodataDiv.innerHTML = "";

  // Display image
  const learnerImage = document.createElement("img");
  learnerImage.src = selectedLearner.imageUrl;
  learnerImage.alt = `${selectedLearner.Name}'s Image`;
  biodataDiv.appendChild(learnerImage);

  // Display learner details
  for (const [key, value] of Object.entries(selectedLearner)) {
    if (key !== "imageUrl" && key !== "fileURL" && key !== "fileURL2" && key !== "fileURL3" && key !== "password") {
      const p = document.createElement("p");
      p.textContent = `${key}: ${value}`;
      biodataDiv.appendChild(p);
    }
  }

  // Display download links
  if (selectedLearner.fileURL) {
    const downloadLink = document.createElement("a");
    downloadLink.href = "#";
    downloadLink.textContent = "Leaving Cert";
    downloadLink.onclick = function () {
      promptForDownloadPassword(selectedLearner);
    };
    biodataDiv.appendChild(downloadLink);

    if (selectedLearner.fileURL2) {
      const downloadLink2 = document.createElement("a");
      downloadLink2.href = "#";
      downloadLink2.textContent = "Online Slip";
      downloadLink2.onclick = function () {
        promptForDownloadPassword(selectedLearner, "fileURL2");
      };
      biodataDiv.appendChild(downloadLink2);
    }

    if (selectedLearner.fileURL3) {
      const downloadLink3 = document.createElement("a");
      downloadLink3.href = "#";
      downloadLink3.textContent = "Download File 3";
      downloadLink3.onclick = function () {
        promptForDownloadPassword(selectedLearner, "fileURL3");
      };
      biodataDiv.appendChild(downloadLink3);
    }
  }
}

// Initial call to display learners
displayLearners();
