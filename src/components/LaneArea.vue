<template>
  <div class="laneArea">
    <div
      class="lane"
      v-for="lane in getLanes"
      :key="lane.id"
      :id="lane.id.toString()"
      v-on:drop="drop"
      v-on:dragover="allowDrop"
    >
      <div class="flex">
        <input
          type="text"
          v-model="lane.name"
          class="laneTitle"
          v-on:blur="saveLane(lane)"
        />
        <input
          type="button"
          class="newButton"
          value="+"
          v-on:click="newTicket(lane.id)"
        />
      </div>
      <div
        class="ticket"
        v-for="ticket in getTickets(lane.id)"
        :key="ticket.id"
        :id="'ticket' + ticket.id.toString()"
        v-on:click="selectTicket(ticket)"
        draggable="true"
        v-on:dragstart="drag"
      >
        {{ ticket.name }}
      </div>
    </div>
    <div class="newLaneSection">
      <input
        type="button"
        class="newLaneButton"
        value="+"
        v-on:click="newLane(getActiveBoard.id)"
      />
    </div>
    <div class="laneAreaBlocker"></div>
  </div>
</template>

<script lang="ts">
import { Board, Lane, Ticket } from "@/interfaces";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    activeBoard: {
      type: [Array, Object],
    },
    tickets: [Array, Object],
    lanes: [Array, Object],
  },
  emits: [
    "createNewLane",
    "ticketSelected",
    "ticketUpdated",
    "newTicket",
    "saveLane",
  ],
  data() {
    return {
      ticketsL: this.tickets as Ticket[],
      activeBoardL: this.activeBoard as Board,
    };
  },
  methods: {
    selectTicket(ticket: Ticket) {
      this.$emit("ticketSelected", ticket);
    },
    newTicket(laneId: number) {
      this.$emit("newTicket", laneId);
    },
    saveLane(lane: Lane) {
      this.$emit("saveLane", lane);
    },
    newLane(boardId: number) {
      this.$emit("createNewLane", boardId);
    },
    drag(ev: DragEvent) {
      ev.dataTransfer?.setData("id", (ev.target as HTMLDivElement)?.id);
    },
    drop(ev: DragEvent) {
      ev.preventDefault();
      const ticketId = ev.dataTransfer?.getData("id");
      if (!ticketId) {
        return;
      }
      const ticket = document.getElementById(ticketId);
      const laneId = (ev.target as HTMLDivElement)?.id;
      if (ticket && laneId) {
        (ev.target as HTMLDivElement).appendChild(ticket);
        this.$emit("ticketUpdated", ticketId.replace("ticket", ""), laneId);
      }
    },
    allowDrop(ev: DragEvent) {
      ev.preventDefault();
    },
  },
  computed: {
    getLanes(): Lane[] {
      return this.lanes as Lane[];
    },
    getTickets(): (laneId: number) => Ticket[] {
      return (laneId) => {
        return (this.tickets as Ticket[]).filter((ticket) => {
          return ticket.lane === laneId;
        });
      };
    },
    getActiveBoard(): Board {
      return this.activeBoard as Board;
    },
  },
});
</script>

<style lang="scss"></style>
