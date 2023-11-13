import { Project, Board, Lane, Ticket } from "./interfaces";

export async function fetchProjectsData(
  resolveFetching: (data: Project[]) => void
): Promise<void> {
  await fetch("http://localhost:3030/api/projects")
    .then(async (res) => {
      await res.json().then(resolveFetching).catch();
    })
    .catch();
}

export async function fetchBoardsData(
  resolveFetching: (data: Board[]) => void
): Promise<void> {
  await fetch("http://localhost:3030/api/boards")
    .then(async (res) => {
      await res.json().then(resolveFetching).catch();
    })
    .catch();
}

export async function fetchLanesData(
  resolveFetching: (data: Lane[]) => void
): Promise<void> {
  await fetch("http://localhost:3030/api/lanes")
    .then(async (res) => {
      await res.json().then(resolveFetching).catch();
    })
    .catch();
}

export async function fetchTicketsData(
  resolveFetching: (data: Ticket[]) => void
): Promise<void> {
  await fetch("http://localhost:3030/api/tickets")
    .then(async (res) => {
      await res.json().then(resolveFetching).catch();
    })
    .catch();
}

export async function updateTicket(
  resolveFetching: () => void,
  ticketId: string,
  ticket: Ticket
): Promise<void> {
  await fetch(`http://localhost:3030/api/tickets/${ticketId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: ticket.name,
      description: ticket.description,
      lane: ticket.lane,
    }),
  })
    .then(async (res) => {
      await res.json().then(resolveFetching).catch();
    })
    .catch();
}

export async function createTicket(
  resolveFetching: () => void,
  ticket: Ticket
): Promise<void> {
  await fetch(`http://localhost:3030/api/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: ticket.name,
      description: ticket.description,
      lane: ticket.lane,
    }),
  })
    .then(async (res) => {
      await res.json().then(resolveFetching).catch();
    })
    .catch();
}

export async function deleteTicket(
  resolveFetching: () => void,
  ticketId: string
): Promise<void> {
  await fetch(`http://localhost:3030/api/tickets/${ticketId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      await res.json().then(resolveFetching).catch();
    })
    .catch();
}
