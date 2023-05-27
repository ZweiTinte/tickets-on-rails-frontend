<template>
  <LeftSidebar
    v-if="ready"
    @itemSelected="setItem"
    @boardSelected="boardSelect"
    :selectedProject="selectedProject"
    :projectList="projectList"
    :boards="boards"
    :activeBoard="getActiveBoard"
  ></LeftSidebar>
  <LaneArea></LaneArea>
  <RightSidebar></RightSidebar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LeftSidebar from "./components/LeftSidebar.vue";
import RightSidebar from "./components/RightSidebar.vue";
import LaneArea from "./components/LaneArea.vue";
import { Board, Project } from "./interfaces";
import { fetchProjectsData, fetchBoardsData } from "@/api";

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
      const fetchedData = data;
      const boards = fetchedData.filter((item) => {
        return this.selectedProject.id === item.project;
      });
      this.boards = boards;
      const activeId = localStorage.getItem("activeBoard");
      if (activeId) {
        this.activeBoard = boards[parseInt(activeId) - 1];
      } else {
        this.activeBoard = this.activeBoard || boards[0];
      }
      this.ready = true;
    },
    fetchProjects() {
      fetchProjectsData(this.resolveFetchingProjects);
    },
    fetchBoards() {
      fetchBoardsData(this.resolveFetchingBoards);
    },
  },
  beforeMount() {
    this.fetchProjects();
    this.fetchBoards();
  },
  computed: {
    getActiveBoard(): Board {
      return this.activeBoard as Board;
    },
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
