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

export default defineComponent({
  components: { DropdownMenu },
  data() {
    return {
      selectedProject: { id: 0, value: "", boards: [0] },
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
    },
    resolveFetchingProjects(data: Project[]): void {
      this.projectList = data;
      this.selectedProject = data[0];
    },
    resolveFetchingBoards(data: Board[]): void {
      const fetchedData = data;
      this.boards = fetchedData.filter((item) => {
        return this.selectedProject.boards.includes(item.id);
      });
      this.activeBoard = this.activeBoard || this.boards[0];
    },
    fetchProjects() {
      async function fetchData(
        resolveFetching: (data: Project[]) => void
      ): Promise<void> {
        await fetch("http://localhost:3000/api/projects")
          .then(async (res) => {
            await res.json().then(resolveFetching).catch();
          })
          .catch();
      }
      fetchData(this.resolveFetchingProjects);
    },
    fetchBoards() {
      async function fetchData(
        resolveFetching: (data: Board[]) => void
      ): Promise<void> {
        await fetch("http://localhost:3000/api/boards")
          .then(async (res) => {
            await res.json().then(resolveFetching).catch();
          })
          .catch();
      }
      fetchData(this.resolveFetchingBoards);
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
