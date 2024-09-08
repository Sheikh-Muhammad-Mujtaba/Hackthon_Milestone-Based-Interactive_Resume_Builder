document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("resumeForm");
    const educationFields = document.getElementById("educationFields");
    const experienceFields = document.getElementById("experienceFields");
    const skillsList = document.getElementById("skillsList");
    const resumeOutput = document.getElementById("resumeOutput");

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

        // Add Remove button functionality
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

        // Add Remove button functionality
        newField.querySelector(".removeExperience").addEventListener("click", function () {
            newField.remove();
        });
    });

   // Add Skills
document.getElementById("addSkill").addEventListener("click", () => {
    const skillInput = document.getElementById("skillInput");
    const skillValue = skillInput.value.trim();

    if (skillValue) {
        const skillItem = document.createElement("div");
        skillItem.textContent = skillValue;
        document.getElementById("skillsList").appendChild(skillItem);

        skillInput.value = "";
    }
});


    // Form submission and resume generation
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        resumeOutput.innerHTML = "";

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const profilePicture = document.getElementById("profilePicture").files[0];

        // Personal Information Section
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
            educationSection.innerHTML += `<p>${degree} from ${school}, year( ${graduationYear} )</p>`;
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
    
    // Iterate through the skills and add them as <li> items
    Array.from(skillsList.children).forEach((skill) => {
        const liElement = document.createElement("li");
        liElement.textContent = skill.textContent;
        ulElement.appendChild(liElement);
    });
    
    // Append the <ul> to the skills section
    skillsSection.appendChild(ulElement);
    resumeOutput.appendChild(skillsSection);
}

    });
});
