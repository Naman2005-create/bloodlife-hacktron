import React, { useEffect, useState } from "react";

const DATA_API_URL = "https://data.mongodb-api.com/app/<app-id>/endpoint/data/v1/action/find";
const API_KEY = "<mongodb+srv://<username>:naman_194@cluster0.vp22uwp.mongodb.net/test
>";

async function fetchRequests() {
  const response = await fetch(DATA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": mongodb+srv://<username>:naman_194@cluster0.vp22uwp.mongodb.net/test
      ,
    },
    body: JSON.stringify({
      dataSource: "Cluster0", // or your cluster name
      database: "bloodlife",
      collection: "requests",
      filter: {}
    }),
  });
  const data = await response.json();
  return data.documents;
}

function RequestsList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests().then(setRequests);
  }, []);

  return (
    <div>
      <h2>Requests with Matched Donors</h2>
      {requests.map(req => (
        <div key={req._id}>
          <h3>{req.hospitalId} - {req.bloodTypeNeeded}</h3>
          <p>Urgency: {req.urgency}</p>
          <p>Matched Donors:</p>
          <ul>
            {req.matchedDonors && req.matchedDonors.map(donor => (
              <li key={donor.uid}>{donor.uid} ({donor.contact})</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default RequestsList;