<template>
  <component :is="name"></component>
</template>

<script>
import LogoutIcon from '@/components/icons/LogoutIcon.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';

export default {
  components: {
    LogoutIcon,
    PlusIcon,
    SearchIcon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
