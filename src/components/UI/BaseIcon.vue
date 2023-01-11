<template>
  <component :is="name"></component>
</template>

<script>
import LogoutIcon from '@/components/icons/LogoutIcon.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
import AgendaViewIcon from '@/components/icons/AgendaViewIcon.vue';
import ColumnViewIcon from '@/components/icons/ColumnViewIcon.vue';
import GridViewIcon from '@/components/icons/GridViewIcon.vue';
import FilterIcon from '@/components/icons/FilterIcon.vue';
import CommentIcon from '@/components/icons/CommentIcon.vue';
import AttachmentIcon from '@/components/icons/AttachmentIcon.vue';

export default {
  components: {
    LogoutIcon,
    PlusIcon,
    SearchIcon,
    AgendaViewIcon,
    GridViewIcon,
    ColumnViewIcon,
    FilterIcon,
    CommentIcon,
    AttachmentIcon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
