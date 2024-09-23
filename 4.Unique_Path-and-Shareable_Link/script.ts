// Utility function to sanitize the name to generate a username
function generateUsername(name: string): string {
    // Remove spaces and any special characters except alphanumeric
    return name.replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "");
}


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("resumeForm") as HTMLFormElement;
    const educationFields = document.getElementById("educationFields") as HTMLDivElement;
    const experienceFields = document.getElementById("experienceFields") as HTMLDivElement;
    const skillsList = document.getElementById("skillsList") as HTMLDivElement;
    const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
    const editResumeButton = document.getElementById("editResume") as HTMLButtonElement;
    const saveResumeButton = document.getElementById("saveResume") as HTMLButtonElement;
    const editMessage = document.getElementById("editMessage") as HTMLParagraphElement;
    const replacePhotoInput = document.getElementById("replacePhoto") as HTMLInputElement;
    const formattingButtons = document.getElementById("formattingButtons") as HTMLDivElement;
    const downloadPdfButton = document.getElementById("downloadResume") as HTMLButtonElement;
    const shareableLinkContainer = document.getElementById("shareable-link-container") as HTMLDivElement;
    const shareableLinkElement = document.getElementById("shareable-link") as HTMLAnchorElement;
    let username = "";



    let isEditing = false;

    // Add Education Entry
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

        // Remove Education Entry
        newField.querySelector(".removeEducation")?.addEventListener("click", function () {
            newField.remove();
        });
    });

    // Add Work Experience Entry
    document.getElementById("addExperience")?.addEventListener("click", () => {
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

        // Remove Experience Entry
        newField.querySelector(".removeExperience")?.addEventListener("click", function () {
            newField.remove();
        });
    });

    // Add Skills
    document.getElementById("addSkill")?.addEventListener("click", () => {
        const skillInput = document.getElementById("skillInput") as HTMLInputElement;
        const skillValue = skillInput.value.trim();

        if (skillValue) {
            const skillItem = document.createElement("div");
            skillItem.textContent = skillValue;
            skillItem.classList.add("skill-item");
            skillsList.appendChild(skillItem);

            skillInput.value = "";
        }
    });

    // Generate Resume on Form Submit
    form.addEventListener("submit", function (e: Event) {
        e.preventDefault();
        resumeOutput.innerHTML = "";


        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const profilePicture = (document.getElementById("profilePicture") as HTMLInputElement).files?.[0];

        username = generateUsername(name);

        // Personal Information Section
        const personalInfoSection = document.createElement("div");
        personalInfoSection.classList.add("section");

        if (profilePicture) {
            const imgElement = document.createElement("img");
            imgElement.src = URL.createObjectURL(profilePicture);
            personalInfoSection.appendChild(imgElement);
        }

        personalInfoSection.innerHTML += `
            <h1>${name}</h1>
            <h3>Contact</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        `;
        resumeOutput.appendChild(personalInfoSection);

        // Education Section (with unordered list)
        const educationSection = document.createElement("div");
        educationSection.classList.add("section");
        educationSection.innerHTML = "<h3>Education</h3>";

        const educationList = document.createElement("ul");
        document.querySelectorAll(".education-entry").forEach((entry: Element) => {
            const degree = (entry.querySelector('input[name="degree"]') as HTMLInputElement).value;
            const school = (entry.querySelector('input[name="school"]') as HTMLInputElement).value;
            const graduationYear = (entry.querySelector('input[name="graduationYear"]') as HTMLInputElement).value;

            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${degree}</strong> from ${school}, Year: (${graduationYear})`;
            educationList.appendChild(listItem);
        });

        educationSection.appendChild(educationList);
        resumeOutput.appendChild(educationSection);

        // Work Experience Section (with unordered list)
        const experienceSection = document.createElement("div");
        experienceSection.classList.add("section");
        experienceSection.innerHTML = "<h3>Work Experience</h3>";

        const experienceList = document.createElement("ul");
        document.querySelectorAll(".experience-entry").forEach((entry: Element) => {
            const jobTitle = (entry.querySelector('input[name="jobTitle"]') as HTMLInputElement).value;
            const company = (entry.querySelector('input[name="company"]') as HTMLInputElement).value;
            const startYear = (entry.querySelector('input[name="startYear"]') as HTMLInputElement).value;
            const endYear = (entry.querySelector('input[name="endYear"]') as HTMLInputElement).value;
            const jobDescription = (entry.querySelector('textarea[name="jobDescription"]') as HTMLTextAreaElement).value;

            if (jobTitle || company) {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${jobTitle}</strong> at ${company} (${startYear} - ${endYear || "Present"})<br>${jobDescription || ""}`;
                experienceList.appendChild(listItem);
            }
        });

        if (experienceList.children.length > 0) {
            experienceSection.appendChild(experienceList);
            resumeOutput.appendChild(experienceSection);
        }

        // Skills Section
        if (skillsList.children.length > 0) {
            const skillsSection = document.createElement("div");
            skillsSection.classList.add("section");
            skillsSection.innerHTML = "<h3>Skills</h3>";

            const ulElement = document.createElement("ul");
            Array.from(skillsList.children).forEach((skill: Element) => {
                const liElement = document.createElement("li");
                liElement.textContent = skill.textContent || "";
                ulElement.appendChild(liElement);
            });

            skillsSection.appendChild(ulElement);
            resumeOutput.appendChild(skillsSection);
        }
    });

    // Store resume HTML in localStorage with the sanitized username
    const resumeHTML = resumeOutput.innerHTML; // Get the generated HTML
    localStorage.setItem(`resume-${username}`, resumeHTML);

    // Edit Mode Toggle
    editResumeButton?.addEventListener("click", () => {
        isEditing = true;
        editMessage.style.display = "block";
        formattingButtons.style.display = "block";
        resumeOutput.setAttribute("contenteditable", "true");
        editResumeButton.classList.add("hidden");
        saveResumeButton.classList.remove("hidden");
    });

    saveResumeButton?.addEventListener("click", () => {
        isEditing = false;
        editMessage.style.display = "none";
        formattingButtons.style.display = "none";
        resumeOutput.setAttribute("contenteditable", "false");
        editResumeButton.classList.remove("hidden");
        saveResumeButton.classList.add("hidden");
    });

    //download button
    downloadPdfButton.addEventListener("click", () => {
        window.print();  // This will print only the #resumeOutput section
    });

    // share button // Generate the shareable URL
    const shareableURL = `${window.location.origin}?resume=${encodeURIComponent(username)}`;

    // Display the shareable link
    shareableLinkContainer.style.display = "block";
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;


    // Handle loading a resume from the shareable link
    window.addEventListener("DOMContentLoaded", () => {
        const urlParams = new URLSearchParams(window.location.search);
        const resumeUsername = urlParams.get("resume");

        if (resumeUsername) {
            // Retrieve the saved resume HTML from localStorage
            const savedResume = localStorage.getItem(`resume-${resumeUsername}`);

            if (savedResume) {
                // Display the saved resume and hide the form
                resumeOutput.innerHTML = savedResume;
                form.style.display = "none"; // Hide the form when a resume is loaded
            }
        }
    });

    // Text Formatting
    document.getElementById("boldText")?.addEventListener("click", () => {
        document.execCommand("bold", false);
    });

    document.getElementById("italicText")?.addEventListener("click", () => {
        document.execCommand("italic", false);
    });

    document.getElementById("underlineText")?.addEventListener("click", () => {
        document.execCommand("underline", false);
    });

    document.getElementById("highlightText")?.addEventListener("click", () => {
        document.execCommand("hiliteColor", false, "yellow");
    });

    // Replace Photo in Edit Mode
    replacePhotoInput.addEventListener("change", function () {
        const file = replacePhotoInput.files?.[0];
        if (file) {
            const imgElement = resumeOutput.querySelector("img") as HTMLImageElement;
            if (imgElement) {
                imgElement.src = URL.createObjectURL(file);
            }
        }
    });
});
