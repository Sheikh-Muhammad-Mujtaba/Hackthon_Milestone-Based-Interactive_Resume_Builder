document.addEventListener("DOMContentLoaded", function () {
    // Grabbing the form element
    const form = document.getElementById("resumeForm") as HTMLFormElement | null;
    const educationFields = document.getElementById("educationFields") as HTMLDivElement | null;
    const experienceFields = document.getElementById("experienceFields") as HTMLDivElement | null;
    const skillsList = document.getElementById("skillsList") as HTMLDivElement | null;
    const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement | null;

    if (!form || !educationFields || !experienceFields || !skillsList || !resumeOutput) {
        console.error("One or more elements not found");
        return; // Early exit if elements aren't found
    }

    // Add Education
    document.getElementById("addEducation")?.addEventListener("click", () => {
        const newField = document.createElement("div");
        newField.classList.add("education-entry");
        newField.innerHTML = `
            <input type="text" name="degree" placeholder="Degree" required>
            <input type="text" name="school" placeholder="School" required>
            <input type="number" name="graduationYear" placeholder="Graduation Year" required>
            <button type="button" class="removeEducation">Remove</button>
        `;
        educationFields.appendChild(newField);

        // Add Remove button functionality
        newField.querySelector(".removeEducation")?.addEventListener("click", function () {
            newField.remove();
        });
    });

    // Add Work Experience
    document.getElementById("addExperience")?.addEventListener("click", () => {
        const newField = document.createElement("div");
        newField.classList.add("experience-entry");
        newField.innerHTML = `
            <input type="text" name="jobTitle" placeholder="Job Title">
            <input type="text" name="company" placeholder="Company">
            <input type="number" name="startYear" placeholder="Start Year">
            <input type="number" name="endYear" placeholder="End Year">
            <div>
            <textarea name="jobDescription" placeholder="Job Description"></textarea>
            </div>
            <button type="button" class="removeExperience">Remove</button>
        `;
        experienceFields.appendChild(newField);

        // Add Remove button functionality
        newField.querySelector(".removeExperience")?.addEventListener("click", function () {
            newField.remove();
        });
    });

    // Add Skills
    document.getElementById("addSkill")?.addEventListener("click", () => {
        const skillInput = document.getElementById("skillInput") as HTMLInputElement | null;
        if (!skillInput) return;

        const skillValue = skillInput.value.trim();
        if (skillValue) {
            const skillItem = document.createElement("div");
            skillItem.textContent = skillValue;
            skillsList.appendChild(skillItem);
            skillInput.value = ""; // Clear the input field
        }
    });

    // Form submission and resume generation
    form.addEventListener("submit", function (e: Event) {
        e.preventDefault(); // Prevent form from submitting the default way

        resumeOutput.innerHTML = ""; // Clear the output

        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value || "Not provided";
        const profilePicture = (document.getElementById("profilePicture") as HTMLInputElement).files?.[0];

        // Personal Information Section
        const personalInfoSection = document.createElement("div");
        personalInfoSection.classList.add("section");

        if (profilePicture) {
            const imgElement = document.createElement("img");
            imgElement.src = URL.createObjectURL(profilePicture);
            personalInfoSection.appendChild(imgElement);
        }

        personalInfoSection.innerHTML += `<h1>${name}</h1><h3>Contact</h3><p>Email: ${email}</p><p>Phone: ${phone}</p>`;
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
                liElement.textContent = skill.textContent || "";
                ulElement.appendChild(liElement);
            });

            skillsSection.appendChild(ulElement);
            resumeOutput.appendChild(skillsSection);
        }
    });
});
