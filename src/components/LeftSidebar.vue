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
      <li v-for="board in getBoards" :key="board.id">
        {{ board.value }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DropdownMenu from "./DropdownMenu.vue";

export default defineComponent({
  components: { DropdownMenu },
  data() {
    return {
      selectedProject: { id: 0, value: "", boards: [0] },
      projectList: [] as Array<{
        id: number;
        value: string;
        boards: number[];
      }>,
      boards: [] as Array<{
        id: number;
        value: string;
      }>,
    };
  },
  methods: {
    setItem(item: string) {
      this.selectedProject = (
        this.projectList as Array<{
          id: number;
          value: string;
          boards: number[];
        }>
      ).filter(function (i) {
        return i.value === item;
      })[0];
      this.fetchBoards();
    },
    resolveFetchingProjects(
      data: Array<{
        id: number;
        value: string;
        boards: number[];
      }>
    ): void {
      this.projectList = data;
      this.selectedProject = data[0];
    },
    resolveFetchingBoards(
      data: Array<{
        id: number;
        value: string;
      }>
    ): void {
      const fetchedData = data;
      this.boards = fetchedData.filter((item) => {
        return this.selectedProject.boards.includes(item.id);
      });
    },
    fetchProjects() {
      async function fetchData(
        resolveFetching: (
          data: Array<{
            id: number;
            value: string;
            boards: number[];
          }>
        ) => void
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
        resolveFetching: (
          data: Array<{
            id: number;
            value: string;
          }>
        ) => void
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
    getBoards(): Array<{
      id: number;
      value: string;
    }> {
      return this.boards;
    },
  },
  beforeMount() {
    this.fetchProjects();
    this.fetchBoards();
  },
});
</script>

<style lang="scss"></style>
