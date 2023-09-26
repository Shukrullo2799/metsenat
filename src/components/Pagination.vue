<template>
  <div class="mt-3 flex items-center justify-between md:flex-row flex-col">
    <div class="flex items-center justify-between w-full md:mb-0 mb-2">
      <div>
        {{ total }} tadan {{ (page - 1) * per_page + 1 }}-{{
          per_page * page < total ? per_page * page : total
        }}
        ko'rsatilmoqda
      </div>
      <div class="lg:mr-6 mr-2">
        <span class="lg:inline hidden mr-1">Ko'rsatish</span>
        <select
          v-if="rowses.length"
          class="w-[54px] h-8 rounded px-1 border border-[#DFE3E8]"
          :value="paginate.per_page"
          @change="changePage(1)"
          v-model="paginate.per_page"
        >
          <option class="p-2" v-for="row in rowses" :key="row" :value="row.value">
            {{ row.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex items-center">
      <div
        class="page-card ml-0"
        :class="paginate.page == 1 ? 'opacity-50 disabled' : ''"
        @click="paginate.page == 1 ? null : changePage(--paginate.page)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M14.8776 7.12747C15.0337 7.28355 15.0338 7.53658 14.8779 7.69284L10.8621 11.7175C10.7063 11.8736 10.7063 12.1264 10.8621 12.2825L14.8779 16.3072C15.0338 16.4634 15.0337 16.7164 14.8776 16.8725L14.033 17.7172C13.8768 17.8734 13.6235 17.8734 13.4673 17.7172L8.033 12.2828C7.87679 12.1266 7.87679 11.8734 8.033 11.7172L13.4673 6.28284C13.6235 6.12663 13.8768 6.12663 14.033 6.28284L14.8776 7.12747Z"
            fill="#C4CDD5"
          />
        </svg>
      </div>
      <div v-if="paginate.page > 3" class="page-card" @click="changePage(1)"><span>1</span></div>
      <div v-if="paginate.page > 4" class="page-card">...</div>
      <template v-for="i in page_total" :key="i">
        <div
          v-if="show(i)"
          class="page-card"
          :class="{ active: i == paginate.page }"
          @click="changePage(i)"
        >
          <span>{{ i }}</span>
        </div>
      </template>
      <div v-if="paginate.page < page_total - 3" class="page-card">...</div>
      <div v-if="paginate.page < page_total - 2" class="page-card" @click="changePage(page_total)">
        <span>{{ page_total }}</span>
      </div>
      <div
        class="page-card"
        :class="paginate.page == page_total ? 'opacity-50 disabled' : ''"
        @click="paginate.page == page_total ? null : changePage(++paginate.page)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9.12238 7.12747C8.96629 7.28355 8.96615 7.53658 9.12207 7.69284L13.1379 11.7175C13.2937 11.8736 13.2937 12.1264 13.1379 12.2825L9.12207 16.3072C8.96615 16.4634 8.96629 16.7164 9.12238 16.8725L9.967 17.7172C10.1232 17.8734 10.3765 17.8734 10.5327 17.7172L15.967 12.2828C16.1232 12.1266 16.1232 11.8734 15.967 11.7172L10.5327 6.28284C10.3765 6.12663 10.1232 6.12663 9.967 6.28284L9.12238 7.12747Z"
            fill="#C4CDD5"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: { type: Number, default: 1 },
    rows: { type: Array, default: () => [10, 20, 50] },
    page: { type: Number, default: 1 },
    per_page: { type: Number, default: 1 }
  },
  emits: ['page'],
  data() {
    return {
      paginate: {
        page: this.page,
        per_page: this.per_page,
        total: this.total
      },
      rowses: []
    }
  },
  computed: {
    page_total() {
      return this.paginate.total ? Math.ceil(this.paginate.total / this.paginate.per_page) : 1
    }
  },
  watch: {
    total(to) {
      this.paginate.total = to
      if (this.page > 1 && to % this.per_page == 0) {
        this.paginate.page = this.paginate.page - 1
        this.$emit('page', this.paginate)
      }
    }
  },
  methods: {
    show(i) {
      return i >= this.paginate.page - 2 && i <= this.paginate.page + 2
    },
    changePage(page) {
      this.paginate.page = page
      this.$emit('page', this.paginate)
    }
  },
  mounted() {
    this.rowses = this.rows.map((row) => {
      return {
        label: row,
        value: row,
        command: () => {
          this.paginate.per_page = row
          this.changePage(1)
        }
      }
    })
  }
}
</script>

<style scoped>
.page-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #dfe3e8;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  margin: 0px 4px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #1d1d1f;
}
.page-card:hover {
  border: 1px solid var(--Primary, #36f);
}

.active {
  color: #36f;
  border: 1px solid #36f;
}
.active:hover {
  background-color: var(--blue);
}
.disabled {
  color: var(--gray-500);
  cursor: not-allowed;
}
</style>
