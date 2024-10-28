import "../styles/mainright.css";
import { useState } from "react";


export default function Mainright({ formData }) {
  return (
    <div className="mainright">
      <div className="mainright-header">
        <h1>Resume Preview</h1>
      </div>
      <div className="mainright-body">
        <div className="cv-preview">
          <div className="cv-basic-info">
            <h2 className="cv-name">{formData.name || 'Your Name'}</h2>
            <div className="cv-contact-info">
              <p>{formData.email || 'email@example.com'}</p>
              <p>{formData.phone || 'Phone Number'}</p>
              <p>{formData.address || 'Your Address'}</p>
            </div>
          </div>

          <div className="cv-section">
            <h3>Professional Summary</h3>
            <p className="cv-summary">{formData.summary || 'Your professional summary will appear here...'}</p>
          </div>

          <div className="cv-section">
            <h3>Education</h3>
            {formData.education && formData.education.length > 0 ? (
              formData.education.map((edu, index) => (
                <div className="cv-education" key={index}>
                  <h4>{edu.school || 'University Name'}</h4>
                  <p className="cv-degree">{edu.degree || 'Degree'}</p>
                  <p className="cv-dates">
                    {edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}
                  </p>
                </div>
              ))
            ) : (
              <div className="cv-education">
                <h4>University Name</h4>
                <p className="cv-degree">Degree</p>
                <p className="cv-dates">Start Date - End Date</p>
              </div>
            )}
          </div>

          <div className="cv-section">
            <h3>Work Experience</h3>
            {formData.experience && formData.experience.length > 0 ? (
              formData.experience.map((exp, index) => (
                <div className="cv-experience" key={index}>
                  <div className="cv-experience-header">
                    <h4>{exp.company || 'Company Name'}</h4>
                    <p className="cv-position">{exp.position || 'Position'}</p>
                    <p className="cv-dates">
                      {exp.startDate || 'Start Date'} - {exp.endDate || 'End Date'}
                    </p>
                  </div>
                  <p className="cv-description">{exp.description || 'Job description'}</p>
                </div>
              ))
            ) : (
              <div className="cv-experience">
                <h4>Company Name</h4>
                <p className="cv-position">Position</p>
                <p className="cv-dates">Start Date - End Date</p>
                <p className="cv-description">Job description</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
