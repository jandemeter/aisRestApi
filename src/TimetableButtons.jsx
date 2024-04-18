const TimetableButtons = () => {
  const handleGetData = () => {
    fetch("https://node29.webte.fei.stuba.sk/davidov/fetchData.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const handleDeleteData = () => {
    fetch("https://node29.webte.fei.stuba.sk/davidov/deleteData.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <div>
      <button onClick={handleGetData}>Save data</button>
      <button onClick={handleDeleteData}>Delete data</button>
    </div>
  );
};

export default TimetableButtons;
