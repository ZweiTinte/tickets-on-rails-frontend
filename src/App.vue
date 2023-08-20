<template>
  <LeftSidebar
    v-if="boardsReady && projectsReady"
    @itemSelected="setItem"
    @boardSelected="boardSelect"
    :selectedProject="selectedProject"
    :projectList="projectList"
    :boards="boards"
    :activeBoard="activeBoard"
  ></LeftSidebar>
  <LaneArea
    v-if="boardsReady && ticketsReady"
    :lanes="lanes"
    :tickets="tickets"
    :activeBoard="activeBoard"
    @ticketSelected="ticketSelect"
  ></LaneArea>
  <RightSidebar :activeTicket="activeTicket"></RightSidebar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LeftSidebar from "./components/LeftSidebar.vue";
import RightSidebar from "./components/RightSidebar.vue";
import LaneArea from "./components/LaneArea.vue";
import { Board, Lane, Project, Ticket } from "./interfaces";
import { fetchProjectsData, fetchBoardsData, fetchTicketsData } from "@/api";

export default defineComponent({
  name: "App",
  components: {
    LeftSidebar,
    RightSidebar,
    LaneArea,
  },
  data() {
    return {
      selectedProject: { id: 0, value: "" },
      projectList: [] as Project[],
      boards: [] as Board[],
      lanes: [] as Lane[],
      tickets: [] as Ticket[],
      activeBoard: { id: 0, project: 0, value: "" } as Board,
      activeTicket: { id: 0, lane: 0, name: "", description: "" } as Ticket,
      boardsReady: false,
      ticketsReady: false,
      projectsReady: false,
    };
  },
  methods: {
    setItem(item: string) {
      this.selectedProject = (this.projectList as Project[]).filter(function (
        i
      ) {
        return i.value === item;
      })[0];
      this.fetchBoards();
    },
    boardSelect(board: Board) {
      this.activeBoard = board;
      localStorage.setItem("activeBoard", board.id.toString());
      localStorage.setItem("activeProject", this.selectedProject.id.toString());
    },
    ticketSelect(ticket: Ticket) {
      this.activeTicket = ticket;
      localStorage.setItem("activeTicket", ticket.id.toString());
    },
    resolveFetchingProjects(data: Project[]): void {
      this.projectList = data;
      const activeId = localStorage.getItem("activeProject");
      if (activeId) {
        this.selectedProject = data[parseInt(activeId) - 1];
      } else {
        this.selectedProject = data[0];
      }
      this.projectsReady = true;
    },
    resolveFetchingBoards(data: Board[]): void {
      this.boards = data.filter((item) => {
        return this.selectedProject.id === item.project;
      });
      const activeId = localStorage.getItem("activeBoard");
      if (activeId) {
        this.activeBoard = this.boards.filter((board) => {
          return board.id === parseInt(activeId);
        })[0];
      } else {
        this.activeBoard = this.activeBoard || this.boards[0];
      }
      this.boardsReady = true;
    },
    resolveFetchingTickets(data: Ticket[]): void {
      this.tickets = data;
      const activeId = localStorage.getItem("activeTicket");
      if (activeId) {
        this.activeTicket = data[parseInt(activeId) - 1];
      } else {
        this.activeTicket = data[0];
      }
      this.ticketsReady = true;
    },
    fetchProjects() {
      fetchProjectsData(this.resolveFetchingProjects);
    },
    fetchBoards() {
      fetchBoardsData(this.resolveFetchingBoards);
    },
    fetchTickets() {
      fetchTicketsData(this.resolveFetchingTickets);
    },
  },
  beforeMount() {
    this.fetchProjects();
    this.fetchBoards();
    this.fetchTickets();
  },
});
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 0;
}
</style>
