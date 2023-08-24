<template>
  <div class="laneArea">
    <div class="lane" v-for="lane in getLanes" :key="lane.id">
      <div class="laneTitle">
        {{ lane.name }}
      </div>
      <div
        class="ticket"
        v-for="ticket in getTickets(lane.id)"
        :key="ticket.id"
        v-on:click="selectTicket(ticket)"
      >
        {{ ticket.name }}
      </div>
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
  emits: ["ticketSelected"],
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
