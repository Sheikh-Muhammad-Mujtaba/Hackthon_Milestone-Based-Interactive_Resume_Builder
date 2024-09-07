document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resumeForm');
    const resumeOutput = document.getElementById('resumeOutput');
    const addEducationButton = document.getElementById('addEducation');
    const addExperienceButton = document.getElementById('addExperience');
    const addSkillButton = document.getElementById('addSkill');

    addEducationButton.addEventListener('click', addNewEducation);
    addExperienceButton.addEventListener('click', addNewExperience);
    addSkillButton.addEventListener('click', addNewSkill);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        
        const educationFields = Array.from(document.querySelectorAll('.education-entry')).map(function(entry) {
            return {
                degree: entry.querySelector('input[name="degree"]').value,
                school: entry.querySelector('input[name="school"]').value,
                graduationYear: parseInt(entry.querySelector('input[name="graduationYear"]').value)
            };
        });
        
        const experienceFields = Array.from(document.querySelectorAll('.experience-entry')).map(function(entry) {
            return {
                jobTitle: entry.querySelector('input[name="jobTitle"]').value,
                company: entry.querySelector('input[name="company"]').value,
                startYear: parseInt(entry.querySelector('input[name="startYear"]').value),
                endYear: entry.querySelector('input[name="endYear"]').value || "Present",
                jobDescription: entry.querySelector('textarea[name="jobDescription"]').value
            };
        });

        const skills = Array.from(document.querySelectorAll('#skillsList .skill-item')).map(function(skill) {
            return skill.textContent.trim();
        });

        const resume = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            education: educationFields,
            experience: experienceFields,
            skills: skills
        };

        displayResume(resume);
    });

    function displayResume(resume) {
        resumeOutput.innerHTML = `
            <h2 contenteditable="true">${resume.name}</h2>
            <p>Email: <span contenteditable="true">${resume.email}</span> | Phone: <span contenteditable="true">${resume.phone}</span></p>
            
            <h3>Education</h3>
            <div id="educationList">
                ${resume.education.map(function(edu, index) {
                    return `
                    <div class="education-item">
                        <p><span contenteditable="true">${edu.degree}</span> - <span contenteditable="true">${edu.school}</span>, <span contenteditable="true">${edu.graduationYear}</span></p>
                        <button onclick="removeEducation(${index})">Remove</button>
                    </div>
                    `;
                }).join('')}
            </div>
            
            <h3>Experience</h3>
            <div id="experienceList">
                ${resume.experience.map(function(exp, index) {
                    return `
                    <div class="experience-item">
                        <h4 contenteditable="true">${exp.jobTitle} at ${exp.company}</h4>
                        <p><span contenteditable="true">${exp.startYear}</span> - <span contenteditable="true">${exp.endYear}</span></p>
                        <p contenteditable="true">${exp.jobDescription}</p>
                        <button onclick="removeExperience(${index})">Remove</button>
                    </div>
                    `;
                }).join('')}
            </div>
            
            <h3>Skills</h3>
            <p id="skillsList" contenteditable="true">${resume.skills.join(', ')}</p>
        `;

        resumeOutput.classList.remove('hidden');
        form.classList.add('hidden');
    }

    function addNewEducation() {
        const educationFields = document.getElementById('educationFields');
        const newEducation = document.createElement('div');
        newEducation.className = 'education-entry';
        newEducation.innerHTML = `
            <input type="text" name="degree" placeholder="Degree" required>
            <input type="text" name="school" placeholder="School" required>
            <input type="number" name="graduationYear" placeholder="Graduation Year" required>
        `;
        educationFields.appendChild(newEducation);
    }

    function addNewExperience() {
        const experienceFields = document.getElementById('experienceFields');
        const newExperience = document.createElement('div');
        newExperience.className = 'experience-entry';
        newExperience.innerHTML = `
            <input type="text" name="jobTitle" placeholder="Job Title" required>
            <input type="text" name="company" placeholder="Company" required>
            <input type="number" name="startYear" placeholder="Start Year" required>
            <input type="number" name="endYear" placeholder="End Year">
            <textarea name="jobDescription" placeholder="Job Description" required></textarea>
        `;
        experienceFields.appendChild(newExperience);
    }

    function addNewSkill() {
        const skillInput = document.getElementById('skillInput');
        const skillsList = document.getElementById('skillsList');
        const newSkill = document.createElement('span');
        newSkill.className = 'skill-item';
        newSkill.textContent = skillInput.value;
        skillsList.appendChild(newSkill);
        skillInput.value = ''; // Clear input after adding the skill
    }

    window.removeEducation = function(index) {
        const educationList = document.getElementById('educationList');
        educationList.removeChild(educationList.children[index]);
    };

    window.removeExperience = function(index) {
        const experienceList = document.getElementById('experienceList');
        experienceList.removeChild(experienceList.children[index]);
    };
});
