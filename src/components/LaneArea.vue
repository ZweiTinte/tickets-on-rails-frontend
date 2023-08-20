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
import { fetchLanesData, fetchTicketsData } from "@/api";
import { Board, Lane, Ticket } from "@/interfaces";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    activeBoard: {
      type: [Array, Object],
    },
  },
  watch: {
    $props: {
      handler: function () {
        this.changeHandler();
      },
      deep: true,
      immediate: true,
    },
  },
  emits: ["ticketSelected"],
  data() {
    return {
      lanes: [] as Lane[],
      tickets: [] as Ticket[],
      activeBoardL: this.activeBoard as Board,
    };
  },
  methods: {
    resolveFetchingLanes(data: Lane[]): void {
      this.lanes = data.filter((item) => {
        return (this.activeBoard as Board)?.id === item.board;
      });
    },
    resolveFetchingTickets(data: Ticket[]): void {
      const laneIds = this.lanes.map((lane) => {
        return lane.id;
      });
      this.tickets = data.filter((item) => {
        return laneIds.includes(item.lane);
      });
    },
    fetchLanes() {
      fetchLanesData(this.resolveFetchingLanes);
    },
    fetchTickets() {
      fetchTicketsData(this.resolveFetchingTickets);
    },
    changeHandler() {
      this.fetchLanes();
      this.fetchTickets();
    },
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
