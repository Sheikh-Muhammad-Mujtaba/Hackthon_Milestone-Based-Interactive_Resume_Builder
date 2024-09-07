document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm');
    const addEducationBtn = document.getElementById('addEducation');
    const addExperienceBtn = document.getElementById('addExperience');
    const addSkillBtn = document.getElementById('addSkill');
    const skillInput = document.getElementById('skillInput');
    const skillsList = document.getElementById('skillsList');
    const resumeOutput = document.getElementById('resumeOutput');

    addEducationBtn.addEventListener('click', () => addField('education'));
    addExperienceBtn.addEventListener('click', () => addField('experience'));
    addSkillBtn.addEventListener('click', addSkill);
    form.addEventListener('submit', generateResume);

    function addField(type) {
        const container = document.getElementById(`${type}Fields`);
        const newField = document.createElement('div');
        newField.className = `${type}-entry`;
        
        if (type === 'education') {
            newField.innerHTML = `
                <input type="text" name="degree" placeholder="Degree" required>
                <input type="text" name="school" placeholder="School" required>
                <input type="number" name="graduationYear" placeholder="Graduation Year" required>
            `;
        } else {
            newField.innerHTML = `
                <input type="text" name="jobTitle" placeholder="Job Title" required>
                <input type="text" name="company" placeholder="Company" required>
                <input type="number" name="startYear" placeholder="Start Year" required>
                <input type="number" name="endYear" placeholder="End Year">
                <textarea name="jobDescription" placeholder="Job Description" required></textarea>
            `;
        }
        
        container.appendChild(newField);
    }

    function addSkill() {
        const skill = skillInput.value.trim();
        if (skill) {
            const skillElement = document.createElement('span');
            skillElement.className = 'skill';
            skillElement.textContent = skill;
            skillsList.appendChild(skillElement);
            skillInput.value = '';
        }
    }

    function generateResume(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const resume = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            education: [],
            experience: [],
            skills: Array.from(skillsList.children).map(skill => skill.textContent || '')
        };

        document.querySelectorAll('.education-entry').forEach((entry) => {
            const inputs = entry.querySelectorAll('input');
            resume.education.push({
                degree: inputs[0].value,
                school: inputs[1].value,
                graduationYear: parseInt(inputs[2].value)
            });
        });

        document.querySelectorAll('.experience-entry').forEach((entry) => {
            const inputs = entry.querySelectorAll('input');
            const textarea = entry.querySelector('textarea');
            resume.experience.push({
                jobTitle: inputs[0].value,
                company: inputs[1].value,
                startYear: parseInt(inputs[2].value),
                endYear: inputs[3].value || 'Present',
                jobDescription: textarea.value
            });
        });

        displayResume(resume);
    }

    function displayResume(resume) {
        resumeOutput.innerHTML = `
            <h2>${resume.name}</h2>
            <p>Email: ${resume.email} | Phone: ${resume.phone}</p>
            
            <h3>Education</h3>
            ${resume.education.map(edu => `
                <p>${edu.degree} - ${edu.school}, ${edu.graduationYear}</p>
            `).join('')}
            
            <h3>Experience</h3>
            ${resume.experience.map(exp => `
                <h4>${exp.jobTitle} at ${exp.company}</h4>
                <p>${exp.startYear} - ${exp.endYear}</p>
                <p>${exp.jobDescription}</p>
            `).join('')}
            
            <h3>Skills</h3>
            <p>${resume.skills.join(', ')}</p>
        `;
    }
});
