document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resumeForm") as HTMLFormElement;
    const educationFields = document.getElementById("educationFields") as HTMLElement;
    const experienceFields = document.getElementById("experienceFields") as HTMLElement;
    const skillsList = document.getElementById("skillsList") as HTMLElement;
    const resumeOutput = document.getElementById("resumeOutput") as HTMLElement;
    const editButton = document.getElementById("editResume") as HTMLButtonElement;
    const saveButton = document.getElementById("saveResume") as HTMLButtonElement;
    const skillInput = document.getElementById("skillInput") as HTMLInputElement;

    // Add Education
    document.getElementById("addEducation")!.addEventListener("click", () => {
        const newField = document.createElement("div");
        newField.classList.add("education-entry");
        newField.innerHTML = `
            <input type="text" name="degree" placeholder="Degree" required>
            <input type="text" name="school" placeholder="School" required>
            <input type="number" name="graduationYear" placeholder="Graduation Year" required>
            <button type="button" class="removeEducation">Remove</button>
        `;
        educationFields.appendChild(newField);

        newField.querySelector(".removeEducation")!.addEventListener("click", () => {
            newField.remove();
        });
    });

    // Add Work Experience
    document.getElementById("addExperience")!.addEventListener("click", () => {
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

        newField.querySelector(".removeExperience")!.addEventListener("click", () => {
            newField.remove();
        });
    });

    // Add Skills
    document.getElementById("addSkill")!.addEventListener("click", () => {
        const skillValue = skillInput.value.trim();
        if (skillValue) {
            const skillItem = document.createElement("div");
            skillItem.classList.add("skill-item");
            skillItem.innerHTML = `
                ${skillValue} 
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="red" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M1.293 0a1 1 0 0 1 1.414 0L8 5.586 13.293.293a1 1 0 0 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414 2.707 14.707a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707A1 1 0 0 1 1.293 1.293z"/>
                </svg>`;
            
            skillsList.appendChild(skillItem);

            skillItem.querySelector("svg")!.addEventListener("click", () => {
                skillItem.remove();
            });

            skillInput.value = "";
        }
    });

    // Generate Resume
    form.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        resumeOutput.innerHTML = "";
        
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const profilePicture = (document.getElementById("profilePicture") as HTMLInputElement).files?.[0];

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
            const degree = (entry.querySelector('input[name="degree"]') as HTMLInputElement).value;
            const school = (entry.querySelector('input[name="school"]') as HTMLInputElement).value;
            const graduationYear = (entry.querySelector('input[name="graduationYear"]') as HTMLInputElement).value;
            educationSection.innerHTML += `<p>${degree} from ${school}, year(${graduationYear})</p>`;
        });
        resumeOutput.appendChild(educationSection);

        // Work Experience Section (optional)
        const experienceSection = document.createElement("div");
        experienceSection.classList.add("section");
        experienceSection.innerHTML = "<h3>Work Experience</h3>";
        document.querySelectorAll(".experience-entry").forEach((entry) => {
            const jobTitle = (entry.querySelector('input[name="jobTitle"]') as HTMLInputElement).value;
            const company = (entry.querySelector('input[name="company"]') as HTMLInputElement).value;
            const startYear = (entry.querySelector('input[name="startYear"]') as HTMLInputElement).value;
            const endYear = (entry.querySelector('input[name="endYear"]') as HTMLInputElement).value;
            const jobDescription = (entry.querySelector('textarea[name="jobDescription"]') as HTMLTextAreaElement).value;

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
                liElement.textContent = (skill.textContent || "").trim();
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
            const svg = skillItem.querySelector("svg") as SVGElement;
            svg.style.display = "inline";
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
            const svg = skillItem.querySelector("svg") as SVGElement;
            svg.style.display = "none";
        });

        saveButton.classList.add("edit-mode");
        editButton.classList.remove("edit-mode");
    });
});
