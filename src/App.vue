<template>
  <LeftSidebar
    v-if="ready"
    @itemSelected="setItem"
    @boardSelected="boardSelect"
    :selectedProject="selectedProject"
    :projectList="projectList"
    :boards="boards"
    :activeBoard="activeBoard"
  ></LeftSidebar>
  <LaneArea v-if="ready" :lanes="lanes" :tickets="tickets"></LaneArea>
  <RightSidebar></RightSidebar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LeftSidebar from "./components/LeftSidebar.vue";
import RightSidebar from "./components/RightSidebar.vue";
import LaneArea from "./components/LaneArea.vue";
import { Board, Lane, Project, Ticket } from "./interfaces";
import {
  fetchProjectsData,
  fetchBoardsData,
  fetchLanesData,
  fetchTicketsData,
} from "@/api";

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
      activeBoard: null as Board | null,
      ready: false,
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
      this.fetchLanes();
      this.fetchTickets();
    },
    resolveFetchingProjects(data: Project[]): void {
      this.projectList = data;
      const activeId = localStorage.getItem("activeProject");
      if (activeId) {
        this.selectedProject = data[parseInt(activeId) - 1];
      } else {
        this.selectedProject = data[0];
      }
    },
    resolveFetchingBoards(data: Board[]): void {
      const boards = data.filter((item) => {
        return this.selectedProject.id === item.project;
      });
      this.boards = boards;
      const activeId = localStorage.getItem("activeBoard");
      if (activeId) {
        this.activeBoard = boards[parseInt(activeId) - 1];
      } else {
        this.activeBoard = this.activeBoard || boards[0];
      }
    },
    resolveFetchingLanes(data: Lane[]): void {
      this.lanes = data.filter((item) => {
        return this.activeBoard?.id === item.board;
      });
    },
    resolveFetchingTickets(data: Ticket[]): void {
      const laneIds = this.lanes.map((lane) => {
        return lane.id;
      });
      this.tickets = data.filter((item) => {
        return laneIds.includes(item.lane);
      });
      this.ready = true;
    },
    fetchProjects() {
      fetchProjectsData(this.resolveFetchingProjects);
    },
    fetchBoards() {
      fetchBoardsData(this.resolveFetchingBoards);
    },
    fetchLanes() {
      fetchLanesData(this.resolveFetchingLanes);
    },
    fetchTickets() {
      fetchTicketsData(this.resolveFetchingTickets);
    },
  },
  beforeMount() {
    this.fetchProjects();
    this.fetchBoards();
    this.fetchLanes();
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
