<template>
  <div class="leftSidebar">
    <div class="dropdownWrapper">
      <DropdownMenu
        @itemSelected="setItem"
        :dropdownItem="selectedProject.value"
        :dropdownData="projectList"
      ></DropdownMenu>
    </div>
    <ul>
      <li
        v-for="board in getBoards"
        :key="board.id"
        :class="board.id === activeBoard?.id ? 'activeBoard' : ''"
        v-on:click="onBoardSelect(board)"
      >
        {{ board.value }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Board, Project } from "@/interfaces";
import { defineComponent } from "vue";
import DropdownMenu from "./DropdownMenu.vue";
import { fetchProjectsData, fetchBoardsData } from "@/api";

export default defineComponent({
  components: { DropdownMenu },
  data() {
    return {
      selectedProject: { id: 0, value: "" },
      projectList: [] as Project[],
      boards: [] as Board[],
      activeBoard: null as Board | null,
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
    onBoardSelect(board: Board): void {
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
      this.boards = fetchedData.filter((item) => {
        return this.selectedProject.id === item.project;
      });
      const activeId = localStorage.getItem("activeBoard");
      if (activeId) {
        this.activeBoard = this.boards[parseInt(activeId) - 1];
      } else {
        this.activeBoard = this.activeBoard || this.boards[0];
      }
    },
    fetchProjects() {
      fetchProjectsData(this.resolveFetchingProjects);
    },
    fetchBoards() {
      fetchBoardsData(this.resolveFetchingBoards);
    },
  },
  computed: {
    getBoards(): Board[] {
      return this.boards;
    },
    boardSelected(board: Board): string {
      return board.id === this.activeBoard?.id ? "activeBoard" : "";
    },
  },
  beforeMount() {
    this.fetchProjects();
    this.fetchBoards();
  },
});
</script>

<style lang="scss"></style>
