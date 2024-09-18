document.addEventListener("DOMContentLoaded", function () {
    var _a, _b, _c;
    // Grabbing the form element
    var form = document.getElementById("resumeForm");
    var educationFields = document.getElementById("educationFields");
    var experienceFields = document.getElementById("experienceFields");
    var skillsList = document.getElementById("skillsList");
    var resumeOutput = document.getElementById("resumeOutput");
    if (!form || !educationFields || !experienceFields || !skillsList || !resumeOutput) {
        console.error("One or more elements not found");
        return; // Early exit if elements aren't found
    }
    // Add Education
    (_a = document.getElementById("addEducation")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        var _a;
        var newField = document.createElement("div");
        newField.classList.add("education-entry");
        newField.innerHTML = "\n            <input type=\"text\" name=\"degree\" placeholder=\"Degree\" required>\n            <input type=\"text\" name=\"school\" placeholder=\"School\" required>\n            <input type=\"number\" name=\"graduationYear\" placeholder=\"Graduation Year\" required>\n            <button type=\"button\" class=\"removeEducation\">Remove</button>\n        ";
        educationFields.appendChild(newField);
        // Add Remove button functionality
        (_a = newField.querySelector(".removeEducation")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            newField.remove();
        });
    });
    // Add Work Experience
    (_b = document.getElementById("addExperience")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        var _a;
        var newField = document.createElement("div");
        newField.classList.add("experience-entry");
        newField.innerHTML = "\n            <input type=\"text\" name=\"jobTitle\" placeholder=\"Job Title\">\n            <input type=\"text\" name=\"company\" placeholder=\"Company\">\n            <input type=\"number\" name=\"startYear\" placeholder=\"Start Year\">\n            <input type=\"number\" name=\"endYear\" placeholder=\"End Year\">\n            <textarea name=\"jobDescription\" placeholder=\"Job Description\"></textarea>\n            <button type=\"button\" class=\"removeExperience\">Remove</button>\n        ";
        experienceFields.appendChild(newField);
        // Add Remove button functionality
        (_a = newField.querySelector(".removeExperience")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            newField.remove();
        });
    });
    // Add Skills
    (_c = document.getElementById("addSkill")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
        var skillInput = document.getElementById("skillInput");
        if (!skillInput)
            return;
        var skillValue = skillInput.value.trim();
        if (skillValue) {
            var skillItem = document.createElement("div");
            skillItem.textContent = skillValue;
            skillsList.appendChild(skillItem);
            skillInput.value = ""; // Clear the input field
        }
    });
    // Form submission and resume generation
    form.addEventListener("submit", function (e) {
        var _a;
        e.preventDefault(); // Prevent form from submitting the default way
        resumeOutput.innerHTML = ""; // Clear the output
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value || "Not provided";
        var profilePicture = (_a = document.getElementById("profilePicture").files) === null || _a === void 0 ? void 0 : _a[0];
        // Personal Information Section
        var personalInfoSection = document.createElement("div");
        personalInfoSection.classList.add("section");
        if (profilePicture) {
            var imgElement = document.createElement("img");
            imgElement.src = URL.createObjectURL(profilePicture);
            personalInfoSection.appendChild(imgElement);
        }
        personalInfoSection.innerHTML += "<h1>".concat(name, "</h1><h3>Contact</h3><p>Email: ").concat(email, "</p><p>Phone: ").concat(phone, "</p>");
        resumeOutput.appendChild(personalInfoSection);
        // Education Section
        var educationSection = document.createElement("div");
        educationSection.classList.add("section");
        educationSection.innerHTML = "<h3>Education</h3>";
        document.querySelectorAll(".education-entry").forEach(function (entry) {
            var degree = entry.querySelector('input[name="degree"]').value;
            var school = entry.querySelector('input[name="school"]').value;
            var graduationYear = entry.querySelector('input[name="graduationYear"]').value;
            educationSection.innerHTML += "<p>".concat(degree, " from ").concat(school, ", year(").concat(graduationYear, ")</p>");
        });
        resumeOutput.appendChild(educationSection);
        // Work Experience Section (optional)
        var experienceSection = document.createElement("div");
        experienceSection.classList.add("section");
        experienceSection.innerHTML = "<h3>Work Experience</h3>";
        document.querySelectorAll(".experience-entry").forEach(function (entry) {
            var jobTitle = entry.querySelector('input[name="jobTitle"]').value;
            var company = entry.querySelector('input[name="company"]').value;
            var startYear = entry.querySelector('input[name="startYear"]').value;
            var endYear = entry.querySelector('input[name="endYear"]').value;
            var jobDescription = entry.querySelector('textarea[name="jobDescription"]').value;
            if (jobTitle || company) {
                experienceSection.innerHTML += "<p>".concat(jobTitle, " at ").concat(company, " (").concat(startYear, " - ").concat(endYear || "Present", ")</p><p>").concat(jobDescription || "", "</p>");
            }
        });
        if (experienceSection.innerHTML !== "<h3>Work Experience</h3>") {
            resumeOutput.appendChild(experienceSection);
        }
        // Skills Section
        var skillsSection = document.createElement("div");
        skillsSection.classList.add("section");
        skillsSection.innerHTML = "<h3>Skills</h3>";
        if (skillsList.children.length > 0) {
            var ulElement_1 = document.createElement("ul");
            Array.from(skillsList.children).forEach(function (skill) {
                var liElement = document.createElement("li");
                liElement.textContent = skill.textContent || "";
                ulElement_1.appendChild(liElement);
            });
            skillsSection.appendChild(ulElement_1);
            resumeOutput.appendChild(skillsSection);
        }
    });
});
