<template>
  <div class="rightSidebar">
    <div class="flex">
      <input
        type="text"
        v-model="getActiveTicket.name"
        class="laneTitle"
        v-on:blur="saveTicket(getActiveTicket)"
      />
      <button
        className="deleteButton"
        v-on:click="deleteTicket(getActiveTicket.id)"
      >
        x
      </button>
    </div>
    <textarea
      v-model="getActiveTicket.description"
      class="ticketDescription"
      v-on:blur="saveTicket(getActiveTicket)"
    >
    </textarea>
    <div class="ticketLane">
      <span>Lane:</span>
      <span>{{ getLaneName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Lane, Ticket } from "@/interfaces";

export default defineComponent({
  props: {
    activeTicket: {
      required: true,
      type: [Array, Object],
    },
    lanes: [Array, Object],
  },
  emits: ["saveTicket", "deleteTicket"],
  data() {
    return {
      activeTicketItem: this.activeTicket as Ticket,
      lanesL: this.lanes as Lane[],
    };
  },
  methods: {
    saveTicket(ticket: Ticket) {
      this.$emit("saveTicket", ticket);
    },
    deleteTicket(ticketId: number) {
      this.$emit("deleteTicket", ticketId);
    },
  },
  computed: {
    getActiveTicket(): Ticket {
      return this.activeTicket as Ticket;
    },
    getLaneName(): string {
      return this.lanesL.filter((lane) => {
        return lane.id === (this.activeTicket as Ticket).lane;
      })[0].name;
    },
  },
});
</script>

<style lang="scss"></style>
