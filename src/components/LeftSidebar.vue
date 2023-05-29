<template>
  <div class="leftSidebar">
    <div class="dropdownWrapper">
      <DropdownMenu
        :dropdownItem="getProjectValue"
        :dropdownData="getProjectList"
      ></DropdownMenu>
    </div>
    <ul>
      <li
        v-for="board in getBoards"
        :key="board.id"
        :class="board.id === getActiveBoard?.id ? 'activeBoard' : ''"
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
  props: {
    selectedProject: { required: true, type: [Array, Object] },
    projectList: { required: true, type: [Array, Object] },
    boards: { required: true, type: [Array, Object] },
    activeBoard: { type: [Array, Object] },
  },
  emits: ["itemSelected", "boardSelected"],
  data() {
    return {
      selectedProjectL: this.selectedProject as { id: number; value: string },
      projectListL: this.projectList as Project[],
      boardsL: this.boards as Board[],
      activeBoardL: this.activeBoard as Board | null,
    };
  },
  methods: {
    onBoardSelect(board: Board): void {
      this.$emit("boardSelected", board);
    },
  },
  computed: {
    getBoards(): Board[] {
      return this.boards as Board[];
    },
    getProjectList(): Project[] {
      return this.projectList as Project[];
    },
    getProjectValue(): string {
      return (this.selectedProject as Project).value;
    },
    getActiveBoard(): Board | null {
      console.log(this.activeBoard);
      return this.activeBoard as Board;
    },
  },
});
</script>

<style lang="scss"></style>
