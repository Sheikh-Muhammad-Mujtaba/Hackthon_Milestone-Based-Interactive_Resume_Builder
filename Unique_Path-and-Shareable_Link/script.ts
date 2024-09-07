interface Resume {
    name: string;
    email: string;
    phone: string;
    education: Array<{
        degree: string;
        school: string;
        graduationYear: number;
    }>;
    experience: Array<{
        jobTitle: string;
        company: string;
        startYear: number;
        endYear: string;
        jobDescription: string;
    }>;
    skills: string[];
}

document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const setUsernameBtn = document.getElementById('setUsername') as HTMLButtonElement;
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;
    const shareOptions = document.getElementById('shareOptions') as HTMLDivElement;
    const shareLinkInput = document.getElementById('shareLink') as HTMLInputElement;
    const copyLinkBtn = document.getElementById('copyLink') as HTMLButtonElement;
    const downloadPDFBtn = document.getElementById('downloadPDF') as HTMLButtonElement;

    let username = '';

    setUsernameBtn.addEventListener('click', () => {
        username = usernameInput.value.trim();
        if (username) {
            document.getElementById('usernameInput')!.classList.add('hidden');
            form.classList.remove('hidden');
        } else {
            alert('Please enter a valid username');
        }
    });

    // Previous event listeners and functions

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

        const resume: Resume = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            education: educationFields,
            experience: experienceFields,
            skills: skills
        };

        displayResume(resume);
    });

    function displayResume(resume: Resume): void {
        resumeOutput.innerHTML = `
            <h2 contenteditable="true">${resume.name}</h2>
            <p>Email: <span contenteditable="true">${resume.email}</span> | Phone: <span contenteditable="true">${resume.phone}</span></p>
            
            <h3>Education</h3>
            <div id="educationList">
                ${resume.education.map((edu, index) => `
                    <div class="education-item">
                        <p><span contenteditable="true">${edu.degree}</span> - <span contenteditable="true">${edu.school}</span>, <span contenteditable="true">${edu.graduationYear}</span></p>
                        <button onclick="removeEducation(${index})">Remove</button>
                    </div>
                `).join('')}
            </div>
            
            <h3>Experience</h3>
            <div id="experienceList">
                ${resume.experience.map((exp, index) => `
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
        generateShareableLink();
    }

    function generateShareableLink(): void {
        const host = window.location.host;
        const path = `${host}/${username}/resume`;
        const link = `https://${path}`;
        shareLinkInput.value = link;
        shareOptions.classList.remove('hidden');

        // Save resume data to localStorage
        localStorage.setItem(`resume_${username}`, JSON.stringify(getResumeData()));
    }

    copyLinkBtn.addEventListener('click', () => {
        shareLinkInput.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    });

    downloadPDFBtn.addEventListener('click', () => {
        const element = document.getElementById('resumeOutput');
        html2pdf().from(element).save(`${username}_resume.pdf`);
    });

    function getResumeData(): Resume {
        return {
            name: resumeOutput.querySelector('h2')!.textContent || '',
            email: resumeOutput.querySelector('p span:first-child')!.textContent || '',
            phone: resumeOutput.querySelector('p span:last-child')!.textContent || '',
            education: Array.from(resumeOutput.querySelectorAll('.education-item')).map(item => ({
                degree: item.querySelector('span:first-child')!.textContent || '',
                school: item.querySelector('span:nth-child(2)')!.textContent || '',
                graduationYear: parseInt(item.querySelector('span:last-child')!.textContent || '0')
            })),
            experience: Array.from(resumeOutput.querySelectorAll('.experience-item')).map(item => ({
                jobTitle: item.querySelector('h4')!.textContent!.split(' at ')[0],
                company: item.querySelector('h4')!.textContent!.split(' at ')[1],
                startYear: parseInt(item.querySelector('p:first-of-type span:first-child')!.textContent || '0'),
                endYear: item.querySelector('p:first-of-type span:last-child')!.textContent || '',
                jobDescription: item.querySelector('p:last-of-type')!.textContent || ''
            })),
            skills: resumeOutput.querySelector('#skillsList')!.textContent!.split(', ')
        };
    }

    const path = window.location.pathname.split('/');
    if (path[1] && path[2] === 'resume') {
        username = path[1];
        const savedResume = localStorage.getItem(`resume_${username}`);
        if (savedResume) {
            const resume = JSON.parse(savedResume) as Resume;
            displayResume(resume);
        }
    }
});
