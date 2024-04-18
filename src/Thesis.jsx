import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import "./Thesis.css";

function Thesis() {
  const [pracoviste, setPracoviste] = useState("642");
  const [typ, setTyp] = useState("BP");
  const [topics, setTopics] = useState([]);
  const [supervisor, setSupervisor] = useState(null);
  const [program, setProgram] = useState(null);
  const [availableSupervisors, setAvailableSupervisors] = useState([]);
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [selectedAbstract, setSelectedAbstract] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://node29.webte.fei.stuba.sk/davidov/thesisAPI/api.php/thesis",
        {
          pracoviste: pracoviste,
          type: typ,
          supervisor: supervisor,
          program: program,
        }
      );
      setTopics(response.data);

      const uniqueSupervisors = [
        ...new Set(response.data.map((topic) => topic.supervisor)),
      ];
      const uniquePrograms = [
        ...new Set(response.data.map((topic) => topic.program)),
      ];
      setAvailableSupervisors(uniqueSupervisors);
      setAvailablePrograms(uniquePrograms);
    } catch (error) {
      console.error("Error fetching thesis data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pracoviste, typ, supervisor, program]); 

  const columns = [
    {
      name: "Názov témy",
      selector: (row) => row.topicName,
      sortable: true,
      cell: (row) => (
        <div onClick={() => setSelectedAbstract(row.abstract)}>
          {row.topicName}
        </div>
      ),
    },
    {
      name: "Školiteľ",
      selector: (row) => row.supervisor,
      sortable: true,
    },

    {
      name: "Program",
      selector: (row) => row.program,
      sortable: true,
    },
  ];

  const closeAbstract = () => {
    setSelectedAbstract("");
  };

  const filteredTopics = topics.filter(
    (topic) =>
      topic.topicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.abstract.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <label htmlFor="pracoviste">Pracovisko:</label>
        <select
          id="pracoviste"
          value={pracoviste}
          onChange={(e) => setPracoviste(e.target.value)}
        >
          <option value="642">Ustav automobilovej mechatroniky</option>
          <option value="548">
            Ustav elektroenergetiky a aplikovanej elektrotechniky
          </option>
          <option value="549">Ustav elektroniky a fotoniky</option>
          <option value="550">Ustav elektrotechniky</option>
          <option value="816">Ustav informatiky a matematiky</option>
          <option value="817">
            Ustav jadroveho a fyzikalneho inzinierstva
          </option>
          <option value="818">
            Ustav multimedialnych informacnych a komunikacnych technologii
          </option>
          <option value="356">Ustav robotiky a kybernetiky</option>
        </select>
      </div>
      <div>
        <label htmlFor="typ">Typ:</label>
        <select id="typ" value={typ} onChange={(e) => setTyp(e.target.value)}>
          <option value="">Vyberte typ prace</option>
          <option value="BP">Bakalárska práca</option>
          <option value="DP">Diplomová práca</option>
          <option value="DizP">Dizertačná práca</option>
        </select>
      </div>
      <div>
        <label htmlFor="supervisor">Školiteľ:</label>
        <select
          id="supervisor"
          value={supervisor}
          onChange={(e) => setSupervisor(e.target.value)}
        >
          <option value="">Vyberte školiteľa</option>
          {availableSupervisors.map((supervisor) => (
            <option key={supervisor} value={supervisor}>
              {supervisor}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="program">Studijný program:</label>
        <select
          id="program"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
        >
          <option value="">Vyberte studijný program</option>
          {availablePrograms.map((program) => (
            <option key={program} value={program}>
              {program}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Vyhľadať podľa názvu alebo abstraktu"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DataTable
        title="Voľné témy"
        columns={columns}
        data={filteredTopics}
        pagination
        highlightOnHover
      />
      {selectedAbstract && (
        <div>
          <h3>Abstrakt</h3>
          <p>{selectedAbstract}</p>
          <button onClick={closeAbstract}>Zatvoriť abstrakt</button>
        </div>
      )}
    </div>
  );
}

export default Thesis;
