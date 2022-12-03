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
      <li v-for="board in selectedProject.boards" :key="board">
        {{ board }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mockProjects } from "@/projects";
import { defineComponent } from "vue";
import DropdownMenu from "./DropdownMenu.vue";

export default defineComponent({
  components: { DropdownMenu },
  data() {
    return {
      selectedProject: mockProjects[0],
      projectList: mockProjects,
    };
  },
  methods: {
    setItem(item: string) {
      this.selectedProject = (
        this.projectList as Array<{
          id: number;
          value: string;
          boards: string[];
        }>
      ).filter(function (i) {
        return i.value === item;
      })[0];
    },
  },
});
</script>

<style lang="scss"></style>
