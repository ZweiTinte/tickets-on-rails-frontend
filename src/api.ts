import { Project, Board, Lane, Ticket } from "./interfaces";

export async function fetchProjectsData(
  resolveFetching: (data: Project[]) => void
): Promise<void> {
  await fetch("http://localhost:3000/api/projects")
    .then(async (res) => {
      await res.json().then(resolveFetching).catch();
    })
    .catch();
}

export async function fetchBoardsData(
  resolveFetching: (data: Board[]) => void
): Promise<void> {
  await fetch("http://localhost:3000/api/boards")
    .then(async (res) => {
      await res.json().then(resolveFetching).catch();
    })
    .catch();
}

export async function fetchLanesData(
  resolveFetching: (data: Lane[]) => void
): Promise<void> {
  await fetch("http://localhost:3000/api/lanes")
    .then(async (res) => {
      await res.json().then(resolveFetching).catch();
    })
    .catch();
}

export async function fetchTicketsData(
  resolveFetching: (data: Ticket[]) => void
): Promise<void> {
  await fetch("http://localhost:3000/api/tickets")
    .then(async (res) => {
      await res.json().then(resolveFetching).catch();
    })
    .catch();
}
