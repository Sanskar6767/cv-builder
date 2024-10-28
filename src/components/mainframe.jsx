import "../styles/mainframe.css";
import Sidebar from "./sidebar";
import Mainright from "./mainright";
import { useState } from "react";
export default function Mainframe() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    address: "123 Main St, Anytown, USA",
    summary:
      "I am a software engineer with 5 years of experience in the industry.",
    education: [
      {
        id: crypto.randomUUID(),
        school: "University of Anytown",
        degree: "Bachelor's Degree",
        field: "Computer Science",
        startDate: "2018-01-01",
        endDate: "2022-05-01",
      },
      {
        id: crypto.randomUUID(),
        school: "University of Downtown",
        degree: "Master's Degree",
        field: "Computer Science",
        startDate: "2022-01-01",
        endDate: "2024-05-01",
      },
    ],
    experience: [
      {
        id: crypto.randomUUID(),
        company: "Anytown Inc.",
        position: "Software Engineer",
        startDate: "2022-06-01",
        endDate: "2024-05-01",
      },
      {
        id: crypto.randomUUID(),
        company: "Downtown Inc.",
        position: "CEO",
        startDate: "2022-06-01",
        endDate: "2024-05-01",
      },
    ],
  });
  return (
    <div className="mainframe-container">
      <div className="mainframe">
        <Sidebar formData={formData} setFormData={setFormData} />
      </div>
      <div>
        <Mainright formData={formData} />
      </div>
    </div>
  );
}
