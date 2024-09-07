document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;
    const addEducationButton = document.getElementById('addEducation') as HTMLButtonElement;
    const addExperienceButton = document.getElementById('addExperience') as HTMLButtonElement;
    const addSkillButton = document.getElementById('addSkill') as HTMLButtonElement;

    addEducationButton.addEventListener('click', addNewEducation);
    addExperienceButton.addEventListener('click', addNewExperience);
    addSkillButton.addEventListener('click', addNewSkill);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        
        const educationFields = Array.from(document.querySelectorAll('.education-entry')).map(entry => ({
            degree: (entry.querySelector('input[name="degree"]') as HTMLInputElement).value,
            school: (entry.querySelector('input[name="school"]') as HTMLInputElement).value,
            graduationYear: parseInt((entry.querySelector('input[name="graduationYear"]') as HTMLInputElement).value)
        }));
        
        const experienceFields = Array.from(document.querySelectorAll('.experience-entry')).map(entry => ({
            jobTitle: (entry.querySelector('input[name="jobTitle"]') as HTMLInputElement).value,
            company: (entry.querySelector('input[name="company"]') as HTMLInputElement).value,
            startYear: parseInt((entry.querySelector('input[name="startYear"]') as HTMLInputElement).value),
            endYear: (entry.querySelector('input[name="endYear"]') as HTMLInputElement).value || "Present",
            jobDescription: (entry.querySelector('textarea[name="jobDescription"]') as HTMLTextAreaElement).value
        }));

        const skills = Array.from(document.querySelectorAll('#skillsList .skill-item')).map(skill => skill.textContent!.trim());

        const resume = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            education: educationFields,
            experience: experienceFields,
            skills: skills
        };

        displayResume(resume);
    });

    function displayResume(resume: any): void {
        resumeOutput.innerHTML = `
            <h2 contenteditable="true">${resume.name}</h2>
            <p>Email: <span contenteditable="true">${resume.email}</span> | Phone: <span contenteditable="true">${resume.phone}</span></p>
            
            <h3>Education</h3>
            <div id="educationList">
                ${resume.education.map((edu: any, index: number) => `
                    <div class="education-item">
                        <p><span contenteditable="true">${edu.degree}</span> - <span contenteditable="true">${edu.school}</span>, <span contenteditable="true">${edu.graduationYear}</span></p>
                        <button onclick="removeEducation(${index})">Remove</button>
                    </div>
                `).join('')}
            </div>
            
            <h3>Experience</h3>
            <div id="experienceList">
                ${resume.experience.map((exp: any, index: number) => `
                    <div class="experience-item">
                        <h4 contenteditable="true">${exp.jobTitle} at ${exp.company}</h4>
                        <p><span contenteditable="true">${exp.startYear}</span> - <span contenteditable="true">${exp.endYear}</span></p>
                        <p contenteditable="true">${exp.jobDescription}</p>
                        <button onclick="removeExperience(${index})">Remove</button>
                    </div>
                `).join('')}
            </div>
            
            <h3>Skills</h3>
            <p id="skillsList" contenteditable="true">${resume.skills.join(', ')}</p>
        `;

        resumeOutput.classList.remove('hidden');
        form.classList.add('hidden');
    }

    function addNewEducation(): void {
        const educationFields = document.getElementById('educationFields') as HTMLDivElement;
        const newEducation = document.createElement('div');
        newEducation.className = 'education-entry';
        newEducation.innerHTML = `
            <input type="text" name="degree" placeholder="Degree" required>
            <input type="text" name="school" placeholder="School" required>
            <input type="number" name="graduationYear" placeholder="Graduation Year" required>
        `;
        educationFields.appendChild(newEducation);
    }

    function addNewExperience(): void {
        const experienceFields = document.getElementById('experienceFields') as HTMLDivElement;
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

    function addNewSkill(): void {
        const skillInput = document.getElementById('skillInput') as HTMLInputElement;
        const skillsList = document.getElementById('skillsList') as HTMLDivElement;
        const newSkill = document.createElement('span');
        newSkill.className = 'skill-item';
        newSkill.textContent = skillInput.value;
        skillsList.appendChild(newSkill);
        skillInput.value = ''; // Clear input after adding the skill
    }

    (window as any).removeEducation = function(index: number): void {
        const educationList = document.getElementById('educationList') as HTMLDivElement;
        educationList.removeChild(educationList.children[index]);
    };

    (window as any).removeExperience = function(index: number): void {
        const experienceList = document.getElementById('experienceList') as HTMLDivElement;
        experienceList.removeChild(experienceList.children[index]);
    };
});
