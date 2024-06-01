import EditTicketForm from "@/app/(components)/EditTicketForm";
import React from "react";

const getTicketById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to get ticket.");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
const TicketPage = async ({ params }) => {
  const EDIT_MODE = params.id === "new" ? false : true;
  let updateTicketData = {};

  if (EDIT_MODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return <EditTicketForm ticket={updateTicketData} />;
};

export default TicketPage;
