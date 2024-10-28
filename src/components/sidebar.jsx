import "../styles/sidebar.css";
import { useState } from "react";

export default function Sidebar({ formData, setFormData }) {
  let [activeId, setActiveId] = useState();
  return (
    <div className="sidebar">
      <div className="form-wrapper">
        <CreateFormCloud
          title="Basic Information"
          isActive={activeId === 0}
          onShow={() => setActiveId(0)}
          onHide={() => setActiveId(null)}
          formtype="basic"
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <div className="form-wrapper">
        <CreateFormCloud
          title="Educational Experience"
          isActive={activeId === 1}
          onShow={() => setActiveId(1)}
          onHide={() => setActiveId(null)}
          formtype="education"
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <div className="form-wrapper">
        <CreateFormCloud
          title="Work Experience"
          isActive={activeId === 2}
          onShow={() => setActiveId(2)}
          onHide={() => setActiveId(null)}
          formtype="experience"
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}

function CreateFormCloud({
  title,
  isActive,
  onShow,
  onHide,
  formtype,
  formData,
  setFormData,
}) {
  return (
    <div className="form-cloud">
      <div className="cloud-title-wrapper">
        <h2>{title}</h2>
        {!isActive && (
          <button className="edit-btn" onClick={onShow}>
            Edit
          </button>
        )}
        {isActive && (
          <button onClick={onHide} className="cls-btn">
            Close
          </button>
        )}
      </div>
      {isActive && (
        <div>
          {formtype === "basic" && (
            <BasicForm formData={formData} setFormData={setFormData} />
          )}
          {formtype === "education" && (
            <EducationForm formData={formData} setFormData={setFormData} />
          )}
          {formtype === "experience" && (
            <ExperienceForm formData={formData} setFormData={setFormData} />
          )}
        </div>
      )}
    </div>
  );
}

function BasicForm({ formData, setFormData }) {
  return (
    <div className="show-form">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="summary">Summary:</label>
        <textarea
          id="summary"
          name="summary"
          maxLength={200}
          rows={4}
          value={formData.summary}
          onChange={(e) =>
            setFormData({ ...formData, summary: e.target.value })
          }
        ></textarea>
      </div>
    </div>
  );
}

function EducationForm({ formData, setFormData }) {
  const [currentItemId, setCurrentItemId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  function handleEdit(itemId) {
    setCurrentItemId(itemId);
  }
  function handleDelete(itemId) {
    setFormData({
      ...formData,
      education: formData.education.filter((item) => item.id !== itemId),
    });
  }

  function handleAdd() {
    setIsAdding((prev) => !prev);
  }
  return (
    <div className="education-wrapper">
      {formData.education.map((school) => {
        return (
          <div key={school.id} className="education-card-wrapper">
            <div className="education-card">
              <div className="education-card-info">
                <h3>{school.school}</h3>
                <p>{school.degree}</p>
                <p>
                  {school.startDate} - {school.endDate}
                </p>
              </div>
              <div className="education-card-actions">
                {currentItemId !== school.id && (
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(school.id)}
                  >
                    Edit
                  </button>
                )}
                {currentItemId === school.id && (
                  <button onClick={() => handleEdit(null)}>Close</button>
                )}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(school.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            {currentItemId === school.id && (
              <div key={school.id}>
                <EducationFormItem
                  key={school.id}
                  formData={formData}
                  setFormData={setFormData}
                  itemId={school.id}
                />
              </div>
            )}
          </div>
        );
      })}
      {!isAdding && (
        <button className="add-btn edit-btn" onClick={handleAdd}>
          Add
        </button>
      )}
      {isAdding && (
        <EducationFormItemAdd
          formData={formData}
          setFormData={setFormData}
          closeAdd={handleAdd}
        />
      )}
    </div>
  );
}

function EducationFormItem({ formData, setFormData, itemId }) {
  // Find the specific education item being edited
  const educationItem = formData.education.find((item) => item.id === itemId);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      education: formData.education.map((item) =>
        item.id === itemId ? { ...item, [name]: value } : item
      ),
    });
  };

  return (
    <div className="item-wrapper">
      <div className="show-form">
        <div>
          <label htmlFor="school">School:</label>
          <input
            type="text"
            id="school"
            name="school"
            value={educationItem.school}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="degree">Degree:</label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={educationItem.degree}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={educationItem.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={educationItem.endDate}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

function EducationFormItemAdd({ formData, setFormData, closeAdd }) {
  const [educationItem, setEducationItem] = useState({
    id: crypto.randomUUID(),
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
  });
  const handleAdd = () => {
    // The main issue: we need to add to the education array, not replace formData
    setFormData({
      ...formData,
      education: [...formData.education, educationItem],
    });
    closeAdd();
  };
  return (
    <div className="item-wrapper">
      <div className="show-form">
        <div>
          <label htmlFor="school">School:</label>
          <input
            type="text"
            id="school"
            name="school"
            value={educationItem.school}
            onChange={(e) =>
              setEducationItem({ ...educationItem, school: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="degree">Degree:</label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={educationItem.degree}
            onChange={(e) =>
              setEducationItem({ ...educationItem, degree: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={educationItem.startDate}
            onChange={(e) =>
              setEducationItem({ ...educationItem, startDate: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={educationItem.endDate}
            onChange={(e) =>
              setEducationItem({ ...educationItem, endDate: e.target.value })
            }
          />
        </div>
        <button className="add-btn edit-btn" onClick={handleAdd}>
          Add
        </button>
        <button className="delete-btn edit-btn" onClick={closeAdd}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function ExperienceForm({ formData, setFormData }) {
  const [currentItemId, setCurrentItemId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  function handleEdit(itemId) {
    setCurrentItemId(itemId);
  }
  function handleDelete(itemId) {
    setFormData({
      ...formData,
      experience: formData.experience.filter((item) => item.id !== itemId),
    });
  }

  function handleAdd() {
    setIsAdding((prev) => !prev);
  }
  return (
    <div className="education-wrapper">
      {formData.experience.map((job) => {
        return (
          <div key={job.id} className="education-card-wrapper">
            <div className="education-card">
              <div className="education-card-info">
                <h3>{job.company}</h3>
                <p>{job.position}</p>
                <p>
                  {job.startDate} - {job.endDate}
                </p>
              </div>
              <div className="education-card-actions">
                {currentItemId !== job.id && (
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(job.id)}
                  >
                    Edit
                  </button>
                )}
                {currentItemId === job.id && (
                  <button onClick={() => handleEdit(null)}>Close</button>
                )}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            {currentItemId === job.id && (
              <div key={job.id}>
                <ExperienceFormItem
                  key={job.id}
                  formData={formData}
                  setFormData={setFormData}
                  itemId={job.id}
                />
              </div>
            )}
          </div>
        );
      })}
      {!isAdding && (
        <button className="add-btn edit-btn" onClick={handleAdd}>
          Add
        </button>
      )}
      {isAdding && (
        <ExperienceFormItemAdd
          formData={formData}
          setFormData={setFormData}
          closeAdd={handleAdd}
        />
      )}
    </div>
  );
}

function ExperienceFormItem({ formData, setFormData, itemId }) {
  // Find the specific experience item being edited
  const experienceItem = formData.experience.find((item) => item.id === itemId);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      experience: formData.experience.map((item) =>
        item.id === itemId ? { ...item, [name]: value } : item
      ),
    });
  };

  return (
    <div className="item-wrapper">
      <div className="show-form">
        <div>
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={experienceItem.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={experienceItem.position}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={experienceItem.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={experienceItem.endDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={experienceItem.description}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

function ExperienceFormItemAdd({ formData, setFormData, closeAdd }) {
  const [experienceItem, setExperienceItem] = useState({
    id: crypto.randomUUID(),
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const handleAdd = () => {
    // The main issue: we need to add to the education array, not replace formData
    setFormData({
      ...formData,
      experience: [...formData.experience, experienceItem],
    });
    closeAdd();
  };
  return (
    <div className="item-wrapper">
      <div className="show-form">
        <div>
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={experienceItem.company}
            onChange={(e) =>
              setExperienceItem({ ...experienceItem, company: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={experienceItem.position}
            onChange={(e) =>
              setExperienceItem({ ...experienceItem, position: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={experienceItem.startDate}
            onChange={(e) =>
              setExperienceItem({
                ...experienceItem,
                startDate: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={experienceItem.endDate}
            onChange={(e) =>
              setExperienceItem({ ...experienceItem, endDate: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={experienceItem.description}
            onChange={(e) =>
              setExperienceItem({
                ...experienceItem,
                description: e.target.value,
              })
            }
          />
        </div>
        <button className="add-btn edit-btn" onClick={handleAdd}>
          Add
        </button>
        <button className="delete-btn edit-btn" onClick={closeAdd}>
          Cancel
        </button>
      </div>
    </div>
  );
}
