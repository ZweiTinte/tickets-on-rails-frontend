<template>
  <div :class="dropdownStyle" @focusout="handleFocusOut" tabindex="0">
    <div class="dropdown" v-on:click="setOpen(!open)">{{ selected }}</div>
    <div v-if="open">
      <div
        class="dropdown"
        v-for="item in getDropdownItems"
        :key="item.id"
        v-on:click="onClick(item.value)"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
  <div :class="spacerStyle"></div>
</template>

<script lang="ts">
import { Board } from "@/interfaces";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    dropdownItem: { required: true, type: String },
    dropdownData: {
      required: true,
      type: [Array, Object],
    },
  },
  emits: ["itemSelected"],
  data() {
    return {
      selectedItem: this.dropdownItem,
      dropdownItems: this.dropdownData,
      open: false,
      dropdownStyle: `colLayout dropdownBorder `,
      spacerStyle: ``,
    };
  },
  methods: {
    handleFocusOut() {
      this.setOpen(false);
    },
    setOpen(openState: boolean) {
      this.open = openState;
      this.dropdownStyle = `colLayout dropdownBorder ${
        this.open ? "priority" : ""
      }`;
      this.spacerStyle = `${this.open ? "dropdownSpacer" : ""}`;
    },
    onClick(item: string) {
      this.selectedItem = (this.dropdownData as Board[]).filter(function (i) {
        return i.value === item;
      })[0].value;
      this.$emit("itemSelected", this.selectedItem);
      this.setOpen(false);
    },
  },
  computed: {
    getDropdownItems() {
      return this.dropdownData;
    },
    selected() {
      return this.selectedItem || this.dropdownItem;
    },
  },
});
</script>

<style lang="scss"></style>
