document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("resumeForm");
    const educationFields = document.getElementById("educationFields");
    const experienceFields = document.getElementById("experienceFields");
    const skillsList = document.getElementById("skillsList");
    const resumeOutput = document.getElementById("resumeOutput");
    const editButton = document.getElementById("editResume");
    const saveButton = document.getElementById("saveResume");
    const skillInput = document.getElementById("skillInput");

    // Add Education
    document.getElementById("addEducation").addEventListener("click", () => {
        const newField = document.createElement("div");
        newField.classList.add("education-entry");
        newField.innerHTML = `
            <input type="text" name="degree" placeholder="Degree" required>
            <input type="text" name="school" placeholder="School" required>
            <input type="number" name="graduationYear" placeholder="Graduation Year" required>
            <button type="button" class="removeEducation">Remove</button>
        `;
        educationFields.appendChild(newField);
        newField.querySelector(".removeEducation").addEventListener("click", function () {
            newField.remove();
        });
    });

    // Add Work Experience
    document.getElementById("addExperience").addEventListener("click", () => {
        const newField = document.createElement("div");
        newField.classList.add("experience-entry");
        newField.innerHTML = `
            <input type="text" name="jobTitle" placeholder="Job Title">
            <input type="text" name="company" placeholder="Company">
            <input type="number" name="startYear" placeholder="Start Year">
            <input type="number" name="endYear" placeholder="End Year">
            <textarea name="jobDescription" placeholder="Job Description"></textarea>
            <button type="button" class="removeExperience">Remove</button>
        `;
        experienceFields.appendChild(newField);
        newField.querySelector(".removeExperience").addEventListener("click", function () {
            newField.remove();
        });
    });

    // Add Skills
    document.getElementById("addSkill").addEventListener("click", () => {
        const skillValue = skillInput.value.trim();
        if (skillValue) {
            const skillItem = document.createElement("div");
            skillItem.classList.add("skill-item");
            skillItem.innerHTML = `
                ${skillValue} 
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M1.293 0a1 1 0 0 1 1.414 0L8 5.586 13.293.293a1 1 0 0 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414 2.707 14.707a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707A1 1 0 0 1 1.293 1.293z"/>
                </svg>`;
            
            // Append the skill item to the list
            skillsList.appendChild(skillItem);

            // Add event listener to the remove icon
            skillItem.querySelector("svg").addEventListener("click", () => {
                skillItem.remove();
            });

            skillInput.value = "";
        }
    });

    // Generate Resume
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        resumeOutput.innerHTML = "";
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const profilePicture = document.getElementById("profilePicture").files[0];
        const personalInfoSection = document.createElement("div");
        personalInfoSection.classList.add("section");

        if (profilePicture) {
            const imgElement = document.createElement("img");
            imgElement.src = URL.createObjectURL(profilePicture);
            personalInfoSection.appendChild(imgElement);
        }

        personalInfoSection.innerHTML += `<h1>${name}</h1><h3>Contact</h3><p>Email: ${email}</p><p>Phone: ${phone || "Not provided"}</p>`;
        resumeOutput.appendChild(personalInfoSection);

        // Education Section
        const educationSection = document.createElement("div");
        educationSection.classList.add("section");
        educationSection.innerHTML = "<h3>Education</h3>";
        document.querySelectorAll(".education-entry").forEach((entry) => {
            const degree = entry.querySelector('input[name="degree"]').value;
            const school = entry.querySelector('input[name="school"]').value;
            const graduationYear = entry.querySelector('input[name="graduationYear"]').value;
            educationSection.innerHTML += `<p>${degree} from ${school}, year(${graduationYear})</p>`;
        });
        resumeOutput.appendChild(educationSection);

        // Work Experience Section (optional)
        const experienceSection = document.createElement("div");
        experienceSection.classList.add("section");
        experienceSection.innerHTML = "<h3>Work Experience</h3>";
        document.querySelectorAll(".experience-entry").forEach((entry) => {
            const jobTitle = entry.querySelector('input[name="jobTitle"]').value;
            const company = entry.querySelector('input[name="company"]').value;
            const startYear = entry.querySelector('input[name="startYear"]').value;
            const endYear = entry.querySelector('input[name="endYear"]').value;
            const jobDescription = entry.querySelector('textarea[name="jobDescription"]').value;

            if (jobTitle || company) {
                experienceSection.innerHTML += `<p>${jobTitle} at ${company} (${startYear} - ${endYear || "Present"})</p><p>${jobDescription || ""}</p>`;
            }
        });
        if (experienceSection.innerHTML !== "<h3>Work Experience</h3>") {
            resumeOutput.appendChild(experienceSection);
        }

        // Skills Section
        const skillsSection = document.createElement("div");
        skillsSection.classList.add("section");
        skillsSection.innerHTML = "<h3>Skills</h3>";
        if (skillsList.children.length > 0) {
            const ulElement = document.createElement("ul");
            Array.from(skillsList.children).forEach((skill) => {
                const liElement = document.createElement("li");
                liElement.textContent = skill.textContent.trim();
                ulElement.appendChild(liElement);
            });
            skillsSection.appendChild(ulElement);
            resumeOutput.appendChild(skillsSection);
        }

        // Set initial mode to read-only
        document.querySelectorAll(".section").forEach(section => {
            section.classList.add("read-mode");
        });
        saveButton.classList.add("edit-mode");
        editButton.classList.remove("edit-mode");
    });

    // Edit Mode
    editButton.addEventListener("click", () => {
        document.querySelectorAll(".section").forEach(section => {
            section.classList.add("edit-mode");
            section.classList.remove("read-mode");
        });

        document.querySelectorAll(".skill-item").forEach(skillItem => {
            skillItem.querySelector("svg").style.display = "inline";
        });

        editButton.classList.add("edit-mode");
        saveButton.classList.remove("edit-mode");
    });

    // Save Mode
    saveButton.addEventListener("click", () => {
        document.querySelectorAll(".section").forEach(section => {
            section.classList.add("read-mode");
            section.classList.remove("edit-mode");
        });

        document.querySelectorAll(".skill-item").forEach(skillItem => {
            skillItem.querySelector("svg").style.display = "none";
        });

        saveButton.classList.add("edit-mode");
        editButton.classList.remove("edit-mode");
    });
});



document.getElementById("downloadPDF").addEventListener("click", function () {
    const element = document.getElementById("resumeOutput");
    const options = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
});


document.getElementById("shareLink").addEventListener("click", function () {
    const username = document.getElementById("name").value.trim().replace(/\s+/g, '');
    if (username) {
        const uniqueURL = `https://resume-builder-two-kappa.vercel.app/Unique_Path-and-Shareable_Link/index.html${username}`;
        const shareDiv = document.getElementById("shareURL");
        shareDiv.innerHTML = `<p>Share this link: <a href="${uniqueURL}" target="_blank">${uniqueURL}</a></p>`;
        shareDiv.classList.remove("hidden");
    } else {
        alert("Please enter your name to generate a unique link.");
    }
});
