import React from "react";
import TicketCard from "./(components)/TicketCard";
import _ from "lodash";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/tickets", {
      cache: "no-store",
    });
    const { tickets } = await res.json();
    const sortedTickets = _.orderBy(
      tickets,
      [(ticket) => getStatusOrder(ticket.status), "priority", "progress"],
      ["asc", "desc", "asc"]
    );
    return sortedTickets;
  } catch (error) {
    console.log("Failed to get tickets", error);
  }
};

const getStatusOrder = (status) => {
  switch (status) {
    case "started":
      return 1;
    case "not started":
      return 2;
    case "done":
      return 3;
    default:
      return 4;
  }
};

const Dashboard = async () => {
  const tickets = await getTickets();
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];
  return (
    <div className="p-5">
      {tickets &&
        uniqueCategories?.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2>{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, _index) => (
                  <TicketCard
                    id={_index}
                    key={_index}
                    ticket={filteredTicket}
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
