<template>

  <nav aria-label="...">
    <ul class="pagination pagination">

      <template v-for="p of getPageCount" :key="p">
        <li class="page-item" :class="page == p ? 'active' : ''" @click="onPaginate(p)"
          v-if="p === 1 && Math.abs(page - p) >= 3">
          <a class="page-link">{{ p }}</a>
        </li>
        <li class="page-item" :class="page == p ? 'active' : ''"
          v-if="p === 1 && Math.abs(page - p) >= 3 && page !== 4">
          <span class="page-link">...</span>
        </li>
        <li class="page-item" :class="page == p ? 'active' : ''" @click="onPaginate(p)" v-if="Math.abs(page - p) <= 2">
          <a class="page-link">{{ p }}</a>
        </li>
        <li class="page-item" :class="page == p ? 'active' : ''" v-if="p === getPageCount && Math.abs(page - p) >= 3">
          <span class="page-link">...</span>
        </li>
        <li class="page-item" :class="page == p ? 'active' : ''" @click="onPaginate(p)"
          v-if="p === getPageCount && Math.abs(page - p) >= 3">
          <a class="page-link">{{ p }}</a>
        </li>

      </template>
    </ul>
  </nav>
</template>

<script lang="ts">
export default {
  props: {
    count: {
      type: Number,
      required: true,
      default: 4
    },
    page_size: {
      type: Number,
      required: true,
      default: 4
    },
    page: {
      type: Number,
      required: true,
      default: 4
    }
  },

  computed: {
    getPageCount() {

      return Math.ceil(this.count / this.page_size)
    },

  },
  methods: {
    onPaginate(value: number) {
      this.$emit('onPaginate', value)
    }
  }

}
</script>



